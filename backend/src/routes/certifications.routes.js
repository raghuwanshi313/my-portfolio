import { Router } from 'express';
import {
    getAllCertifications,
    getCertificationById,
    createCertification,
    updateCertification,
    deleteCertification,
} from '../controllers/certifications.controller.js';
import { verifyJWT, verifyAdmin } from '../middlewares/auth.middleware.js';
import { uploadMiddleware } from '../middlewares/multer.middleware.js';

const router = Router();

// Public routes - Anyone can view certifications
router.get('/', getAllCertifications);
router.get('/:id', getCertificationById);

// Protected routes - Only admin can create/update/delete
router.post('/', verifyJWT, verifyAdmin, uploadMiddleware.singleImage, createCertification);
router.put('/:id', verifyJWT, verifyAdmin, uploadMiddleware.singleImage, updateCertification);
router.delete('/:id', verifyJWT, verifyAdmin, deleteCertification);

export default router;
