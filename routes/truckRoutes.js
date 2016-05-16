// put your Express router code in here
var stuffFromExpress = require('express');

// BodyParser is needed for reading POST data from client
var stuffFromBodyParser = require('body-parser');
var stuffFromTrucks = require('../trucks');

// the Router method returns an instance which can be mounted as middle-ware
var routerStuff = stuffFromExpress.Router();

// Notes: 'extended: false' because JSON is not needed.
routerStuff.use(stuffFromBodyParser.urlencoded({ extended: false }));

routerStuff.route('/')
  .get(function (request, response) {
    // This route returns the list of all trucks in the module.
    var truckList = stuffFromTrucks.getTrucks();
    response.send(truckList);
  })
  .post(function (request, response) {
    // This route adds a new truck object to the foodTrucks list.

    // truckToBeAdded contains the data from the client's form
    var truckToBeAdded = request.body;
    var addedTruck = stuffFromTrucks.addTruck(truckToBeAdded);

    if (!addedTruck) {
      response.status(400).json('Problem adding truck');
    } else {
      response.status(201).send(addedTruck);
    }
  });

/*************************************************************************
* Description: Map a placeholder variable to a callback which uses
*              the route '<routeIdentifier>/:name'
*************************************************************************/
routerStuff.param('name', function (request, response, next) {
  var objName = request.params.name;

  // Normalize the name of the object.
  request.objectName = objName[0].toUpperCase() +
    objName.slice(1).toLowerCase();

  next();
});

routerStuff.route('/:name')
  .get(function (request, response) {
    // This route returns a single truck object that matches the
    // name parameter passed in the route.

    // Creating the request's objectName property
    var truckName = request.objectName;
    var truck = stuffFromTrucks.getTruck(truckName);

    if (!truck) {
      response.status(404).json('No truck found with the name: ' + truckName);
    } else {
      response.send(truck);
    }
  })
  .delete(function (request, response) {
    // This route deletes the specified truck object from the foodTrucks list.
    var truckName = request.params.name;

    if (stuffFromTrucks.removeTruck(truckName)) {
      response.sendStatus(200);
    } else {
      response.status(400).json('Problem deleting truck');
    }
  });

module.exports = routerStuff;
