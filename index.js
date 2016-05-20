var express = require('express');
var trucks = require('./trucks');
var truckRouter = require('./routes/truckRoutes');

var app = express();

app.use('/trucks', truckRouter);
app.use(express.static('public'));


app.get('/trucks', function(request, response){
  var truckList = trucks.getTrucks();
  
  response.send(truckList);
});

app.post('/trucks', function (request, response){
  var newTruck = trucks.addTruck(request.body);
  
  response.status(201).send(n)
});

app.get('/trucks/:name', function(request, response){
  var truck = trucks.getTruck(request.params.name);
  
  response.send(truck);
});

app.delete('/trucks/:name', function(request, response){
  var name = request.params.name;
  trucks.removeTruck(name);
  
  response.status(200).json('truck removed');
});

app.listen(3000, function (){
  console.log("listening");
});
