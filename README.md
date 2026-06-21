# Aman Raghuwanshi Portfolio Website

A full-stack portfolio website with an admin dashboard for managing content dynamically. Built with React, TypeScript, Express, and MongoDB, featuring Google OAuth authentication and a modern, animated UI.

## 🌟 Features

### Public Portfolio
- **Responsive Design**: Fully responsive layout with modern animations using GSAP
- **Dynamic Sections**:
  - Home with animated hero section and LeetCode stats integration
  - About Me with personal information
  - Skills organized by categories (Programming Languages, Frontend, Backend, Databases, Dev Tools)
  - Projects showcase with tech stack, GitHub links, and live demos
  - Work Experience timeline with company details and achievements
  - Certifications carousel with credential verification
  - Coding Profiles (LeetCode, CodeChef, Codeforces, etc.)
  - Contact form
- **Interactive UI**: Smooth scrolling, back-to-top button, and animated background effects
- **Performance Optimized**: Built with Vite for fast loading and optimal performance

### Admin Dashboard
- **Secure Authentication**: Google OAuth 2.0 with admin-only access
- **Content Management**:
  - Create, Read, Update, Delete (CRUD) operations for all sections
  - Personal information editing (name, tagline, description, CV, profile image)
  - Skills management by category
  - Projects management with image uploads
  - Work experiences with company logos and tech stacks
  - Certifications with images and credential links
  - Coding profiles with platform-specific details
- **Image Upload**: Cloudinary integration for image storage and optimization
- **Real-time Updates**: Changes reflect immediately on the portfolio

## 🚀 Tech Stack

### Frontend
- **Framework**: React 19.2.0 with TypeScript
- **Build Tool**: Vite 7.2.4
- **Styling**: Tailwind CSS 4.1.18 with custom animations
- **Routing**: React Router 7.12.0
- **Animations**: GSAP 3.14.2 for smooth animations
- **UI Components**: Lucide React icons, custom shadcn components
- **3D Graphics**: OGL for WebGL background effects

### Backend
- **Runtime**: Node.js with Express 5.1.0
- **Database**: MongoDB with Mongoose 8.17.1
- **Authentication**: 
  - Passport.js with Google OAuth 2.0
  - JWT (jsonwebtoken 9.0.2) for token-based auth
  - Express sessions for OAuth state management
- **File Upload**: Multer 2.0.2
- **Cloud Storage**: Cloudinary 2.8.0 for image hosting
- **Security**: 
  - Bcrypt 6.0.0 for password hashing
  - CORS configured for cross-origin requests
  - Cookie-based authentication

## 📁 Project Structure

```
aman-raghuwanshi/
├── backend/                 # Express backend server
│   ├── src/
│   │   ├── config/         # Passport OAuth configuration
│   │   ├── controllers/    # Route handlers (auth, projects, skills, etc.)
│   │   ├── db/             # Database connection
│   │   ├── middlewares/    # Auth and file upload middlewares
│   │   ├── models/         # Mongoose schemas (User, Project, Skills, etc.)
│   │   ├── routes/         # API route definitions
│   │   ├── utils/          # Helper functions (ApiError, ApiResponse, cloudinary)
│   │   ├── app.js          # Express app configuration
│   │   ├── constants.js    # Application constants
│   │   └── index.js        # Server entry point
│   ├── public/temp/        # Temporary file storage for uploads
│   └── package.json
│
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── api/           # API service functions
│   │   ├── assets/        # Static assets
│   │   ├── components/    # React components
│   │   │   ├── admin/    # Admin dashboard components
│   │   │   └── reactbits.dev/ # Custom UI effects
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions
│   │   ├── pages/         # Page components
│   │   │   └── admin/    # Admin pages
│   │   ├── utils/         # Icon utilities
│   │   ├── App.tsx        # Main app component
│   │   └── main.tsx       # Application entry point
│   ├── public/            # Public assets
│   └── package.json
│
├── .gitignore
├── LICENSE
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Cloudinary account for image storage
- Google OAuth credentials

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/aman-raghuwanshi.git
cd aman-raghuwanshi
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
# Server Configuration
PORT=8000
NODE_ENV=development

# Database
MONGODB_URI=your_mongodb_connection_string

# CORS
CORS_ORIGIN=http://localhost:5173

# JWT Secrets
ACCESS_TOKEN_SECRET=your_access_token_secret_here
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret_here
REFRESH_TOKEN_EXPIRY=7d

# Session Secret
SESSION_SECRET=your_session_secret_here

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:8000/api/v1/auth/google/callback

# Admin Access
ADMIN_EMAIL=your_admin_email@gmail.com

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory:
```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

Start the development server:
```bash
npm run dev
```

