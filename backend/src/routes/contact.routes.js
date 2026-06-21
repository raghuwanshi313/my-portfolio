import { Router } from 'express';
import { sendContactMessage } from '../controllers/contact.controller.js';

const router = Router();

// Public route — anyone can send a contact message
router.post('/', sendContactMessage);

export default router;
