'use strict';

import {Router} from 'express';
// var router = express.Router();
// import parserBody from './parser-body';
import Customer from '../model/customer';
import errorHandler from './error-handler';
const bodyParser = require('body-parser').json();

export default new Router()

  .get('/customer/:_id?', bodyParser, (request, response) => {
    if(request.params._id) {
      return Customer.findById(request.params._id)
        .then(response.json)
        .catch(error => errorHandler(error, response));
    }
    return Customer.find()
      .then(customer => customer.map(a => ({_id: a._id, name: a.name, date: a.date, reports: a.reports})))
      .then(response.json)
      .catch(error => errorHandler(error, response));
  })

  .post('/customer', bodyParser, (request, response) => {
    return new Customer(request.body).save()
      .then(customer => response.status(201).json(customer))
      .catch(error => errorHandler(error, response));
  })

  .put('/customer/:_id', bodyParser, (request, response) => {
    return Customer.findByIdAndUpdate(request.params._id, request.body, {upsert: true, runValidators: true})
      .then(() => response.sendStatus(204))
      .catch(error => errorHandler(error, response));
  })

  .delete('/customer/:_id', (request, response) => {
    return Customer.findByIdAndRemove(request.params._id)
      .then(() => response.sendStatus(204))
      .catch(error => errorHandler(error, response));
  });
