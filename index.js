/* jshint node: true */
'use strict';

/**
  # pull-sse

  Use pull-streams to make
  [server sent events](http://www.w3.org/TR/eventsource/) wonderful.

  ## Usage

  The `pull-sse` module is designed to be used as both pull sink and source
  but at this stage, only the sink has been implemented.

  Sink usage:

  <<< examples/simple-server.js

  This could then be consumed in the browser, very simply:

  <<< examples/simple-client.js

  For more examples, I'd recommend trawling through the [examples](/examples).
**/

var debug = require('debug')('pull-sse');
var http = require('http');
var pull = require('pull-core');

module.exports = function(target) {
  if (target instanceof http.ServerResponse) {
    return output(target);
  }

  return input(target);
};

var output = pull.Sink(function(read, res, opts) {
  var writtenStatus = false;
  var keepalive = (opts || {}).keepalive;
  var kaTimer;

  function writeKeepalive() {
    res.write(':keepalive\n');
  }

  // if keepalive has not been set and does not have a value, then use the default
  if ((! keepalive) && (keepalive !== 0)) {
    keepalive = 15000;
  }

  read(null, function next(end, data) {
    // if we have not yet written the status do that now
    if (! writtenStatus) {
      res.writeHead(!end ? 200 : (end instanceof Error ? 500 : 404), {
        'Content-Type': !end ? 'text/event-stream' : 'text/plain',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      });

      // flag as status written
      writtenStatus = true;
    }

    // clear the keepalive interval
    clearInterval(kaTimer);

    if (end) {
      debug('encountered stream end: ', end);
      // if we have an error, write that to the response
      if (end instanceof Error) {
        res.write('error: ' + end.toString() + '\n\n');
      }

      return res.end();
    }

    // if we have an object, then stringify that sucker
    if (typeof data == 'object' && (! (data instanceof String))) {
      data = JSON.stringify(data);
    }

    // if we have simple data, then let it go through
    if (typeof data != 'function' && typeof data != 'undefined') {
      res.write('data: ' + (data + '').split('\n').join('\ndata: ') + '\n\n');
    }

    // start the keepalive interval
    kaTimer = setInterval(writeKeepalive, keepalive);

    // read again
    read(null, next);
  });
});

function input(req) {
  throw new Error('not yet implemented');
}
