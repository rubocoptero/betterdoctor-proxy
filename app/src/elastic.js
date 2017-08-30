var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'http://elastic:changeme@172.18.0.2:9200',
  log: 'info'
});

var indexName = 'search_responses';
var typeName = 'responses';

var initializeIndex = function () {
  client.indices.exists({ index: indexName })
  .then(function (exists) {
    if (!exists) {
      return client.indices.create({ index: indexName });
    }
  })
  .catch(logError);
};

var store = function (key, value) {
  return client.index({  
    index: indexName,
    type: typeName,
    id: key,
    body: value
  })
  .catch(logError);
};

var retrieve = function (key) {
  return client.get({
    index: indexName,
    type: typeName,
    id: key
  })
  .then(function extractBody(response) {
    return response._source;
  })
  .catch(logError);
};

var exists = function (key) {
  return client.exists({
    index: indexName,
    type: typeName,
    id: key
  })
  .catch(logError);
};

var flush = function () {
  return client.deleteByQuery({
    index: indexName,
    q: '*',
    conflicts: 'proceed',
    refresh: true
  })
  .catch(logError);
};

function logError(error) {
  console.error('ERROR:', error);
}

module.exports = {
  store: store,
  retrieve: retrieve,
  exists: exists,
  flush: flush
};