import React from 'react';
import {
  FaPython,
  FaJava,
  FaJs,
  FaReact,
  FaVuejs,
  FaAngular,
  FaNode,
  FaDocker,
  FaGitAlt,
  FaAws,
  FaPhp,
  FaRust,
  FaCode,
  FaPalette,
  FaCog,
  FaDatabase,
  FaTools,
  FaBox,
} from 'react-icons/fa';
import {
  SiTypescript,
  SiCplusplus,
  SiTailwindcss,
  SiNextdotjs,
  SiExpress,
  SiDjango,
  SiSpring,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiRedis,
  SiFirebase,
  SiKubernetes,
  SiPostman,
  SiGithub,
  SiSharp,
  SiRuby,
  SiSwift,
  SiKotlin,
  SiHtml5,
  SiCss3,
  SiSvelte,
  SiFlask,
  SiFastapi,
  SiNestjs,
  SiGraphql,
  SiSqlite,
  SiElasticsearch,
  SiJenkins,
  SiGitlab,
  SiTerraform,
  SiGooglecloud,
  SiLinux,
  SiNginx,
} from 'react-icons/si';
import { TbBrandGolang, TbBrandVscode } from 'react-icons/tb';

interface SkillIconData {
  icon: React.ReactNode;
  color: string;
}

// Mapping of category names to their icons
const categoryIconMap: Record<string, React.ReactNode> = {
  'programming languages': <FaCode />,
  'frontend': <FaPalette />,
  'backend': <FaCog />,
  'databases': <FaDatabase />,
  'dev tools': <FaTools />,
  'other': <FaBox />,
};

// Mapping of skill names to their icons and colors
const skillIconMap: Record<string, SkillIconData> = {
  // Programming Languages
  'python': { icon: <FaPython />, color: '#3776AB' },
  'javascript': { icon: <FaJs />, color: '#F7DF1E' },
  'typescript': { icon: <SiTypescript />, color: '#3178C6' },
  'java': { icon: <FaJava />, color: '#007396' },
  'c++': { icon: <SiCplusplus />, color: '#00599C' },
  'go': { icon: <TbBrandGolang />, color: '#00ADD8' },
  'c#': { icon: <SiSharp />, color: '#239120' },
  'ruby': { icon: <SiRuby />, color: '#CC342D' },
  'php': { icon: <FaPhp />, color: '#777BB4' },
  'swift': { icon: <SiSwift />, color: '#FA7343' },
  'kotlin': { icon: <SiKotlin />, color: '#7F52FF' },
  'rust': { icon: <FaRust />, color: '#000000' },
  
  // Frontend
  'react.js': { icon: <FaReact />, color: '#61DAFB' },
  'next.js': { icon: <SiNextdotjs />, color: '#000000' },
  'vue.js': { icon: <FaVuejs />, color: '#4FC08D' },
  'angular.js': { icon: <FaAngular />, color: '#DD0031' },
  'tailwind css': { icon: <SiTailwindcss />, color: '#06B6D4' },
  'html': { icon: <SiHtml5 />, color: '#E34F26' },
  'css': { icon: <SiCss3 />, color: '#1572B6' },
  'svelte': { icon: <SiSvelte />, color: '#FF3E00' },
  
  // Backend
  'node.js': { icon: <FaNode />, color: '#339933' },
  'express': { icon: <SiExpress />, color: '#000000' },
  'django': { icon: <SiDjango />, color: '#092E20' },
  'spring boot': { icon: <SiSpring />, color: '#6DB33F' },
  'flask': { icon: <SiFlask />, color: '#000000' },
  'fastapi': { icon: <SiFastapi />, color: '#009688' },
  'nest.js': { icon: <SiNestjs />, color: '#E0234E' },
  'graphql': { icon: <SiGraphql />, color: '#E10098' },
  
  // Databases
  'mongodb': { icon: <SiMongodb />, color: '#47A248' },
  'postgresql': { icon: <SiPostgresql />, color: '#4169E1' },
  'mysql': { icon: <SiMysql />, color: '#4479A1' },
  'redis': { icon: <SiRedis />, color: '#DC382D' },
  'firebase': { icon: <SiFirebase />, color: '#FFCA28' },
  'sqlite': { icon: <SiSqlite />, color: '#003B57' },
  'elasticsearch': { icon: <SiElasticsearch />, color: '#005571' },
  
  // Development Tools
  'git': { icon: <FaGitAlt />, color: '#F05032' },
  'github': { icon: <SiGithub />, color: '#181717' },
  'docker': { icon: <FaDocker />, color: '#2496ED' },
  'kubernetes': { icon: <SiKubernetes />, color: '#326CE5' },
  'aws': { icon: <FaAws />, color: '#FF9900' },
  'postman': { icon: <SiPostman />, color: '#FF6C37' },
  'vs code': { icon: <TbBrandVscode />, color: '#007ACC' },
  'jenkins': { icon: <SiJenkins />, color: '#D24939' },
  'gitlab': { icon: <SiGitlab />, color: '#FCA121' },
  'terraform': { icon: <SiTerraform />, color: '#7B42BC' },
  'gcp': { icon: <SiGooglecloud />, color: '#4285F4' },
  'linux': { icon: <SiLinux />, color: '#FCC624' },
  'nginx': { icon: <SiNginx />, color: '#009639' },
};

// Default icon and color for unknown skills
const defaultSkill: SkillIconData = {
  icon: <span>•</span>,
  color: '#9CA3AF',
};

export const getSkillIcon = (skillName: string): SkillIconData => {
  const normalizedName = skillName.toLowerCase().trim();
  return skillIconMap[normalizedName] || defaultSkill;
};

export const getCategoryIcon = (categoryKey: string): React.ReactNode => {
  return categoryIconMap[categoryKey] || <FaBox />;
};
