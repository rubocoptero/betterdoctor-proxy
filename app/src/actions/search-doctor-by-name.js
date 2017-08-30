var betterDoctor = require('../services/better-doctor.js');
var cache = require('../cache.js');

var execute = function (name) {
  return cache.contains(name)
    .then(function (contains) {
      if (contains) {
        return cache.retrieve(name);
      } else {
        return betterDoctor.searchBy(name)
          .then(function (body) {
            cache.store(name, body);
            return body;
          });
      }
    });
};

module.exports = { execute: execute }