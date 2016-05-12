var express = require('express');
var app = express();

var bodyparser = require('body-parser');
var truckRoutes = require('./routes/truckRoutes');

app.use(express.static('public'));
app.use(bodyparser.urlencoded({ extended: false }));

app.use('/trucks', truckRoutes);

app.listen(3000, function () {
  console.log('listening on port 3000');
});

