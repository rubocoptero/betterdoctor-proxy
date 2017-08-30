var request = require('request-promise');
var cache = require('../cache.js');

var responseCache = cache.create();

var execute = function (name) {
  return responseCache.contains(name)
    .then(function (contains) {
      if (contains) {
        return responseCache.retrieve(name);
      } else {
        var userKey = process.env.BETTER_DOCTOR_USER_KEY;
        endpoint = 'https://api.betterdoctor.com/2016-03-01/doctors?name=' + name + '&user_key=' + userKey;

        return request.get(endpoint)
          .then(function (body) {
            responseCache.store(name, body);
            return body;
          });
      }
    });
};

module.exports = { execute: execute }