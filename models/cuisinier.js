var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

//création d'un nouveau schéma 
var CuisinierSchema = new mongoose.Schema({
    cuisiniername: { type: String, required: true},
    cuisiniersurname: { type: String, required: true },
    cuisinieremail: { type: String, required: true, index: { unique: true } },
    cuisinierspecial: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    passwordConfirmation: { type: String, required: true }
});


//hashing a password before saving it to the database
CuisinierSchema.pre('save', function (next) {
    var cuisinier = this;
    bcrypt.hash(cuisinier.password, 10, function (err, hash){
      if (err) {
        return next(err);
      }
      cuisinier.password = hash;
      next();
    })
  });

module.exports = mongoose.model("Cuisinier", CuisinierSchema);