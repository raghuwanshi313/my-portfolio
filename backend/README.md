# Portfolio Backend API

Express.js backend server for Aman Raghuwanshi's portfolio website. Provides RESTful APIs for managing portfolio content, authentication, and admin operations with Google OAuth integration.

## 🌟 Features

- **Google OAuth Authentication**
  - Passport.js integration with Google Strategy
  - Admin-only access with email verification
  - JWT-based token authentication
  - Session management for OAuth flow

- **Portfolio Content Management**
  - Personal information (name, tagline, description, profile image, CV, contact details)
  - Skills categorization (Programming Languages, Frontend, Backend, Databases, Dev Tools)
  - Projects with images and tech stacks
  - Work experiences with company logos and achievements
  - Certifications with credential verification
  - Coding profiles (LeetCode, CodeChef, Codeforces, etc.)

- **File Upload & Storage**
  - Multer middleware for file handling
  - Cloudinary integration for image storage and optimization
  - Temporary file cleanup

- **Security & Best Practices**
  - JWT access and refresh tokens
  - HTTP-only cookie storage
  - CORS configuration
  - Protected admin routes
  - Input validation with Mongoose schemas
  - Async error handling

- **Developer Experience**
  - Clean MVC architecture
  - Consistent API responses with utility classes
  - Hot reload with nodemon
  - ES6+ module syntax
  - Prettier code formatting

## 🚀 Tech Stack

- **Runtime**: Node.js with ES modules
- **Framework**: Express 5.1.0
- **Database**: MongoDB with Mongoose 8.17.1
- **Authentication**: 
  - Passport.js 0.7.0 with Google OAuth 2.0
  - JSON Web Tokens (jsonwebtoken 9.0.2)
  - Express Sessions 1.18.2
- **File Upload**: Multer 2.0.2
- **Cloud Storage**: Cloudinary 2.8.0
- **Security**: 
  - Bcrypt 6.0.0 (for password hashing if needed)
  - Cookie-Parser 1.4.7
  - CORS 2.8.5
- **Development**: 
  - Nodemon 3.1.10
  - Prettier 3.6.2
  - Dotenv 17.2.1

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── passport.js               # Passport Google OAuth configuration
│   ├── controllers/
│   │   ├── auth.controller.js        # Authentication logic
│   │   ├── personalInfo.controller.js # Personal info CRUD
│   │   ├── skills.controller.js      # Skills management
│   │   ├── projects.controller.js    # Projects CRUD
│   │   ├── experiences.controller.js # Work experiences CRUD
│   │   ├── certifications.controller.js # Certifications CRUD
│   │   └── codingProfiles.controller.js # Coding profiles CRUD
│   ├── db/
│   │   └── index.js                  # MongoDB connection
│   ├── middlewares/
│   │   ├── auth.middleware.js        # JWT verification & admin check
│   │   └── multer.middleware.js      # File upload configuration
│   ├── models/
│   │   ├── user.models.js            # User schema with token methods
│   │   ├── personalInfo.models.js    # Personal info schema
│   │   ├── skills.models.js          # Skills schema
│   │   ├── projects.models.js        # Projects schema
│   │   ├── experiences.models.js     # Experiences schema
│   │   ├── certifications.models.js  # Certifications schema
│   │   └── codingProfiles.models.js  # Coding profiles schema
│   ├── routes/
│   │   ├── auth.routes.js            # Auth endpoints
│   │   ├── personalInfo.routes.js    # Personal info endpoints
│   │   ├── skills.routes.js          # Skills endpoints
│   │   ├── projects.routes.js        # Projects endpoints
│   │   ├── experiences.routes.js     # Experiences endpoints
│   │   ├── certifications.routes.js  # Certifications endpoints
│   │   └── codingProfiles.routes.js  # Coding profiles endpoints
│   ├── utils/
│   │   ├── ApiError.js               # Custom error class
│   │   ├── ApiResponse.js            # Standard response format
│   │   ├── asyncHandler.js           # Async error wrapper
│   │   └── cloudinary.js             # Cloudinary upload utility
│   ├── app.js                        # Express app configuration
│   ├── constants.js                  # Application constants
│   └── index.js                      # Server entry point
├── public/
│   └── temp/                         # Temporary file storage
├── .gitignore
├── package.json
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local instance or MongoDB Atlas)
- Cloudinary account
- Google OAuth 2.0 credentials

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file in the backend root directory:

