'use strict';

const server = require('../../../lib/server');
const superagent = require('superagent');
const mock = require('../../lib/mocks');
require('jest');

describe('#report PUT /report/{reportId}', function () {
  beforeAll(server.start);
  beforeAll(() => this.base = `:${process.env.PORT}/report`);
  beforeEach(() => mock.customer.createOne().then(data => this.mockCustomer = data));
  afterAll(server.stop);
  afterAll(mock.customer.removeAll);
  
  beforeEach(() => {
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
      .then(response => this.reportId = response.body._id);
  });

  describe('valid input/output', () => {
    it('should update the customer reports to contain the created report', () => {
      return superagent.put(`${this.base}/${this.reportId}`)
        .send({source: 'ribbit'})
        .then(response => expect(response.status).toBe(204));
    });
    it('should update the customer reports to contain the created report', () => {
      return superagent.put(`${this.base}/${this.reportId}`)
        .send({source: 'ribbit'})
        .then(() => {
          return superagent.get(`${this.base}/${this.reportId}`)
            .then(response => expect(response.body.source).toEqual('ribbit'));
        });
    });
  });

  describe('invalid input/output', () => {
    it('should return status 404 for post to bad route', () => {
      return superagent.put(this.base)
        .send({source: 'hello'})
        .catch(error => {
          expect(error.status).toBe(404);
        });
    });
    it('should return status 400 for put without sending required items to update', () => {
      return superagent.put(`${this.base}/${this.reportId}`)
        .catch(error => {
          expect(error.status).toBe(400);
        });
    });
    it('should return status 404 for get one with ID not found', () => {
      return superagent.put(`${this.base}/NOID/NOID`)
        .catch(error => {
          expect(error.status).toBe(404);
        });
    });
  });
});