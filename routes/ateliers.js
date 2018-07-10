var express = require('express');
var router = express.Router();

var atelier = require("../controllers/AtelierController");

//fonction de demande de login pour accès à la page
// function requireLogin (req, res, next) {
//     if (req.session && req.session.userId) {
//         next();
//     }else {
//         var err = new Error('error 404');
//         err.status = 401;
//         res.redirect('/');
//     }
// }


//recuperer les ateliers
// router.get("/", atelier.list);

//recuperer les ateliers active
router.get("/admin", atelier.listAdmins);

//cree un atelier
router.get("/create", atelier.create);

//sauvegarder un atelier. /!\ cest un POST 
router.post("/save", atelier.save);

//editer une atelier
router.get("/edit/:id", atelier.edit);

//editer une inscription pour un atelier
router.get("/inscription/:id", atelier.inscription);

//voir un machine par son id
router.get("/show/:id", atelier.show);


//edit update.  /!\ cest un POST 
router.post("/update/:id", atelier.update);


module.exports = router;