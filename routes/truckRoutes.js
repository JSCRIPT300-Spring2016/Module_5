'use strict';

var express = require('express');
var trucks = require('../trucks');
var bodyParser = require('body-parser');

var router = express.Router();

var urlEnc = bodyParser.urlencoded({ extended: false});

router.route('/')
  .get(function (req, resp) {
  	var truckL = trucks.getTrucks();

    resp.send(truckL);
  })
  .post(urlEnc, function(req, resp) {
    var newT = trucks.addTruck(req.body);

    resp.status(201);
  });


router.route('/:name')
  .get(function(req, resp) {
  	var truck = trucks.getTruck(req.params.name);

    resp.send(truck);
  })
  .delete(function(req, resp) {
    var name = req.params.name;

    trucks.removeTruck(name);

    resp.status(200).json('truck removed');
  });

module.exports = router;