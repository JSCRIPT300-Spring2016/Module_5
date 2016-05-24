var express = require('express');
var bodyParser = require('body-parser');

var trucks = require('../trucks');

var urlEncoded = bodyParser.urlencoded({ extended: false });

var router = express.Router();

router.route('/')
  .get(function(request, response){
    var truckList = trucks.getTrucks();
  
    response.send(truckList);
})
  .post(urlEncoded, function(request, response){
    var newTruck = trucks.addTruck(request.body);
  
    response.status(201).send(newTruck);
});

router.route('/:name') 
  .get(function(request, response){
  var truck = trucks.getTruck(request.params.name);
  
  response.send(truck);
})

.delete(function(request, response){
  var name = request.params.name;
  
  trucks.removeTruck(name);
  
  response.status(200).json('truck removed');
});

module.exports = router;