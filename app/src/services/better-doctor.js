var request = require('request-promise');
var userKey = process.env.BETTER_DOCTOR_USER_KEY;

var searchBy = function (name) {
  var endpoint = 'https://api.betterdoctor.com/2016-03-01/doctors?name=' + name + '&user_key=' + userKey;

  return request.get(endpoint);
};

module.exports = { searchBy: searchBy };