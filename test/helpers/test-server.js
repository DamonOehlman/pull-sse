var http = require('http');
var server = http.createServer();
var mapleTree = require('mapleTree');
var routes = new mapleTree.RouteTree();
var pull = require('pull-stream');
var sse = require('../..');

routes.define('/values', function(req, res) {
  pull(
    pull.values(['a', 'b', 'c']),
    sse(res)
  );
});

routes.define('/values-numeric', function(req, res) {
  pull(
    pull.values([1, 2, 3]),
    sse(res)
  );
});

routes.define('/objects', function(req, res) {
  pull(
    pull.values([{ a: 1 }, { b: 2 }]),
    sse(res)
  );
});

server.on('request', function(req, res) {
  var route = routes.match(req.url);
  if (route.perfect) {
    route.fn(req, res);
  }
});

exports.start = function(callback) {
  server.listen(parseInt(process.env.PORT || 3000, 10), callback);
};

exports.stop = function() {
  server.close();

  return true;
};
