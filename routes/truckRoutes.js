'use strict';
// put your Express router code in here

/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

var express = require('express');
var foodTrucks = require('../trucks');

var router = express.Router();

var trucks = require('../trucks');
var foodTypes = require('../trucks');
var openTrucks = require('../trucks');
var typeTrucks = require('../trucks');
/* eslint-enable no-undef */

// var serveStatic = express.static('public');

var axeTruck = 'Fez';

var openTruck = trucks.filterTrucksByDay('Saturday');
var pizzaTruckList = trucks.filterTrucksByFoodType('pizza');
var addTruck = trucks.addTruck();
var deleteTruck = trucks.removeTruck(axeTruck);

/*
.use(function (request, response) {
  console.log('Request URL: ', request.originalURL);
})
.use(function (request, response) {
  console.log('Time: ', Date.now());
})
*/

/* eslint-disable no-console */

router.route('/')
.get(function (request, response) {
//   `/trucks` This route returns the list of all trucks in the module.
// http://127.0.0.1:3000/trucks
  var truckList = trucks.getTrucks();
  // response.send(truckList);
  response.status(200).json(trucks.getTrucks());
})
.get(function (request, response) {
// test for var openTrucks = require('./trucks');
  var openTruck = trucks.filterTrucksByDay('Saturday');
  response.send(openTruck);
})
.get(function (request, response) {
//  `/food-types` This route returns the list of all possible food types
// served by trucks in the module
// http://127.0.0.1:3000/foodTypes
  var foodList = trucks.getFoodTypes();
  response.send(foodList);
})
.get(function (request, response) {
// var typeTrucks = require('./trucks');
  response.send(pizzaTruckList);
})
.post(function (request, response) {
  var newTruck = request.body;
  // var newTruck = "Andy";

  if (!newTruck) {
    response.status(400).send('problem sending truck');
  }
  else {
    newTruck = trucks.addTruck(newTruck);
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
  var truck = trucks.getTruck(truckReq);
  response.send(truck);
})
.delete(function(request, response) {
  var name = request.params.id;

  var removeTruck = trucks.removeTruck(name);
  response.sendStatus(200);
});

router.route('/:type')
.get(function (request, response) {
// `/food-types/:type` This route returns the list of all trucks that serve the
// food type that matches (case insensitive) the type parameter passed.
// http://127.0.0.1:3000/foodTypes:Pizza
// http://127.0.0.1:3000/foodTypes:pizza
  var typeReq = request.params.type;
  console.log('request[' + typeReq + ']');
  var type = trucks.filterTrucksByFoodType(typeReq);
  response.send(type);
});

/* eslint-disable no-undef */
module.exports = router; // return the router instance for node