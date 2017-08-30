var betterDoctor = require('../services/better-doctor');
var cache = require('../services/cache');

var execute = function (name) {
  return cache.contains(name)
    .then(function (contains) {
      if (contains) {
        return cache.retrieve(name);
      } else {
        return betterDoctor.searchBy(name)
          .then(function (response) {
            if (response.statusCode == 200) {
              cache.store(name, response);
            }
            return response;
          });
      }
    });
};

module.exports = { execute: execute }