```env
# Server Configuration
PORT=8000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/portfolio
# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio

# CORS
CORS_ORIGIN=http://localhost:5173

# JWT Secrets (generate strong random strings)
ACCESS_TOKEN_SECRET=your_access_token_secret_minimum_32_characters
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret_minimum_32_characters
REFRESH_TOKEN_EXPIRY=7d

# Session Secret (generate strong random string)
SESSION_SECRET=your_session_secret_minimum_32_characters

# Google OAuth 2.0
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:8000/api/v1/auth/google/callback

# Admin Access Control
ADMIN_EMAIL=your_admin_email@gmail.com

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Setting Up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Set authorized redirect URIs:
   - Development: `http://localhost:8000/api/v1/auth/google/callback`
   - Production: `https://yourdomain.com/api/v1/auth/google/callback`
6. Copy Client ID and Client Secret to `.env`

### 4. Setting Up Cloudinary

1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Go to Dashboard
3. Copy Cloud Name, API Key, and API Secret to `.env`

### 5. Start the Server

Development mode with hot reload:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server will run on `http://localhost:8000` (or your specified PORT)

## 📡 API Documentation

### Base URL
```
http://localhost:8000/api/v1
```

### Authentication Endpoints

#### Initiate Google OAuth Login
```http
GET /auth/google
```
Redirects to Google OAuth consent screen.

#### Google OAuth Callback
```http
GET /auth/google/callback
```
Handles OAuth callback and issues JWT tokens.

#### Get Current User
```http
GET /auth/current-user
```
Requires: Authentication cookies
Returns: Current user details

#### Logout
```http
POST /auth/logout
```
Requires: Authentication cookies
Clears tokens and logs out user.

#### Refresh Access Token
```http
POST /auth/refresh-token
```
Requires: Refresh token in cookies
Returns: New access token

### Personal Info Endpoints

#### Get Personal Information
```http
GET /personal-info
```
Returns: Personal info object

#### Update Personal Information (Admin Only)
```http
PUT /personal-info
```
Requires: Admin authentication, multipart/form-data
Body: name, tagline, description, email, phone, location, social_links, profile_image (file), cv (file)

### Skills Endpoints

#### Get All Skills
```http
GET /skills
```
Returns: Skills categorized by type

#### Update Skills (Admin Only)
```http
PUT /skills
```
Requires: Admin authentication
Body: programming_languages[], frontend[], backend[], databases[], dev_tools[], other[]

### Projects Endpoints

#### Get All Projects
```http
GET /projects
```
Returns: Array of projects

#### Get Project by ID
```http
GET /projects/:id
```
Returns: Single project object

#### Create Project (Admin Only)
```http
POST /projects
```
Requires: Admin authentication, multipart/form-data
Body: title, description, tech_stacks[], github_link, live_link, image (file)

#### Update Project (Admin Only)
```http
PUT /projects/:id
```
Requires: Admin authentication, multipart/form-data
Body: Same as create (all fields optional)

#### Delete Project (Admin Only)
```http
DELETE /projects/:id
```
Requires: Admin authentication

### Experiences Endpoints

#### Get All Experiences
```http
GET /experiences
```
Returns: Array of work experiences

#### Get Experience by ID
```http
GET /experiences/:id
```
Returns: Single experience object

#### Create Experience (Admin Only)
```http
POST /experiences
```
Requires: Admin authentication, multipart/form-data
Body: company_name, role, location, joining_date, leaving_date, is_current, description, achievements[], tech_stack[], company_logo (file)

#### Update Experience (Admin Only)
```http
PUT /experiences/:id
```
Requires: Admin authentication, multipart/form-data

#### Delete Experience (Admin Only)
```http
DELETE /experiences/:id
```
Requires: Admin authentication

### Certifications Endpoints

#### Get All Certifications
```http
GET /certifications
```
Returns: Array of certifications

#### Get Certification by ID
```http
GET /certifications/:id
```
Returns: Single certification object

#### Create Certification (Admin Only)
```http
POST /certifications
```
Requires: Admin authentication, multipart/form-data
Body: name, issued_by, issue_date, expiry_date, skills[], credential_link, image (file)

