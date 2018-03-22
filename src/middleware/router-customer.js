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
        .populate('reports')
        .then(response.json)
        .catch(err => errorHandler(err, response));
    }
    return Customer.find()
      .populate('reports')
      .then(customer => customer.map(a => ({_id: a._id, name: a.name, date: a.date, reports: a.reports})))
      .then(response.json)
      .catch(err => errorHandler(err, response));
  })

  .post('/customer', bodyParser, (request, response) => {
    console.log(request);
    return new Customer(request.body).save()
      .then(customer => response.status(201).json(customer))
      .catch(err => errorHandler(err, response));
  })

  .put('/customer/:_id', bodyParser, (request, response) => {
    return Customer.findByIdAndUpdate(request.params._id, request.body, {upsert: true, runValidators: true})
      .then(() => response.sendStatus(204))
      .catch(err => errorHandler(err, response));
  })

  .delete('/customer/:_id', (request, response) => {
    return Customer.findByIdAndRemove(request.params._id)
      .then(() => response.sendStatus(204))
      .catch(err => errorHandler(err, response));
  });
