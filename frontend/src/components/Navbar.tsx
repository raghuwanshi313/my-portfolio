import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import logo from "../assets/logo.png";
import { loginWithGoogle } from "@/api/auth";
import { useAuth } from "@/hooks/useAuth";

interface NavLink {
  label: string;
  href: string;
}

interface ResponsiveNavbarProps {
  name?: string;
  links?: NavLink[];
}

function Navbar({
  name = "AMAN RAGHUWANSHI",
  links = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ],
}: ResponsiveNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const { isAuthenticated, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const sections = links.map((link) => link.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(`#${sections[i]}`);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [links]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-4 left-4 right-4 z-50 max-w-7xl mx-auto">
      <div className="bg-[var(--nav-base-color)] backdrop-blur-md rounded-2xl shadow-lg border border-[var(--nav-border-color)] px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Name */}
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-12 w-auto" />
            <span className="text-xl font-semibold text-[var(--nav-text-color)] hidden sm:block">
              {name}
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`transition-colors duration-200 font-medium ${
                  activeSection === link.href
                    ? "text-[var(--nav-text-hover)] font-semibold"
                    : "text-[var(--nav-text-color)] hover:text-[var(--nav-text-hover)]"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Hamburger Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden relative w-10 h-10 flex items-center justify-center text-[var(--nav-text-color)] hover:bg-[var(--nav-hover-bg)] rounded-lg transition-colors"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            <div className="flex flex-col gap-1.5 w-6">
              <span
                className={`h-0.5 w-full bg-current transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`h-0.5 w-full bg-current transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-0.5 w-full bg-current transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-2 border-t border-[var(--nav-border-color)]">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`block px-4 py-3 rounded-lg transition-colors duration-200 font-medium ${
                activeSection === link.href
                  ? "bg-[var(--nav-text-hover)] text-white font-semibold"
                  : "text-[var(--nav-text-color)] hover:bg-[var(--nav-hover-bg)]"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          
          {/* Admin Dashboard Button Mobile - Show if logged in */}
          {isAuthenticated && isAdmin ? (
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-[var(--nav-text-hover)] to-[var(--bg-rays-color)] text-white rounded-lg hover:shadow-xl transition-all font-medium justify-center shadow-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              <MdDashboard /> Dashboard
            </Link>
          ) : (
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-2 px-4 py-3 bg-[var(--nav-card-2-bg)] text-[var(--nav-text-color)] rounded-lg hover:bg-[var(--nav-card-3-bg)] transition-colors font-medium justify-center border border-[var(--nav-border-color)]"
              onClick={loginWithGoogle}
            >
              <FaUserShield /> Admin
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
