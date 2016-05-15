/*eslint-env node*/

//express
var express = require('express');

//router
var router = express.Router();

//the food trucks
var foodTrucks = require('../trucks');

router.route('/')
.get(function (request, response) {

    //return the trucks array
  response.send(foodTrucks.getTrucks());
})

.post(function (request, response) {

    //add the truck
  response.send(foodTrucks.addTruck(request.body));
});

router.route('/:name')
.get(function (request, response) {

    //get the truck
  var truck = foodTrucks.getTruck(request.params.name);

  if (truck) {
        //yay found truck
    response.send(truck);
  } else {
        //sorry no truck
    response.status(404).json('no truck found: ' + request.params.name);
  }
})

.delete(function (request, response) {

    //remove the truck
  response.send(foodTrucks.removeTruck(request.params.name));
});

//export the router!
module.exports = router;