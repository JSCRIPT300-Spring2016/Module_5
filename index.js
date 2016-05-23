// implement your express server here

var express = require('express');
var bodyparser = require('body-parser');
var app = express();

var trucks = require('./trucks');
var truckRoutes = require('./routes/truckRoutes');
var foodTypeRoutes = require('./routes/foodTypeRoutes');

app.use(express.static('public'));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use('/trucks', truckRoutes);
app.use('/food-types', foodTypeRoutes);

app.listen(3000, function() {
  console.log('3000');
});
