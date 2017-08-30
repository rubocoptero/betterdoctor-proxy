var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: process.env.ELASTIC_SEARCH_HOST,
  log: 'info'
});

var INDEX_NAME = 'search_responses';
var TYPE_NAME = 'responses';

var initializeIndex = function () {
  client.indices.exists({ index: INDEX_NAME })
  .then(function (exists) {
    if (!exists) {
      return client.indices.create({ index: INDEX_NAME });
    }
  })
  .catch(logError);
};

var store = function (key, value) {
  return client.index({  
    index: INDEX_NAME,
    type: TYPE_NAME,
    id: key,
    body: value
  })
  .catch(logError);
};

var retrieve = function (key) {
  return client.get({
    index: INDEX_NAME,
    type: TYPE_NAME,
    id: key
  })
  .then(function extractBody(response) {
    return response._source;
  })
  .catch(logError);
};

var exists = function (key) {
  return client.exists({
    index: INDEX_NAME,
    type: TYPE_NAME,
    id: key
  })
  .catch(logError);
};

function logError(error) {
  console.error('ERROR:', error);
}

module.exports = {
  store: store,
  retrieve: retrieve,
  exists: exists
};