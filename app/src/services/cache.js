var elastic = require('../infrastructure/elastic');

var createCache = function () {
  var self = {};

  var normalize = function (key) {
    return key.toLowerCase();
  };

  self.store = function (key, value) {
    if (!key) { return Promise.resolve(false); }

    return elastic.store(normalize(key), value);
  };

  self.retrieve = function (key) {
    if (!key) { return Promise.resolve(undefined); }

    return elastic.retrieve(normalize(key));
  };

  self.contains = function (key) {
    if (!key) { return Promise.resolve(false); }

    return elastic.exists(normalize(key));
  };

  return self;
};

var cache = createCache();

module.exports = cache;