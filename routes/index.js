var express = require('express');
var router = express.Router();

var atelier = require("../controllers/AtelierController");

/* GET home page. */
router.get('/', atelier.list, function(req, res, next) {
  res.render('index', { title: 'Ateliers de cuisine',ateliers:req.body.ateliers });
});

module.exports = router;
