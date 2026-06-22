import { Router } from 'express';
import {
    getAllExperiences,
    getExperienceById,
    createExperience,
    updateExperience,
    deleteExperience,
} from '../controllers/experiences.controller.js';
import { verifyJWT, verifyAdmin } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = Router();

// Public routes
router.get('/', getAllExperiences);
router.get('/:id', getExperienceById);

// Protected routes (admin only)
router.post('/', verifyJWT, verifyAdmin, upload.single('company_logo'), createExperience);

router.put('/:id', verifyJWT, verifyAdmin, upload.single('company_logo'), updateExperience);

router.delete('/:id', verifyJWT, verifyAdmin, deleteExperience);

export default router;
