import { useState } from "react";
import { Link } from "react-router-dom";
import { loginWithGoogle } from "../api/auth";
import { useAuth } from "../hooks/useAuth";
import { MdDashboard } from "react-icons/md";

const GoogleLoginButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { isAuthenticated, isAdmin } = useAuth();

  // If user is logged in, show dashboard button
  if (isAuthenticated && isAdmin) {
    return (
      <Link
        to="/admin/dashboard"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-gradient-to-r from-[var(--nav-text-hover)] to-[var(--bg-rays-color)] text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 group border border-[var(--nav-border-color)]"
        aria-label="Go to Admin Dashboard"
      >
        <div className="flex items-center gap-2 px-4 py-3">
          <MdDashboard className="w-5 h-5 flex-shrink-0" />
          <span 
            className={`font-medium text-sm whitespace-nowrap overflow-hidden transition-all duration-300 ${
              isHovered ? 'max-w-[120px] opacity-100' : 'max-w-0 opacity-0'
            }`}
          >
            Admin Dashboard
          </span>
        </div>
      </Link>
    );
  }

  // If not logged in, show Google login button
  return (
    <button
      onClick={loginWithGoogle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-white text-gray-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-200"
      aria-label="Login with Google"
    >
      <div className="flex items-center gap-2 px-4 py-3">
        <svg
          className="w-5 h-5 flex-shrink-0"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        <span 
          className={`font-medium text-sm whitespace-nowrap overflow-hidden transition-all duration-300 ${
            isHovered ? 'max-w-[100px] opacity-100' : 'max-w-0 opacity-0'
          }`}
        >
          Admin Login
        </span>
      </div>
    </button>
  );
};

export default GoogleLoginButton;
