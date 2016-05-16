// put your Express router code in here
'use strict';
//express
var express = require('express');

//the router
var router = express.Router();

//the list of trucks
var foodTrucks = require('../trucks');


router.route('/')
  .get(function(request, response) {
    response.send(foodTrucks.getTrucks());
  })


.post(function(request, response) {

  //adding new truck
  response.send(foodTrucks.addTruck(request.body));
});

//dynamic param - url driven getTruck via name
router.route('/:name')
  .get(function(request, response) {

    //get truck via name
    var truck = foodTrucks.getTruck(request.params.name);
    if (truck) {

      response.send(truck);

    } else {

      //truck not found server error
      response.status(404).json('Sorry, ' + request.params.name + ' was \
        not found.');
    }
  })


//delete truck
.delete(function(request, response) {

  //remove existing truck
  response.send(foodTrucks.removeTruck(request.params.name));

});

module.exports = router;