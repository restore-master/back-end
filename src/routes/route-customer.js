'use strict';

import Customer from '../model/customer';
import bodyParser from 'body-parser';
import debug from 'debug';
const errorHandler = require('../middleware/error-handler');


module.exports = function (router) {
  router.route('/customer/:_id?')
    // .get((req, res) => {
    //   debug(`${req.method}: ${req.url}`);
    //   if (req.params._id) {
    //     Customer.findById(req.params._id)
    //       .then(customer => res.status(200).json(customer))
    //       .catch(err => errorHandler(err, res));
    //   }

    //   debug(`${Customer.find('/customer')}`);
    //   Customer.find()
    //     .then(customers => customers.map(a => ({ _id: a._id, name: a.name }))) //will map, so each becomes just a thing of IDs
    //     .then(customer => res.status(200).json(customer))
    //     .catch(err => errorHandler(err, res));
    // })

    .post(bodyParser, (req, res) => {
      debug(`${req.method}: ${req.url}`);
      new Customer(req.body).save()
        .then(customer => res.status(201).json(customer))
        .catch(err => errorHandler(err, res));
    })

    // .put(bodyParser, (req, res) => {
    //   debug(`${req.method}: ${req.url}`);
    //   debug(`${req.body}`);
    //   Customer.findByIdAndUpdate(req.params._id, req.body, { upsert: true, runValidators: true }) 
    //     .then(() => res.sendStatus(204))
    //     .catch(err => errorHandler(err, res));
    // })

    // .delete((req, res) => {
    //   debug(`${req.method}: ${req.url}`);
    //   Customer.findByIdAndRemove(req.params._id)
    //     .then(() => res.sendStatus(204))
    //     .catch(err => errorHandler(err, res));
    // });
};