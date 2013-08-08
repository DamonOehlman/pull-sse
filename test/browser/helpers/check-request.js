module.exports = function(url, expected) {
  return function(t) {
    var source;

    t.plan(2 + expected.length);
    t.ok(source = new EventSource(url));

    source.addEventListener('open', function handleOpen(evt) {
      t.pass('opened');

      source.removeEventListener('open', handleOpen);
    });

    source.addEventListener('message', function(evt) {
      var val = expected.shift();
      var data = evt.data;

      if (typeof val == 'object') {
        val = JSON.stringify(val);
      }
      else if (typeof val == 'number') {
        data = parseFloat(data);
      }

      t.equal(data, val);
    });
  };
}