#### Update Certification (Admin Only)
```http
PUT /certifications/:id
```
Requires: Admin authentication, multipart/form-data

#### Delete Certification (Admin Only)
```http
DELETE /certifications/:id
```
Requires: Admin authentication

### Coding Profiles Endpoints

#### Get All Coding Profiles
```http
GET /coding-profiles
```
Returns: Array of coding profiles

#### Get Coding Profile by ID
```http
GET /coding-profiles/:id
```
Returns: Single coding profile object

#### Create Coding Profile (Admin Only)
```http
POST /coding-profiles
```
Requires: Admin authentication
Body: platform, username, profile_url, rank, rating, question_count

#### Update Coding Profile (Admin Only)
```http
PUT /coding-profiles/:id
```
Requires: Admin authentication

#### Delete Coding Profile (Admin Only)
```http
DELETE /coding-profiles/:id
```
Requires: Admin authentication

## 🔒 Authentication & Authorization

### JWT Token Flow
1. User initiates Google OAuth login
2. Backend receives user data from Google
3. Backend verifies user email against ADMIN_EMAIL
4. Backend generates access token (1 day) and refresh token (7 days)
5. Tokens stored in HTTP-only cookies
6. Access token used for authenticated requests
7. Refresh token used to get new access token

### Middleware Protection
- `verifyJWT`: Validates access token, attaches user to request
- `isAdmin`: Ensures user has admin privileges
- Protected routes require both middlewares

## 🗄️ Data Models

### User
- googleId, name, email, profilePicture, isAdmin, refreshToken

### Personal Info
- name, tagline, description, profile_image, cv, email, phone, location, social_links (github, linkedin, twitter, instagram, youtube, website)

### Skills
- programming_languages[], frontend[], backend[], databases[], dev_tools[], other[]

### Project
- title, description, image, tech_stacks[], github_link, live_link

### Experience
- company_name, company_logo, role, location, joining_date, leaving_date, is_current, description, achievements[], tech_stack[]

### Certification
- name, image, issued_by, issue_date, expiry_date, skills[], credential_link

### Coding Profile
- platform, username, profile_url, rank, rating, question_count

## 🧪 Testing

Currently no automated tests. To test manually:

1. Use Postman or Thunder Client
2. First login via browser: `http://localhost:8000/api/v1/auth/google`
3. Copy cookies from browser to API client
4. Test protected endpoints

## 🚀 Deployment

### Railway / Render / Heroku

1. Set all environment variables in platform dashboard
2. Ensure MongoDB is accessible (use MongoDB Atlas for production)
3. Update CORS_ORIGIN to frontend domain
4. Update GOOGLE_CALLBACK_URL to production URL
5. Deploy from GitHub repository

### Environment Variables for Production
- Set NODE_ENV=production
- Use strong, unique secrets for JWT and session
- Use MongoDB Atlas connection string
- Update all URLs to production domains

## 📝 Scripts

- `npm run dev` - Start development server with nodemon and hot reload
- `npm run format` - Format code with Prettier
- `npm test` - Run tests (currently placeholder)

## 🐛 Common Issues

### CORS Errors
- Ensure CORS_ORIGIN in .env matches frontend URL exactly
- Include credentials: true in frontend fetch requests

### Authentication Fails
- Verify GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET
- Check ADMIN_EMAIL matches your Google account
- Ensure callback URL is registered in Google Console

### File Upload Issues
- Check public/temp directory exists and has write permissions
- Verify Cloudinary credentials are correct
- Check file size limits in multer configuration

### MongoDB Connection Issues
- Ensure MongoDB is running (local) or connection string is correct (Atlas)
- Check network access settings in MongoDB Atlas
- Verify database name in connection string

## 🤝 Contributing

1. Follow existing code structure and naming conventions
2. Use Prettier for code formatting: `npm run format`
3. Test all endpoints before committing
4. Update README if adding new features

## 📄 License

MIT License

## 👤 Author

**Aman Raghuwanshi**

## 🔗 Contact & Connect

- **LinkedIn**: [Aman Raghuwanshi](https://www.linkedin.com/in/aman-raghuwanshi-499026290/)
- **GitHub**: [amanraghuwanshi](https://github.com/amanraghuwanshi)

Feel free to reach out for questions, suggestions, or collaboration opportunities!
