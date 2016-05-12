/*
	Scott Henderson
	JSCRIPT 300 A Spring 2016
*/

var express = require("express");
var _ = require("lodash");
var trucks = require("../trucks");

// the Router method returns an instance which can be mounted as middle-ware
var router = express.Router();

// the path we mount the router on is relative to where it was mounted in app.js
router.route('/')
	.get(function (request, response) {
		response.status(200).json(trucks.getTrucks());
	})
	.post(function (request, response) {
		// create a new truck record
		var newTruck = request.body; // from client.js $form.serialize via body-parser

		if (newTruck) {
			trucks.addTruck(newTruck);
			response.status(201).send(newTruck);
		} else {
			response.status(400).send('problem adding truck');
		}
	});
	
router.route('/:name')
	.get(function (request, response) {
		// get a truck by name
		var truck = trucks.getTruck(request.params.name);

		// truck will be undefined if no food truck matches "name"
		if (!truck) {
			response.status(404).json("Truck '" + request.params.name + "' not found.");
		} else {
			response.status(200).json(truck);
		}
	})
	.put(function (request, response) {
		// update an existing truck
		var truck = trucks.getTruck(request.params.name);

		// truck will be undefined if no food truck matches "name"
		// Note: we are not allowing the user to change the "name" property
		// of a truck since we're using that as a key.
		if (!truck) {
			response.status(404).json("Truck '" + request.params.name + "' not found.");
		} else {
			response.status(200).json(truck);
		}
	})
	.delete(function (request, response) {
		// delete an existing truck
		var truckName = request.params.name;
		var truck = trucks.getTruck(truckName);

		// truck will be undefined if no food truck matches "name"
		if (!truck) {
			response.status(404).json("Truck '" + request.params.name + "' not found.");
		} else if (trucks.removeTruck(truckName)) {
			response.sendStatus(200);
		} else {
			response.sendStatus(204);
		}
	});

module.exports = router;
