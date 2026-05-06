import express from 'express';
const router = express.Router();

import { getAuteurs, getAuteurByID, createAuteur, updateAuteur, deleteAuteur } from '../controllers/auteur.controller.js';
import { verifyToken, isAdmin } from '../middleware/authMiddleware.js';


/**
 * @route   GET /api/auteurs
 * @desc    Get All auteurs
 * @access  Public
 */
router.get('/', getAuteurs);



/**
 * @route   POST /api/auteurs
 * @desc    Ajouter un auteur (Admin only)
 * @access  Admin
 */
router.post('/', verifyToken, isAdmin, createAuteur);


/**
 * @route   GET /api/auteurs/:id
 * @desc    Renvoyer un auteur
 * @access  Public
 */
router.get('/:id', getAuteurByID);



/**
 * @route   PUT /api/auteurs/:id
 * @desc    Modifier un auteur (Admin only)
 * @access  Admin
 */
router.put('/:id', verifyToken, isAdmin, updateAuteur);


/**
 * @route  DELETE /api/auteurs/:id
 * @desc    Supprimer un auteur (Admin only)
 * @access  Admin
 */
router.delete('/:id', verifyToken, isAdmin, deleteAuteur);


export default router;

