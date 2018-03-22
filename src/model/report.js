'use strict';
import createError from 'http-errors';
const mongoose = require('mongoose');
const Customer = require('./customer.js');


const Report = mongoose.Schema({
  source: {type: String, required: true },
  // upperRooms: {type: String},
  // lowerRooms: {type: String},
  // ceilingHeight: {type: Number, required: true},
  // ceilingDescription: {type: String},
  // powerHeat: {type: String, required: true},
  // flooringType: {type: String, required:true},
  // typeOfHome: {type: String, required:true},
  // ageOfHome: {type: String, required:true},
  // standingWater: {type: Number, required:true},
  // basement: {type: String, required: true},
  // crawlOrSlab: {type: String, required: true},
  // crawlOrAtticAccessLocation: {type: String, required: true},
  // contents: {type: String, required: true},
  // accessPermissions: {type: String},
  // setLockBox: {type: String},
  // petsOrChildren: {type: String},
  // specialNeeds: {type: String, required: true},
  // respiratoryOrAllergies: {type: String, required: true},
  // growth: {type: String, required: true},
  // odor: {type: String},
  // monitors: {type: String, required: true},
  // lossIsMailingAddress: {type: Boolean, required: true},
  // customerEmail: {type: String, required: true},
  // hearAboutUs: {type: String},
  // adjuster: {type: String, required: true },
  // customerAgent: {type: String, required: true},
  customer: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'customer'},
});

Report.pre('save', function(next) {
  Customer.findById(this.customer)
    .then(customer => {
      customer.reports = [...new Set(customer.reports).add(this._id)];
      Customer.findByIdAndUpdate(this.customer, {reports: customer.reports});
      customer.save();
    })
    .then(next)
    .catch(() => next(new Error('Validation Error. Failed to Save Report')));
});
// "report": "5ab2c76d7e2d4e112c384803",
// "customer": "5ab2c25821c6f1101390c41d",
Report.post('remove', function(doc, next) {
  Customer.findById(doc.customer)
    .then(customer => {
      customer.reports = customer.reports.filter(a => a.toString() !== doc._id.toString());
      Customer.findByIdAndUpdate(this.customer, {reports: customer.reports});
      customer.save();
    })
    .then(next)
    .catch(next);
  });
  
module.exports = mongoose.model('report', Report);
// Report.create =  function(request){
//   console.log(request.body);
//   var customerReport = new Report({
//     customer: request.body.customer,
//     source: request.body.source,
//     upperRooms: request.body.upperRooms,
//     lowerRooms: request.body.lowerRooms,
//     ceilingHeight: request.body.ceilingHeight,
//     ceilingDescription: request.body.ceilingDescription,
//     powerHeat: request.body.powerHeat,
//     flooringType: request.body.flooringType,
//     typeOfHome: request.body.typeOfHome,
//     ageOfHome: request.body.ageOfHome,
//     standingWater: request.body.standingWater,
//     basement: request.body.basement,
//     crawlOrSlab: request.body.crawlOrSlab,
//     crawlOrAtticAccessLocation: request.body.crawlOrAtticAccessLocation,
//     contents: request.body.contents,
//     accessPermissions: request.body.accessPermissions,
//     setLockBox: request.body.setLockBox,
//     petsOrChildren: request.body.petsOrChildren,
//     specialNeeds: request.body.specialNeeds,
//     respiratoryOrAllergies: request.body.respiratoryOrAllergies,
//     growth: request.body.growth,
//     odor: request.body.odor,
//     monitors: request.body.monitors,
//     lossIsMailingAddress: request.body.lossIsMailingAddress,
//     customerEmail: request.body.customerEmail,
//     hearAboutUs: request.body.hearAboutUs,
//     adjuster: request.body.adjuster,
//     customerAgent: request.body.customerAgent,
//   }).save()
//     .then(
//       Customer.update = function(request){
//         let options = {new: true, runValidators: true};
//         let update = {
//           reports: [
//             customerReport,
//           ],
//         };
//         return Customer.findByIdAndUpdate(request.params.id, update, options)
//           .then(customer => {
//             return Customer.findById(customer._id);
//           });
//       }
//     );
//   // .then(console.log(request.params._id));
// };

// Report.fetch = util.pagerCreate(Report);

// {
//   "customer": 5ab2a24cd9cc3e33007ea781,
//   "source": "hello",
//   "ceilingHeight": 2,
//   "powerHeat": "me",
//   "flooringType": "you",
//   "typeOfHome": "us",
//   "ageOfHome": "thenm",
//   "standingWater": 2,
//   "basement": "they",
//   "crawlOrSlab": "there",
//   "crawlOrAtticAccessLocation": "that",
//   "contents": "me",
//   "specialNeeds": "you",
//   "respiratoryOrAllergies": "them",
//   "growth": 'hello',
//   "monitors": "those",
//   "lossIsMailingAddress": true,
//   "customerEmail": "yes",
//   "adjuster": "no",
//   "customerAgent": "possibly",
// }
