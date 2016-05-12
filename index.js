var express = require('express');
var app = express();
var trucks = require('./trucks');

app.get('/trucks', function (request, response) {
  var truckList = trucks.getTrucks();

  response.send(truckList);
});

app.get('/trucks/:name', function (request, response) {
  var truck = trucks.getTruck(request.params.name);

  response.send(truck);
});

app.get('/food-types', function (request, response){
  var foodList = trucks.getFoodTypes();

  response.send(foodList);
});

app.get('/food-types/:type', function (request, response){
  var type = request.params.type;
  var truckList = trucks.filterTrucksByFoodType(type);

  response.send(truckList);
});

app.post('/trucks', function (request, response) {
  var truckList = trucks.addTruck;
  response.send(truckList);
});

app.delete('/trucks/:name', function (request, response) {
  var truckList = trucks.removeTruck();
  response.send(truckList);
});

app.listen(3000, function () {
  console.log('listening on port 3000');
});