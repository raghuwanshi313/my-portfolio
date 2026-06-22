import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../models/user.models.js';

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

// Called explicitly after dotenv is loaded so env vars are available
export const initPassport = () => {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: process.env.GOOGLE_CALLBACK_URL || '/api/v1/auth/google/callback',
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    // Check if user already exists
                    let user = await User.findOne({ googleId: profile.id });

                    if (!user) {
                        // Check if this is the allowed admin email
                        const allowedEmail = process.env.ADMIN_EMAIL;

                        if (profile.emails[0].value !== allowedEmail) {
                            return done(null, false, { message: 'Unauthorized access' });
                        }

                        // Create new user (admin)
                        user = await User.create({
                            name: profile.displayName,
                            email: profile.emails[0].value,
                            googleId: profile.id,
                            profilePicture: profile.photos[0]?.value,
                            isAdmin: true,
                        });
                    } else {
                        // Verify user is admin
                        if (!user.isAdmin) {
                            return done(null, false, { message: 'Unauthorized access' });
                        }
                    }

                    return done(null, user);
                } catch (error) {
                    return done(error, null);
                }
            }
        )
    );
};

export default passport;
