/*
** author: Fulin Shen
** created on: May 21, 2016
** description: see above
*/

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlEncoded = bodyParser.urlencoded({ extended: false });

var trucks = require('../trucks');

router.route('/')
  .get(function(request, response) {
    response.status(200).json(trucks.getTrucks());
  })
  .post(urlEncoded, function(request, response) {
    var newTruck = request.body;
    if(newTruck) {
      trucks.addTruck(newTruck);
      response.status(201).send(trucks.getTrucks());
    } else {
      response.status(400).send('problem on adding truck');
    }
  });

router.route('/:name')
  .get(function(request, response) {
    var truckName = request.params.name;
    response.status(200).json(trucks.getTruck(truckName));
  })
  .delete(function(request, response) {
    var truckName = request.params.name;
    response.status(200).json(trucks.removeTruck(truckName));
  });

module.exports = router;
