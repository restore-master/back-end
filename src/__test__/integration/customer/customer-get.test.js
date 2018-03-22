'use strict';

const server = require('../../../lib/server');
const superagent = require('superagent');
const mock = require('../../lib/mocks');
const debug = require('debug')('http:customer-get.test');
require('jest');

describe('#customer-get GET /customer', function () {
  beforeAll(() => this.base = `:${process.env.PORT}/customer`);
  beforeAll(server.start);
  afterAll(server.stop);
  // afterEach(mock.customer.removeAll);

  describe('valid input/output', () => {
    beforeAll(() => {
      mock.customer.createOne()
        .then(customer => this.mockCustomer = customer)
        .catch(console.error);
    });

    beforeAll(() => {
      debug(`this.mockCustomer: ${this.mockCustomer}`);
      // let encoded = Buffer.from(`${this.mockCustomer.customer.customerName}:${this.mockCustomer.password}`).toString('base64');

      return superagent.get(this.base)
        .then(response => this.response = response)
        .then(() => console.log(this.response.body))
        .catch(console.error);
    });

    it('should return a response status of 200', () => {
      expect(this.response.status).toBe(200);
    });
    // it('should return a JSON web token as response body', () => {
    //   console.log(this.response.body);
    //   let tokenParts = this.response.body.split('.');
    //   let signature = JSON.parse(Buffer.from(tokenParts[0], 'base64').toString());
    //   let token = JSON.parse(Buffer.from(tokenParts[1], 'base64').toString());

    //   expect(signature.typ).toEqual('JWT');
    //   console.log(signature.typ);
    //   expect(token).not.toBeNull();
    //   expect(token).toHaveProperty('iat');
    //   expect(token).toHaveProperty('token');
    //   console.log(token);
    // });
  });

  // describe('invalid input/output', () => {
  //   it('should return 401 not customer with invalid username', () => {
  //     let encoded = Buffer.from(`${'BADUSERAYYY'}:${this.mockCustomer.password}`).toString('base64');

  //     return superagent.get(this.base)
  //       .set('Customerorization', `Basic ${encoded}`)
  //       .catch(err => expect(err.status).toBe(401));
  //   });
  //   it('should return 401 not customer with invalid password', () => {
  //     let encoded = Buffer.from(`${this.mockCustomer.customer.username}:${'BADPASSWAYAYAY'}`).toString('base64');

  //     return superagent.get(this.base)
  //       .set('Customerorization', `Basic ${encoded}`)
  //       .catch(err => expect(err.status).toBe(401));
  //   });
  //   it('should return 401 not customer with no username', () => {
  //     let encoded = Buffer.from(`:${this.mockCustomer.password}`).toString('base64');

  //     return superagent.get(this.base)
  //       .catch(err => expect(err.status).toBe(401));
  //   });
  //   it('should return 401 not customer with no password', () => {
  //     let encoded = Buffer.from(`${this.mockCustomer.customer.username}:`).toString('base64');

  //     return superagent.get(this.base)
  //       .set('Customerorization', `Basic ${encoded}`)
  //       .catch(err => expect(err.status).toBe(401));
  //   });
  //   it('should return 401 not customer with malformed customer headers', () => {
  //     return superagent.get(this.base)
  //       .set('Customerorization', `Basic`)
  //       .catch(err => expect(err.status).toBe(401));
  //   });
  //   it('should return 401 not customer with no password', () => {
  //     return superagent.get(this.base)
  //       .catch(err => expect(err.status).toBe(401));
  //   });
  //   it('should return an error with bad path', () => {
  //     return superagent.post(`${this.base}/badpath`)
  //       .send()
  //       .catch(err => {
  //         expect(err).not.toBeNull();
  //       });
  //   });
  //   it('should return status 404 with bad path', () => {
  //     return superagent.post(`${this.base}/badpath`)
  //       .send()
  //       .catch(err => {
  //         expect(err.status).toBe(404);
  //       });
  //   });
  //   it('should return status 404 with bad path, with error message Not Found', () => {
  //     return superagent.post(`${this.base}/badpath`)
  //       .send()
  //       .catch(err => {
  //         expect(err.message).toContain('Not Found');
  //       });
  //   });
  // });
});
