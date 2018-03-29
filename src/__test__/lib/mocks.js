'use strict';

const faker = require('faker');
const Customer = require('../../model/customer');
const debug = require('debug')('http:mock');

const mock = module.exports = {};

mock.customer = {};

mock.customer.createOne = () => {
  let result = {};

  debug('about to create a new mock.customer');
  return new Customer({
    name: faker.name.firstName(),
    date: faker.date.recent(),
  }).save()
    .then(customer => {
      result.customer = customer;
      // return result;
    })
    .then(() => {
      debug(`mock createOne result.customer: ${result.customer}`);
      return result;
    });
};

mock.customer.removeAll = () => Promise.all([Customer.remove()]);
