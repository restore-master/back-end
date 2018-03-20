'use strict';

import {Router} from 'express';
import parserBody from './parser-body';
import Customer from '../model/customer';


export default new Router()

  .get('/customer', (request, response, next) => {
    Customer.fetch(request)
      .then(response.page)
      .catch(next);
  })

  .get('/customer/:id', (request, response, next) => {
    Customer.fetchOne(request)
      .then(response.json)
      .catch(next);
  })

  .post('/customer', parserBody, (request, response, next) => {
    Customer.create(request)
      .then(response.json)
      .catch(next);
  })

  .put('/customer/:id', parserBody, (request, response, next) => {
    Customer.update(request)
      .then(response.json)
      .catch(next);
  })

  .delete('/customer/:id', (request, response, next) => {
    Customer.delete(request)
      .then(() => response.sendStatus(204))
      .catch(next);
  });
