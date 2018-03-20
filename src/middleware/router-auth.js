'use strict';

import {Router} from 'express';
import User from '../model/user.js';
import parserBody from './parser-body.js';
import {basicAuth} from './parser-auth.js';
import {log, daysToMilliseconds} from '../lib/utilities';

export default new Router()
  .post('/signup', parserBody, (request, response, next) => {
    log('__ROUTE__ POST /signup');

    new User.create(request.body)
      .then(user => user.tokenCreate())
      .then(token => {
        response.cookie('X-Sluggram-Token', token, {maxAge: 900000});
        response.cookie('snark-in-the-dark', 'hahahah', {maxAge: 900000});

        response.send(token);
      })
      .catch(next);
  })
  .get('/usernames/:username', (request, response, next) => {
    User.findOne({username: username})
      .then(user => {
        if(!user)
          return response.sendStatus(409);
        return response.sendStatus(200);
      })
      .catch(next);
  })
  .get('/login', basicAuth, (request, response, next) => {
    log('__ROUTE__ GET /login');
    request.user.tokenCreate()
      .then((token) => {
        let cookieOptions = {maxAge: daysToMilliseconds(7)};
        response.cookie('X-Sluggram-Token', token, cookieOptions);
        response.send(token);
      })
      .catch(next);
  });