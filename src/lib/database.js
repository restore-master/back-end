'use strict';

import {log} from './utilities';
const mongoose = require('mongoose');
mongoose.Promise = Promise;

const state = {isOn: false};

export const start = () => {
  log('__DB_UP__', process.env.MONGO_URI);
  if(state.isOn)
    return Promise.reject(new Error('USER ERROR: db is connected'));
  state.isOn = true;
  return mongoose.connect(process.env.MONGO_URI);
};

export const stop = () => {
  log('__DB_DOWN__');
  if(!state.isOn)
    return Promise.reject(new Error('USER ERROR: db is disconnected'));
  state.isOn = false;
  return mongoose.disconnect();
};