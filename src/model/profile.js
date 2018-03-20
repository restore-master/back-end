import createError from 'http-errors';
import * as util from '../lib/utilities';
import Mongoose, {Schema} from 'mongoose';

const profileScheama = new Schema({
  owner: {type: Schema.Types.ObjectId, required: true, unique: true},
  email: {type: String, required: true},
  username: {type: String, required: true},
  avatar: {type: String},
  bio: {type: String},
});

const Profile = Mongoose.model('profile', profileScheama);

Profile.validateReqFile = function (request) {
  if(request.files.length > 1){
    return util.removeMulterFiles(request.files)
      .then(() => {
        throw createError(400, 'VALIDATION ERROR: only one file permitted');
      });
  }

  let [file] = request.files;
  if(file)
    if(file.fieldname !== 'avatar')
      return util.removeMulterFiles(request.files)
        .then(() => {
          throw createError(400, 'VALIDATION ERROR: file must be for avatar');
        });

  return Promise.resolve(file);
};

Profile.createProfileWithPhoto = function(request){
  return Profile.validateReqFile(request)
    .then((file) => {
      return util.s3UploadMulterFileAndClean(file)
        .then((s3Data) => {
          return new Profile({
            owner: request.user._id,
            username: request.user.username, 
            email: request.user.email,
            bio: request.body.bio,
            avatar: s3Data.Location,
          }).save();
        });
    });
};

Profile.create = function(request){
  if(request.files){
    return Profile.createProfileWithPhoto(request)
      .then(profile => {
        request.user.profile = profile._id;
        return request.user.save()
          .then(() => profile);
      });
  }

  return new Profile({
    owner: request.user._id,
    username: request.user.username, 
    email: request.user.email,
    bio: request.body.bio,
  })
    .save()
    .then(profile => {
      request.user.profile = profile._id;
      return request.user.save()
        .then(() => profile);
    });
};

Profile.fetch = util.pagerCreate(Profile);

Profile.fetchOne = function(request){
  return Profile.findById(request.params.id)
    .then(profile => {
      if(!profile)
        throw createError(404, 'NOT FOUND ERROR: profile not found'); 
      return profile;
    });
};

Profile.updateProfileWithPhoto = function(request) {
  return Profile.validateReqFile(request)
    .then(file => {
      return util.s3UploadMulterFileAndClean(file)
        .then((s3Data) => {
          let update = {avatar: s3Data.Location};
          if(request.body.bio) update.bio = request.body.bio; 
          return Profile.findByIdAndUpdate(request.params.id, update, {new: true, runValidators: true});
        });
    });
};

Profile.update = function(request){
  if(request.files && request.files[0])
    return Profile.updateProfileWithPhoto(request);
  let options = {new: true, runValidators: true};
  return Profile.findByIdAndUpdate(request.params.id, {bio: request.body.bio}, options);
};

Profile.delete = function(request){
  return Profile.findOneAndRemove({_id: request.params.id, owner: request.user._id})
    .then(profile => {
      if(!profile)
        throw createError(404, 'NOT FOUND ERROR: profile not found');
    });
};

export default Profile;