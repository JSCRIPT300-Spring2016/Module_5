var express = require('express');
var trucks = require('../trucks');
var bodyParser = require('body-parser');
var router = express.Router();
var urlEncoded = bodyParser.urlencoded({ extended: false });

router.route('/')
  .get(function (request, response){
    var truckList = trucks.getTrucks();
  
    response.send(truckList);
})
.post(urlEncoded, function(request, response){
  var newTruck = trucks.addTruck(truck); 
  response.send(newTruck);
})

router.route('/:name') 
  .get(function(request, response){
  var truck = trucks.getTruck(request.params.name);
  response.send(truck);
})

.delete(function(request, response){
  var name = trucks.removeTruck(request.params.name);
});

module.exports = router;