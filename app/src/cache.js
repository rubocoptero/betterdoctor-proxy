var elastic = require('./elastic.js');

var createCache = function () {
  var self = {};

  self.store = function (key, value) {
    return elastic.store(key, value);
  };

  self.retrieve = function (key) {
    return elastic.retrieve(key);
  };

  self.contains = function (key) {
    return elastic.exists(key);
  };

  return self;
};

exports.create = createCache;