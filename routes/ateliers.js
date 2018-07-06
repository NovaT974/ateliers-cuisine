var express = require('express');
var router = express.Router();

var atelier = require("../controllers/AtelierController");


//cree un atelier
router.get("/create", atelier.create);

//sauvegarder un atelier. /!\ cest un POST 
router.post("/save", atelier.save);

//voir un machine par son id
router.get("/show/:id", atelier.show);

module.exports = router;