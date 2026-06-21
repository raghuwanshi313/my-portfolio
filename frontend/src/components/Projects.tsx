import { useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useProjects } from '../hooks/useProjects';
import { usePersonalInfo } from '../hooks/usePersonalInfo';

const Projects = () => {
  const { projects, loading, error } = useProjects();
  const { personalInfo } = usePersonalInfo();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  };

  const goToProject = (index: number) => {
    setCurrentIndex(index);
  };

  // Loading state
  if (loading) {
    return (
      <section id="projects" className="min-h-screen w-full px-4 py-16 md:px-8 lg:px-16 scroll-mt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[var(--nav-text-hover)] mx-auto mb-4"></div>
          <p className="text-[var(--nav-text-color)] text-lg">Loading projects...</p>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section id="projects" className="min-h-screen w-full px-4 py-16 md:px-8 lg:px-16 scroll-mt-24 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">Failed to load projects</p>
          <p className="text-[var(--nav-text-color)] opacity-70">{error}</p>
        </div>
      </section>
    );
  }

  // No projects state
  if (!projects || projects.length === 0) {
    return (
      <section id="projects" className="min-h-screen w-full px-4 py-16 md:px-8 lg:px-16 scroll-mt-24 flex items-center justify-center">
        <div className="text-center">
          <p className="text-[var(--nav-text-color)] text-lg">No projects available yet.</p>
        </div>
      </section>
    );
  }

  const currentProject = projects[currentIndex];

  return (
    <section id="projects" className="min-h-screen w-full px-4 py-16 md:px-8 lg:px-16 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        {/* Main Heading */}
        <div className=" mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--nav-text-color)] mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-[var(--nav-text-color)] opacity-70 max-w-2xl ">
            A showcase of my recent work and side projects
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative flex items-center justify-center gap-8">
          {/* Left Arrow */}
          {projects.length > 1 && (
            <button
              onClick={prevProject}
              className="p-2 text-[var(--nav-text-hover)] hover:text-[var(--nav-text-color)] transition-all duration-200 z-10"
              aria-label="Previous project"
            >
              <FaChevronLeft className="w-8 h-8" />
            </button>
          )}

          {/* Project Container */}
          <div className="w-full max-w-6xl">
            {/* Project Display */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
              {/* Image Section */}
              <div className="w-full lg:w-2/5 flex flex-col">
              <div className="relative group flex-1">
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-[var(--nav-border-color)] h-72 lg:h-96 bg-[var(--nav-hover-bg)]">
                  <img
                    src={currentProject.image}
                    alt={currentProject.title}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-[var(--nav-text-hover)] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </div>

                {/* Decorative Element */}
                <div className="absolute -z-10 w-full h-full bg-gradient-to-br from-[var(--nav-text-hover)] to-[var(--bg-rays-color)] opacity-20 rounded-2xl -right-4 -bottom-4"></div>
              </div>
            </div>

            {/* Content Section */}
            <div className="w-full lg:w-3/5 space-y-6 flex flex-col justify-center">
              {/* Title */}
              <h3 className="text-3xl md:text-4xl font-bold text-[var(--nav-text-color)]">
                {currentProject.title}
              </h3>

              {/* Description */}
              <p className="text-base md:text-lg text-[var(--nav-text-color)] opacity-70 leading-relaxed">
                {currentProject.description}
              </p>

              {/* Tech Stack */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-[var(--nav-text-color)] opacity-80 uppercase tracking-wider">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {currentProject.tech_stacks.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-4 py-2 bg-[var(--nav-hover-bg)] border border-[var(--nav-border-color)] text-[var(--nav-text-color)] text-sm font-medium rounded-lg hover:border-[var(--nav-text-hover)] hover:bg-[var(--nav-text-hover)] hover:text-white transition-all duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href={currentProject.github_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--nav-hover-bg)] border-2 border-[var(--nav-border-color)] text-[var(--nav-text-color)] font-medium rounded-lg hover:bg-[var(--nav-text-hover)] hover:border-[var(--nav-text-hover)] hover:text-white transition-all duration-200 shadow-md hover:shadow-xl"
                >
                  <FaGithub className="w-5 h-5" />
                  View Code
                </a>
                {currentProject.live_link && (
                  <a
                    href={currentProject.live_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--nav-text-hover)] text-white font-medium rounded-lg hover:opacity-90 transition-opacity duration-200 shadow-lg hover:shadow-xl"
                  >
                    <FaExternalLinkAlt className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
          </div>

          {/* Right Arrow */}
          {projects.length > 1 && (
            <button
              onClick={nextProject}
              className="p-2 text-[var(--nav-text-hover)] hover:text-[var(--nav-text-color)] transition-all duration-200 z-10"
              aria-label="Next project"
            >
              <FaChevronRight className="w-8 h-8" />
            </button>
          )}
        </div>

        {/* Carousel Indicators */}
        {projects.length > 1 && (
          <div className="flex justify-center gap-3 mt-12">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => goToProject(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'w-12 h-3 bg-[var(--nav-text-hover)]'
                  : 'w-3 h-3 bg-[var(--nav-border-color)] hover:bg-[var(--nav-text-hover)] hover:opacity-70'
              }`}
              aria-label={`Go to project ${index + 1}`}
            ></button>
          ))}
          </div>
        )}

        {/* Project Counter */}
        {projects.length > 1 && (
          <div className="text-center mt-6">
            <p className="text-[var(--nav-text-color)] opacity-60 text-sm">
              {currentIndex + 1}/{projects.length}
            </p>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <p className="text-[var(--nav-text-color)] opacity-70 mb-6">
            Want to see more of my work?
          </p>
          <a
            href={personalInfo?.social_links?.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--nav-hover-bg)] border-2 border-[var(--nav-border-color)] text-[var(--nav-text-color)] font-medium rounded-lg hover:bg-[var(--nav-text-hover)] hover:border-[var(--nav-text-hover)] hover:text-white transition-all duration-200 shadow-md hover:shadow-xl"
          >
            <FaGithub className="w-6 h-6" />
            Visit My GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
