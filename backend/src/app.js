import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from './config/passport.js';

// Import routes
// import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import projectsRouter from './routes/projects.routes.js';
import certificationsRouter from './routes/certifications.routes.js';
import skillsRouter from './routes/skills.routes.js';
import experiencesRouter from './routes/experiences.routes.js';
import codingProfilesRouter from './routes/codingProfiles.routes.js';
import personalInfoRouter from './routes/personalInfo.routes.js';
import contactRouter from './routes/contact.routes.js';

const app = express();

// Trust proxy - IMPORTANT for Render
app.set('trust proxy', 1);

const allowedOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',').map(o => o.trim().replace(/\/$/, ''))
    : [];

app.use(
    cors({
        origin: (origin, callback) => {
            // Allow requests with no origin (like mobile apps, curl, postman)
            if (!origin) return callback(null, true);

            const normalizedOrigin = origin.replace(/\/$/, '');

            if (
                allowedOrigins.length === 0 ||
                allowedOrigins.includes(normalizedOrigin) ||
                allowedOrigins.includes('*')
            ) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
    })
);

app.use(express.json({ limit: '16mb' }));
app.use(express.urlencoded({ extended: true, limit: '16mb' }));
app.use(express.static('public'));

app.use(cookieParser());

// Session configuration for passport
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'your-secret-key',
        resave: false,
        saveUninitialized: false,
        proxy: true,
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
        },
    })
);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/v1/auth', authRouter);
// app.use('/api/v1/users', userRouter);
app.use('/api/v1/projects', projectsRouter);
app.use('/api/v1/certifications', certificationsRouter);
app.use('/api/v1/skills', skillsRouter);
app.use('/api/v1/experiences', experiencesRouter);
app.use('/api/v1/coding-profiles', codingProfilesRouter);
app.use('/api/v1/personal-info', personalInfoRouter);
app.use('/api/v1/contact', contactRouter);

// Root route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Global error handler
app.use((err, req, res, _next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errors: err.errors || [],
    });
});

export { app };
