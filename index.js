// implement your express server here
//Emma Luk
//Assignment-5
//npm install
//npm install -g nodemon    // not working 
//cd emma\cv\study\washington.edu\JavaScript3\Module 5\assignments-5
//node index
//  http://127.0.0.1:3000/
//ref: REST_APIs_pt2.pdf

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var trucksRoutes = require('./routes/truckRoutes');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

// the bookRoutes is now a middle-ware callback
app.use('/trucks', trucksRoutes);

app.listen(3000, function () {
    console.log('listening on port 3000');
})