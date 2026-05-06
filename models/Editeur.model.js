import mongoose from "mongoose"

import Livre from "../models/Livre.model.js";

var editeurSchema = mongoose.Schema({
    maisonedit: String,
    siteweb: String,
    email: String
});
editeurSchema.pre('remove', async function(req,res,next) { 
    Livre.deleteMany({ maised: { $in: [this._id] } }, function(err) {})
        next();
     })
const Editeur = mongoose.model('Editeur', editeurSchema);
export default Editeur