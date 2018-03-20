import Mongoose, { Schema } from 'mongoose';
import Customer from './customer';
import debug from 'debug';


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

Report.pre('save', function (next) {
  debug(`Report.pre('save') ${Report.customer}`);
  Customer.findById(this.customer)
    .then(customer => {
      customer.report = [...new Set(customer.report).add(this._id)];
      Customer.findByIdAndUpdate(this.customer, { report: customer.report });
      customer.save();
    })
    .then(next)
    .catch(() => next(new Error('Validation Error. Failed to save Report.')));
});


Report.post('remove', function (doc, next) {
  debug(`Report.post('delete') animal: ${Report.name}`);
  Customer.findById(doc.customer)
    .then(customer => {
      customer.report = customer.report.filter(a => doc._id.toString() !== a.toString());
      customer.save();
    })
    .then(next)
    .catch(next);
});


export default Report;
