var express = require('express');
var bodyparser = require('body-parser');
var trucks = require('../trucks');

var router = express.Router();

router.route('/')
  .get(function(request, response) {
    var foodTypeList = trucks.getFoodTypes();
    response.send(foodTypeList);
  });

router.route('/:type')
  .get(function(request, response) {
    var type = request.params.type;
    var type = type[0].toUpperCase() + type.slice(1, type.length);
    var matchingTrucks = trucks.filterTrucksByType(type);
    if (matchingTrucks.length > 0) {
      response.send(matchingTrucks);
    } else {
      response.send('Oh no! You can\'t eat that from a truck!');
    }
  });

module.exports = router;
