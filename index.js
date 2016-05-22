// implement your express server here
var express = require("express");
var truckRouter = require("./routes/truckRoutes");
var app = express();
 
app.use(express.static("public"));
app.use("/trucks", truckRouter);

app.listen(3000, function() {
    // eslint-disable-next-line no-console
    console.log("Listening on port 3000");
});

