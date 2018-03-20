'use strict';
import * as _ from 'ramda';
import * as util from '../lib/utilities';
import createError from 'http-errors';
import Mongoose, {Schema} from 'mongoose';


const reportSchema = new Schema({
  customer:{ type: Mongoose.Schema.Types.ObjectId, required: true, ref:'customer'},
  source: {type: String, required: true },
  upperRooms: {type: String},
  lowerRooms: {type: String},
  ceilingHeight: {type: Number, required: true},
  ceilingDescription: {type: String},
  powerHeat: {type: String, required: true},
  flooringType: {type: String, required:true},
  typeOfHome: {type: String, required:true},
  ageOfHome: {type: String, required:true},
  standingWater: {type: Number, required:true},
  basement: {type: String, required: true},
  crawlOrSlab: {type: String, required: true},
  crawlOrAtticAccessLocation: {type: String, required: true},
  contents: {type: String, required: true},
  accessPermissions: {type: String},
  setLockBox: {type: String},
  petsOrChildren: {type: String},
  specialNeeds: {type: String, required: true},
  respiratoryOrAllergies: {type: String, required: true},
  growth: {type: String, required: true},
  odor: {type: String},
  monitors: {type: String, required: true},
  lossIsMailingAddress: {type: Boolean, required: true},
  customerEmail: {type: String, required: true},
  hearAboutUs: {type: String},
  adjuster: {type: String, required: true },
  customerAgent: {type: String, required: true},
});

const Report = Mongoose.model('report', reportSchema);

Report.create =  function(request){
  console.log(request.body.id);
  return new Report({
    customer: request.body.customer,
    source: request.body.source,
    upperRooms: request.body.upperRooms,
    lowerRooms: request.body.lowerRooms,
    ceilingHeight: request.body.ceilingHeight,
    ceilingDescription: request.body.ceilingDescription,
    powerHeat: request.body.powerHeat,
    flooringType: request.body.flooringType,
    typeOfHome: request.body.typeOfHome,
    ageOfHome: request.body.ageOfHome,
    standingWater: request.body.standingWater,
    basement: request.body.basement,
    crawlOrSlab: request.body.crawlOrSlab,
    crawlOrAtticAccessLocation: request.body.crawlOrAtticAccessLocation,
    contents: request.body.contents,
    accessPermissions: request.body.accessPermissions,
    setLockBox: request.body.setLockBox,
    petsOrChildren: request.body.petsOrChildren,
    specialNeeds: request.body.specialNeeds,
    respiratoryOrAllergies: request.body.respiratoryOrAllergies,
    growth: request.body.growth,
    odor: request.body.odor,
    monitors: request.body.monitors,
    lossIsMailingAddress: request.body.lossIsMailingAddress,
    customerEmail: request.body.customerEmail,
    hearAboutUs: request.body.hearAboutUs,
    adjuster: request.body.adjuster,
    customerAgent: request.body.customerAgent,
  }).save();
  // .then(console.log(request.params._id));
};

Report.fetch = util.pagerCreate(Report);


export default Report;
