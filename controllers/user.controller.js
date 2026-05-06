import User from '../models/User.model.js';

import  jwt  from "jsonwebtoken";

import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  const{nom,email,password}=req.body;
  const salt=await bcrypt.genSalt(10);
  const hash=await bcrypt.hash(password,salt);
  const newUser=new User({
    nom:nom,
    email:email,
    password:hash,
      });
  try {
         await newUser.save();
 
         res.status(201).json(newUser );
     } catch (error) {
         res.status(409).json({ message: error.message });
     }
 }

 const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '60s' }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );
};

export const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token manquant' });
  }

  try {
    const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const accessToken = generateAccessToken(user);
    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(403).json({ message: 'Refresh token invalide' });
  }
};

export const getuserBYEmail = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ message: 'Utilisateur non existant' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Mot de passe incorrect' });
      }
  
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
  
      res.status(200).json({
        accessToken,
        refreshToken,
        user: {
          id: user._id,
          nom: user.nom,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
  
