import express from 'express';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from 'cors';
import auteurRouter from "./routes/auteur.route.js";
import editeurRouter from "./routes/editeur.route.js";
import specialiteRouter from "./routes/specialite.route.js";
import livreRouter from "./routes/livre.route.js";
import userRouter from "./routes/user.route.js";
dotenv.config();
const app = express();
import paymentRoute from './routes/payment.route.js';


app.use(express.json());

app.use(cors({
  origin: 'https://biblio-29afe.web.app',
  credentials: true
}));
app.use('/api/payment', paymentRoute);
// Connexion à la base données
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(() => {console.log("Connexion à la base de données réussie");
   }).catch(err => {
    console.log('Impossible de se connecter à la base de données', err);
    process.exit();
   });

app.use('/api/auteurs', auteurRouter);

app.use('/api/editeurs', editeurRouter);

app.use('/api/specialites', specialiteRouter);

app.use('/api/livres', livreRouter);

app.use('/api/users', userRouter);

app.get("/",(req,res)=>{
res.send("Bibliothèque");
});

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is listening on port ${process.env.PORT}`); });

