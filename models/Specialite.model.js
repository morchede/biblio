import mongoose from "mongoose"

import Livre from "../models/Livre.model.js";

var specialiteSchema = mongoose.Schema({
    nomspecialite: String
});
specialiteSchema.pre('remove', async function(req,res,next) { 
    Livre.deleteMany({ specialite: { $in: [this._id] } }, function(err) {})
        next();
     })
const Specialite = mongoose.model('Specialite', specialiteSchema);
export default Specialite