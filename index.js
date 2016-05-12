/*
	Scott Henderson
	JSCRIPT 300 A Spring 2016
*/

var express = require("express");
var bodyParser = require("body-parser");
var truckRoutes = require("./routes/truckRoutes");
var foodTypeRoutes = require("./routes/foodTypeRoutes");

var app = express();

// a middle-ware function without a "mount" path gets executed on every request
app.use(function (request, response, next) {
	console.log("Time: ", Date.now());
	next();
}, function (request, response, next) {
	console.log("Request URL: ", request.originalUrl);
	next();
});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

// [foodT|t]ruckRoutes is now a middle-ware callback
app.use("/trucks", truckRoutes);
app.use("/food-types", foodTypeRoutes);

// extra challenge: add a put route to allow updates, add another form to the html to allow user to edit existing truck data
// store data in a database instead of in the foodTrucks list in trucks.js

// start the server
app.listen(3000, function () {
	console.log("server started on port 3000");
});
