/*
** author: Fulin Shen
** created on: May 21, 2016
** description: see above
*/

var express = require('express');
var router = express.Router();

var trucks = require('../trucks');

router.route('/')
  .get(function(request, response) {
    response.send(trucks.getFoodTypes());
  });

router.route('/:type')
  .get(function(request, response) {
  var foodType = request.params.type;
  response.send(trucks.filterTrucksByFoodType(foodType));
});

module.exports = router;
