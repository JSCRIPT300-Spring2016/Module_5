/*eslint-env node*/

//express
var express = require('express');
var app = express();

//body parser
var bodyParser = require('body-parser');

//routes
var truckRoutes = require('./routes/truckRoutes');

//static
var serveStatic = express.static('public');

//middle stuff
app.use(serveStatic);
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/trucks', truckRoutes);

//start listening
app.listen(3000, function () {
    /* eslint-disable no-console */
  console.log('food trucks and stuff started: port 3000');
});