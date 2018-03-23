'use strict';

const server = require('../../../lib/server');
const superagent = require('superagent');
const mock = require('../../lib/mocks');
// const debug = require('debug')('http:report-get.test');
require('jest');

describe('#report GET /api/v1/report', function () {
  beforeAll(server.start);
  beforeAll(() => this.base = `:${process.env.PORT}/report`);
  afterAll(server.stop);
  afterAll(mock.customer.removeAll);

  beforeAll(() => {
    return mock.customer.createOne()
      .then(mock => {
        this.mockCustomer = mock;
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
          });
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
    it('should return status 404 for bad path', () => {
      return superagent.get(`${this.base}/NOID`)
        .catch(error => {
          expect(error.status).toBe(404);
        });
    });
  });
});