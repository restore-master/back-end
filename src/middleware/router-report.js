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

  .get('/report/:_id?', (request, response) => {

    if(request.params._id) {
      return Report.findById(request.params._id)
        .populate('customer')
        .then(response.json)
        .catch(err => errorHandler(err, response));
    }
    Report.find()
      .then(report => report.map(report => report._id))
      .then(response.json)
      .catch(err => errorHandler(err, response));
  })

  .put('/report/:_id', bodyParser, (request, response) => {
    Report.findByIdAndUpdate(request.params._id, request.body, {upsert: true, runValidators: true})
      .then(() => response.sendStatus(204))
      .catch(err => errorHandler(err, response));

  })
  .post('/report/:_id', bodyParser, (request, response) => {
    new Report(request.body).save()
      .then(report => response.status(201).json(report))
      .catch(err => errorHandler(err, response));
  })

  .delete('/report/:_id', (request, response) => {
    return Report.findById(request.params._id)
      .then(report => report.remove())
      .then(() => response.sendStatus(204))
      .catch(err => errorHandler(err, response));
  });
