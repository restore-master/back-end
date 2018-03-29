'use strict';
const mongoose = require('mongoose');
const Customer = require('./customer.js');

const Report = mongoose.Schema({
  source: {type: String, required: true },
  upperRooms: {type: String},
  lowerRooms: {type: String},
  ceilingHeight: {type: Number, required: true},
  ceilingDescription: {type: String},
  powerHeat: {type: String, required: true},
  flooringType: {type: String, required:true},
  typeOfHome: {type: String, required:true},
  yearBuilt: {type: String, required:true},
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
