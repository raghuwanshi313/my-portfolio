import { Router } from 'express';
import {
    getAllCodingProfiles,
    getCodingProfileById,
    createCodingProfile,
    updateCodingProfile,
    deleteCodingProfile,
} from '../controllers/codingProfiles.controller.js';
import { verifyJWT, verifyAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

// Public routes
router.get('/', getAllCodingProfiles);
router.get('/:id', getCodingProfileById);

// Protected routes (admin only)
router.post('/', verifyJWT, verifyAdmin, createCodingProfile);
router.put('/:id', verifyJWT, verifyAdmin, updateCodingProfile);
router.delete('/:id', verifyJWT, verifyAdmin, deleteCodingProfile);

export default router;
