var express = require('express');
var trucks = require('../trucks');

var router = express.Router();


router.route('/')
  .get(function (request, response) {
    var allTrucks = trucks.getTrucks();
    response.status(200).json(allTrucks);
  })

  .post(function (request, response) {
    var newTruck = request.body;
    if (!newTruck) {
      response.status(400).send('problem adding new truck');
    } else {
      newTruck = trucks.addTruck(newTruck);
      response.status(201).send(newTruck);
    }
  });

router.route('/:name')
  .get(function (request, response) {
    var truckParam = request.params.name;
    var truckName = trucks.getTruck(truckParam);
    if (truckName) {
      response.send(truckName);
    } else {
      response.status(404).json('Truck not found');
    }
  })

  .delete(function (request, response) {
    var truckName = request.params.name;

    trucks.removeTruck(truckName);
    response.sendStatus(200);
  });

router.route('/food-types')
  .get(function (request, response) {
    var allFoodTypes = trucks.getFoodTypes();
    response.send(allFoodTypes);
  });


router.route('/food-types/:type')
  .get(function (request, response) {
    var foodParam = request.params.type;
    var foodType = trucks.filterByFoodType(foodParam);
    response.send(foodType);
  });

module.exports = router;
