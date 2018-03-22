'use strict';

import Mongoose from 'mongoose';

const Customer = module.exports = Mongoose.Schema({
  name: { type: String, required: true},
  date: { type: String, required: true},
  reports:[{ type: Mongoose.Schema.Types.ObjectId, ref:'report'}],
});

Customer.pre('save', function(next) {
  this.validate((err) => {
    if(err) next(() => console.error(err));
    next();
  });
});

module.exports = Mongoose.model('customer', Customer);
