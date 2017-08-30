var request = require('request');
var nock = require('nock');
var app = require('../app');
var elasticHelper = require('./support/elastic-helper');

describe('BetterDoctor API proxy spec', function () {
  var betterDoctorResponse = { response: 'WHATEVER' };

  beforeAll(function (done) {
    app.listen(3001);
    elasticHelper.flush().then(done);
  });

  afterAll(function () {
    app.stop();
  });

  afterEach(function (done) {
    elasticHelper.flush().then(done);
  });

  it('proxies the API response', function (done) {
    var name = 'Ruben';
    mockApiSearchFor(name).reply(200, betterDoctorResponse);

    request.get(searchUriFor(name), function (error, response, body) {
      expect(body).toEqual(JSON.stringify(betterDoctorResponse));
      done();
    });
  });

  it('returns errors from the API', function (done) {
    var name = 'Jack';
    var returnedStatus = 400;
    var betterDoctorError = { response: 'ERROR' };

    mockApiSearchFor(name).reply(returnedStatus, betterDoctorError);

    request.get(searchUriFor(name), function (error, response, body) {
      expect(body).toEqual(JSON.stringify(betterDoctorError));
      expect(response.statusCode).toEqual(returnedStatus);
      done();
    });
  });

  describe('when requesting the same for second time', function () {
    it('returns a cached response', function (done) {
      var name = 'Tom';
      mockApiSearchFor(name).reply(200, betterDoctorResponse);

      request.get(searchUriFor(name), function (error, response, body) {
        request.get(searchUriFor(name), function (error, response, body) {
          expect(body).toEqual(JSON.stringify(betterDoctorResponse));
          done();
        });
      });
    });
  });

  function searchUriFor(name) {
    return 'http://localhost:3001/api/v1/doctors/search?name=' + name;
  }

  function mockApiSearchFor(name) {
    var userKey = process.env.BETTER_DOCTOR_USER_KEY;

    return nock('https://api.betterdoctor.com')
      .get('/2016-03-01/doctors')
      .query({ name: name, user_key: userKey });
  }
});