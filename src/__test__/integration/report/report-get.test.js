'use strict';

const server = require('../../../lib/server');
const superagent = require('superagent');
const mock = require('../../lib/mocks');
const faker = require('faker');
const debug = require('debug')('http:report-get.test');
require('jest');

describe('#report GET /api/v1/report', function () {
  beforeAll(server.start);
  beforeAll(() => this.base = `:${process.env.PORT}/report`);
  // beforeAll(() => mock.customer.createOne().then(data => this.mockCustomer = data));
  afterAll(server.stop);
  afterAll(mock.customer.removeAll);

  beforeAll(() => {
    return mock.customer.createOne()
      .then(mock => {
        this.mockCustomer = mock;
        return superagent.post(`${this.base}/${this.mockCustomer.customer._id}`)
          .send({source: faker.name.firstName(), customer: this.mockCustomer.customer._id})
          // .field('source', faker.name.firstName())
          // .field('customer', `${this.mockCustomer.customer._id}`)
      })
      .then(response => {
        this.targetId = response.body._id;
        console.log(response.body);
      });
  });

  describe('valid input/output', () => {
    it('should return status 200 for get one', () => {
      return superagent.get(`${this.base}/${this.targetId}`)
        .then(response => {
          expect(response.status).toBe(200);
        });
    });
    it('should return status 200 for get all', () => {
      return superagent.get(this.base)
        .then(response => {
          expect(response.status).toBe(200);
        });
    });
  });

  describe('invalid input/output', () => {
    it('should return status 401 for get all with no token', () => {
      return superagent.get(this.base)
        .catch(error => {
          expect(error.status).toBe(401);
        });
    });
    it('should return status 404 for get one with ID not found', () => {
      return superagent.get(`${this.base}/NOID`)
        .catch(error => {
          expect(error.status).toBe(404);
        });
    });
  });
});