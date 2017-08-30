var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: process.env.ELASTIC_SEARCH_HOST,
  log: 'info'
});

var INDEX_NAME = 'search_responses';
var TYPE_NAME = 'responses';

var flush = function () {
  return client.deleteByQuery({
    index: INDEX_NAME,
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
  flush: flush
}