var elastic = require('../infrastructure/elastic');

var createCache = function () {
  var self = {};

  var normalize = function (key) {
    return key.toLowerCase();
  };

  self.store = function (key, value) {
    return elastic.store(normalize(key), value);
  };

  self.retrieve = function (key) {
    return elastic.retrieve(normalize(key));
  };

  self.contains = function (key) {
    return elastic.exists(normalize(key));
  };

  return self;
};

var cache = createCache();

module.exports = cache;