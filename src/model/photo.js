import * as _ from 'ramda';
import * as util from '../lib/utilities';
import createError from 'http-errors';
import Mongoose, {Schema} from 'mongoose';

const photoSchema = new Schema({
  url: {type: String, required: true},
  description: {type: String, required: true},
  owner: {type: Schema.Types.ObjectId, required: true},
  profile: {type: Schema.Types.ObjectId, required: false},
  comments: [{type: Schema.Types.ObjectId}],
});

const Photo = Mongoose.model('photo', photoSchema);

Photo.validateRequest = function(request){
  if(request.method === 'POST' && !request.files)
    return Promise.reject(createError(400, 'VALIDATION ERROR: must have a file'));

  if(request.method === 'POST' && request.files.length < 1)
    return Promise.reject(createError(400, 'VALIDATION ERROR: must have a file'));

  if(request.files.length > 1) {
    let err = createError(400, 'VALIDATION ERROR: must have one file');
    return util.removeMulterFiles(request.files)
      .then(() => {throw err;});
  }

  let [file] = request.files;
  if(file){
    if(file.fieldname !== 'photo'){
      let err = createError(400, 'VALIDATION ERROR: file must be on field photo');
      return util.removeMulterFiles(request.files)
        .then(() => {throw err;});
    }
  }

  return Promise.resolve(file);
};

Photo.create = function(request){
  return Photo.validateRequest(request)
    .then(file => {
      return util.s3UploadMulterFileAndClean(file)
        .then(s3Data => {
          return new Photo({
            owner: request.user._id,
            profile: request.user.profile,
            url: s3Data.Location,
            description: request.body.description,
          }).save();
        });
    })
    .then(photo => {
      return Photo.findById(photo._id)
        .populate('profile');
    });
};

Photo.fetch = util.pagerCreate(Photo, 'comments profile');

Photo.fetchOne = function(request){
  return Photo.findById(request.params.id)
    .populate('profile comments')
    .then(photo => {
      if(!photo)
        throw createError(404, 'NOT FOUND ERROR: photo not found');
      return photo;
    });
};

Photo.updatePhotoWithFile = function(request){
  return Photo.validateRequest(request)
    .then(file => {
      return util.s3UploadMulterFileAndClean(file)
        .then(s3Data => {
          let update = {url: s3Data.Location};
          if(request.body.description) update.description = request.body.description;
          return Photo.findByIdAndUpdate(request.params.id, update, {new: true, runValidators: true});
        });
    });
};

Photo.update = function(request){
  if(request.files && request.files[0])
    return Photo.updatePhotoWithFile(request)
      .then(photo => {
        return Photo.findById(photo._id)
          .populate('comments profile');
      });
  let options = {new: true, runValidators: true};
  let update = {description: request.body.description};
  return Photo.findByIdAndUpdate(request.params.id, update, options)
    .then(photo => {
      return Photo.findById(photo._id)
        .populate('comments profile');
    });
};

Photo.delete = function(request){
  return Photo.findOneAndRemove({_id: request.params.id, owner: request.user._id})
    .then(profile => {
      if(!profile)
        throw createError(404, 'NOT FOUND ERROR: profile not found');
    });
};

export default Photo;
