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

  return response.status(500).send(`${error.name}: ${error.message}`);
};

// 'use strict';

//going to require this into routes

// module.exports = function (error, res) { //error happened elsewhere, parse out error, handle response, and kick it back
//   let msg = error.message.toLowerCase(); //force any error message to lowercase so can validate that string
//   logError(error);
//   console.log(error.message);

//   //rather than parsing out msg which we define elsewhere, could just take status code and attach it as new property to error objct as opposed to having to create new swtich statement cases for each error type below
//   switch (true) { //setting to true so it will run every time
//     //generates response up one layer in REQ/RES cycle
//     case msg.includes('validation error'): return res.status(400).send(`${error.name}: ${error.message}`);
//     case msg.includes('path error'): return res.status(404).send(`${error.name}: ${error.message}`);
//     case msg.includes('enoent'): return res.status(404).send(`${error.name}: ${error.message}`);
//     case msg.includes('cast'): return res.status(400).send(`${error.name}: ${error.message}`);
//     case msg.includes('unauthorized'): return res.status(401).send(`${error.name}: ${error.message}`)
//     //says 'that ID DNE, can't return you that thing'
//     case msg.includes('objectid failed'): return res.status(404).send(`${error.name}: ${error.message}`);
//     //says we already have the unique value in a record, means only one record in the entire database can have the value of that key IN THE SCHEMA, WILL BE SET AS UNIQUE JUST LIKE THE REQUIRED
//     case msg.includes('duplicate key'): return res.status(409).send(`${error.name}: ${error.message}`);

//     default: return res.status(500).send(`${error.name}: ${error.message}`); //means that something happened bad on server other than not found or bad request, hardware/software issue could not control such as a server/website being offline that was being used outside of the application
//   }
// };