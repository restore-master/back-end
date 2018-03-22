'use strict';

const server = require('../../../lib/server');
const superagent = require('superagent');
const mock = require('../../lib/mocks');
const faker = require('faker');
const report = `${__dirname}/../../lib/dino.jpg`;
// const debug = require('debug')('http:report-post.test');
require('jest');

describe('#report DELETE /api/v1/customer', function () {
  beforeAll(server.start);
  beforeAll(() => this.base = `:${process.env.PORT}/report`);
  beforeEach(() => mock.customer.createOne().then(data => this.mockCustomer = data));
  afterAll(server.stop);
  afterAll(mock.customer.removeAll);

  describe('valid input/output', () => {
    beforeEach(() => {
      return superagent.post(`${this.base}/${this.mockCustomer.customer._id}`)
        .send({source: 'anything', customer: this.mockCustomer.customer._id})
        .then(response => this.reportId = response.body._id);
    });

    it('should delete a created report', () => {
      return superagent.delete(`${this.base}/${this.reportId}`)
        .then(response => {
          expect(response.status).toBe(204);
        });
    });
    it('should update the customer reports to remove the deleted report', () => {
      return superagent.delete(`${this.base}/${this.reportId}`)
        .send({source: 'something', customer: this.mockCustomer.customer._id})
        .then(response => this.reportId = response.body._id)
        .then(() => {
          return superagent.get(`:${process.env.PORT}/customer/${this.mockCustomer.customer._id}`)
            .then(response => expect(response.body.reports).not.toContain(this.reportId));
        });
    });

  });

  describe('invalid input/output', () => {
    it('should return status 404 delete to bad route', () => {
      return superagent.delete(this.base)
        .catch(error => {
          expect(error.status).toBe(404);
        });
    });
    it('should return status 404 for delete with no', () => {
      return superagent.delete(`${this.base}/NOID/NOID`)
        .catch(error => {
          expect(error.status).toBe(404);
        });
    });
  });
});