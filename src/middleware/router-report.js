'use strict';

import {Router} from 'express';
const bodyParser = require('body-parser').json();
import Report from '../model/report';
import Customer from '../model/customer';
import errorHandler from './error-handler';

// module.exports = function(router) {
//   router.route('/report/:id?')
//     .get((request, response) => {
//
//       if(request.params._id) {
//         return Report.findById(request.params._id)
//           .populate('customer')
//           .then(report => response.sendStatus(200).json(report))
//           .catch(err => errorHandler(err, response));
//       }
//       Report.find()
//         .then(report => report.map(report => report._id))
//         .then(report => response.sendStatus(200).json(report))
//         .catch(err => errorHandler(err, response));
//     })
//     .post(parserBody, (request, response) => {
//       new Report(request.body).save()
//         .then(bike => response.status(201).json(bike))
//         .catch(err => errorHandler(err, response));
//     })
//     .put(parserBody, (request, response) => {
//       Report.findOneAndUpdate(request.params._id, request.body, {upsert: true, runValidators: true})
//         .then(() => response.sendStatus(204))
//         .catch(err => errorHandler(err, response));
//
//     })
//     .delete((request, response) => {
//       Report.findById(request.params._id)
//         .then(report => report.remove())
//         .then(() => response.sendStatus(204))
//         .catch(err => errorHandler(err, response));
//
//     });
// };

export default new Router()
//
//   .put('/customer/:id/report', parserBody, (request, response, next) => {
//     Report.create(request)
//       .then(response.json)
//       .catch(next);
//   })
  .post('/report/:_id', bodyParser, (request, response) => {
    console.log('HELLO+++++++++++!+!+!+!+!+', Customer.findById(request.url._id))
    new Report(request.body).save()
    //find customer by id
    //find report id
    //update customer with report id
      .then(report => response.status(201).json(report))
      .catch(err => errorHandler(err, response));
  })
//   .get('/customer', (request, response, next) => {
//     Report.fetch(request)
//       .then(response.page)
//       .catch(next);
//   });
