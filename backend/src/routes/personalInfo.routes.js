import { Router } from 'express';
import {
    getPersonalInfo,
    updatePersonalInfo,
    deletePersonalInfo,
} from '../controllers/personalInfo.controller.js';
import { verifyJWT, verifyAdmin } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = Router();

// Public route
router.get('/', getPersonalInfo);

// Protected routes (admin only)
router.put(
    '/',
    verifyJWT,
    verifyAdmin,
    upload.fields([
        { name: 'profile_image', maxCount: 1 },
        { name: 'cv', maxCount: 1 },
    ]),
    updatePersonalInfo
);

router.delete('/', verifyJWT, verifyAdmin, deletePersonalInfo);

export default router;
