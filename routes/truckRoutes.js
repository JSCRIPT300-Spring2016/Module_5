var express = require('express');
var bodyParser = require('body-parser');
var urlEncoded = bodyParser.urlencoded({ extend: false });
var router = express.Router();
var trucks = require('../trucks');



router.route('/trucks')
  .get(function(req, res){
    res.send(trucks.getTrucks());
  })
  .post(urlEncoded, function(req, res){
    var newTruck = req.body;
    if (newTruck){
      res.send(trucks.addTruck(req.body));
    } else {
      res.status(400).send("error");
    }

  });


router.route('/trucks/:name')
  .get(function(req, res){
    var truck = req.params.name;
    var foodtruck = trucks.getTruck(truck);
    res.send(foodtruck);
  })
  .delete(function(req, res){
    var truck = req.params.name;
    trucks.removeTruck(truck);
    res.status(200);
  });

router.route('/food-types')
  .get(function(req, res){
    res.send(trucks.getFoodTypes());
  });

router.param('type', function(req, res, next, type){
  var type = req.params.type;
  var food = type[0].toUpperCase() + type.slice(1).toLowerCase();
  var foodtype = trucks.filterByFoodType(food);
  req.foodtype = foodtype;
});


router.route('/food-types/:type')
  .get(function(req, res){
    res.send(req.foodtype);
  });


module.exports = router;


