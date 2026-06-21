import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {

  const socialLinks = [
    {
      icon: <FaGithub className="w-5 h-5" />,
      label: 'GitHub',
      url: 'https://github.com/raghuwanshi313',
    },
    {
      icon: <FaLinkedin className="w-5 h-5" />,
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/aman-raghuwanshi-990169284/',
    },
  ];

  return (
    <footer className="w-full border-t border-[var(--nav-border-color)] bg-[var(--nav-hover-bg)]">
      <div className="max-w-7xl mx-auto px-4 py-4 md:px-8 lg:px-16">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Left Side - Copyright */}
          <div className="text-center md:text-left">
            <p className="text-[var(--nav-text-color)] opacity-70 flex items-center gap-2 justify-center md:justify-start">
              © Aman Raghuwanshi. All rights reserved.
            </p>
          </div>

          {/* Center - Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-[var(--nav-hover-bg)] border border-[var(--nav-border-color)] text-[var(--nav-text-color)] rounded-full hover:bg-[var(--nav-text-hover)] hover:border-[var(--nav-text-hover)] hover:text-white transition-all duration-200 hover:scale-110"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
