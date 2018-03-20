// DEPENDENCIES
import createError from 'http-errors';

// INTERFACE
export default (request, response, next) => 
  next(createError(404, `USER ERROR: ${request.url.path} not a route`));