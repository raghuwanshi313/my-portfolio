import { Router } from 'express';
import { getSkills, updateSkills, deleteSkills } from '../controllers/skills.controller.js';
import { verifyJWT, verifyAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

// Public route - Anyone can view skills
router.get('/', getSkills);

// Protected routes - Only admin can update/delete
router.put('/', verifyJWT, verifyAdmin, updateSkills);
router.delete('/', verifyJWT, verifyAdmin, deleteSkills);

export default router;
