var createCache = function () {
  var self = {};

  var store = {};

  self.store = function (key, value) {
    store[key] = value;
  };

  self.retrieve = function (key) {
    return store[key];
  };

  self.contains = function (key) {
    return !!store[key];
  };

  return self;
};

exports.create = createCache;