'use strict';

const server = require('../../../lib/server');
const superagent = require('superagent');
const mock = require('../../lib/mocks');
const faker = require('faker');
const debug = require('debug')('http:customer-post.test');
require('jest');

describe('#customer-post POST /customer', function () {
  beforeAll(() => this.base = `:${process.env.PORT}/customer`);
  beforeAll(server.start);
  afterAll(server.stop);
  afterEach(mock.customer.removeAll);

  describe('valid input/output', () => {
    beforeAll(() => {
      debug(`this.mockCustomer: ${this.mockCustomer}`);
      return superagent.post(this.base)
        .send({
          name: faker.name.firstName(),
          date: faker.date.recent(),
        })
        .then(response => this.response = response)
        .then(() => console.log(this.response.body))
        .catch(console.error);
    });

    it('should return a response status of 201', () => {
      expect(this.response.status).toBe(201);
    });
    it('should return a response body of an object', () => {
      expect(typeof this.response.body).toEqual('object');
    });
    it('should return a response status with _id property', () => {
      expect(this.response.body).toHaveProperty('_id');
    });
    it('should return a response status with name property', () => {
      expect(this.response.body).toHaveProperty('name');
    });
    it('should return a response status with reports property', () => {
      expect(this.response.body).toHaveProperty('reports');
    });
    it('should return a response status with date property', () => {
      expect(this.response.body).toHaveProperty('date');
    });
  });

  describe('invalid input/output', () => {
    it('should return an error with bad path', () => {
      return superagent.post(`${this.base}/badpath`)
        .send({name: 'john', date: '11'})
        .catch(err => {
          expect(err).not.toBeNull();
        });
    });
    it('should return status 404 with bad path', () => {
      return superagent.post(`${this.base}/badpath`)
        .send({name: 'john', date: '11'})
        .catch(err => {
          expect(err.status).toBe(404);
        });
    });
    it('should return 401 not authorized with invalid username', () => {
      return superagent.post(this.base)
        .send({name: 22})
        .catch(err => {
          expect(err.status).toBe(400)
        });
    });
    it('should return 401 not authorized with invalid username', () => {
      return superagent.post(this.base)
        .send({name: 22, date: 22})
        .catch(err => {
          expect(err.message).toContain('carrot')
        });
    });
    // it('should return status 404 with bad path, with error message Not Found', () => {
    //   return superagent.post(`${this.base}/badpath`)
    //     .send()
    //     .catch(err => {
    //       expect(err.message).toContain('Not Found');
    //     });
    // });
    // it('should return 401 not customer with invalid password', () => {
    //   let encoded = Buffer.from(`${this.mockCustomer.customer.username}:${'BADPASSWAYAYAY'}`).toString('base64');

    //   return superagent.post(this.base)
    //     .set('Customerorization', `Basic ${encoded}`)
    //     .catch(err => expect(err.status).toBe(401));
    // });
    // it('should return 401 not customer with no username', () => {
    //   let encoded = Buffer.from(`:${this.mockCustomer.password}`).toString('base64');

    //   return superagent.post(this.base)
    //     .catch(err => expect(err.status).toBe(401));
    // });
    // it('should return 401 not customer with no password', () => {
    //   let encoded = Buffer.from(`${this.mockCustomer.customer.username}:`).toString('base64');

    //   return superagent.post(this.base)
    //     .set('Customerorization', `Basic ${encoded}`)
    //     .catch(err => expect(err.status).toBe(401));
    // });
    // it('should return 401 not customer with malformed customer headers', () => {
    //   return superagent.post(this.base)
    //     .set('Customerorization', `Basic`)
    //     .catch(err => expect(err.status).toBe(401));
    // });
    // it('should return 401 not customer with no password', () => {
    //   return superagent.post(this.base)
    //     .catch(err => expect(err.status).toBe(401));
    // });
  });
});