### 4. Access the Application
- **Portfolio**: http://localhost:5173
- **Admin Dashboard**: http://localhost:5173/admin/dashboard (requires Google OAuth login)
- **Backend API**: http://localhost:8000

## 📡 API Endpoints

### Authentication
- `GET /api/v1/auth/google` - Initiate Google OAuth login
- `GET /api/v1/auth/google/callback` - Google OAuth callback
- `GET /api/v1/auth/current-user` - Get current user
- `POST /api/v1/auth/logout` - Logout user
- `POST /api/v1/auth/refresh-token` - Refresh access token

### Projects
- `GET /api/v1/projects` - Get all projects
- `GET /api/v1/projects/:id` - Get project by ID
- `POST /api/v1/projects` - Create project (Admin only)
- `PUT /api/v1/projects/:id` - Update project (Admin only)
- `DELETE /api/v1/projects/:id` - Delete project (Admin only)

### Certifications
- `GET /api/v1/certifications` - Get all certifications
- `GET /api/v1/certifications/:id` - Get certification by ID
- `POST /api/v1/certifications` - Create certification (Admin only)
- `PUT /api/v1/certifications/:id` - Update certification (Admin only)
- `DELETE /api/v1/certifications/:id` - Delete certification (Admin only)

### Skills
- `GET /api/v1/skills` - Get all skills
- `PUT /api/v1/skills` - Update skills (Admin only)

### Experiences
- `GET /api/v1/experiences` - Get all experiences
- `GET /api/v1/experiences/:id` - Get experience by ID
- `POST /api/v1/experiences` - Create experience (Admin only)
- `PUT /api/v1/experiences/:id` - Update experience (Admin only)
- `DELETE /api/v1/experiences/:id` - Delete experience (Admin only)

### Coding Profiles
- `GET /api/v1/coding-profiles` - Get all coding profiles
- `GET /api/v1/coding-profiles/:id` - Get coding profile by ID
- `POST /api/v1/coding-profiles` - Create coding profile (Admin only)
- `PUT /api/v1/coding-profiles/:id` - Update coding profile (Admin only)
- `DELETE /api/v1/coding-profiles/:id` - Delete coding profile (Admin only)

### Personal Info
- `GET /api/v1/personal-info` - Get personal information
- `PUT /api/v1/personal-info` - Update personal information (Admin only)

## 🔒 Security Features

- **Google OAuth 2.0**: Secure authentication flow with admin email verification
- **JWT Tokens**: Access and refresh token mechanism for stateless authentication
- **HTTP-Only Cookies**: Tokens stored securely in HTTP-only cookies
- **Admin-Only Access**: Restricted admin dashboard with middleware protection
- **Input Validation**: Mongoose schema validation for all data models
- **CORS Configuration**: Controlled cross-origin resource sharing
- **Secure Password Handling**: Bcrypt hashing (if password authentication is added)

## 🎨 Key Features Breakdown

### Portfolio Data Models

1. **Personal Info**: Name, tagline, description, profile image, CV, contact details, social links
2. **Skills**: Categorized by Programming Languages, Frontend, Backend, Databases, Dev Tools, Other
3. **Projects**: Title, description, image, tech stacks, GitHub link, live link
4. **Experiences**: Company name, logo, role, location, dates, description, achievements, tech stack
5. **Certifications**: Name, image, issuer, dates, skills, credential link
6. **Coding Profiles**: Platform, username, profile URL, rank, rating, question count

### Custom Hooks

- `useAuth`: Authentication state management
- `useProjects`: Projects data fetching and management
- `useSkills`: Skills data management
- `useCertifications`: Certifications data handling
- `useExperiences`: Work experiences management
- `useCodingProfiles`: Coding profiles data
- `usePersonalInfo`: Personal information management

## 🚀 Deployment

### Backend Deployment (Railway/Render/Heroku)
1. Set environment variables in hosting platform
2. Ensure MongoDB Atlas is accessible
3. Update CORS_ORIGIN to your frontend domain
4. Update GOOGLE_CALLBACK_URL to production URL

### Frontend Deployment (Vercel/Netlify)
1. Update `VITE_API_BASE_URL` to your backend API URL
2. Build the project: `npm run build`
3. Deploy the `dist` folder

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add YourFeature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Aman Raghuwanshi**

- GitHub: [@aman-raghuwanshi](https://github.com/yourusername)
- Email: 23bcs021@iiitdmj.ac.in

## 🙏 Acknowledgments

- React and TypeScript communities
- Express.js and MongoDB documentation
- GSAP for animation libraries
- Tailwind CSS for styling utilities
- Cloudinary for image hosting

---

**Note**: This is a personal portfolio project. Feel free to use it as a template for your own portfolio, but please give appropriate credit.
#   m y - p o r t f o l i o  
 