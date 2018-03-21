'use strict';
import * as _ from 'ramda';
import * as util from '../lib/utilities';
import createError from 'http-errors';
import Mongoose, {Schema} from 'mongoose';

const customerSchema = new Schema({
  customerName: { type: String, required: true},
  date: { type: String, required: true},
  reports:[{ type: Mongoose.Schema.Types.ObjectId, ref:'report'}],
});

const Customer = Mongoose.model('customer', customerSchema);

Customer.create =  function(request){
  return new Customer({
    customerName: request.body.customerName,
    date: request.body.date,
  }).save();
};

Customer.fetch = util.pagerCreate(Customer);

Customer.fetchOne = function(request){
  return Customer.findById(request.params.id)
    .then(customer => {
      if(!customer)
        throw createError(404, 'NOT FOUND ERROR: photo not found');
      return customer;
    });
};

Customer.update = function(request){
  let options = {new: true, runValidators: true};
  let update = {
    name: request.body.name,
    date: request.body.date,
  };
  return Customer.findByIdAndUpdate(request.params.id, update, options)
    .then(customer => {
      return Customer.findById(customer._id);
    });
};

Customer.delete = function(request){
  return Customer.findOneAndRemove({_id: request.params.id});
};

export default Customer;
