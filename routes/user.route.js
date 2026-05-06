import express from 'express';
import { createUser, getuserBYEmail, refreshToken, getUsers } from '../controllers/user.controller.js';
import { verifyToken, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', createUser);

router.post('/login', getuserBYEmail);

router.post('/refreshToken/', refreshToken);

router.get('/', verifyToken, isAdmin, getUsers);

/*
router.get('/user/:email&:password', function(request, response) {
    const email = request.params.email 
    const password = request.params.password 
    console.log("email : "+email+" password : "+password)
 });
*/
/*
router.get('/user/:nom&:email', async function(req, res) {
    const email = req.params.email 
    const nom = req.params.nom 
    try {
        const us = await User.find({nom:nom,email:email});
                
        res.status(200).json(us);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
    });
*/
export default router;
