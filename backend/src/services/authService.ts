import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../index';
import { logger } from '../config/logger';

export interface RegisterUserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginUserData {
  email: string;
  password: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface UserResponse {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  createdAt: Date;
}

export interface AuthResult {
  user: UserResponse;
  tokens: TokenPair;
}

export class AuthService {
  /**
   * Generate JWT access and refresh tokens
   */
  static generateTokens(userId: string): TokenPair {
    const accessToken = jwt.sign(
      { userId },
      process.env.JWT_SECRET as string,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' } as jwt.SignOptions
    );

    const refreshToken = jwt.sign(
      { userId },
      process.env.JWT_REFRESH_SECRET as string,
      { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d' } as jwt.SignOptions
    );

    return { accessToken, refreshToken };
  }

  /**
   * Hash password using bcrypt
   */
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = parseInt(process.env.BCRYPT_ROUNDS || '12');
    return await bcrypt.hash(password, saltRounds);
  }

  /**
   * Verify password against hash
   */
  static async verifyPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  /**
   * Create a new session
   */
  static async createSession(
    refreshToken: string,
    userId: string,
    ipAddress?: string,
    userAgent?: string
  ) {
    return await prisma.session.create({
      data: {
        token: refreshToken,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        userId,
        ipAddress,
        userAgent,
      },
    });
  }

  /**
   * Register a new user
   */
  static async registerUser(
    userData: RegisterUserData,
    ipAddress?: string,
    userAgent?: string
  ): Promise<AuthResult> {
    const { email, password, firstName, lastName } = userData;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error('USER_EXISTS');
    }

    // Hash password
    const hashedPassword = await this.hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
      },
    });

    // Generate tokens
    const tokens = this.generateTokens(user.id);

    // Create session
    await this.createSession(tokens.refreshToken, user.id, ipAddress, userAgent);

    logger.info(`User registered: ${user.email}`);

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

  /**
   * Login user with email and password
   */
  static async loginUser(
    loginData: LoginUserData,
    ipAddress?: string,
    userAgent?: string
  ): Promise<AuthResult> {
    const { email, password } = loginData;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      throw new Error('INVALID_CREDENTIALS');
    }

    // Verify password
    const isValidPassword = await this.verifyPassword(password, user.password);
    if (!isValidPassword) {
      throw new Error('INVALID_CREDENTIALS');
    }

    // Generate tokens
    const tokens = this.generateTokens(user.id);

    // Create session
    await this.createSession(tokens.refreshToken, user.id, ipAddress, userAgent);

    logger.info(`User logged in: ${user.email}`);

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

  /**
   * Refresh access token using refresh token
   */
  static async refreshToken(refreshToken: string): Promise<TokenPair> {
    try {
      // Verify refresh token
      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET as string
      ) as { userId: string };

      // Check if session exists and is valid
      const session = await prisma.session.findFirst({
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

      // Generate new tokens
      const tokens = this.generateTokens(session.userId);

      // Update session with new refresh token
      await prisma.session.update({
        where: { id: session.id },
        data: {
          token: tokens.refreshToken,
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      });

      return tokens;
    } catch (error) {
      throw new Error('INVALID_REFRESH_TOKEN');
    }
  }

  /**
   * Logout user by invalidating session
   */
  static async logoutUser(refreshToken: string): Promise<void> {
    await prisma.session.deleteMany({
      where: {
        token: refreshToken,
      },
    });

    logger.info('User logged out');
  }

  /**
   * Handle Google OAuth user creation/login
   */
  static async handleGoogleAuth(
    googleProfile: any,
    ipAddress?: string,
    userAgent?: string
  ): Promise<AuthResult> {
    const { id: googleId, emails, name } = googleProfile;
    const email = emails[0]?.value;

    if (!email) {
      throw new Error('Email not provided by Google');
    }

    // Check if social auth mapping exists
    let socialAuth = await prisma.socialAuthMapping.findUnique({
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
      // User exists with Google auth
      user = socialAuth.user;
    } else {
      // Check if user exists by email
      user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        // Create new user
        user = await prisma.user.create({
          data: {
            email,
            firstName: name?.givenName || null,
            lastName: name?.familyName || null,
          },
        });
        logger.info(`New Google user created: ${email}`);
      }

      // Create social auth mapping
      await prisma.socialAuthMapping.create({
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
      logger.info(`Google auth mapping created for user: ${email}`);
    }

    // Generate tokens
    const tokens = this.generateTokens(user.id);

    // Create session
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

  /**
   * Handle phone authentication
   */
  static async handlePhoneAuth(
    phoneNumber: string,
    ipAddress?: string,
    userAgent?: string
  ): Promise<AuthResult> {
    // Check if social auth mapping exists
    let socialAuth = await prisma.socialAuthMapping.findUnique({
      where: {
        provider_providerId: {
          provider: 'PHONE',
          providerId: phoneNumber,
        },
      },
      include: { user: true },
    });

    let user;

    if (socialAuth) {
      // User exists with phone auth
      user = socialAuth.user;
    } else {
      // Check if user exists by phone (assuming phone is stored in metadata or separate field)
      // For now, create new user since we don't have phone field in user model
      user = await prisma.user.create({
        data: {
          email: `${phoneNumber.replace('+', '')}@phone.local`, // Temporary email
          firstName: null,
          lastName: null,
        },
      });
      logger.info(`New phone user created: ${phoneNumber}`);

      // Create social auth mapping
      await prisma.socialAuthMapping.create({
        data: {
          provider: 'PHONE',
          providerId: phoneNumber,
          providerData: {
            phoneNumber,
          },
          isVerified: true,
          userId: user.id,
        },
      });
      logger.info(`Phone auth mapping created for user: ${phoneNumber}`);
    }

    // Generate tokens
    const tokens = this.generateTokens(user.id);

    // Create session
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