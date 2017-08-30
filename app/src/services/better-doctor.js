var request = require('request-promise');
var userKey = process.env.BETTER_DOCTOR_USER_KEY;
var baseUrl = 'https://api.betterdoctor.com';

var searchBy = function (name) {
  return request.get({
    baseUrl: baseUrl,
    uri: '/2016-03-01/doctors',
    qs: {
      user_key: userKey,
      name: name
    }
  });
};

module.exports = { searchBy: searchBy };