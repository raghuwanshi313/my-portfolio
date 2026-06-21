import React, { useState } from 'react';
import { useSkills } from '../hooks/useSkills';
import { getSkillIcon } from '../utils/skillIcons';

interface Skill {
  name: string;
  icon: React.ReactNode;
  color: string;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
  emoji: string;
}

const Skills = () => {
  const { skills, loading, error } = useSkills();
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  // Map API data to skill categories with icons
  const skillCategories: SkillCategory[] = [
    {
      title: 'Programming Languages',
      emoji: '💻',
      skills: skills.programming_languages.map(name => {
        const { icon, color } = getSkillIcon(name);
        return { name, icon, color };
      }),
    },
    {
      title: 'Frontend',
      emoji: '🎨',
      skills: skills.frontend.map(name => {
        const { icon, color } = getSkillIcon(name);
        return { name, icon, color };
      }),
    },
    {
      title: 'Backend',
      emoji: '⚙️',
      skills: skills.backend.map(name => {
        const { icon, color } = getSkillIcon(name);
        return { name, icon, color };
      }),
    },
    {
      title: 'Databases',
      emoji: '🗄️',
      skills: skills.databases.map(name => {
        const { icon, color } = getSkillIcon(name);
        return { name, icon, color };
      }),
    },
    {
      title: 'Development Tools',
      emoji: '🛠️',
      skills: skills.dev_tools.map(name => {
        const { icon, color } = getSkillIcon(name);
        return { name, icon, color };
      }),
    },
  ].filter(category => category.skills.length > 0); // Only show categories with skills

  // Loading state
  if (loading) {
    return (
      <section id="skills" className="min-h-screen w-full px-4 py-16 md:px-8 lg:px-16 scroll-mt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[var(--nav-text-hover)] mx-auto mb-4"></div>
          <p className="text-[var(--nav-text-color)] text-lg">Loading skills...</p>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section id="skills" className="min-h-screen w-full px-4 py-16 md:px-8 lg:px-16 scroll-mt-24 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">Failed to load skills</p>
          <p className="text-[var(--nav-text-color)] opacity-70">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="min-h-screen w-full px-4 py-16 md:px-8 lg:px-16 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        {/* Main Heading */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--nav-text-color)] mb-4">
            Skills & Technologies
          </h2>
          <p className="text-lg text-[var(--nav-text-color)] opacity-70 max-w-2xl">
            A comprehensive overview of the technologies and tools I work with
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className={`relative rounded-2xl p-6 border border-[var(--nav-border-color)] transition-all duration-300 ${
                activeCategory === categoryIndex
                  ? 'shadow-2xl scale-105 border-[var(--nav-text-hover)]'
                  : 'shadow-lg hover:shadow-xl'
              }`}
              onMouseEnter={() => setActiveCategory(categoryIndex)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">{category.emoji}</span>
                <h3 className="text-xl font-bold text-[var(--nav-text-color)]">
                  {category.title}
                </h3>
              </div>

              {/* Skills List */}
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="group relative flex items-center gap-2 px-4 py-2 border border-[var(--nav-border-color)] rounded-full hover:bg-[var(--nav-text-hover)] hover:border-[var(--nav-text-hover)] transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
                    style={{
                      animationDelay: `${skillIndex * 50}ms`,
                    }}
                  >
                    {/* Icon */}
                    <span
                      className="text-xl transition-transform duration-200 group-hover:scale-110"
                      style={{
                        color: activeCategory !== categoryIndex ? skill.color : 'white',
                      }}
                    >
                      {skill.icon}
                    </span>

                    {/* Skill Name */}
                    <span className="text-sm font-medium text-[var(--nav-text-color)] group-hover:text-white transition-colors duration-200">
                      {skill.name}
                    </span>

                  </div>
                ))}
              </div>

              {/* Card Corner Accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[var(--nav-text-hover)] to-[var(--bg-rays-color)] opacity-10 rounded-tr-2xl rounded-bl-full"></div>
            </div>
          ))}
        </div>

        {/* Bottom Decorative Element */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--nav-border-color)] rounded-full">
            <span className="text-[var(--nav-text-color)] opacity-70">
              Always learning and exploring new technologies
            </span>
            <span className="text-xl">🚀</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
