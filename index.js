'use strict';

var express = require('express');
var trucks = require('./trucks');
var truckRouter = require('./routes/truckRoutes');

var app = express();

app.use(express.static('public'));

app.use('/trucks', truckRouter);

app.get('/food-types', function (req, resp) {
  var foodL = trucks.getFoodTypes();

  resp.send(foodL);
});

app.get('/food-types/:type', function (req, resp) {
  var type = req.params.type;
  var truckL = trucks.filterByFoodType(type);

  resp.send(truckL);
});

app.listen(3000, function () {
  console.log('listening on port 3000');
});