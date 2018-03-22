'use strict';

const faker = require('faker');
const Customer = require('../../model/customer');
// const Report = require('../../model/report');
const debug = require('debug')('http:mock');

const mock = module.exports = {};

mock.customer = {};
// mock.report = {};

mock.customer.createOne = () => {
  let result = {};
  result.password = faker.name.lastName();

  debug('about to create a new mock.customer');
  return new Customer({
    customerName: faker.name.firstName(),
    date: faker.date.recent(),
  })
    .then(customer => result.customer = customer)
    .then(() => {
      debug(`mock createOne result: ${result}`);
      debug(`mock createOne result.customer: ${result.customer}`);
      return result;
    });
};

// mock.report.createOne = () => {
//   let resultMock = {}; //variable to hold all results of the mocks

//   //create mock for customer/user, then 
//   //can either hardcode customer/user, or use mocks
//   return mock.customer.createOne()
//     .then(createdCustomerMock => resultMock = createdCustomerMock) //implicit return
//     //could also resultMock.user = createdCustomer
//     .then(createdCustomerMock => {
//       return new Report({
//         name: faker.internet.domainWord(),
//         description: faker.lorem.words(15),
//         userId: createdCustomerMock.customer._id,
//       }); //vinicio - something being saved into MongoDB CAN .SAVE() HERE INSTEAD 
//       //IF SHIT BREAKING, REMOVE THAT GODDAMN .SAVE()
//     })
//     .then(report => {
//       resultMock.report = report;
//       console.log(resultMock);
//       debug('reportMock created, about to return');
//       return resultMock;
//     });
// };

// mock.customer.removeAll = () => Promise.all([Customer.remove()]);
// mock.report.removeAll = () => Promise.all([Report.remove()]);
