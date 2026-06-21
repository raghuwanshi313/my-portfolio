# Portfolio Frontend

Modern, responsive React portfolio website with TypeScript, featuring dynamic content management, smooth animations, and an admin dashboard. Built with Vite for optimal performance.

## 🌟 Features

### Public Portfolio
- **Hero Section**: Animated landing with personal info and LeetCode stats integration
- **About Me**: Personal introduction with profile image
- **Skills Section**: Categorized technical skills with custom icons
  - Programming Languages
  - Frontend Technologies
  - Backend Technologies
  - Databases
  - Development Tools
  - Other Technologies
- **Projects Showcase**: Interactive project cards with:
  - Tech stack badges
  - Project images
  - GitHub repository links
  - Live demo links
- **Experience Timeline**: Professional work history with:
  - Company logos
  - Role descriptions
  - Achievements
  - Tech stacks used
- **Certifications Carousel**: Animated certification display with:
  - Certificate images
  - Issuer information
  - Credential verification links
- **Coding Profiles**: Platform-specific coding statistics
  - LeetCode, CodeChef, Codeforces, etc.
  - Rankings and ratings
  - Problem-solving counts
- **Contact Section**: Get in touch information
- **Smooth Animations**: GSAP-powered transitions and effects
- **Interactive Background**: WebGL-powered animated background using OGL
- **Back to Top Button**: Smooth scroll navigation

### Admin Dashboard
- **Secure Access**: Google OAuth authentication with admin verification
- **Content Management Interface**:
  - Personal Information Editor (name, tagline, description, CV, profile image)
  - Skills Manager (add/edit skills by category)
  - Projects Manager (CRUD operations with image uploads)
  - Experience Manager (CRUD operations with company logos)
  - Certifications Manager (CRUD operations with certificate images)
  - Coding Profiles Manager (CRUD operations)
- **Live Preview**: View portfolio button to see changes
- **Responsive Admin UI**: Works on all devices

## 🚀 Tech Stack

### Core
- **React** 19.2.0 - Modern React with latest features
- **TypeScript** 5.9.3 - Type-safe development
- **Vite** 7.2.4 - Lightning-fast build tool
- **React Router** 7.12.0 - Client-side routing

### Styling & UI
- **Tailwind CSS** 4.1.18 - Utility-first CSS framework
- **@tailwindcss/vite** 4.1.18 - Vite integration
- **Tailwind Merge** 3.4.0 - Merge Tailwind classes intelligently
- **Class Variance Authority** 0.7.1 - Component variants
- **tw-animate-css** 1.4.0 - Animation utilities
- **Lucide React** 0.562.0 - Beautiful icon set
- **React Icons** 5.5.0 - Popular icon packs

### Animation & Effects
- **GSAP** 3.14.2 - Professional animation library
- **@gsap/react** 2.1.2 - React integration for GSAP
- **OGL** 1.0.11 - Minimal WebGL library for 3D effects

### Development Tools
- **ESLint** 9.39.1 - Code linting
- **TypeScript ESLint** 8.46.4 - TypeScript-specific linting
- **Prettier** 3.7.4 - Code formatting
- **@types/react** 19.2.5 - TypeScript definitions
- **@types/react-dom** 19.2.3 - React DOM types
- **@types/node** 24.10.4 - Node.js types

## 📁 Project Structure

