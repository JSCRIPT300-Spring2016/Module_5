var express = require('express');
var app = express();
var trucks = require('./trucks');
var truckRoutes = require('./routes/truckRoutes');

app.use(express.static('public'));

app.use('./trucks', truckRoutes);


app.listen(3000, function () {
  console.log('listening on port 3000');
});