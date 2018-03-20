'use strict';

// DEPENDENCIES
import * as db from './database';
import express from 'express';
import middleware from '../middleware';

// STATE
const app = express().use(middleware);
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
        state.http.close(() => {
          console.log('__SERVER_DOWN__');
          state.isOn = false;
          state.http = null;
          resolve();
        });
      })
      .catch(reject);
  });
};
