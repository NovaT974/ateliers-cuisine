var express = require('express');
var router = express.Router();

var atelier = require("../controllers/AtelierController");

//recuperer les machines
router.get("/", atelier.list);

//cree un atelier
router.get("/create", atelier.create);

//sauvegarder un atelier. /!\ cest un POST 
router.post("/save", atelier.save);

//editer une atelier
router.get("/edit/:id", atelier.edit);

//voir un machine par son id
router.get("/show/:id", atelier.show);

module.exports = router;