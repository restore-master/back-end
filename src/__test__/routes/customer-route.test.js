'use strict';

import { start, stop } from '../../lib/server';
import errorHandler from '../../middleware/error-handler';
import Router from '../../middleware/router-customer';
require('jest');

describe('#GET /api/v1/customer', function () {
  beforeAll(start());
  afterAll(stop());

  describe('Valid request/response', () => {
    beforeAll(() => {
      this.testStudent = { customerName: 'alice', date: 2 };
      Router.post('/customer')
        .send(this.testStudent)
        .then(res => this.response = res)
        .catch(err => errorHandler(err));
    });

    afterAll(() => {
      Router.delete(`/customer/${this.response.body._id}`)
        .catch(err => errorHandler(err));
    });

    it('should have successfully posted an customer responding with status 201', () => {
      expect(this.response.status).toBe(201);
    });

    describe('GET one record', () => {
      it('should GET an customer with specific ID, respond with status 200', () => {
        Router.get(`/customer/${this.response.body._id}`)
          .then(res => this.response = res)
          .then(() => {
            expect(this.response.status).toBe(200);
          });
      });
      it('should GET an customer with specific ID, have name, legs, and _id properties', () => {
        Router.get(`/customer/${this.response.body._id}`)
          .then(res => this.response = res)
          .then(() => {
            expect(this.response.body).toHaveProperty('customerName');
            expect(this.response.body).toHaveProperty('date');
            expect(this.response.body).toHaveProperty('reports');
            expect(this.response.body).toHaveProperty('id');
          });
      });
      it('should GET an customer with specific ID, have given name and legs values', () => {
        Router.get(`/customer/${this.response.body._id}`)
          .then(res => this.response = res)
          .then(() => {
            expect(this.response.body._id).toMatch(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);
            expect(this.response.body.customerName).toEqual('alice');
            expect(this.response.body.date).toEqual(2);
          });
      });
    });

    describe('GET all records', () => {
      it('should GET an customer with specific ID, respond with status 200', () => {
        Router.get(`/customer/`)
          .then(res => this.response = res)
          .then(() => {
            expect(this.response.status).toBe(200);
          });
      });
      it('should GET all ids, and return them in an array', () => {
        Router.get(`/customer/`)
          .then(res => this.response = res)
          .then(() => { 
            this.response.body.map(i => {
              expect(i).toMatch(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);
            });
          });
      });
    });
  });

  describe('Invalid request/response', () => {
    beforeAll(() => {
      this.testStudent = { customerName: 'alice', date: 2 }; //may lift this up into outer describe block so available, more readable even tho testStudent availabe in lower describe block for invalid req/res
      Router.post(':3000/api/v1/customer')
        .send(this.testStudent)
        .then(res => this.response = res)
        .catch(err => errorHandler(err));
    });

    afterAll(() => {
      Router.delete(`:3000/api/v1/customer/${this.response.body._id}`)
        .catch(err => errorHandler(err));
    });

    it('should have successfully posted an customer responding with status 201', () => {
      expect(this.response.status).toBe(201);
    });

    describe('GET one record', () => {
      it('should fail to GET an customer with malformed ID, respond with status 404', () => {
        Router.get(`:3000/api/v1/customer/274`)
          .then(res => this.response = res)
          .catch(err => {
            expect(err.status).toBe(404);
          });
      });
      it('should fail to GET an customer with malformed ID, respond with error message Not Found', () => {
        Router.get(`:3000/api/v1/customer/274`)
          .then(res => this.response = res)
          .catch(err => {
            expect(err.message).toEqual('Not Found');
          });
      });
    });

    describe('GET all records', () => {
      it('should fail to GET all animals with malformed path, respond with status 404', () => {
        Router.get(`/animalsilo`)
          .then(res => this.response = res)
          .catch(err => {
            expect(err.status).toBe(404);
          });
      });
      it('should fail to GET all animals with malformed path, respond with error message Not Found', () => {
        Router.get(`:3000/api/v1/animalsilo`)
          .then(res => this.response = res)
          .catch(err => {
            expect(err.message).toEqual('Not Found');
          });
      });
    });
  });
});