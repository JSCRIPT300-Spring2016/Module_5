// implement your express server here

//Homework: Katja Borchert
//Express Node Server

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var truckRoutes = require('./routes/truckRoutes');

// 'static' middle-ware function
var serveStatic = express.static('public');
app.use(serveStatic);
app.use(bodyParser.urlencoded({ extended: false }));

//use a middleware function to get to the route module(s)
app.use('/', truckRoutes);

app.listen(3000, function (){
/* eslint-disable no-console */
  console.log('listening on port 3000');
/* eslint-enable no-console */
});