```
frontend/
├── public/                      # Static assets
├── src/
│   ├── api/                    # API service functions
│   │   ├── auth.ts            # Authentication API
│   │   ├── certifications.ts  # Certifications API
│   │   ├── codingProfiles.ts  # Coding profiles API
│   │   ├── experiences.ts     # Experiences API
│   │   ├── personalInfo.ts    # Personal info API
│   │   ├── projects.ts        # Projects API
│   │   └── skills.ts          # Skills API
│   ├── assets/                # Images, fonts, etc.
│   ├── components/            # React components
│   │   ├── AboutMe.tsx       # About section
│   │   ├── BackgroundLayer.tsx # WebGL background
│   │   ├── BackToTop.tsx     # Scroll to top button
│   │   ├── CertificationCarousel.tsx # Certifications display
│   │   ├── CodingProfileCard.tsx # Coding profile card
│   │   ├── Contact.tsx       # Contact section
│   │   ├── Experience.tsx    # Experience timeline
│   │   ├── Footer.tsx        # Footer
│   │   ├── GoogleLoginButton.tsx # OAuth login
│   │   ├── Home.tsx          # Hero section
│   │   ├── Navbar.tsx        # Navigation bar
│   │   ├── Projects.tsx      # Projects showcase
│   │   ├── Skills.tsx        # Skills display
│   │   ├── admin/            # Admin dashboard components
│   │   │   ├── CertificationCard.tsx
│   │   │   ├── CodingProfileCardAdmin.tsx
│   │   │   ├── CreateCertificationForm.tsx
│   │   │   ├── CreateCodingProfileForm.tsx
│   │   │   ├── CreateExperienceForm.tsx
│   │   │   ├── CreateProjectForm.tsx
│   │   │   ├── EditCertificationForm.tsx
│   │   │   ├── EditCodingProfileForm.tsx
│   │   │   ├── EditExperienceForm.tsx
│   │   │   ├── EditPersonalInfoForm.tsx
│   │   │   ├── EditProjectForm.tsx
│   │   │   ├── EditSkillsForm.tsx
│   │   │   ├── ExperienceCard.tsx
│   │   │   ├── ProjectCard.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   └── reactbits.dev/    # Custom UI effects
│   │       └── LightRays.tsx
│   ├── hooks/                # Custom React hooks
│   │   ├── useAuth.ts       # Authentication state
│   │   ├── useCertifications.ts
│   │   ├── useCodingProfiles.ts
│   │   ├── useExperiences.ts
│   │   ├── usePersonalInfo.ts
│   │   ├── useProjects.ts
│   │   └── useSkills.ts
│   ├── lib/                 # Utility functions
│   │   └── utils.ts
│   ├── pages/               # Page components
│   │   ├── PortfolioPage.tsx # Main portfolio page
│   │   └── admin/
│   │       └── AdminDashboard.tsx # Admin panel
│   ├── utils/               # Helper utilities
│   │   ├── platformIcons.tsx # Coding platform icons
│   │   └── skillIcons.tsx    # Technology icons
│   ├── App.css             # Global styles
│   ├── App.tsx             # Root component with routing
│   ├── index.css           # Tailwind directives
│   └── main.tsx            # Application entry point
├── .gitignore
├── components.json          # shadcn/ui config
├── eslint.config.js        # ESLint configuration
├── index.html              # HTML template
├── package.json
├── tsconfig.json           # TypeScript config
├── tsconfig.app.json       # App-specific TS config
├── tsconfig.node.json      # Node-specific TS config
├── vite.config.ts          # Vite configuration
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and npm/yarn
- Backend API running (see backend README)

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file in the frontend root directory:

```env
# Backend API URL
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

For production:
```env
VITE_API_BASE_URL=https://your-backend-domain.com/api/v1
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

Build output will be in the `dist` directory.

### 5. Preview Production Build

```bash
npm run preview
```

## 📝 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (TypeScript check + Vite build)
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview production build locally
- `npm run format` - Format code with Prettier

## 🎨 Key Components

### Custom Hooks

#### `useAuth`
Manages authentication state with Google OAuth.
```typescript
const { user, loading, isAuthenticated } = useAuth();
```

#### `useProjects`
Fetches and manages projects data.
```typescript
const { projects, loading, error, refetch } = useProjects();
```

#### `useSkills`
Manages skills data by category.
```typescript
const { skills, loading, error, refetch } = useSkills();
```

#### `useCertifications`
Handles certifications data.
```typescript
const { certifications, loading, error, refetch } = useCertifications();
```

#### `useExperiences`
Manages work experience data.
```typescript
const { experiences, loading, error, refetch } = useExperiences();
```

#### `useCodingProfiles`
Handles coding platform profiles.
```typescript
const { codingProfiles, loading, error, refetch } = useCodingProfiles();
```

#### `usePersonalInfo`
Manages personal information.
```typescript
const { personalInfo, loading, refetch } = usePersonalInfo();
```

### API Services

All API calls are organized in `/src/api/` with TypeScript interfaces:

```typescript
// Example: projects.ts
export interface Project {
    _id: string;
    title: string;
    description: string;
    image: string;
    tech_stacks: string[];
    github_link: string;
    live_link?: string;
}

