/* jshint node: true */
'use strict';

/**
  # pull-sse

  Use pull-streams to make
  [server sent events](http://www.w3.org/TR/eventsource/) wonderful.

  [
  ![Build Status]
  (https://travis-ci.org/DamonOehlman/pull-sse.png?branch=master)
  ](https://travis-ci.org/DamonOehlman/pull-sse)

  [
  ![browser support]
  (https://ci.testling.com/DamonOehlman/pull-sse.png)
  ](https://ci.testling.com/DamonOehlman/pull-sse)

  ## Installation

  Install into your project:

  ```
  npm install pull-sse --save
  ```

  ## Usage

  The `pull-sse` module is designed to be used as both pull sink and source
  but at this stage, only the sink has been implemented.

  Sink usage:

  ```js
  var http = require('http');
  var server = http.createServer();
  var pull = require('pull-stream');
  var sse = require('pull-sse');

  server.on('request', function(req, res) {
    if (req.url === '/values') {
      return pull(
        pull.values(['a', 'b', 'c']),
        sse(res)
      );
    }
  });
  ```

  For more examples, I'd recommend trawling through the [tests](/tests).
**/

var http = require('http');
var pull = require('pull-core');

module.exports = function(target) {
  if (target instanceof http.ServerResponse) {
    return output(target);
  }

  return input(target);
}

var output = pull.Sink(function(read, res) {
  res.writeHead(200, {
    'Content-type': 'text/event-stream'
  });

  read(null, function next(end, data) {
    if (end) {
      return res.end();
    }

    // if we have an object, then stringify that sucker
    if (typeof data == 'object' && (! (data instanceof String))) {
      data = JSON.stringify(data);
    }

    // if we have simple data, then let it go through
    if (typeof data != 'function' && typeof data != 'undefined') {
      res.write('data: ' + data + '\n\n');
    }

    // read again
    read(null, next);
  });
});

function input(req) {
  throw new Error('not yet implemented');
}