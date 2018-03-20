'use strict';

import {Router} from 'express';
import parserBody from './parser-body';
import Report from '../model/report';

export default new Router()

  .post('/customer/:id?/report', parserBody, (request, response, next) => {
    Report.create(request)
      .then(response.json)
      .catch(next);
  })

  .get('/customer/report', (request, response, next) => {
    Report.fetch(request)
      .then(response.page)
      .catch(next);
  })
