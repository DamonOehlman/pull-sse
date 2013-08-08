var test = require('tape');
var checkRequest = require('./helpers/check-request');

test('simple objects test', function(t) {
  checkRequest('/objects', [{ a: 1 }, { b: 2 }])(t);
});