var express = require('express');
var router = express.Router();

var atelier = require("../controllers/AtelierController");

// fonction de demande de login pour accès à la page
function requireLogin (req, res, next) {
    if (req.session && req.session.userId) {
        next();
    }else {
        var err = new Error('error 404');
        err.status = 401;
        res.redirect('/');
        console.log('TU N AS PAS LE DROIT !!');
    }
}


//recuperer les ateliers
// router.get("/", atelier.list);

//recuperer les ateliers active
router.get("/admin",requireLogin, atelier.listAdmins);

//cree un atelier
router.get("/create",requireLogin, atelier.create);

//sauvegarder un atelier. /!\ cest un POST 
router.post("/save", atelier.save);

//editer une atelier
router.get("/edit/:id",requireLogin, atelier.edit);

//editer une inscription pour un atelier
router.get("/inscription/:id",requireLogin, atelier.inscription);

//voir un machine par son id
router.get("/show/:id",requireLogin, atelier.show);

//edit update.  /!\ cest un POST 
router.post("/update/:id", atelier.update);


//edit update pour les place reservé.  /!\ cest un POST 
router.post("/saveInscription/:id", atelier.saveInscription);


module.exports = router;