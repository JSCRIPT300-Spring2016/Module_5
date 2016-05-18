// put your Express router code in here
//Student: Katja Borchert

var express = require('express');

// the Router method returns an instance which can be mounted as middle-ware
var router = express.Router();
var trucks = require('../trucks');

//Routes:

router.route('/trucks') //all routers for ../trucks
  //This route returns the list of all trucks in the module.
  //returns error 404 if truck list is empty or undefined
  .get(function (request, response) {
    var truckList = trucks.getTrucks();
    if (truckList.length === 0 || truckList === 'undefined'){
      response.status(404).json('no truck list found');
    } else {
      response.send(truckList);
    }
  })
  //This route adds a truck to the foodTrucks list.
  //returns error 201 if unsuccessful
  .post(function (request, response){
    var newTruck = request.body;
	
    if (!newTruck) {
      response.status(404).json('problem adding truck');
    } else {
      //add the truck and assign returned object
      //to result
      var result = trucks.addTruck(newTruck);
      //newTruck gets assigned the truck portion of result:
      var message = result;
      if (message === 'success'){
        response.status(201).send(newTruck);
      } else {
        response.status(404).json('problem adding truck');
      }
    }
  });
  
router.route('/trucks/:id')
  //This route returns a single truck object that matches the
  //name parameter passed in the route.
  .get(function (request, response) {
    var truck = request.params.id;
    var targetTruck = trucks.getTruck(truck);

    //targetTruck will be null if no food truck matches the 'name'
    if (targetTruck === null){
      response.status(404).json('no truck of the name ' +
        truck + ' found.');
    } else {
      response.send(targetTruck);
    }
  })
  //This route removes a truck from the foodTrucks list.
  .delete(function (request, response) {
    var id = request.params.id;
    var result = trucks.removeTruck(id);
    if (result === 'success') {
      response.sendStatus(200);
    } else if (result === 'truck not found') {
      response.status(404).json('no truck of the name ' +
        id + 'found.');
    } else {
      response.status(415).json('string format required');
    }
  });
   
router.route('/food-types')
  //This route returns the list of all possible food types served
  //by trucks in the module
  .get(function (request, response) {
    var foodArray = trucks.getFoodTypes();
  
    //foodArray will be an empty array if no food types are found
    //in the data base
    if (foodArray.length === 0){
      response.status(404).json('no food list found');
    } else {
      response.send(foodArray);
    }
  });

router.route('/food-types/:type')
  //This route returns the list of all trucks that serve the food
  //type that matches (case insensitive) the type parameter
  //passed in the route.
  .get(function (request, response) {
    var foodType = request.params.type;
    var foodTrucks = trucks.filterTrucksByFoodType(foodType);
  
    //foodTrucks will be an empty array if no match is found
    if (foodTrucks.length === 0){
      response.status(404).json('no food trucks found that serve ' + foodType);
    } else {
      response.send(foodTrucks);
    }
  });

module.exports = router;