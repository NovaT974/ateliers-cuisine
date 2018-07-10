var mongoose = require('mongoose');

var AtelierSchema = new mongoose.Schema({
    titre: String,
    description: String,
    date: Date,
    horaire: String,
    duree: Number,
    place_disponible: Number,
    place_reserve: Number,
    prix: Number,
    image: String,
    active: String
});

module.exports = mongoose.model("Atelier", AtelierSchema);