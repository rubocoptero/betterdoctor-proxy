var express = require('express');
var app = express();

var searchDoctorByName = require('./src/actions/search-doctor-by-name.js')

app.get('/api/v1/doctors/search', function (req, res, next) {
  var name = req.query.name || '';

  searchDoctorByName.execute(name)
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