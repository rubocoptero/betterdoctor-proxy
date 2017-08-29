var express = require('express')
var app = express();

app.get('/api/v1/doctors/search', function (req, res) {
  res.sendStatus(200);
});

app.listen(3000);
console.log('Server running at http://127.0.0.1:3000/');