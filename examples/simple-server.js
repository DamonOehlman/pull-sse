var http = require('http');
var server = http.createServer();
var pull = require('pull-stream');
var sse = require('..');

server.on('request', function(req, res) {
  if (req.url === '/values') {
    return pull(
      pull.values(['a', 'b', 'c']),
      sse(res)
    );
  }
});

server.listen(3000);