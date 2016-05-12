// implement your express server here -- Module 5
//  in this file create an express application - use the middle-ware built
// into express to serve up static files from the public directory (index.html
// and client.js - you can also serve up css files from the public directory
// this way if you want) you need to support a '/trucks' endpoint, and a
// dynamic route for '/trucks/:name'
var express = require('express');
var bodyparser = require('body-parser');
var truckRoutes = require('./routes/truckRoutes');
var app = express();

app.use(express.static('public'));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use('/trucks', truckRoutes);

app.listen(3000, function () {
  /*eslint-disable */
  console.log('server started on port 3000');
  /*eslint-enable */
});
