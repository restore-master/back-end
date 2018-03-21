'use strict';

import Mongoose, {Schema} from 'mongoose';

const Customer = new Schema({
  customerName: { type: String, required: true},
  date: { type: String, required: true},
  report:[{ type: Mongoose.Schema.Types.ObjectId, ref:'report'}],
});

Customer.pre('save', function(next) {
  this.validate((err) => {
    if(err) next(() => console.error(err));
    next();
  });
});

module.exports = Mongoose.model('customers', Customer);
