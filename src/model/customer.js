'use strict';

const mongoose = require('mongoose');

const Customer = module.exports = mongoose.Schema({
  name: { type: String, required: true},
  date: { type: String, required: true},
  reports:[{ type: mongoose.Schema.Types.ObjectId, ref:'report'}],
});

// Customer.pre('save', function(next) {
//   this.validate((err) => {
//     if(err) next(() => console.error(err));
//     next();
//   });
// });

module.exports = mongoose.model('customer', Customer);