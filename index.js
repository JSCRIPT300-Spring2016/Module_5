var express = require( 'express' );
var app = express();
var serveStatic = express.static( 'public' );
var bodyparser = require( 'body-parser' );
var truckRouter = require( './routes/truckRoutes' );

app.use( serveStatic );
app.use( bodyparser.urlencoded({ extended: false }) );
app.use( bodyparser.json() );

app.use( '/trucks', truckRouter );

app.listen( 3000, function() {
  console.log('server started on port 3000');
});