export const getProjects = async (): Promise<Project[]>;
export const createProject = async (formData: FormData): Promise<Project>;
export const updateProject = async (id: string, formData: FormData): Promise<Project>;
export const deleteProject = async (id: string): Promise<void>;
```

### Routing

```typescript
// Main routes
/ - Portfolio page (public)
/admin/dashboard - Admin dashboard (protected)
```

Protected routes use the `ProtectedRoute` component to verify authentication.

## 🎭 Animations

### GSAP Integration
The project uses GSAP for smooth, performant animations:
- Scroll-triggered animations
- Fade-in effects
- Stagger animations for lists
- Timeline-based sequences

### WebGL Background
Custom WebGL background using OGL library for:
- Interactive particle effects
- Responsive to mouse movement
- Performance-optimized rendering

## 🔒 Authentication Flow

1. User clicks "Login with Google" button
2. Redirected to backend OAuth endpoint
3. Backend handles Google authentication
4. Backend verifies admin email
5. Backend issues JWT tokens via HTTP-only cookies
6. Frontend receives authentication confirmation
7. User redirected to admin dashboard
8. Protected routes check authentication status

## 🎨 Styling Approach

### Tailwind CSS
- Utility-first approach
- Custom configuration for theme colors
- Responsive design utilities
- Animation utilities with `tw-animate-css`

### Custom Components
- Reusable component variants with `class-variance-authority`
- Smart class merging with `tailwind-merge`
- Consistent styling patterns

### Icons
- Lucide React for UI icons
- React Icons for brand/social icons
- Custom SVG icons for platforms

## 🚀 Performance Optimizations

1. **Vite Build Tool**: Fast HMR and optimized production builds
2. **Code Splitting**: Automatic route-based splitting
3. **Lazy Loading**: Images and components loaded on demand
4. **Optimized Images**: Cloudinary CDN for image delivery
5. **Tree Shaking**: Unused code eliminated in production
6. **Modern JavaScript**: Optimized for modern browsers

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- Touch-friendly interface
- Optimized layouts for all screen sizes

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Deployment

### Vercel (Recommended)

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow prompts to deploy

Or connect GitHub repository to Vercel dashboard for automatic deployments.

### Netlify

1. Build the project: `npm run build`
2. Deploy `dist` folder to Netlify
3. Set environment variables in Netlify dashboard
4. Configure redirects for SPA routing

Add `netlify.toml`:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Other Platforms

Build the project and deploy the `dist` folder to:
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting
- DigitalOcean App Platform

## 🐛 Common Issues

### CORS Errors
- Ensure backend CORS_ORIGIN includes frontend URL
- Check credentials: 'include' in fetch requests

### Authentication Not Working
- Verify backend is running and accessible
- Check VITE_API_BASE_URL is correct
- Clear cookies and try again

### Build Errors
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run build`
- Verify all dependencies are installed

### Images Not Loading
- Check Cloudinary configuration in backend
- Verify image URLs are accessible
- Check network tab in DevTools

## 🔧 Development Tips

### Adding New Sections
1. Create component in `/src/components/`
2. Add API service in `/src/api/` if needed
3. Create custom hook in `/src/hooks/` if needed
4. Import and use in `PortfolioPage.tsx`

### Adding New Admin Features
1. Create form component in `/src/components/admin/`
2. Add to `AdminDashboard.tsx` with tab navigation
3. Implement CRUD operations using existing patterns

### Customizing Animations
- Edit GSAP configurations in component files
- Adjust timing, easing, and effects
- Use GSAP timeline for complex sequences

## 🤝 Contributing

1. Follow TypeScript best practices
2. Use Prettier for formatting: `npm run format`
3. Run ESLint: `npm run lint`
4. Test responsive design on multiple devices
5. Ensure all TypeScript types are properly defined

## 📄 License

MIT License

## 👤 Author

**Aman Raghuwanshi**

---

Built with React, TypeScript, and Tailwind CSS • Powered by Vite
