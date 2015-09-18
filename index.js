var express = require('express');
var proxy = require('express-http-proxy');

var app = express();

app.use(express.static('dist'));

app.use('/zy', proxy('localhost:8080', {
  forwardPath: function(req, res) {
    return require('url').parse(req.url).path;
  }
}));

app.use(function(req, res, next) {
  res.sendFile('dist/index.html');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
