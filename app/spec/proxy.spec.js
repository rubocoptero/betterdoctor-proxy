process.env.NODE_ENV = 'test'

var request = require('request');
var nock = require('nock');
var app = require('../server.js');

describe('Proxy spec', function () {
  var ENDPOINT = 'http://localhost:3001/api/v1/doctors/search?name=Ruben'
  var betterDoctorResponse = { response: 'WHATEVER' };

  beforeAll(function () {
    app.listen(3001);
  });

  afterAll(function () {
    app.stop();
  });

  beforeEach(function () {
    nock('https://api.betterdoctor.com')
      .get('/2016-03-01/doctors?name=Ruben')
      .reply(200, betterDoctorResponse);
  });

	it('has a search doctors endpoint', function (done) {
		request.get(ENDPOINT, function (error, response, body) {
		  expect(response.statusCode).not.toEqual(404);
		  done();
		});
	});

  it('proxies BetterDoctor API response', function (done) {
    request.get(ENDPOINT, function (error, response, body) {
      expect(body).toEqual(JSON.stringify(betterDoctorResponse));
      done();
    });
  });
});