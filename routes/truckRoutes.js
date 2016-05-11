var express = require('express');
var trucksList = require('../trucks')
// the Router method returns an instance which can be mounted as middle-ware
var router = express.Router();

// the path we mount the router on is relative to where it was mounted in app.js
router.route('/')
    .get(function (request, response) {
        var trucks = trucksList.getTrucks();
        response.status(200).json(trucks);
    })
    .post(function (request, response) {
        var newTruck = request.body;
        if (!newTruck) {
          response.status(400).json('problem adding truck');
        } else {
          newTruck = trucksList.addTruck(newTruck);
          response.status(201).send(newTruck);
        }
    });

router.route('/:name')
    .get(function (request, response) {
      var truck = trucksList.getTruck(request.params.name);
      response.status(200).json(truck);
  })
    .delete(function (request, response) {
      var truck = request.params.name;

      trucksList.removeTruck(truck);
      response.sendStatus(200);
    })



module.exports = router;
