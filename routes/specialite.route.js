import express from 'express';
const router = express.Router();

import { getSpecialites, getSpecialiteByID, createSpecialite, updateSpecialite, deleteSpecialite } from '../controllers/specialite.controller.js';
import { verifyToken, isAdmin } from '../middleware/authMiddleware.js';


/**
 * @route   GET /api/specialites
 * @desc    Get All specialites
 * @access  Public
 */
router.get('/', getSpecialites);



/**
 * @route   POST /api/specialites
 * @desc    Ajouter une specialite (Admin only)
 * @access  Admin
 */
router.post('/', verifyToken, isAdmin, createSpecialite);


/**
 * @route   GET /api/specialites/:id
 * @desc    Renvoyer une specialite
 * @access  Public
 */
router.get('/:id', getSpecialiteByID);



/**
 * @route   PUT /api/specialites/:id
 * @desc    Modifier une specialite (Admin only)
 * @access  Admin
 */
router.put('/:id', verifyToken, isAdmin, updateSpecialite);


/**
 * @route  DELETE /api/specialites/:id
 * @desc    Supprimer une specialite (Admin only)
 * @access  Admin
 */
router.delete('/:id', verifyToken, isAdmin, deleteSpecialite);


export default router;

