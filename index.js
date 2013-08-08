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

**/

var http = require('http');
var pull = require('pull-core');

module.exports = function(target) {
  if (target instanceof http.ServerResponse) {
    return output(target);
  }

  return input(target);
}

function output(res) {
  return {
    error: function(err) {
      // write the error
      res.writeHead(500);
      res.write(err.toString());
      res.end();
    },

    ok: function() {
      res.writeHead(200, {
        'Content-type': 'text/event-stream'
      });

      return pull.Sink(function(read) {
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
            res.write('data: ' + data);
          }

          // read again
          read(null, next);
        });
      })();
    }
  }
}

function input(req) {
  throw new Error('not yet implemented');
}