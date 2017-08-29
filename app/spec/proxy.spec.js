process.env.NODE_ENV = 'test'

var request = require('request');
var nock = require('nock');
var app = require('../server.js');

describe('Proxy spec', function () {
  var betterDoctorResponse = { response: 'WHATEVER' };

  beforeAll(function () {
    app.listen(3001);
  });

  afterAll(function () {
    app.stop();
  });

  beforeEach(function () {
    mockApiFor('Ruben');
  });

	it('has a search doctors endpoint', function (done) {
		request.get(endpointFor('Ruben'), function (error, response, body) {
		  expect(response.statusCode).not.toEqual(404);
		  done();
		});
	});

  it('proxies BetterDoctor API response', function (done) {
    request.get(endpointFor('Ruben'), function (error, response, body) {
      expect(body).toEqual(JSON.stringify(betterDoctorResponse));
      done();
    });
  });

  it('sends the name', function (done) {
    var name = 'Paco';
    mock = mockApiFor(name);

    request.get(endpointFor(name), function (error, response, body) {
      expect(mock.isDone()).toBe(true);
      done();
    });
  });

  function endpointFor(name) {
    return 'http://localhost:3001/api/v1/doctors/search?name=' + name;
  }

  function mockApiFor(name) {
    return nock('https://api.betterdoctor.com')
      .get('/2016-03-01/doctors')
      .query({ name: name })
      .reply(200, betterDoctorResponse);
  }
});