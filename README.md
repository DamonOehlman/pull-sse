# pull-sse

Use pull-streams to make
[server sent events](http://www.w3.org/TR/eventsource/) wonderful.


[![NPM](https://nodei.co/npm/pull-sse.png)](https://nodei.co/npm/pull-sse/)

[![Build Status](https://img.shields.io/travis/DamonOehlman/pull-sse.svg?branch=master)](https://travis-ci.org/DamonOehlman/pull-sse)

[![browser support](https://ci.testling.com/DamonOehlman/pull-sse.png)](https://ci.testling.com/DamonOehlman/pull-sse)


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

server.listen(3000);
```

This could then be consumed in the browser, very simply:

```js
var source = new EventSource('/values');

source.addEventListener('message', function(evt) {
  console.log(evt.data);
});
```

For more examples, I'd recommend trawling through the [examples](/examples).

## License(s)

### MIT

Copyright (c) 2014 Damon Oehlman <damon.oehlman@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
