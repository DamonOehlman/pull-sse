var source = new EventSource('/values');

source.addEventListener('message', function(evt) {
  console.log(evt.data);
});