import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-24 z-40 flex items-center justify-center bg-[var(--nav-text-hover)] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-[var(--nav-text-hover)]"
          aria-label="Back to top"
        >
          <div className="flex items-center justify-center px-4 py-3">
            <FaArrowUp className="w-5 h-5" />
          </div>
        </button>
      )}
    </>
  );
};

export default BackToTop;
