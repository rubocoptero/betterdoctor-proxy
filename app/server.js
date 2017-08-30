var express = require('express');
var app = express();
var request = require('request-promise');
var cache = require('./src/cache.js');
var elastic = require('./src/elastic.js');

var responseCache = cache.create();

app.get('/api/v1/doctors/search', function (req, res, next) {
  var name = req.query.name || '';

  responseCache.contains(name)
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
  })
  .then(function (body) {
    res.send(body);
  })
  .catch(next);
});

var server = null;

if (process.env.NODE_ENV !== 'test') {
  server = app.listen(3000);
  console.log('Server running at http://127.0.0.1:3000/');
}

exports.listen = function (port) {
  server = app.listen(port);
  console.log('Server running at http://127.0.0.1:' + port + '/');
};

exports.stop = function () {
  server.close();
};