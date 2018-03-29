import {logError} from '../lib/utilities';

// INTERFACE
module.exports = function(error, response) {
  logError(error);
  console.log(error.message);

  error.message = error.message.toLowerCase();

  if(error.message.includes('validation'))
    return response.status(400).send(`${error.name}: ${error.message}`);

  // if duplacte key respond with 409
  if(error.message.includes('duplicate key'))
    return response.status(409).send(`${error.name}: ${error.message}`);

  if(error.message.includes('objectid failed'))
    return response.status(404).send(`${error.name}: ${error.message}`);

  if(error.message.includes('path error'))
    return response.status(404).send(`${error.name}: ${error.message}`);

  if(error.message.includes('enoent'))
    return response.status(404).send(`${error.name}: ${error.message}`);

  if(error.message.includes('unauthorized'))
    return response.status(401).send(`${error.name}: ${error.message}`);

  if(error.message.includes('cast'))
    return response.status(400).send(`${error.name}: ${error.message}`);

  return response.status(500).send(`${error.name}: ${error.message}`);
};
