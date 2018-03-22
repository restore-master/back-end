'use strict';

const errorHandler = require('../../middleware/error-handler');
require('jest');

describe('#error-handler.js', function () {
  let Res = class {
    constructor(error) {
      this.error = error;
      this.message = null;
      this.code = null;
    }
    send(msg) {
      this.message = msg;
      return this;
    }
    status(code) {
      this.code = code;
      return this;
    }
  };


  let validationError = new Res(new Error('Validation Error'));
  let authorizationError = new Res(new Error('Unauthorized'));
  let pathError = new Res(new Error('Path Error'));
  let enoentError = new Res(new Error('ENOENT'));
  let objectIDError = new Res(new Error('ObjectID Failed'));
  let duplicateKeyError = new Res(new Error('Duplicate Key Error'));
  let defaultError = new Res(new Error('Default'));

  describe('different error code/message validations', () => {
    it('should return 400 code for validation error', () => {
      expect(errorHandler(validationError.error, validationError).code).toBe(400);
    });
    it('should return validation error message', () => {
      expect(errorHandler(validationError.error, validationError).message).toContain('validation');
    });

    it('should return 401 code for authorization error', () => {
      expect(errorHandler(authorizationError.error, authorizationError).code).toBe(401);
    });
    it('should return authorization error message', () => {
      expect(errorHandler(authorizationError.error, authorizationError).message).toContain('unauthorized');
    });

    it('should return 404 code for path error', () => {
      expect(errorHandler(pathError.error, pathError).code).toBe(404);
    });
    it('should return path error message', () => {
      expect(errorHandler(pathError.error, pathError).message).toContain('path');
    });

    it('should return 404 code for enoent error', () => {
      expect(errorHandler(enoentError.error, enoentError).code).toBe(404);
    });
    it('should return validation error message', () => {
      expect(errorHandler(enoentError.error, enoentError).message).toContain('enoent');
    });

    it('should return 404 code for objectID error', () => {
      expect(errorHandler(objectIDError.error, objectIDError).code).toBe(404);
    });
    it('should return objectID error message', () => {
      expect(errorHandler(objectIDError.error, objectIDError).message).toContain('objectid');
    });

    it('should return 409 code for duplicate key error', () => {
      expect(errorHandler(duplicateKeyError.error, duplicateKeyError).code).toBe(409);
    });
    it('should return duplicate key error message', () => {
      expect(errorHandler(duplicateKeyError.error, duplicateKeyError).message).toContain('duplicate');
    });

    it('should return 500 code as default error', () => {
      expect(errorHandler(defaultError.error, defaultError).code).toBe(500);
    });
    it('should return default error message', () => {
      expect(errorHandler(defaultError.error, defaultError).message).toContain('default');
    });
  });
});