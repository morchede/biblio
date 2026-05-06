import express from 'express';
const router = express.Router();

import { getLivres, getLivreByID, createLivre, updateLivre, deleteLivre } from '../controllers/livre.controller.js';
import { verifyToken, isAdmin } from '../middleware/authMiddleware.js';



/**
 * @route   GET /api/livres
 * @desc    Get All livres
 * @access  Public
 */
router.get('/', getLivres);

/**
 * @route   POST /api/livres
 * @desc    Ajouter un livre (Admin only)
 * @access  Admin
 */
router.post('/', verifyToken, isAdmin, createLivre);

/**
 * @route   GET /api/livres/:id
 * @desc    Renvoyer un livre
 * @access  Public
 */
router.get('/:id', getLivreByID);

/**
 * @route   PUT /api/livres/:id
 * @desc    Modifier un livre (Admin only)
 * @access  Admin
 */
router.put('/:id', verifyToken, isAdmin, updateLivre);

/**
 * @route  DELETE /api/livres/:id
 * @desc    Supprimer un livre (Admin only)
 * @access  Admin
 */
router.delete('/:id', verifyToken, isAdmin, deleteLivre);

export default router;
