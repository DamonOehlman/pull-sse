var request = require('hyperquest');

module.exports = function(url, expected) {
  return function(t) {
    t.plan(4);
    request.get('http://localhost:3000' + url, function(err, res) {
      t.ifError(err, 'no error');
      t.equal(res.statusCode, 500, 'received 500 header');
      t.equal(res.headers['content-type'], 'text/plain', 'content === text/plain');

      res.on('end', function() {
        t.pass('ended');
      })
    });
  };
}