import { Router } from 'express';
import passport from '../config/passport.js';
import {
    googleCallback,
    getCurrentUser,
    logoutUser,
    refreshAccessToken,
} from '../controllers/auth.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

// Google OAuth routes
router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
    })
);

router.get(
    '/google/callback',
    passport.authenticate('google', {
        failureRedirect: process.env.FRONTEND_URL || 'http://localhost:5173',
        session: false,
    }),
    googleCallback
);

// Protected routes
router.get('/current-user', verifyJWT, getCurrentUser);
router.post('/logout', verifyJWT, logoutUser);
router.post('/refresh-token', refreshAccessToken);

export default router;
