var express = require( 'express' );
var app = express();
var trucks = require( '../trucks' );
var router = express.Router();

router.route( '/' )
  .get( function( request, response ) {

    var allTrucks = trucks.getTrucks();

    response.send( allTrucks );
  })
  .post( function ( request, response ) {

    var newTruck = request.body;

    if ( newTruck ) {
      trucks.addTruck( newTruck );
      response.status( 201 ).send( newTruck );
    } else {
      response.status( 400 ).send( 'problem adding truck' );
    }
  });

router.route( '/:name' )
  .get( function( request, response ) {

    var truckName = request.params.name;
    var truck = trucks.getTruck( truckName );

    if ( truck ) {
      response.send( truck );
    }else {
      response.status( 404 ).json( 'truck not found' );
    }
  })
  .delete( function( request, response ) {

    var truckName = request.params.name;

    trucks.removeTruck( truckName );
    response.sendStatus( 200 );
  });

app.route( '/food-types' )
  .get( function( request, response ) {

    var foodList = trucks.getFoodTypes();

    response.send( foodList );
  });

app.route( '/food-types/:type' )
  .get( function( request, response ) {

    var foodType = request.params.type;
    var truckList = trucks.filterByFoodType( foodType );

    response.send( truckList );
  });

module.exports = router;