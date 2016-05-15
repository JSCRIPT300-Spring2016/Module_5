/* implement your express server here
** Author: Fulin shen
** Created on: May 09, 2016
** Description:
*/

var express = require('express');
var app = express();
var trucks = require('./trucks');
var bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({ entended: true }));
app.use(bodyparser.json());
app.use(express.static('public'));

app.get('/trucks', function(request, response){
  response.status(200).json(trucks.getTrucks());
});

app.post('/trucks', function(request, response) {
  var newTruck = request.body;
  if(newTruck) {
    trucks.addTruck(newTruck);
    response.status(201).send(trucks.getTrucks());
  } else {
    response.status(400).send('problem on adding truck');
  }
});

app.get('/trucks/:name', function(request, response){
  var truckName = request.params.name;
  response.status(200).json(trucks.getTruck(truckName));
});

app.delete('/trucks/:name', function(request, response){
  var truckName = request.params.name;
  response.status(200).json(trucks.removeTruck(truckName));
});

app.get('/food-types', function(request, response){
  response.status(200).json(trucks.getFoodTypes());
});

app.get('/food-types/:type', function(request, response){
  var foodType = request.params.type;
  response.status(200).json(trucks.filterTrucksByFoodType(foodType));
});

app.listen(3000, function(){
  console.log('listening on port 3000');
});
