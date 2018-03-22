# Contents
* [Overview](#overview)
* [Getting Started](#getting-started)
* [Model](#model)
  - [Customer](#roles)
  - [Report](#user)
* [Lib](#lib) 
  - [Basic Auth Middleware](#basic-auth-middleware)
  - [Error Handler](#error-handler)
* [Route](#route)
  - [Route Customer](#route-auth)
  - [Route Report](#route-profile)
* [Data Flow](#data-flow)
* [Resources](#resources)

**Authors**
* [Joel Clair](https://github.com/ClairJ) | github.com/ClairJ
* [Koko Kassa](https://github.com/kowserk7) | github.com/kowserk7
* [Mitchell Massie](https://github.com/futurebound) | github.com/futurebound

**Version**: 1.0.0


# Overview
# Getting Started
For local development: 
To get this application up and running on your local machine, fork and/or clone this repository using the `git clone <git repository link>` command in your terminal. Next, run the `npm install` command, which will install all the necessary dependencies in the accompanying package.json file. If wanting to view tests, enter `npm install -D` into the command line to ensure dev-dependencies have installed. 

After those packages have installed, you can run `npm test` to explore the included tests to ensure everything is functioning as expected. You can open up the cloned repository in your favorite editor to explore/modify the code, see how the tests are structured, and create tests of your own if desired. 

Downloading and installing `MongoDB` (see links below) and entering the command `npm run start-db` will initiate the database required for complete functionality in storing records of game sessions, registering users, and gathering statistics for specific user profiles.

If you are cloning and running the application on your local machine, entering `npm start` in your terminal while in the root directory of the application will return a message like this:

```__SERVER_UP__ 3000
__DB_UP__ mongodb://localhost/report
```
Once server is up you can take a look at the front-end README to finish local development.
[Front-End](https://github.com/restore-master/front-end/blob/master/README.md)

# Model
## Customer
## Report
# Library
# Route
## Route Customer
## Route Report

