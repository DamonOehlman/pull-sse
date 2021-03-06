var test = require('tape');
var sse = require('..');
var testServer = require('./helpers/test-server');
var checkRequest = require('./helpers/check-request');

test('start the test server', function(t) {
  t.plan(1);
  testServer.start(function(err) {
    t.ifError(err, 'started');
  });
});

test('string values test', function(t) {
  checkRequest('/multiline', ['a\nb', 'b\nc'])(t);
});

test('stop the test server', function(t) {
  t.plan(1);
  t.ok(testServer.stop(), 'stopped');
});


