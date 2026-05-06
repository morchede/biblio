import mongoose from "mongoose"

import Livre from "../models/Livre.model.js";

var auteurSchema = mongoose.Schema({
    nomauteur: String,
    email: String,
    numtel: String
});
auteurSchema.pre('remove', async function(req,res,next) { 
    Livre.deleteMany({ auteurs: { $in: [this._id] } }, function(err) {})
        next();
     })
const Auteur = mongoose.model('Auteur', auteurSchema);
export default Auteur