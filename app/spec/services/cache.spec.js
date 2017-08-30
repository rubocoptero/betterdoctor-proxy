var cache = require('../../src/services/cache');
var elastic = require('../../src/infrastructure/elastic');

describe('Cache', function () {
  beforeAll(function (done) {
    elastic.flush().then(done);
  });

  afterEach(function (done) {
    elastic.flush().then(done);
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
});