//  in this file create an express application - use the middle-ware built into express
//  to serve up static files from the public directory (index.html and client.js - you
//  can also serve up css files from the public directory this way if you want)
//  you need to support a '/trucks' endpoint, and a dynamic route for '/trucks/:name'
var stuffFromExpress = require('express');
var stuffFromTruckRoutes = require('./routes/truckRoutes');
var stuffFromTrucks = require('./trucks');
var app = stuffFromExpress();

// to use the "static" middle-ware, we call it from our express object
var serveStatic = stuffFromExpress.static('public');

// this will allow us to serve up static files from "public"
app.use(serveStatic);

// Use the truck routes middle-ware for all route handlers with the
// routes '/trucks' and '/trucks/:name'
app.use('/trucks', stuffFromTruckRoutes);

/*************************************************************************
* Description: Map a placeholder variable to a callback which uses
*              the route '<routeIdentifier>/:type'
*************************************************************************/
app.param('type', function (request, response, next) {
  var objType = request.params.type;

  // Normalize the name of the object.
  request.objectType = objType[0].toUpperCase() +
    objType.slice(1).toLowerCase();

  next();
});

/*************************************************************************
* Description: This route returns the list of all trucks that serve the
*              food type that matches (case insensitive) the type parameter
*              passed in the route.
*************************************************************************/
app.get('/food-types/:type', function (request, response) {
  // Creating the request's objectType property
  var foodType = request.objectType;
  var truckList = stuffFromTrucks.filterTrucksByFoodType(foodType);

  if (!truckList) {
    response.status(404).json('No trucks found with the food type: ' + foodType);
  } else {
    response.send(truckList);
  }
});

/*************************************************************************
* Description: This route returns the list of all possible food types served
*              by trucks in the module.
*************************************************************************/
app.get('/food-types', function (request, response) {
  var foodTypeList = stuffFromTrucks.getFoodTypes();
  response.send(foodTypeList);
});

app.listen(3000, function () {});