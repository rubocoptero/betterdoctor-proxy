var request = require('request-promise');
var userKey = process.env.BETTER_DOCTOR_USER_KEY;
var baseUrl = 'https://api.betterdoctor.com';
var requester = request.defaults({
  baseUrl: baseUrl,
  resolveWithFullResponse: true,
  simple: false
});

var searchBy = function (name) {
  return requester.get({
    uri: '/2016-03-01/doctors',
    qs: {
      user_key: userKey,
      name: name
    }
  });
};

module.exports = { searchBy: searchBy };