var express = require('express');
var router = express.Router();

var cuisinier = require("../controllers/CuisinierController");

//recuperer la liste des cuisinier
router.get("/", cuisinier.list);

// //creer un login
router.get("/ajoutcuisinier", cuisinier.create);

//creer un login
router.post("/save", cuisinier.save);

// route vers  fonction authentification
router.post('/auth', cuisinier.auth);

//export du module router
module.exports = router;