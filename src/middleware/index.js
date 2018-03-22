'use strict';

// DEPENDENCIES
import cors from 'cors';
import morgan from 'morgan';
import {Router} from 'express';
// import cookieParser from 'cookie-parser';
// import routerAuth from './router-auth.js';
// import fourOhFour from './four-oh-four.js';
// import routerPhoto from './router-photo.js';
import routerCustomer from './router-customer.js';
import routerReport from './router-report.js';
import errorHandler from './error-handler.js';
import bindResponseMethods from './bind-response-methods.js';

// INTERFACE
export default new Router()
  .use([
  // GLOBAL MIDDLEWARE
<<<<<<< HEAD
    cors({
      origins: process.env.CORS_ORIGINS,
      // credentials: true,
    }),
=======
    cors(),
>>>>>>> a1c45e5ae22e9125c2a6095affbf9d0d250c9c44
    morgan('dev'),
    bindResponseMethods,
    // ROUTERS
    routerCustomer,
    routerReport,
    // ERROR HANDLERS
    // fourOhFour,
    errorHandler,
  ]);
