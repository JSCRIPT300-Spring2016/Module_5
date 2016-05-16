'use strict';
var express = require('express');
var bodyparser = require('body-parser');
var serveStatic = express.static('public');
var app = express();
var truckRouter = require('./routes/truckRoutes');

app.use( serveStatic );
app.use( bodyparser.urlencoded({ extended: false }) );
app.use( bodyparser.json() );

//this will get us to routes/truckRoutes if we
// use /trucks in url which gets us acces to foodTrucks
app.use( '/trucks', truckRouter );

app.listen(3000, function () {
  //console.log('server started on port 3000');
});

//  in this file create an express application - use the middle-ware built into express
//  to serve up static files from the public directory (index.html and client.js - you
//  can also serve up css files from the public directory this way if you want)
//  you need to support a '/trucks' endpoint, and a dynamic route for '/trucks/:name'
