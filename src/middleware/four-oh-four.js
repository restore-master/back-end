import createError from 'http-errors';

export default (request, response, next) => {
  console.log(request.url.path);
  next(createError(404, `USER ERROR: ${request.url.path} not a route`));
};
