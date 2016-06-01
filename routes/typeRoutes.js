'use strict';
// put your Express router code in here

/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

var express = require('express');
var foodTypes = require('../trucks');

var router = express.Router();

/* eslint-enable no-undef */
/* eslint-disable no-console */


router.route('/')
.get(function (request, response) {
  var typesReq = request.params.type;
  console.log('requestYY[' + typesReq + ']');
  var types = foodTypes.getFoodTypes();
  response.send(types);
});

router.route('/:type')
  .get(function (request, response) {
// `/food-types/:type` This route returns the list of all trucks that serve the
// food type that matches (case insensitive) the type parameter passed.
// http://127.0.0.1:3000/foodTypes:Pizza
// http://127.0.0.1:3000/foodTypes:pizza
    var typeReq = request.params.type;
    console.log('request[' + typeReq + ']');
    var type = foodTypes.filterTrucksByFoodType(typeReq);

    if (!type) {
      response.status(404).json('No food type found for ' + type);
    } else {
      response.send(type);
    }
  });
/* eslint-disable no-undef */
module.exports = router; // return the router instance for node