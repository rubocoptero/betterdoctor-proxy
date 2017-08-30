process.env.NODE_ENV = 'test'

var request = require('request');
var nock = require('nock');
var app = require('../server.js');
var elastic = require('../src/infrastructure/elastic.js');

describe('Proxy spec', function () {
  var betterDoctorResponse = { response: 'WHATEVER' };

  beforeAll(function (done) {
    app.listen(3001);
    elastic.flush().then(done);
  });

  afterAll(function () {
    app.stop();
  });

  afterEach(function (done) {
    elastic.flush().then(done);
  });

  it('proxies BetterDoctor API response', function (done) {
    var name = 'Ruben';
    mockApiFor(name);

    request.get(endpointFor(name), function (error, response, body) {
      expect(body).toEqual(JSON.stringify(betterDoctorResponse));
      done();
    });
  });

  describe('when requesting the same for second time', function () {
    it('returns a cached response', function (done) {
      var name = 'Paco';
      mockApiFor(name);

      request.get(endpointFor(name), function (error, response, body) {
        request.get(endpointFor(name), function (error, response, body) {
          expect(body).toEqual(JSON.stringify(betterDoctorResponse));
          done();
        });
      });
    });
  });

  function endpointFor(name) {
    return 'http://localhost:3001/api/v1/doctors/search?name=' + name;
  }

  function mockApiFor(name) {
    var userKey = process.env.BETTER_DOCTOR_USER_KEY;

    return nock('https://api.betterdoctor.com')
      .get('/2016-03-01/doctors')
      .query({ name: name, user_key: userKey })
      .reply(200, betterDoctorResponse);
  }
});