'use strict';

const server = require('../../../lib/server');
const superagent = require('superagent');
const mock = require('../../lib/mocks');
const faker = require('faker');
const photo = `${__dirname}/../../lib/dino.jpg`;
require('jest');

describe('#report POST /report/{customerId}', function () {
  beforeAll(server.start);
  beforeAll(() => this.base = `:${process.env.PORT}/report`);
  beforeEach(() => mock.customer.createOne().then(data => this.mockCustomer = data));
  afterAll(server.stop);
  afterAll(mock.customer.removeAll);

  describe('valid input/output', () => {
    it('should return status 201 for successful post', () => {
      return superagent.post(`${this.base}/${this.mockCustomer.customer._id}`)
        .send({source: 'anything', customer: this.mockCustomer.customer._id})
        .then(response => {
          expect(response.status).toBe(201);
        });
    });
  });

  describe('invalid input/output', () => {
    it('should return status 404 for post to bad route', () => {
      return superagent.post(this.base)
        .catch(error => {
          expect(error.status).toBe(404);
        });
    });
    it('should return status 401 for get one with no token', () => {
      return superagent.post(`${this.base}/${this.mockCustomer.customer._id}`)
        .catch(error => {
          expect(error.status).toBe(400);
        });
    });
    it('should return status 404 for get one with ID not found', () => {
      return superagent.post(`${this.base}/NOID/NOID`)
        .catch(error => {
          expect(error.status).toBe(404);
        });
    });
  });
});
