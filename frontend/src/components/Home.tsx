import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
// import profilePhoto from "../assets/profile.jpg";
import { usePersonalInfo } from '../hooks/usePersonalInfo';
import { useCodingProfiles } from '../hooks/useCodingProfiles';

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

function Home() {
  const { personalInfo, loading, error } = usePersonalInfo();
  const { codingProfiles, loading: profilesLoading } = useCodingProfiles();

  // Find LeetCode profile from coding profiles
  const leetcodeProfile = codingProfiles.find(
    profile => profile.platform.toLowerCase() === 'leetcode'
  );

  const socialLinks: SocialLink[] = [
    {
      icon: <FaGithub className="w-6 h-6" />,
      href: personalInfo?.social_links?.github || "https://github.com/raghuwanshi313",
      label: "GitHub",
    },
    {
      icon: <FaLinkedin className="w-6 h-6" />,
      href: personalInfo?.social_links?.linkedin || "https://www.linkedin.com/in/aman-raghuwanshi-990169284/",
      label: "LinkedIn",
    },
    {
      icon: <SiLeetcode className="w-6 h-6" />,
      href: leetcodeProfile?.profile_url || personalInfo?.social_links?.portfolio || "https://leetcode.com/u/amanraghuwanshi/",
      label: "LeetCode",
    },
  ];

  if (loading || profilesLoading) {
    return (
      <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 scroll-mt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[var(--nav-text-hover)] mx-auto mb-4"></div>
          <p className="text-[var(--nav-text-color)] opacity-60">Loading...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 scroll-mt-20">
        <div className="text-center py-8 bg-red-900/20 border border-red-500 rounded-lg p-6">
          <p className="text-red-400">Error: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 scroll-mt-20">
      <div className="max-w-7xl w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Content */}
          <div className="space-y-6 text-center lg:text-left order-2 lg:order-1">
            {/* Heading */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--nav-text-color)]">
                Hi, I'm{" "}
                <span className="text-[var(--nav-text-hover)] bg-gradient-to-r from-[var(--nav-text-hover)] to-[var(--bg-rays-color)] bg-clip-text text-transparent">
                  {personalInfo?.name || "Your Name"}
                </span>
              </h1>
              <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[var(--nav-text-color)] opacity-80">
                {personalInfo?.tagline || "Full Stack Developer"}
              </p>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-[var(--nav-text-color)] opacity-70 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {personalInfo?.description?.split('\n').slice(0, 2).join('\n') || "Passionate about building scalable web applications and solving complex problems."}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <a
                href="#projects"
                className="px-8 py-3 bg-[var(--nav-text-hover)] text-white rounded-lg font-medium hover:opacity-90 transition-opacity duration-200 shadow-lg hover:shadow-xl"
              >
                View Projects
              </a>
              <a
                href="#about"
                className="px-8 py-3 bg-transparent border-2 border-[var(--nav-border-color)] text-[var(--nav-text-color)] rounded-lg font-medium hover:bg-[var(--nav-hover-bg)] transition-colors duration-200"
              >
                View More
              </a>
            </div>
          </div>

          {/* Right Side - Photo and Social Links */}
          <div className="flex flex-col items-center space-y-8 order-1 lg:order-2">
            {/* Photo */}
            <div className="relative">
              <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-[var(--nav-text-hover)] shadow-2xl">
                <img
                  src={personalInfo?.profile_image}
                  alt={personalInfo?.name || "Profile"}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative ring */}
              <div className="absolute inset-0 rounded-full border-4 border-[var(--bg-rays-color)] opacity-20 animate-pulse"></div>
            </div>

            {/* Social Links */}
            <div className="flex gap-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-[var(--nav-hover-bg)] text-[var(--nav-text-color)] rounded-full hover:bg-[var(--nav-text-hover)] hover:text-white transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-110"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
