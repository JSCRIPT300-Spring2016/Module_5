var express = require('express');
var app = express();
var trucks = require('./trucks');

app.route('./trucks')
  .get(function (request, response) {
    var truckList = trucks.getTrucks();
    response.send(truckList);
  })
  .post(function (request, response) {
    var truckList = trucks.addTruck;
    response.send(truckList);
  });

app.route('./trucks/:name')
  .get(function (request, response) {
    var truck = trucks.getTruck(request.params.name);
    response.send(truck);
  })
  .delete(function (request, response) {
    var truckList = trucks.removeTruck();
    response.send(truckList);
  });

app.route('/food-types')
  .get(function (request, response){
    var foodList = trucks.getFoodTypes();
    response.send(foodList);
  });

app.route('/food-types/:type')
  .get( function (request, response){
    var type = request.params.type;
    var truckList = trucks.filterTrucksByFoodType(type);
    response.send(truckList);
  });


module.exports = router;