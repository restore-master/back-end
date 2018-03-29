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
  afterEach(mock.customer.removeAll);

  describe('valid input/output', () => {
    beforeAll(() => {
      mock.customer.createOne()
        .then(customer => this.mockCustomer = customer)
        .catch(console.error);
    });

    beforeAll(() => {
      debug(`this.mockCustomer: ${this.mockCustomer}`);

      return superagent.get(this.base)
        .then(response => this.response = response)
        .then(() => console.log(this.response.body))
        .catch(console.error);
    });

    it('should return a response status of 200', () => {
      expect(this.response.status).toBe(200);
    });
  });

  describe('invalid input/output', () => {
    it('should return an error with bad path', () => {
      return superagent.get(`${this.base}/badpath`)
        .catch(err => {
          expect(err).not.toBeNull();
        });
    });
    it('should return status 404 with bad path', () => {
      return superagent.get(`${this.base}/badpath`)
        .catch(err => {
          expect(err.status).toBe(404);
        });
    });
    it('should return status 404 with bad path, with error message Not Found', () => {
      return superagent.get(`${this.base}/badpath`)
        .catch(err => {
          expect(err.message).toContain('Not Found');
        });
    });
  });
});
