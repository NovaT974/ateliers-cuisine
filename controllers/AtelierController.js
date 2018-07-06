var mongoose = require('mongoose');

var Atelier = require("../models/Atelier");

var atelierController = {};



//redirection à la page de creation de machine
atelierController.create = function(req, res){
    res.render("../views/atelier/create");
}; 

//enregistrement des machines
atelierController.save = function(req, res){
    var atelier = new atelier(req.body);

    atelier.save(function(err){
        if(err){
            console.log(err);
            res.render("../views/atelier/create");
        } else{
            console.log("creation atelier OK");
            res.redirect("/ateliers/show/" + atelier._id);
        } 
    });
};

//export du module
module.exports = atelierController;