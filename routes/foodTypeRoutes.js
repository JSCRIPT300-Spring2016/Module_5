/*
	Scott Henderson
	JSCRIPT 300 A Spring 2016
*/

var express = require("express");
var trucks = require("../trucks");

// the Router method returns an instance which can be mounted as middle-ware
var router = express.Router();

// the path we mount the router on is relative to where it was mounted in app.js
router.route('/')
	.get(function (request, response) {
		// get a list of unique food types
		var foodTypeList = trucks.getFoodTypes();

		// getFoodTypes will return an empty array if nothing was found.
		if (foodTypeList.length <= 0) {
			response.status(404).send("No food types found!");
		} else {
			var formattedFoodList = "All available food types:<br><br>";

			foodTypeList.sort();
			for (var i = 0; i < foodTypeList.length; ++i) {
				formattedFoodList += foodTypeList[i] + "<br>";
			}
			response.send(formattedFoodList);
		}
	})
	
router.route('/:type')
	.get(function (request, response) {
		// get a list of trucks that serve a given food type
		var truckList = trucks.filterByFoodType(request.params.type);

		// truckList will be undefined if no food truck matches "type"
		if (!truckList) {
			response.status(404).json("No trucks found for food type '" +
				request.params.type + "'.");
		} else {
			var formattedTruckList = "Food trucks that serve " + request.params.type + ":<br><br>";

			truckList.sort();
			for (var i = 0; i < truckList.length; ++i) {
				formattedTruckList += truckList[i].name + "<br>";
			}
			response.send(formattedTruckList);
		}
	})

module.exports = router;
