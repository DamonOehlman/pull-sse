var test = require('tape');
var checkRequest = require('./helpers/check-request');

test('string values test', function(t) {
  checkRequest('/values', ['a', 'b', 'c'])(t);
});

test('numeric values test', function(t) {
  checkRequest('/values-numeric', [1, 2, 3])(t);
});