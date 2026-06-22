import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars BEFORE any other imports that depend on them
dotenv.config({
    path: path.resolve(__dirname, '../.env'),
});

// Now import modules that read process.env at load time
import('./app.js').then(async ({ app }) => {
    const { initPassport } = await import('./config/passport.js');
    initPassport();

    const { default: connectDB } = await import('./db/index.js');
    await connectDB();

    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });
}).catch(error => {
    console.error('Failed to start server:', error);
    process.exit(1);
});
