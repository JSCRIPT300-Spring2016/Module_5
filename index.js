/* implement your express server here
** Author: Fulin shen
** Created on: May 09, 2016
** updated on: May 21, 2016
** Description:
*/

var express = require('express');
var app = express();
var truckRouter = require('./routes/truckRoutes');
var foodTypeRouter = require('./routes/foodTypeRouters');


app.use(express.static('public'));
app.use('/trucks', truckRouter);
app.use('/food-types', foodTypeRouter);

app.listen(3000, function(){
  console.log('listening on port 3000');
});
