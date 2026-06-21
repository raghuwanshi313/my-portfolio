import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaExternalLinkAlt } from 'react-icons/fa';
import type { Certification } from '../api/certifications';

interface CertificationCarouselProps {
  certifications: Certification[];
}

const CertificationCarousel: React.FC<CertificationCarouselProps> = ({ certifications }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCertification = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % certifications.length);
  };

  const prevCertification = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + certifications.length) % certifications.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (!certifications || certifications.length === 0) {
    return (
      <div className="p-8 bg-[var(--nav-hover-bg)] rounded-xl border border-[var(--nav-border-color)] text-center">
        <p className="text-[var(--nav-text-color)] opacity-60">No certifications available</p>
      </div>
    );
  }

  const currentCert = certifications[currentIndex];

  return (
    <div className="relative w-full flex items-center justify-center gap-8">
      {/* Navigation Arrows */}
      {certifications.length > 1 && (
        <>
          <button
            onClick={prevCertification}
            className="p-2 text-[var(--nav-text-hover)] hover:text-[var(--nav-text-color)] transition-all duration-200 z-10"
            aria-label="Previous certification"
          >
            <FaChevronLeft className="w-8 h-8" />
          </button>
        </>
      )}

      {/* Main Card Container */}
      <div className="w-full max-w-4xl">
        <div className="bg-[var(--nav-hover-bg)] rounded-xl shadow-lg border border-[var(--nav-border-color)] overflow-hidden group/card cursor-pointer">
        <div className="relative w-full h-[32rem] overflow-hidden bg-gray-100">
          {/* Certificate Image - shown like a real document */}
          <img
            src={currentCert.image}
            alt={currentCert.name}
            className="w-full h-full object-contain transition-all duration-500 group-hover/card:blur-sm group-hover/card:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).onerror = null;
              (e.target as HTMLImageElement).src = 'https://placehold.co/800x600/374151/9CA3AF?text=Certificate';
            }}
          />
          
          {/* Bottom Gradient for Title */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 group-hover/card:opacity-0"></div>

          {/* Certificate Name - Always Visible at Bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-6 transition-all duration-500 group-hover/card:opacity-0">
            <h4 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
              {currentCert.name}
            </h4>
          </div>

          {/* Details Overlay - Visible on Hover */}
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm opacity-0 group-hover/card:opacity-100 transition-all duration-500 flex flex-col justify-center items-center p-8 space-y-6">
            {/* Certificate Name */}
            <h4 className="text-2xl md:text-3xl font-bold text-white text-center">
              {currentCert.name}
            </h4>

            {/* Issued By and Date */}
            {(currentCert.issued_by || currentCert.issue_date) && (
              <div className="flex flex-wrap justify-center gap-4 text-sm text-white/90">
                {currentCert.issued_by && (
                  <span>
                    <span className="text-white/60">Issued by: </span>
                    <span className="font-semibold">{currentCert.issued_by}</span>
                  </span>
                )}
                {currentCert.issue_date && (
                  <span>
                    <span className="text-white/60">Date: </span>
                    <span className="font-semibold">{new Date(currentCert.issue_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                  </span>
                )}
              </div>
            )}

            {/* Skills Tags */}
            <div className="flex flex-wrap justify-center gap-2">
              {currentCert.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-white/20 text-white text-sm font-medium rounded-full border border-white/30 backdrop-blur-sm"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* View Credential Link */}
            <a
              href={currentCert.credential_link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-white/90 text-gray-900 text-sm font-bold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl group/link"
            >
              <span>View Credential</span>
              <FaExternalLinkAlt className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>

        {/* Indicators */}
        {certifications.length > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {certifications.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-[var(--nav-text-hover)]'
                    : 'w-2 bg-[var(--nav-text-color)] opacity-30 hover:opacity-50'
                }`}
                aria-label={`Go to certification ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Counter */}
        {certifications.length > 1 && (
          <div className="text-center mt-4 text-sm text-[var(--nav-text-color)] opacity-60">
            {currentIndex + 1} / {certifications.length}
          </div>
        )}
      </div>

      {/* Right Arrow */}
      {certifications.length > 1 && (
        <button
          onClick={nextCertification}
          className="p-2 text-[var(--nav-text-hover)] hover:text-[var(--nav-text-color)] transition-all duration-200 z-10"
          aria-label="Next certification"
        >
          <FaChevronRight className="w-8 h-8" />
        </button>
      )}

    </div>
  );
};

export default CertificationCarousel;
