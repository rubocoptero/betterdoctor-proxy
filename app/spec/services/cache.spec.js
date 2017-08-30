var cache = require('../../src/services/cache');
var elasticHelper = require('../support/elastic-helper');

describe('Cache', function () {
  beforeAll(function (done) {
    elasticHelper.flush().then(done);
  });

  afterEach(function (done) {
    elasticHelper.flush().then(done);
  });

  it('is case insensitive', function (done) {
    storedValue = { content: 'value' };
    cache.store('Key', storedValue).then(function () {
      cache.retrieve('kEy').then(function (value) {
        expect(value).toEqual(storedValue);
        done();
      });
    });
  });

  describe('when key is empty', function () {
    describe('store', function () {
      it('returns false', function (done) {
        cache.store('', { content: 'value' }).then(function (response) {
          expect(response).toEqual(false);
          done();
        });
      });
    });

    describe('retrieve', function () {
      it('returns undefined', function (done) {
        cache.retrieve('').then(function (value) {
          expect(value).toEqual(undefined);
          done();
        });
      });
    });

    describe('contains', function () {
      it('returns false', function (done) {
        cache.contains('').then(function (response) {
          expect(response).toEqual(false);
          done();
        });
      });
    });
  });
});