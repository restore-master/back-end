'use strict';

const mongoose = require('mongoose');

const Customer = mongoose.Schema({
  name: {type: String, required: true},
  date: {type: String, required: true},
  reports:[{type: mongoose.Schema.Types.ObjectId, ref:'report'}],
});

module.exports = mongoose.model('customer', Customer);
