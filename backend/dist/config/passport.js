"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_jwt_1 = require("passport-jwt");
const index_1 = require("../index");
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let socialAuth = await index_1.prisma.socialAuthMapping.findUnique({
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
            return done(null, socialAuth.user);
        }
        const email = profile.emails?.[0]?.value;
        if (!email) {
            return done(new Error("No email found in Google profile"), false);
        }
        let user = await index_1.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            user = await index_1.prisma.user.create({
                data: {
                    email,
                    firstName: profile.name?.givenName,
                    lastName: profile.name?.familyName,
                },
            });
        }
        await index_1.prisma.socialAuthMapping.create({
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
    }
    catch (error) {
        return done(error, false);
    }
}));
passport_1.default.use(new passport_jwt_1.Strategy({
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
}, async (payload, done) => {
    try {
        const user = await index_1.prisma.user.findUnique({
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
    }
    catch (error) {
        return done(error, false);
    }
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser(async (id, done) => {
    try {
        const user = await index_1.prisma.user.findUnique({
            where: { id },
        });
        done(null, user);
    }
    catch (error) {
        done(error, null);
    }
});
exports.default = passport_1.default;
//# sourceMappingURL=passport.js.map