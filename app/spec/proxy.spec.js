var request = require('request');

describe('Proxy spec', function () {
	it('has a search doctors endpoint', function (done) {
		request.get('http://localhost:3000/api/v1/doctors/search?name=John', function (error, response, body) {
		  expect(response.statusCode).not.toEqual(404);
		  done();
		});
	});
});