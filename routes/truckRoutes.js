var express = require('express');
var bodyparser = require('body-parser');
var trucks = require('../trucks');

var router = express.Router();

router.route('/')
  .get(function(request, response) {
    var foodTrucks = trucks.getTrucks();
    response.send(foodTrucks);
  })
  .post(function(request, response) {
    var newTruck = request.body;
    if (!newTruck) {
      response.status(400).json('No can do!');
    } else {
      newTruck = trucks.addTruck(newTruck);
      response.status(201).send(newTruck);
    }
  });

router.route('/:name')
  .get(function(request, response) {
    var truckName = request.params.name;
    var truck = trucks.getTruck(truckName);
    if (truck.length > 0) {
      response.send(truck);
    } else {
      response.send('That truck drove away!');
    }
  })
  .delete(function(request, response) {
    var truckToDelete = request.params.name;
    trucks.removeTruck(truckToDelete);
    response.sendStatus(200);
  });

module.exports = router;
