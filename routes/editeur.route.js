import express from 'express';
const router = express.Router();

import { getEditeurs, getEditeurByID, createEditeur, updateEditeur, deleteEditeur } from '../controllers/editeur.controller.js';
import { verifyToken, isAdmin } from '../middleware/authMiddleware.js';


/**
 * @route   GET /api/editeurs
 * @desc    Get All editeurs
 * @access  Public
 */
router.get('/', getEditeurs);



/**
 * @route   POST /api/editeurs
 * @desc    Ajouter un editeur (Admin only)
 * @access  Admin
 */
router.post('/', verifyToken, isAdmin, createEditeur);


/**
 * @route   GET /api/editeurs/:id
 * @desc    Renvoyer un editeur
 * @access  Public
 */
router.get('/:id', getEditeurByID);



/**
 * @route   PUT /api/editeurs/:id
 * @desc    Modifier un editeur (Admin only)
 * @access  Admin
 */
router.put('/:id', verifyToken, isAdmin, updateEditeur);


/**
 * @route  DELETE /api/editeurs/:id
 * @desc    Supprimer un editeur (Admin only)
 * @access  Admin
 */
router.delete('/:id', verifyToken, isAdmin, deleteEditeur);


export default router;

