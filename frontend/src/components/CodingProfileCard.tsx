import React from 'react';
import { FaTrophy, FaStar, FaCode } from 'react-icons/fa';

interface CodingProfileCardProps {
  platform: string;
  icon?: React.ReactNode;
  iconBgColor?: string;
  rank?: string;
  rating?: number;
  problemsSolved?: number;
  profileUrl: string;
  stats?: {
    label: string;
    value: string | number;
  }[];
}

const CodingProfileCard: React.FC<CodingProfileCardProps> = ({
  platform,
  icon,
  iconBgColor = 'var(--nav-text-hover)',
  rank,
  rating,
  problemsSolved,
  profileUrl,
}) => {
  return (
    <div className="relative group">
      {/* Animated Background Gradient */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"
        style={{ backgroundColor: iconBgColor }}
      ></div>

      {/* Main Card */}
      <div className="relative h-full backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-[var(--nav-border-color)] hover:border-[var(--nav-text-hover)] overflow-hidden hover:scale-105">
        
        {/* Animated gradient top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient"
          style={{
            background: `linear-gradient(90deg, ${iconBgColor}, ${iconBgColor}88, ${iconBgColor})`,
            backgroundSize: '200% 100%',
          }}
        ></div>

        {/* Content */}
        <div className="p-6 h-full flex flex-col">
          
          {/* Platform Header */}
          <div className="mb-6 flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl shadow-lg flex-shrink-0 animate-pulse-slow group-hover:animate-none"
                style={{ backgroundColor: iconBgColor }}
              >
                <div className="transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                  {icon || <span className="text-white font-bold text-2xl">{platform.slice(0, 2).toUpperCase()}</span>}
                </div>
              </div>
              <div>
                <h4 className="font-bold text-xl text-[var(--nav-text-color)] group-hover:text-[var(--nav-text-hover)] transition-colors duration-300">
                  {platform}
                </h4>
                <p className="text-xs text-[var(--nav-text-color)] opacity-50 mt-1">
                  Coding Profile
                </p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="space-y-4 mb-6 flex-grow">
            {rank && (
              <div className="group/stat animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <FaTrophy className="w-4 h-4 text-blue-400 transition-transform duration-300 group-hover/stat:scale-125 group-hover/stat:rotate-12" />
                    <span className="text-sm text-[var(--nav-text-color)] opacity-70 font-medium">
                      Rank
                    </span>
                  </div>
                  <span className="px-3 py-1.5 bg-blue-500 rounded-full text-white font-bold text-sm group-hover/stat:shadow-lg group-hover/stat:scale-105 transition-all duration-200">
                    {rank}
                  </span>
                </div>
              </div>
            )}

            {rating !== undefined && (
              <div className="group/stat animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <FaStar className="w-4 h-4 text-yellow-400 transition-transform duration-300 group-hover/stat:scale-125 group-hover/stat:rotate-12" />
                    <span className="text-sm text-[var(--nav-text-color)] opacity-70 font-medium">
                      Rating
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1.5 bg-yellow-500 rounded-full text-white font-bold text-sm group-hover/stat:shadow-lg group-hover/stat:scale-105 transition-all duration-200">
                      {rating}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {problemsSolved !== undefined && (
              <div className="group/stat animate-slide-in-right" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <FaCode className="w-4 h-4 text-green-400 transition-transform duration-300 group-hover/stat:scale-125 group-hover/stat:rotate-12" />
                    <span className="text-sm text-[var(--nav-text-color)] opacity-70 font-medium">
                      Problems Solved
                    </span>
                  </div>
                  <span className="px-3 py-1.5 bg-green-500 rounded-full text-white font-bold text-sm group-hover/stat:shadow-lg group-hover/stat:scale-105 transition-all duration-200">
                    {problemsSolved}
                  </span>
                </div>
                {/* Visual progress indicator */}
                <div className="h-1.5 bg-[var(--nav-border-color)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-300 animate-progress"
                    style={{
                      width: `${Math.min(((problemsSolved as number) / 1000) * 100, 100)}%`,
                    }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {/* View Profile Button */}
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r transition-all duration-300 hover:shadow-lg font-semibold rounded-xl group/link relative overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(135deg, ${iconBgColor}, ${iconBgColor}dd)`,
            }}
          >
            <span className="relative z-10 text-white">View Profile</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1 relative z-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
            
            {/* Hover ripple effect */}
            <div className="absolute inset-0 -z-0 opacity-0 group-hover/link:opacity-20 bg-white transition-opacity duration-300"></div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CodingProfileCard;
