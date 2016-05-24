var express = require('express');

var truckRouter = require('./routes/truckRoutes');

var app = express();

app.use(express.static('public'));

app.use('/trucks', truckRouter)

app.listen(3000, function(){
  console.log("listening");
});
