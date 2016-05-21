'use strict';
// put your Express router code in here

/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

var express = require('express');
var foodTrucks = require('../trucks');

var router = express.Router();

/* eslint-enable no-undef */
/* eslint-disable no-console */

router.route('/')
.get(function (request, response) {
//   `/trucks` This route returns the list of all trucks in the module.
// http://127.0.0.1:3000/trucks
  var truckList = foodTrucks.getTrucks();
  response.send(truckList);
  // response.status(200).json(foodTrucks.getTrucks());
})
.post(function (request, response) {
  var newTruck = request.body;
  if (!newTruck) {
    response.status(400).send('problem sending truck');
  }
  else {
    newTruck = foodTrucks.addTruck(newTruck);
    response.status(201).send(newTruck);
  }
});

// `/trucks/:name` This route returns a single truck object that matches
// the name parameter passed in the route.
// http://127.0.0.1:3000/trucks:Fez
router.route('/:name')
.get(function (request, response) {
  var truckReq = request.params.name;
  console.log('request[' + truckReq + ']');
  var truck = foodTrucks.getTruck(truckReq);
  response.send(truck);
})
.delete(function(request, response) {
  var name = request.params.id;

  var removeTruck = foodTrucks.removeTruck(name);
  response.sendStatus(200);
});

// this doesn't work, still returning a truck not a type
// http://127.0.0.1:3000/food-types/Pizza => Pizza truck not found
router.route('/food-types/:type')
  .get(function (request, response) {
// `/food-types/:type` This route returns the list of all trucks that serve the
// food type that matches (case insensitive) the type parameter passed.
// http://127.0.0.1:3000/foodTypes:Pizza
// http://127.0.0.1:3000/foodTypes:pizza
    var typeReq = request.params.type;
    console.log('request[' + typeReq + ']');
    var type = foodTrucks.filterTrucksByFoodType(typeReq);

    if (!type) {
      response.status(404).json('No food type found for ' + type);
    } else {
      response.send(type);
    }
  });

/* eslint-disable no-undef */
module.exports = router; // return the router instance for node