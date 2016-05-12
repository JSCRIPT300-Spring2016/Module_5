var express = require('express');
var app = express();
//var trucks = require('./trucks');
var bodyParser = require('body-parser');
var truckRoutes = require('./routes/truckRoutes');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/trucks', truckRoutes);


app.listen(3000, function () {
  console.log('listening on port 3000');
});