import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { prisma } from "../index";

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists with this Google ID
        let socialAuth = await prisma.socialAuthMapping.findUnique({
          where: {
            provider_providerId: {
              provider: "GOOGLE",
              providerId: profile.id,
            },
          },
          include: {
            user: true,
          },
        });

        if (socialAuth) {
          // User exists, return the user
          return done(null, socialAuth.user);
        }

        // Check if user exists with the same email
        const email = profile.emails?.[0]?.value;
        if (!email) {
          return done(new Error("No email found in Google profile"), false);
        }

        let user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          // Create new user
          user = await prisma.user.create({
            data: {
              email,
              firstName: profile.name?.givenName,
              lastName: profile.name?.familyName,
            },
          });
        }

        // Create social auth mapping
        await prisma.socialAuthMapping.create({
          data: {
            provider: "GOOGLE",
            providerId: profile.id,
            providerData: {
              accessToken,
              refreshToken,
              profile: {
                id: profile.id,
                displayName: profile.displayName,
                emails: profile.emails,
                photos: profile.photos,
              },
            },
            isVerified: true,
            userId: user.id,
          },
        });

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

// JWT Strategy
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET!,
    },
    async (payload, done) => {
      try {
        const user = await prisma.user.findUnique({
          where: { id: payload.userId },
          include: {
            apiKeys: {
              where: { isActive: true },
              select: { id: true, name: true, permissions: true },
            },
          },
        });

        if (user && user.isActive) {
          return done(null, user);
        }

        return done(null, false);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

// Serialize user for session
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
