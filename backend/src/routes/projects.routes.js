import { Router } from 'express';
import {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
} from '../controllers/projects.controller.js';
import { verifyJWT, verifyAdmin } from '../middlewares/auth.middleware.js';
import { uploadMiddleware } from '../middlewares/multer.middleware.js';

const router = Router();

// Public routes - Anyone can view projects
router.get('/', getAllProjects);
router.get('/:id', getProjectById);

// Protected routes - Only admin can create/update/delete
router.post('/', verifyJWT, verifyAdmin, uploadMiddleware.singleImage, createProject);
router.put('/:id', verifyJWT, verifyAdmin, uploadMiddleware.singleImage, updateProject);
router.delete('/:id', verifyJWT, verifyAdmin, deleteProject);

export default router;
