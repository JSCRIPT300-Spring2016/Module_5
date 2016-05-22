// put your Express router code in here
var express = require("express");
var bodyparser = require("body-parser");
var trucks = require("../trucks");
var urlEncoded = bodyparser.urlencoded({ extended: false });
var router = express.Router();

router.route("/")
    .get(function(request, response) {
        var truckArray = trucks.getTrucks();
        response.status(200).send(truckArray);
    })
    .post(urlEncoded, function(request, response) {
        var newTruck =  trucks.addTruck(request.body);
        response.status(201).send(newTruck);
    });

router.route("/:name")
    .get(function(request, response) {
        var name = request.params.name;
        var truck = trucks.getTruck(name);
        if (truck.length > 0) {
            response.status(200).send(truck);
        } else {
            var err = "ERROR (404) Truck <" + name + "> not found.";
            response.status(404).json(err);
        }
    })
   .delete(function (request, response) {
       var name = request.params.name;
       var result = trucks.removeTruck(name);
       if (result) {
           response.sendStatus(200);
       } else {
           var err = "ERROR (404) Truck <" + name + "> not found.";
           response.status(404).json(err);
       }
   });

module.exports = router;

