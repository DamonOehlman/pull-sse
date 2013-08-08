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

This could then be consumed in the browser, very simply:

```js
var source = new EventSource('/values');

source.addEventListener('message', function(evt) {
  console.log(evt.data);
});
```

For more examples, I'd recommend trawling through the [examples](/examples).
