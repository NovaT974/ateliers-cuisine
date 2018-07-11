var express = require('express');
var router = express.Router();
var path = require('path');
var multer = require('multer');
var atelier = require("../controllers/AtelierController");

// fonction pour l'ajout image
var storage = multer.diskStorage({
    destination: function(req, file, cb){
      cb(null,__dirname + "/../public/img/")
    },
    filename: function(req, file, cb){
      cb(null,file.originalname);
    }
  });
  
  // Init Upload
  var upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
    fileFilter: function(req, file, cb){
      checkFileType(file, cb);
    }
  });
  
  // Check File Type
  function checkFileType(file, cb){
    // Allowed ext
    var filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    var mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb('Error: Images Only!');
    }
  }

//recuperer les ateliers
// router.get("/", atelier.list);

//recuperer les ateliers active
router.get("/admin", atelier.listAdmins);

//cree un atelier
router.get("/create", atelier.create);

//sauvegarder un atelier. /!\ cest un POST 
router.post("/save",upload.single('image2'), atelier.save);

//editer une atelier
router.get("/edit/:id", atelier.edit);

//editer une inscription pour un atelier
router.get("/inscription/:id", atelier.inscription);

//voir un machine par son id
router.get("/show/:id", atelier.show);


//edit update.  /!\ cest un POST 
router.post("/update/:id",upload.single('image2'), atelier.update);


module.exports = router;