'use strict';

const server = require('../../../lib/server');
const superagent = require('superagent');
const mock = require('../../lib/mocks');
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
        .send({
          customer: this.mockCustomer.customer._id,
          source: 'anything',
          upperRooms: 'two',
          lowerRooms: 'two',
          ceilingHeight: 3,
          ceilingDescription: 'brown',
          powerHeat: 'no',
          flooringType: 'wood',
          typeOfHome: 'old',
          yearBuilt: 1990,
          standingWater: 2,
          basement: 'no',
          crawlOrSlab: 'slab',
          crawlOrAtticAccessLocation: 'crawl',
          contents: 'yes',
          accessPermissions: 'yes',
          setLockBox: 'yes',
          petsOrChildren: 'yes',
          specialNeeds: 'yes',
          respiratoryOrAllergies: 'yes',
          growth: 'yes',
          odor: 'yes',
          monitors: 'yes',
          lossIsMailingAddress: false,
          customerEmail: 'we@we.com',
          hearAboutUs: 'through the wind',
          adjuster: 'no',
          customerAgent: 'roger',
        })
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