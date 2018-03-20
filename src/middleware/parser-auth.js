import * as jwt from 'jsonwebtoken';
import User from '../model/user.js';
import createError from 'http-errors';
import {promisify, partial} from '../lib/utilities';

export const basicAuth = (request, response, next) => {
  let {authorization} = request.headers;
  if(!authorization)
    return next(createError(400, 'AUTH ERROR: no authorization header'));

  let encoded = authorization.split('Basic ')[1];
  if(!encoded)
    return next(createError(400, 'AUTH ERROR: not basic auth'));

  let decoded = new Buffer(encoded, 'base64').toString();
  let [username, password] = decoded.split(':');
  if(!username || !password)
    return next(createError(401, 'AUTH ERROR: username or password missing'));

  User.findOne({username})
    .then(user => {
      if(!user)
        throw createError(401, 'AUTH ERROR: user not found');
      return user.passwordCompare(password);
    })
    .then(user => {
      request.user = user;
      next();
    })
    .catch(next);
};

export const bearerAuth = (request, response, next) => {
  let {authorization} = request.headers;
  if(!authorization)
    return next(createError(400, 'AUTH ERROR: no authorization header'));

  let token = authorization.split('Bearer ')[1];
  if(!token)
    return next(createError(400, 'AUTH ERROR: not bearer auth'));

  promisify(jwt.verify)(token, process.env.SECRET)
    .then(({randomHash}) => User.findOne({randomHash}))
    .then((user) => {
      if(!user)
        throw createError(401, 'AUTH ERROR: user not found');
      request.user = user;
      next();
    })
    .catch(partial(createError, 401));
};


