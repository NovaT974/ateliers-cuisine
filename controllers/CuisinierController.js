var mongoose = require('mongoose');
var Cuisinier = require("../models/cuisinier");
var CuisinierController = {};


//Affichier le formulaire d'inscription
CuisinierController.list = function (req, res) {
  res.render("../views/cuisinier/index");
};

// Créer un login
CuisinierController.create = function(req, res){
  res.render("../views/cuisinier/create");
}; 

CuisinierController.save = function (req, res) {
  if (req.body.cuisiniername &&
    req.body.cuisiniersurname &&
    req.body.cuisinieremail &&
    req.body.cuisinierspecial &&
    req.body.password &&
    req.body.passwordConfirmation) {
     
;    var cuisinier = new Cuisinier(req.body);

cuisinier.save(function (err) {
      if (err) {
        console.log(err);
        res.render("../views/cuisinier/create");
      } else {
        console.log("login OK");
        res.redirect("/cuisiniersSession");
      }
    });
  };
}
  //export du module
  module.exports = CuisinierController;