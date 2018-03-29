'use strict';

// DEPENDENCIES
import cors from 'cors';
import morgan from 'morgan';
import {Router} from 'express';
import fourOhFour from './four-oh-four.js';
import routerCustomer from './router-customer.js';
import routerReport from './router-report.js';
import errorHandler from './error-handler.js';
import bindResponseMethods from './bind-response-methods.js';

// INTERFACE
export default new Router()
  .use([
  // GLOBAL MIDDLEWARE
    cors(),
    morgan('dev'),
    bindResponseMethods,
    // ROUTERS
    routerCustomer,
    routerReport,
    // ERROR HANDLERS
    fourOhFour,
    errorHandler,
  ]);
