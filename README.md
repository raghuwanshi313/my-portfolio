# 🚀 Aman Raghuwanshi's Full-Stack Portfolio

A premium, full-stack developer portfolio website featuring a public showcase and an administrative dashboard for managing content dynamically. 

Built with a modern web stack including **React 19**, **TypeScript**, **Express 5**, and **MongoDB**, styled with **Tailwind CSS**, and brought to life with immersive **GSAP animations** and an interactive **WebGL background**.

---

## 🌟 Key Features

### 💻 Public Showcase
- **Animated Hero Section**: Eye-catching animations using GSAP with integrated LeetCode statistics.
- **WebGL Interactive Background**: Fluid particle physics rendering powered by OGL.
- **Dynamic Content Sections**:
  - **About Me**: Professional summary and links.
  - **Skills**: Organised into Programming Languages, Frontend, Backend, Databases, Dev Tools, and Others.
  - **Projects**: Grid display featuring tech badges, source code links, and live demos.
  - **Experience**: Clean timeline tracing work history, tech stacks, and achievements.
  - **Certifications**: Animated carousel layout with verification credentials.
  - **Coding Profiles**: Live-tracked platform metrics for platforms like LeetCode, Codeforces, etc.
- **Optimized Shell**: Modern typography, smooth page transitions, responsive layouts, and scroll utilities.

### 🛡️ Admin Dashboard (CRUD Panel)
- **Google OAuth 2.0 Login**: Authenticated via Passport.js restricted exclusively to the admin's email.
- **Comprehensive CRUD Controls**:
  - Update personal information, CV, and profile picture.
  - Add/modify skills with categories.
  - Full project, work experience, and certification CRUD with file uploading.
  - Manage coding profiles (platform, ratings, username, etc.).
- **Cloudinary Image Hosting**: Integrated file uploading via Multer directly to Cloudinary for asset optimizations.
- **Stateless Session Management**: Secure tokens stored in HTTP-Only cookies using JWT.

---

## 🚀 Tech Stack

| Frontend | Backend | Dev & Storage |
| :--- | :--- | :--- |
| **React 19.2.0** (TypeScript) | **Node.js** & **Express 5.1.0** | **Cloudinary** (Asset Storage) |
| **Vite 7.2.4** (Fast Build/HMR) | **MongoDB** & **Mongoose 8.17.1** | **Multer** (File Parser) |
| **Tailwind CSS 4.1.18** | **Passport.js** (Google OAuth 2.0) | **Prettier** & **ESLint** (Linting) |
| **GSAP 3.14.2** (Animations) | **JWT** (JSON Web Tokens) | **Nodemon** (Hot reloading) |
| **OGL 1.0.11** (WebGL) | **Express Session** & **Cookie-Parser** | **Dotenv** (Environment management) |

---

## 📁 Repository Structure

```
my-portfolio/
├── backend/                 # Express API server
│   ├── src/
│   │   ├── config/         # Passport OAuth settings
│   │   ├── controllers/    # Route controllers
│   │   ├── db/             # Database connection setup
│   │   ├── middlewares/    # Auth check and file parser middlewares
│   │   ├── models/         # MongoDB Schemas
│   │   ├── routes/         # Router declarations
│   │   ├── utils/          # Cloudinary helper, ApiError, ApiResponse
│   │   ├── app.js          # Express app configurations
│   │   └── index.js        # Entry server script
│   └── package.json
│
├── frontend/               # React client application
│   ├── src/
│   │   ├── api/           # API fetch client functions
│   │   ├── components/    # Reusable UI & Admin controls
│   │   ├── hooks/         # Custom state & query hooks
│   │   ├── pages/         # Portfolio & Dashboard page shells
│   │   ├── App.tsx        # Router setup
│   │   └── main.tsx       # Entry React anchor
│   └── package.json
```

---

## 🛠️ Local Installation & Setup

### Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (Local instance or MongoDB Atlas cluster)
- **Cloudinary Account** (for asset uploads)
- **Google Cloud Developer Console** project (for Google OAuth)

