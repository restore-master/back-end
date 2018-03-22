'use strict';

const mock = require('../../lib/mocks');
const superagent = require('superagent');
const server = require('../../../lib/server');
require('jest');

describe('#customer POST api/v1/customer', function () {
  beforeAll(server.start);
  beforeAll(() => this.base = `:${process.env.PORT}/customer`);
  beforeAll(() => mock.customer.createOne().then(data => this.mockCustomer = data));
  afterAll(server.stop);
  afterAll(mock.customer.removeAll);

  describe('Valid input/output', () => {
    it('should have a status 204 with valid request', () => {
      return superagent.delete(`${this.base}/${this.mockCustomer.customer._id}`)
        .then(response => {
          expect(response.status).toBe(204);
        });
    });
  });

  describe('Invalid input/output', () => {
    it('should return a 404 on valid request if can`t find ID', () => {
      return superagent.delete(`${this.base}/CANTFINDID`)
        .catch(error => {
          expect(error.status).toBe(404);
        });
    });
  });
});