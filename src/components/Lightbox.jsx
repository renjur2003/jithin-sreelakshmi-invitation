import { motion } from 'framer-motion';
import { useEffect, useCallback, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function Lightbox({ imageSrc, currentIndex, onClose, onNavigate, onImageChange }) {
  const photos = weddingData.photos;
  const [touchStart, setTouchStart] = useState(null);

  const goNext = useCallback(() => {
    const next = (currentIndex + 1) % photos.length;
    onNavigate(next);
    onImageChange(photos[next].src);
  }, [currentIndex, photos, onNavigate, onImageChange]);

  const goPrev = useCallback(() => {
    const prev = (currentIndex - 1 + photos.length) % photos.length;
    onNavigate(prev);
    onImageChange(photos[prev].src);
  }, [currentIndex, photos, onNavigate, onImageChange]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, goNext, goPrev]);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) goNext();
      else goPrev();
    }
    setTouchStart(null);
  };

  return (
    <motion.div
      className="lightbox-overlay px-2 sm:px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Bar: Close Button & Counter */}
      <div className="absolute top-4 inset-x-4 sm:top-6 sm:inset-x-6 z-20 flex items-center justify-between pointer-events-none">
        <span className="font-sans text-xs tracking-[2px] uppercase text-white/70 bg-black/40 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm">
          {currentIndex + 1} / {photos.length}
        </span>

        <button
          className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 pointer-events-auto bg-black/50 hover:bg-black/80 border border-white/20 text-white"
          onClick={onClose}
          aria-label="Close lightbox"
        >
          <X size={18} />
        </button>
      </div>

      {/* Prev Button */}
      <button
        className="absolute left-2 sm:left-6 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-200 bg-black/40 hover:bg-black/70 border border-white/20 text-white active:scale-95"
        onClick={(e) => {
          e.stopPropagation();
          goPrev();
        }}
        aria-label="Previous image"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Main Image Container */}
      <motion.div
        className="relative max-w-4xl max-h-[85vh] w-full mx-auto px-2 sm:px-8 py-10 flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
        key={imageSrc}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.25 }}
      >
        <img
          src={imageSrc}
          alt={photos[currentIndex]?.alt || 'Couple photo'}
          className="max-h-[75vh] w-auto max-w-full object-contain rounded-sm shadow-2xl mx-auto block"
        />
        <p className="text-center font-sans text-[11px] tracking-[2px] uppercase mt-3 text-white/50">
          Swipe left or right to browse
        </p>
      </motion.div>

      {/* Next Button */}
      <button
        className="absolute right-2 sm:right-6 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-200 bg-black/40 hover:bg-black/70 border border-white/20 text-white active:scale-95"
        onClick={(e) => {
          e.stopPropagation();
          goNext();
        }}
        aria-label="Next image"
      >
        <ChevronRight size={20} />
      </button>
    </motion.div>
  );
}
