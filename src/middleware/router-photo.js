import {Router} from 'express';
import {bearerAuth} from './parser-auth.js';
import parserBody from './parser-body.js';
import Photo from '../model/photo.js';

export default new Router()
  .post('/photos', bearerAuth, parserBody, (request, response, next) => {
    Photo.create(request)
      .then(response.json)
      .catch(next);
  })
  .get('/photos', (request, response, next) => {
    Photo.fetch(request)
      .then(response.page)
      .catch(next);
  })
  .get('/photos/me', bearerAuth, (request, response, next) => {
    Photo.fetch(request, {username: request.user.usrename})
      .then(response.page)
      .catch(next);
  })
  .get('/photos/:id', (request, response, next) => {
    Photo.fetchOne(request)
      .then(response.json)
      .catch(next);
  })
  .put('/photos/:id', bearerAuth, parserBody, (request, response, next) => {
    Photo.update(request)
      .then(response.json)
      .catch(next);
  })
  .delete('/photos/:id', bearerAuth, (request, response, next) => {
    Photo.delete(request)
      .then(() => response.sendStatus(204))
      .catch(next);
  });