'use strict';

const faker = require('faker');
const mock = require('../../lib/mocks');
const superagent = require('superagent');
const server = require('../../../lib/server');
require('jest');

describe('#customer-put PUT /customer/:_id', function () {
  beforeAll(server.start);
  beforeAll(() => this.base = `:${process.env.PORT}/customer`);
  beforeAll(() => mock.customer.createOne().then(data => this.mockCustomer = data));
  afterAll(server.stop);
  afterAll(mock.customer.removeAll);

  describe('valid input/output', () => {
    let updated = {
      name: 'pajamas',
      date: 'fire trucks',
    };

    it('should update existing record', () => {
      return superagent.put(`${this.base}/${this.mockCustomer.customer._id}`)
        .send(updated)
        .then(response => {
          expect(response.status).toBe(204);
        });
    });
  });

  describe('invalid input/output', () => {
    let updated = {
      name: 'pajamas',
      description: 'fire trucks',
    };

    it('should return 401 with no token', () => {
      return superagent.put(`${this.base}/${this.mockCustomer.customer._id}`)
        .send(updated)
        .catch(error => {
          expect(error.status).toBe(401);
        });
    });
    it('should return 400 on bad request', () => {
      return superagent.put(`${this.base}/${this.mockCustomer.customer._id}`)
        .send('string')
        .catch(error => {
          expect(error.status).toBe(400);
        });
    });
    it('should return 404 with no found ID', () => {
      return superagent.put(`${this.base}/NOID`)
        .send(updated)
        .catch(error => {
          expect(error.status).toBe(404);
        });
    });
  });
});