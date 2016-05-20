'use strict';
var express = require('express');
var trucks = require ('./trucks');

var truckRouter = require('./routes/truckRoutes');

var app = express();

app.use(express.static('public'));

app.use('/trucks', truckRouter);

//return list of all food types
app.get('/food-types', function(request, response){
  var foodList = trucks.getFoodTypes();

  response.send(foodList);
});

//dynamic param return list off trucks by food type
app.get('/food-types/:type', function(request, response) {
  var type = request.params.type;
  var truckList = trucks.filterTrucksByFoodType(type);

  response.send(truckList);
});

app.listen(3000, function() {
  //console.log('server started on port 3000');
});

//  in this file create an express application - use the middle-ware built into express
//  to serve up static files from the public directory (index.html and client.js - you
//  can also serve up css files from the public directory this way if you want)
//  you need to support a '/trucks' endpoint, and a dynamic route for '/trucks/:name'
