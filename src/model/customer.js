'use strict';

<<<<<<< HEAD
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
=======
const mongoose = require('mongoose');

const Customer = module.exports = mongoose.Schema({
  name: { type: String, required: true},
  date: { type: String, required: true},
  reports:[{ type: mongoose.Schema.Types.ObjectId, ref:'report'}],
});

module.exports = mongoose.model('customer', Customer);
>>>>>>> a1c45e5ae22e9125c2a6095affbf9d0d250c9c44
