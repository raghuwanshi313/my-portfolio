import CodingProfileCard from './CodingProfileCard';
import CertificationCarousel from './CertificationCarousel';
import { useCertifications } from '../hooks/useCertifications';
import { useCodingProfiles } from '../hooks/useCodingProfiles';
import { usePersonalInfo } from '../hooks/usePersonalInfo';
import { getPlatformConfig } from '../utils/platformIcons';

const AboutMe = () => {
  const { certifications, loading: certsLoading } = useCertifications();
  const { codingProfiles, loading: profilesLoading, error: profilesError } = useCodingProfiles();
  const { personalInfo, loading: personalLoading } = usePersonalInfo();

  return (
    <section id="about" className="min-h-screen w-full px-4 py-16 md:px-8 lg:px-16 scroll-mt-24">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Top Section - More About Me & Coding Profiles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side - More About Me */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--nav-text-color)]">
              More About Me
            </h2>

            <div className="space-y-4 text-[var(--nav-text-color)] opacity-70 leading-relaxed">
              {personalLoading ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-[var(--nav-text-hover)] mx-auto"></div>
                </div>
              ) : personalInfo?.description ? (
                <>
                  <p>
                    {(() => {
                      const sentences = personalInfo.description.split('. ');
                      const firstTwo = sentences.slice(0, 2).join('. ');
                      return firstTwo + (firstTwo.endsWith('.') ? '' : '.');
                    })()}
                  </p>
                  {(() => {
                    const sentences = personalInfo.description.split('. ');
                    if (sentences.length > 2) {
                      const remaining = sentences.slice(2);
                      const midPoint = Math.ceil(remaining.length / 2);
                      const secondPara = remaining.slice(0, midPoint).join('. ').trim();
                      const thirdPara = remaining.slice(midPoint).join('. ').trim();
                      
                      return (
                        <>
                          {secondPara && <p>{secondPara + (secondPara.endsWith('.') ? '' : '.')}</p>}
                          {thirdPara && <p>{thirdPara}</p>}
                        </>
                      );
                    }
                    return null;
                  })()}
                </>
              ) : (
                <>
                  <p>
                    I'm a passionate full-stack developer with a keen interest in building
                    scalable and performant web applications. My journey in software development
                    started several years ago, and I've been constantly learning and evolving
                    my skills ever since.
                  </p>
                  <p>
                    I specialize in modern web technologies including React, TypeScript, Node.js,
                    and various backend frameworks. I love solving complex problems and turning
                    ideas into elegant, user-friendly solutions.
                  </p>
                  <p>
                    When I'm not coding, you can find me exploring new technologies, contributing
                    to open-source projects, or sharing my knowledge with the developer community.
                    I believe in continuous learning and staying updated with the latest industry
                    trends.
                  </p>
                </>
              )}
            </div>

            {personalInfo?.cv && (
              <a
                href={personalInfo.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--nav-text-hover)] text-white font-medium rounded-lg hover:opacity-90 transition-opacity duration-200 shadow-lg hover:shadow-xl"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Download CV
              </a>
            )}
          </div>

          {/* Right Side - Coding Profiles */}
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-bold text-[var(--nav-text-color)]">
              Coding Profiles
            </h3>
            
            {profilesLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[var(--nav-text-hover)] mx-auto mb-4"></div>
                <p className="text-[var(--nav-text-color)] opacity-60">Loading profiles...</p>
              </div>
            ) : profilesError ? (
              <div className="text-center py-8 bg-red-900/20 border border-red-500 rounded-lg">
                <p className="text-red-400">Error: {profilesError}</p>
              </div>
            ) : codingProfiles.length === 0 ? (
              <div className="text-center py-8 bg-[var(--nav-hover-bg)] border border-[var(--nav-border-color)] rounded-lg">
                <p className="text-[var(--nav-text-color)] opacity-60">No coding profiles added yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {codingProfiles.map((profile) => {
                  const platformConfig = getPlatformConfig(profile.platform);
                  return (
                    <CodingProfileCard
                      key={profile._id}
                      platform={profile.platform}
                      icon={platformConfig.icon}
                      iconBgColor={platformConfig.color}
                      rank={profile.rank}
                      rating={profile.rating}
                      problemsSolved={profile.question_count}
                      profileUrl={profile.profile_url}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section - Internship Certificates */}
        <div className="space-y-6">
          <h3 className="text-2xl md:text-3xl font-bold text-[var(--nav-text-color)] text-center">
            Internship Certificates
          </h3>
          
          {certsLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[var(--nav-text-hover)] mx-auto mb-4"></div>
              <p className="text-[var(--nav-text-color)] opacity-60">Loading certifications...</p>
            </div>
          ) : (
            <CertificationCarousel certifications={certifications} />
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
