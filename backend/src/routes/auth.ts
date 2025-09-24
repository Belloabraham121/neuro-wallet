import { Router } from 'express';
import { body } from 'express-validator';
import { authenticateJWT } from '../middleware/auth';
import { authLimiter, phoneVerificationLimiter } from '../middleware/rateLimiter';
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
router.post('/register', authLimiter, registerValidation, AuthController.register);

// Login with email and password
router.post('/login', authLimiter, loginValidation, AuthController.login);

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

// Phone authentication routes
router.post('/phone/send-code', phoneVerificationLimiter, [
  body('phoneNumber').isMobilePhone('any').withMessage('Valid phone number is required'),
], AuthController.sendPhoneVerificationCode);

router.post('/phone/verify', authLimiter, [
  body('phoneNumber').isMobilePhone('any').withMessage('Valid phone number is required'),
  body('verificationCode').isLength({ min: 4, max: 8 }).withMessage('Valid verification code is required'),
], AuthController.verifyPhoneNumber);

router.post('/phone/login', authLimiter, [
  body('phoneNumber').isMobilePhone('any').withMessage('Valid phone number is required'),
  body('verificationCode').isLength({ min: 4, max: 8 }).withMessage('Valid verification code is required'),
], AuthController.phoneLogin);

// Logout
router.post('/logout', authenticateJWT, AuthController.logout);

export default router;