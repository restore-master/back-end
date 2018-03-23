# Water Damage

# Contents
* [Overview](#overview)
* [Getting Started](#getting-started)
* [Model](#model)
  - [Customer](#customer)
  - [Report](#report)
* [Lib](#lib) 
  - [Database](#basic-auth-middleware)
  - [Server](#server)
  - [Utilities](#utilities)
* [Middleware](#route)
  - [Error Handler](#error-handler)
  - [Route Customer](#route-auth)
  - [Route Report](#route-profile)
  - [Bind-Response-Methods](#bind-response-methods)
  - [Four-Oh-Four](#four-oh-four)
  - [Index](#index)
* [Resources](#resources)

**Authors**
* [Joel Clair](https://github.com/ClairJ) | github.com/ClairJ
* [Koko Kassa](https://github.com/kowserk7) | github.com/kowserk7
* [Mitchell Massie](https://github.com/futurebound) | github.com/futurebound

**Version**: 1.0.0


# Overview
This application cuts down on paper work as well as shows a representation of user data that gives the company feedback on how to better serve their customers. It incorporates `MongoDB` to save the customer and customer reports from the front-end form. There is an  `express` HTTP server running  in this application. The HTTP server handles CRUD methods from user form parsed from the front-end of the application.


# Getting Started
For local development: 
To get this application up and running on your local machine, fork and/or clone this repository using the `git clone <git repository link>` command in your terminal. Next, run the `npm install` command, which will install all the necessary dependencies in the accompanying package.json file. If wanting to view tests, enter `npm install -D` into the command line to ensure dev-dependencies have installed. 

After those packages have installed, you can run `npm test` to explore the included tests to ensure everything is functioning as expected. You can open up the cloned repository in your favorite editor to explore/modify the code, see how the tests are structured, and create tests of your own if desired. 

Downloading and installing `MongoDB` (see links below) and entering the command `npm run start-db` will initiate the database required for complete functionality in storing records of game sessions, registering users, and gathering statistics for specific user profiles.

If you are cloning and running the application on your local machine, entering `npm start` in your terminal while in the root directory of the application will return a message like this:

```
__SERVER_UP__ 3000
__DB_UP__ mongodb://localhost/report

```
Once server is up you can take a look at the front-end README to finish local development.
[Front-End](https://github.com/restore-master/front-end/blob/master/README.md)


# Model

## Customer
The **`customer`**  module exports a single `Mongoose` schema. It has `name`, `data` and `reports` properties. The first two are required and values are expected to be in the form of strings. The `reports` property is an array of reports referenced to the customer id.

## Report
The **`report`** module exports a single `Mongoose` schema as well. It has `source`, `upperRooms`, `lowerRooms`, `ageOfHome`, `standingWater`, `crawlOrSlab`, `contents`, `accessPermissions`, `specialNeeds`, `respiratoryOrAllergies`, `growth`, `monitors`, `ceilingHeights`, `ceilingDescription`, `powerHeat`, `flooringType`, `typeOfHome`, `crawlOrAtticAccessLocation`, `lossIsMailingAddress`, `customerEmail`, `adjuster`, `customerAgent`, `customer`, `petsOrChildren`, `basement`, `setLockBox`, `odor`, and `hearAboutUs` properties. The first 12 are expected to be strings, and the first  18 are required.
* **`customer`** A `Mongoose` id referenced from the related `customer` schema.


#Lib

## Database
The **`database`** module utilizes  `mongoose`. It requires in the `log` from the utilities module. It exports `start()` and `stop()` methods that connect and disconnect from `mongoose` and the `MongoDB` respectively. 

## Server 
The **`server`** module utilizes  `express`. It requires in the `errorHandler` from the middleware, and `database` modules. It exports `start()` and `stop()` methods to the server. These methods also connect and disconnect from `mongoose` and the `MongoDB` respectively. 

## Utilities
The **`utilities`** module exports 5 functions. The `log` function debugs and console logs. the `logError` function debugs and console logs errors. The `map` function maps through an array. The `filter` function filters through an array. Finally the `daysToMilliseconds` converts the amount of time in the given days to millisecond.


# Middleware

## Error-Handler
The **`error-handler`** module exports a single anonymous function expecting `err` and `res` arguments. It forces the error message it receives to lower case, and determines whether the message includes certain expected words or phrases through the use of switch cases, and serves the appropriate status code as well as the error name and message.

## Route Customer
The **`route-customer`** utilizes `bodyParser`, `Router` and requires in the `customer` schema, as well as the `error-handler` module. It module exports a single anonymous function as a new Router method. The exported file has CRUD methods mounted on the router for the `/customer` endpoint, `POST`ing and `GET`ing respectively. 

## Route Report
The **`route-report`** utilizes `bodyParser`, `Router` and requires in the `report` schema, as well as the `error-handler` module. It module exports a single anonymous function as a new Router method. The exported file has CRUD methods mounted on the router for the `/report` endpoint, `POST`ing and `GET`ing respectively. 

## Index
The **`index`** utilizes `cors`, `morgan`, `express` and requires in `routerCustomer`, `routerReport`, `fourOhFour`,`errorHandler` and `bindResponseMethods` modules. It exports a single new `Router` the uses all the middleware. 

## Bind Response Methods
The **`bind-response-method`** exports a single that binds all the response methods. It takes in three arguments; request, response, and next.
`response.send`
`response.json`
`response.status`
`response.sendFile`
`response.sendStatus`
`response.page`


#Resources
* [Babel and Tools](https://www.npmjs.com/package/babel) ~ npmjs.com/package/babel
* [Body Parser](https://www.npmjs.com/package/body-parser) ~ npmjs.com/package/body-parser
* [Cors](https://www.npmjs.com/package/cors) ~ npmjs.com/package/cors
* [Debug](https://www.npmjs.com/package/debug) ~ nodejs.org/api/debug
* [Dotenv](https://www.npmjs.com/package/dotenv) ~ npmjs.com/package/dotenv
* [ESLint](https://www.npmjs.com/package/eslint) ~ npmjs.com/package/eslint
* [ESLint React](https://www.npmjs.com/package/eslint-plugin-react) ~ npmjs.com/package/eslint-plugin-react
* [Express](https://www.npmjs.com/package/express) ~ npmjs.com/package/express
* [Faker](https://www.npmjs.com/package/faker) ~ npmjs.com/package/faker
* [Jest](https://facebook.github.io/jest/) ~ facebook.github.io/jest/
* [MongoDB](https://docs.mongodb.com/) ~ docs.mongodb.com
* [Mongoose](http://mongoosejs.com/docs/guide.html) ~ mongoosejs.com/docs/guide.html
* [Request](https://www.npmjs.com/package/request) ~ nodejs.org/api/net.html
* [Superagent](http://visionmedia.github.io/superagent/) ~ npmjs.com/package/request
* [Nodemon](https://www.npmjs.com/package/nodemon) ~ npmjs.com/package/nodemon
* [Webpack](https://www.npmjs.com/package/webpack) ~ npmjs.com/package/webpack