import { Router } from 'express';
import { body } from 'express-validator';
import { authenticateJWT } from '../middleware/auth';
import passport from 'passport';
import { AuthController } from '../controllers/AuthController';

const router = Router();

// Validation middleware
const registerValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  body('firstName').trim().isLength({ min: 1 }).withMessage('First name is required'),
  body('lastName').trim().isLength({ min: 1 }).withMessage('Last name is required'),
];

const loginValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
];

// Register with email and password
router.post('/register', registerValidation, AuthController.register);

// Login with email and password
router.post('/login', loginValidation, AuthController.login);

// Google OAuth routes
router.get('/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  AuthController.googleCallback
);

// Refresh token
router.post('/refresh', AuthController.refreshToken);

// Logout
router.post('/logout', authenticateJWT, AuthController.logout);

export default router;