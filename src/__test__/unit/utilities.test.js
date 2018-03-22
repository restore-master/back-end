'use strict';

const utilities = require('../../lib/utilities');

describe('utilities test', function() {
  describe('log', () => {
    it('should log argument', () => {
      expect(utilities.log('anything')).toBeUndefined();
    });
  });
  describe('logError', () => {
    it('should log error argument', () => {
      expect(utilities.logError(new Error('error'))).toBeUndefined();
    });
  });
  describe('map', () => {
    it('should map over array elements, excuting callback on each', () => {
      expect(utilities.map([1, 2, 3, 4], el => el * 2)).toEqual([2, 4, 6, 8]);
    });
  });
  describe('filter', () => {
    it('should filter out even numbers', () => {
      expect(utilities.filter([1, 2, 3, 4], el => el % 2 !== 0)).toEqual([1, 3]);
    });
  });
  describe('daysToMilliseconds', () => {
    it('should convert days to milliseconds', () => {
      expect(utilities.daysToMilliseconds(2)).toEqual(172800000);
    });
  });
});