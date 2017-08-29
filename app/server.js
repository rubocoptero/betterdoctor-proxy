var express = require('express');
var app = express();
var request = require('request');
var cache = require('./src/cache.js');

var responseCache = cache.create();

app.get('/api/v1/doctors/search', function (req, res) {
  var name = req.query.name || '';

  if (responseCache.contains(name)) {
    return res.send(responseCache.retrieve(name));
  }

  var userKey = process.env.BETTER_DOCTOR_USER_KEY;
  endpoint = 'https://api.betterdoctor.com/2016-03-01/doctors?name=' + name + '&user_key=' + userKey;

  request.get(endpoint, function (error, response, body) {
    responseCache.store(name, body);
    res.send(body);
  });
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