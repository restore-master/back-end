'use strict';

import Mongoose, {Schema} from 'mongoose';

const Customer = module.exports = Mongoose.Schema({
  name: { type: String, required: true},
  date: { type: String, required: true},
  report:[{ type: Mongoose.Schema.Types.ObjectId, ref:'reports'}],
});

Customer.pre('save', function(next) {
  this.validate((err) => {
    if(err) next(() => console.error(err));
    next();
  });
});

module.exports = Mongoose.model('customers', Customer);
