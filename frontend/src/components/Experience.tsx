import { FaBriefcase } from 'react-icons/fa';
import { useExperiences } from '../hooks/useExperiences';

const Experience = () => {
  const { experiences, loading, error } = useExperiences();

  // Loading state
  if (loading) {
    return (
      <section id="experience" className="min-h-screen w-full px-4 py-16 md:px-8 lg:px-16 scroll-mt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[var(--nav-text-hover)] mx-auto mb-4"></div>
          <p className="text-[var(--nav-text-color)] text-lg">Loading experiences...</p>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section id="experience" className="min-h-screen w-full px-4 py-16 md:px-8 lg:px-16 scroll-mt-24 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">Failed to load experiences</p>
          <p className="text-[var(--nav-text-color)] opacity-70">{error}</p>
        </div>
      </section>
    );
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const getDuration = (joiningDate: string, leavingDate?: string, isCurrent?: boolean) => {
    const start = formatDate(joiningDate);
    const end = isCurrent ? 'Present' : leavingDate ? formatDate(leavingDate) : 'Present';
    return `${start} - ${end}`;
  };

  return (
    <section id="experience" className="min-h-screen w-full px-4 py-16 md:px-8 lg:px-16 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        {/* Main Heading */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--nav-text-color)] mb-4">
            Work Experience
          </h2>
          <p className="text-lg text-[var(--nav-text-color)] opacity-70 max-w-2xl">
            My professional journey and accomplishments
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-12 relative">
          {/* Vertical Timeline Line */}
          <div className="hidden lg:block absolute left-5 top-0 bottom-0 w-0.5 bg-[var(--nav-border-color)]"></div>

          {experiences.map((experience) => (
            <div
              key={experience._id}
              className="relative pl-0 lg:pl-16"
            >
              {/* Timeline Dot */}
              <div className="hidden lg:block absolute left-3.5 top-4 w-4 h-4 bg-[var(--nav-text-hover)] rounded-full border-4 border-[var(--nav-hover-bg)] shadow-lg z-10"></div>

              {/* Experience Card - Grid Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Side - Company, Role, Duration */}
                <div className="space-y-4">
                  {/* Company Name and Icon */}
                  <div className="flex items-center gap-3">
                    {experience.company_logo ? (
                      <img 
                        src={experience.company_logo} 
                        alt={experience.company_name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-[var(--nav-border-color)]"
                      />
                    ) : (
                      <div className="p-3 bg-[var(--nav-text-hover)] rounded-full lg:hidden">
                        <FaBriefcase className="w-5 h-5 text-white" />
                      </div>
                    )}
                    <h3 className="text-2xl md:text-3xl font-bold text-[var(--nav-text-color)]">
                      {experience.company_name}
                    </h3>
                  </div>

                  {/* Role */}
                  <p className="text-xl md:text-2xl font-semibold text-[var(--nav-text-hover)]">
                    {experience.role}
                  </p>

                  {/* Duration */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--nav-hover-bg)] border border-[var(--nav-border-color)] rounded-full">
                    <span className="text-sm font-medium text-[var(--nav-text-color)] opacity-80">
                      {getDuration(experience.joining_date, experience.leaving_date, experience.is_current)}
                    </span>
                  </div>
                  
                  {/* Location */}
                  {experience.location && (
                    <p className="text-sm text-[var(--nav-text-color)] opacity-60">
                      📍 {experience.location}
                    </p>
                  )}
                </div>

                {/* Right Side - Description, Highlights, Tech Stack */}
                <div className="space-y-4">
                  {/* Description */}
                  <p className="text-base md:text-lg text-[var(--nav-text-color)] opacity-70 leading-relaxed">
                    {experience.description}
                  </p>

                  {/* Achievements */}
                  {experience.achievements.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-[var(--nav-text-color)] opacity-80 uppercase tracking-wider">
                        Key Achievements
                      </h4>
                      <ul className="space-y-2">
                        {experience.achievements.map((achievement, achievementIndex) => (
                          <li
                            key={achievementIndex}
                            className="flex items-start gap-2 text-[var(--nav-text-color)] opacity-70"
                          >
                            <span className="text-[var(--nav-text-hover)] mt-1">•</span>
                            <span className="text-sm md:text-base">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tech Stack */}
                  {experience.tech_stack.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-[var(--nav-text-color)] opacity-80 uppercase tracking-wider">
                        Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {experience.tech_stack.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-[var(--nav-hover-bg)] border border-[var(--nav-border-color)] text-[var(--nav-text-color)] text-xs font-medium rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Message */}
        <div className="text-center mt-16 pt-12 border-t border-[var(--nav-border-color)]">
          <p className="text-[var(--nav-text-color)] opacity-70">
            Looking for opportunities to work on challenging projects and innovative solutions
          </p>
        </div>
      </div>
    </section>
  );
};

export default Experience;