### 1. Clone the Repository
```bash
git clone https://github.com/raghuwanshi313/my-portfolio.git
cd my-portfolio
```

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   npm install
   ```
2. Create a `.env` file inside the `backend/` folder:
   ```env
   PORT=8000
   NODE_ENV=development

   # Database Connection
   MONGODB_URI=mongodb://localhost:27017/portfolio

   # CORS Configuration
   CORS_ORIGIN=http://localhost:5173

   # JWT & Cookie secrets
   ACCESS_TOKEN_SECRET=your_access_token_secret_minimum_32_characters
   ACCESS_TOKEN_EXPIRY=1d
   REFRESH_TOKEN_SECRET=your_refresh_token_secret_minimum_32_characters
   REFRESH_TOKEN_EXPIRY=7d
   SESSION_SECRET=your_session_secret_minimum_32_characters

   # Google OAuth 2.0 Credentials
   GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_CALLBACK_URL=http://localhost:8000/api/v1/auth/google/callback

   # Admin Credentials
   ADMIN_EMAIL=your_admin_email@gmail.com

   # Cloudinary Media Storage
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```
3. Boot the API:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Open a new terminal in the frontend directory:
   ```bash
   cd frontend
   npm install
   ```
2. Create a `.env` file in the `frontend/` folder:
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api/v1
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

### 4. Verification
- **Frontend App**: `http://localhost:5173`
- **Backend API**: `http://localhost:8000/api/v1`
- **Admin Dashboard**: `http://localhost:5173/admin/dashboard` (triggers Google Authentication)

---

## 📡 API Endpoints Summary

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/v1/auth/google` | Trigger Google OAuth | No |
| **GET** | `/api/v1/auth/current-user` | Retrieve active session details | Yes (JWT) |
| **POST** | `/api/v1/auth/logout` | Clear auth cookies | Yes (JWT) |
| **GET** | `/api/v1/personal-info` | Fetch portfolio bio | No |
| **PUT** | `/api/v1/personal-info` | Update profile data & CV file | Yes (Admin) |
| **GET** | `/api/v1/projects` | Fetch all projects | No |
| **POST** | `/api/v1/projects` | Create a new project with image upload | Yes (Admin) |
| **GET** | `/api/v1/experiences` | Fetch all timeline items | No |
| **GET** | `/api/v1/certifications` | Fetch certification list | No |
| **GET** | `/api/v1/skills` | Get categorized technical skills | No |

---

## 🔒 Security Architectures
- **Authorized Google Login Verification**: Validates incoming Google session profile against configured `ADMIN_EMAIL`.
- **Double Token Cookie Security**: Generates ephemeral access tokens (stored in cookies) alongside secure refresh tokens for validation.
- **CORS Handling**: Supports customized origin matching that cleans and matches domains dynamically (stripping trailing slashes).
- **Multipart Data Sanitization**: Cloudinary asset verification is bound to middleware constraints, deleting invalid/temporary local uploads automatically.

---

## 🚀 Deployment

### Backend Deployment (e.g. Render, Railway)
1. Add environment variables to the platform interface matching your production settings.
2. Update `CORS_ORIGIN` to your Vercel/production frontend URL (e.g., `https://my-portfolio-kohl-sigma-81.vercel.app`).
3. Update `GOOGLE_CALLBACK_URL` to your live API redirect route (e.g., `https://my-portfolio-backend-bahf.onrender.com/api/v1/auth/google/callback`).

### Frontend Deployment (e.g. Vercel)
1. Provide the production backend target `VITE_API_BASE_URL` as an environment parameter during the build setup.
2. Build command: `npm run build`
3. Output target: `dist/` directory.

---

## 👤 Author

**Aman Raghuwanshi**
- **GitHub**: [@raghuwanshi313](https://github.com/raghuwanshi313)
- **LinkedIn**: [Aman Raghuwanshi](https://www.linkedin.com/in/aman-raghuwanshi-499026290/)
- **Email**: [23bcs021@iiitdmj.ac.in](mailto:23bcs021@iiitdmj.ac.in)

---

## 📝 License
Licensed under the [MIT License](LICENSE).