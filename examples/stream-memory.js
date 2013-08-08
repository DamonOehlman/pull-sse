var http = require('http');
var server = http.createServer();
var fs = require('fs');
var pull = require('pull-stream');
var sse = require('..');
var mapleTree = require('mapleTree');
var routes = new mapleTree.RouteTree();

var readMemory = pull.Source(function(interval) {
  return function(end, cb) {
    setTimeout(function() {
      cb(end, process.memoryUsage().rss);
    }, interval || 1000);
  };
});

routes.define('/values', function(req, res) {
  pull(
    readMemory(),
    sse(res)
  );
});

routes.define('/', function(req, res) {
  res.writeHead(200, { 'content-type': 'text/html' });
  fs.createReadStream(__dirname + '/index.html').pipe(res);
});

server.on('request', function(req, res) {
  var match = routes.match(req.url);
  if (match && match.fn) {
    match.fn(req, res);
  }
});

server.listen(3000);