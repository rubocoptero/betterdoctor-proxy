var express = require('express');
var app = express();

var searchDoctorByName = require('./src/actions/search-doctor-by-name')

app.get('/api/v1/doctors/search', function (req, res, next) {
  var name = req.query.name || '';

  searchDoctorByName.execute(name)
  .then(function (body) {
    res.set('Content-Type', 'application/json');
    res.send(body);
  })
  .catch(next);
});

var server = null;

exports.listen = function (port) {
  server = app.listen(port);
  console.log('Server running at http://127.0.0.1:' + port + '/');
};

exports.stop = function () {
  server.close();
};