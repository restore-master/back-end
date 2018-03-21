import {logError} from '../lib/utilities';

// INTERFACE
export default (error, response) => {
  console.log(error);
  logError(error);
  if(error.status)
    return response.sendStatus(error.status);

  error.message = error.message.toLowerCase();

  if(error.message.includes('validation failed'))
    return response.sendStatus(400);

  // if duplacte key respond with 409
  if(error.message.includes('duplicate key'))
    return response.sendStatus(409);

  if(error.message.includes('not a route'))
    return response.sendStatus(404);

  if(error.message.includes('unauthorized'))
    return response.sendStatus(401);

  response.sendStatus(500);
};
