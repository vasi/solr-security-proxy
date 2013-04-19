var vows = require('vows'),
    http = require('http'),
    SolrSecurityProxy = require('../solr-security-proxy.js'),
    vowsHelper = require('./vows-helper.js');

var SolrSecurityProxy = require('../solr-security-proxy.js');

var startSimpleBackendServer = function(port) {
  http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('mock backend processed request');
    res.end();
  }).listen(port);
}

startSimpleBackendServer(8080);
SolrSecurityProxy.start(8008);

var batch = vowsHelper.testProxyBatch( 'http://localhost:8008/solr/');
suite = vows.describe('test-with-mock-backend').addBatch(batch).export(module);