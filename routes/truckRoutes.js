// put your Express router code in here
var express = require('express');
var trucks = require('../trucks.js');
var truckList = trucks.getTrucks();
var truck;
var foodKind;
var app = express();
var router = express.Router();

app.param('type', function (request, response, next) {
  foodKind = request.params.type;
  var foodType = foodKind;
  request.foodType = foodType;
  next();
});

router.route('/')
    .get(function (request, response) {
      response.send(truckList);
    })
    .post(function (request, response) {
      var newTruck = request.body;
      if (newTruck) {
        trucks.addTruck(newTruck);
        response.status(201).send(newTruck);
      } else {
        response.status(400).send('Problem adding truck');
      }
    });
router.route('/:name')
   .get(function (request, response) {
     truck = request.params.name;
     var foodTruck = truck[0].toUpperCase() + truck.slice(1).toLowerCase();
     request.foodTruck = foodTruck;
     var truckData = trucks.getTruck(request.foodTruck);
     if (!truckData) {
       response.status(404).json('No food type found for ' + truck);
     } else {
       response.send(truckData);
     }
   })
    .delete(function (request, response) {
        //var id = request.params.id;
      var name = request.params.name;
      trucks.removeTruck(name);
      response.sendStatus(200);
    });


module.exports = router;
