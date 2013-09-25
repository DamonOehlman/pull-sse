var request = require('hyperquest');

module.exports = function(url, expected) {
  return function(t) {
    t.plan(4 + expected.length);
    request.get('http://localhost:3000' + url, function(err, res) {
      t.ifError(err);
      t.equal(res.statusCode, 200);
      t.equal(res.headers['content-type'], 'text/event-stream');

      res.on('data', function(data) {
        var val = expected.shift();
        if (typeof val == 'object') {
          val = JSON.stringify(val);
        }

        t.equal(data.toString(), 'data: ' + (val + '').split('\n').join('\ndata: ') + '\n\n');
      });

      res.on('end', function() {
        t.pass('ended');
      })
    });
  };
}