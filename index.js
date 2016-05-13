var express = require('express');
var app = express();

var serveStatic = express.static('public');
var truckRouter = require('./routes/truckRoutes');

app.use(serveStatic);

app.use('/', truckRouter);

app.listen(3000, function(){
  /* eslint-disable no-console */
  console.log("Listening on port 3000");
  /* eslint-enable no-console */
});