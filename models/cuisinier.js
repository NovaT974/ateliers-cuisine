var mongoose = require('mongoose');

var CuisinierSchema = new mongoose.Schema({
    cuisiniername: { type: String, required: true},
    cuisiniersurname: { type: String, required: true },
    cuisinieremail: { type: String, required: true, index: { unique: true } },
    cuisinierspecial: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    passwordConfirmation: { type: String, required: true }
});

module.exports = mongoose.model("Cuisinier", CuisinierSchema);