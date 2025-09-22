"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../index");
const logger_1 = require("../config/logger");
class AuthService {
    static generateTokens(userId) {
        const accessToken = jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
        const refreshToken = jsonwebtoken_1.default.sign({ userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d' });
        return { accessToken, refreshToken };
    }
    static async hashPassword(password) {
        const saltRounds = parseInt(process.env.BCRYPT_ROUNDS || '12');
        return await bcryptjs_1.default.hash(password, saltRounds);
    }
    static async verifyPassword(password, hash) {
        return await bcryptjs_1.default.compare(password, hash);
    }
    static async createSession(refreshToken, userId, ipAddress, userAgent) {
        return await index_1.prisma.session.create({
            data: {
                token: refreshToken,
                expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                userId,
                ipAddress,
                userAgent,
            },
        });
    }
    static async registerUser(userData, ipAddress, userAgent) {
        const { email, password, firstName, lastName } = userData;
        const existingUser = await index_1.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            throw new Error('USER_EXISTS');
        }
        const hashedPassword = await this.hashPassword(password);
        const user = await index_1.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName,
                lastName,
            },
        });
        const tokens = this.generateTokens(user.id);
        await this.createSession(tokens.refreshToken, user.id, ipAddress, userAgent);
        logger_1.logger.info(`User registered: ${user.email}`);
        return {
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                createdAt: user.createdAt,
            },
            tokens,
        };
    }
    static async loginUser(loginData, ipAddress, userAgent) {
        const { email, password } = loginData;
        const user = await index_1.prisma.user.findUnique({
            where: { email },
        });
        if (!user || !user.password) {
            throw new Error('INVALID_CREDENTIALS');
        }
        const isValidPassword = await this.verifyPassword(password, user.password);
        if (!isValidPassword) {
            throw new Error('INVALID_CREDENTIALS');
        }
        const tokens = this.generateTokens(user.id);
        await this.createSession(tokens.refreshToken, user.id, ipAddress, userAgent);
        logger_1.logger.info(`User logged in: ${user.email}`);
        return {
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                createdAt: user.createdAt,
            },
            tokens,
        };
    }
    static async refreshToken(refreshToken) {
        try {
            const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
            const session = await index_1.prisma.session.findFirst({
                where: {
                    token: refreshToken,
                    expiresAt: {
                        gt: new Date(),
                    },
                },
                include: {
                    user: true,
                },
            });
            if (!session) {
                throw new Error('INVALID_REFRESH_TOKEN');
            }
            const tokens = this.generateTokens(session.userId);
            await index_1.prisma.session.update({
                where: { id: session.id },
                data: {
                    token: tokens.refreshToken,
                    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                },
            });
            return tokens;
        }
        catch (error) {
            throw new Error('INVALID_REFRESH_TOKEN');
        }
    }
    static async logoutUser(refreshToken) {
        await index_1.prisma.session.deleteMany({
            where: {
                token: refreshToken,
            },
        });
        logger_1.logger.info('User logged out');
    }
    static async handleGoogleAuth(googleProfile, ipAddress, userAgent) {
        const { id: googleId, emails, name } = googleProfile;
        const email = emails[0]?.value;
        if (!email) {
            throw new Error('Email not provided by Google');
        }
        let socialAuth = await index_1.prisma.socialAuthMapping.findUnique({
            where: {
                provider_providerId: {
                    provider: 'GOOGLE',
                    providerId: googleId,
                },
            },
            include: { user: true },
        });
        let user;
        if (socialAuth) {
            user = socialAuth.user;
        }
        else {
            user = await index_1.prisma.user.findUnique({
                where: { email },
            });
            if (!user) {
                user = await index_1.prisma.user.create({
                    data: {
                        email,
                        firstName: name?.givenName || null,
                        lastName: name?.familyName || null,
                    },
                });
                logger_1.logger.info(`New Google user created: ${email}`);
            }
            await index_1.prisma.socialAuthMapping.create({
                data: {
                    provider: 'GOOGLE',
                    providerId: googleId,
                    providerData: {
                        email,
                        name: name || {},
                    },
                    isVerified: true,
                    userId: user.id,
                },
            });
            logger_1.logger.info(`Google auth mapping created for user: ${email}`);
        }
        const tokens = this.generateTokens(user.id);
        await this.createSession(tokens.refreshToken, user.id, ipAddress, userAgent);
        return {
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                createdAt: user.createdAt,
            },
            tokens,
        };
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=authService.js.map