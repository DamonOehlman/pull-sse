var test = require('tape');
var sse = require('..');
var testServer = require('./helpers/test-server');
var checkError = require('./helpers/check-error');

test('start the test server', function(t) {
  t.plan(1);
  testServer.start(function(err) {
    t.ifError(err, 'started');
  });
});

test('handles errors', function(t) {
  checkError('/error')(t);
});

test('stop the test server', function(t) {
  t.plan(1);
  t.ok(testServer.stop(), 'stopped');
});