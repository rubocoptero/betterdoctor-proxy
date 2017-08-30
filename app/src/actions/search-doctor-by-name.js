var betterDoctor = require('../services/better-doctor.js');
var cache = require('../cache.js');

var responseCache = cache.create();

var execute = function (name) {
  return responseCache.contains(name)
    .then(function (contains) {
      if (contains) {
        return responseCache.retrieve(name);
      } else {
        return betterDoctor.searchBy(name)
          .then(function (body) {
            responseCache.store(name, body);
            return body;
          });
      }
    });
};

module.exports = { execute: execute }