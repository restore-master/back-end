'use strict';

// DEPENDENCIES
import * as db from './database';
import express from 'express';
import middleware from '../middleware';
const errorHandler = require('../middleware/error-handler');

// STATE
const app = express().use(middleware);
app.use('/{0,}', (request, response) => errorHandler(new Error('Path Error: Route not found.'), response));
const state = {
  isOn: false,
  http: null,
};

// INTERFACE
export const start = () => {
  return new Promise((resolve, reject) => {
    if (state.isOn)
      return reject(new Error('USAGE ERROR: the state is on'));
    state.isOn = true;
    db.start()
      .then(() => {
        state.http = app.listen(process.env.PORT, () => {
          console.log('__SERVER_UP__', process.env.PORT);
          console.log('__DB_UP__', process.env.MONGO_URI);
          resolve();
        });
      })
      .catch(reject);
  });
};

export const stop = () => {
  return new Promise((resolve, reject) => {
    if(!state.isOn)
      return reject(new Error('USAGE ERROR: the state is off'));
    return db.stop()
      .then(() => {
        if(!state.http) return new Error('USAGE ERROR: the state is off')
        state.http.close(() => {
          console.log('__SERVER_DOWN__');
          console.log('__DB_DOWN__');
          state.isOn = false;
          state.http = null;
          resolve();
        });
      })
      .catch(reject);
  });
};
