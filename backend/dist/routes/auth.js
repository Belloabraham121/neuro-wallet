"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../middleware/auth");
const rateLimiter_1 = require("../middleware/rateLimiter");
const passport_1 = __importDefault(require("passport"));
const AuthController_1 = require("../controllers/AuthController");
const router = (0, express_1.Router)();
const registerValidation = [
    (0, express_validator_1.body)('email').isEmail().normalizeEmail(),
    (0, express_validator_1.body)('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    (0, express_validator_1.body)('firstName').trim().isLength({ min: 1 }).withMessage('First name is required'),
    (0, express_validator_1.body)('lastName').trim().isLength({ min: 1 }).withMessage('Last name is required'),
];
const loginValidation = [
    (0, express_validator_1.body)('email').isEmail().normalizeEmail(),
    (0, express_validator_1.body)('password').notEmpty().withMessage('Password is required'),
];
router.post('/register', rateLimiter_1.authLimiter, registerValidation, AuthController_1.AuthController.register);
router.post('/login', rateLimiter_1.authLimiter, loginValidation, AuthController_1.AuthController.login);
router.get('/google', passport_1.default.authenticate('google', {
    scope: ['profile', 'email'],
}));
router.get('/google/callback', passport_1.default.authenticate('google', { session: false }), AuthController_1.AuthController.googleCallback);
router.post('/refresh', AuthController_1.AuthController.refreshToken);
router.post('/phone/send-code', rateLimiter_1.phoneVerificationLimiter, [
    (0, express_validator_1.body)('phoneNumber').isMobilePhone('any').withMessage('Valid phone number is required'),
], AuthController_1.AuthController.sendPhoneVerificationCode);
router.post('/phone/verify', rateLimiter_1.authLimiter, [
    (0, express_validator_1.body)('phoneNumber').isMobilePhone('any').withMessage('Valid phone number is required'),
    (0, express_validator_1.body)('verificationCode').isLength({ min: 4, max: 8 }).withMessage('Valid verification code is required'),
], AuthController_1.AuthController.verifyPhoneNumber);
router.post('/phone/login', rateLimiter_1.authLimiter, [
    (0, express_validator_1.body)('phoneNumber').isMobilePhone('any').withMessage('Valid phone number is required'),
    (0, express_validator_1.body)('verificationCode').isLength({ min: 4, max: 8 }).withMessage('Valid verification code is required'),
], AuthController_1.AuthController.phoneLogin);
router.post('/logout', auth_1.authenticateJWT, AuthController_1.AuthController.logout);
exports.default = router;
//# sourceMappingURL=auth.js.map