import React, { useState, useEffect, useRef } from 'react';
import { TerrainPhoto } from '../data/portfolioData';
import { Pause, Play, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TerrainMarqueeProps {
  photos: TerrainPhoto[];
}

export const TerrainMarquee: React.FC<TerrainMarqueeProps> = ({ photos }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Touch swipe handling for mobile in lightbox
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Both blocks scroll ALL photos, with block 2 shifted by half the list for visual diversity
  const allPhotosBlock1 = photos;
  const halfLength = Math.floor(photos.length / 2);
  const allPhotosBlock2 = [...photos.slice(halfLength), ...photos.slice(0, halfLength)];

  // Duplicated for seamless continuous CSS marquee animation loop
  const duplicatedBlock1 = [...allPhotosBlock1, ...allPhotosBlock1];
  const duplicatedBlock2 = [...allPhotosBlock2, ...allPhotosBlock2];

  const handleNext = () => {
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % photos.length : null));
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev !== null ? (prev - 1 + photos.length) % photos.length : null));
  };

  const handleClose = () => {
    setSelectedIndex(null);
  };

  // Keyboard navigation (Escape, ArrowLeft, ArrowRight)
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev !== null ? (prev + 1) % photos.length : null));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev !== null ? (prev - 1 + photos.length) % photos.length : null));
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setSelectedIndex(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, photos.length]);

  // Touch gesture handlers for mobile swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = null;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      handleNext(); // swipe left -> next
    } else if (diff < -45) {
      handlePrev(); // swipe right -> prev
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const currentPhoto = selectedIndex !== null ? photos[selectedIndex] : null;

  return (
    <section 
      id="photos-terrain" 
      className="relative py-8 sm:py-12 bg-[#F3F6F9] border-b border-slate-200 overflow-hidden"
    >
      {/* Header section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 sm:mb-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#102B46] font-mono bg-white px-2.5 sm:px-3 py-1 rounded-full border border-slate-200 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#D5A33D] animate-pulse" />
              <span>Immersion terrain et réalité chantier</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-[#102B46] mt-1 font-heading uppercase">
              Sur le terrain
            </h2>
          </div>

          {/* Pause / Resume control */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-mono font-semibold border border-slate-200 shadow-xs transition-colors cursor-pointer min-h-[36px]"
              title={isPaused ? "Reprendre le défilement" : "Mettre en pause"}
              aria-label={isPaused ? "Reprendre le défilement" : "Mettre en pause"}
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-[#102B46]" /> : <Pause className="w-3.5 h-3.5 text-[#102B46]" />}
              <span className="hidden xs:inline">{isPaused ? "Reprendre" : "Pause"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* The Two Distinct Blocks of Horizontal Marquee */}
      <div 
        className="space-y-3 sm:space-y-4 max-w-7xl mx-auto px-2 sm:px-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* BLOC 1: Premier bloc de défilement horizontal */}
        <div className="relative w-full overflow-hidden bg-white rounded-xl sm:rounded-2xl p-2 sm:p-2.5 border border-slate-200 shadow-xs">
          <div className="absolute left-0 top-0 bottom-0 w-6 sm:w-16 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none rounded-l-xl sm:rounded-l-2xl" />
          <div className="absolute right-0 top-0 bottom-0 w-6 sm:w-16 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none rounded-r-xl sm:rounded-r-2xl" />

          <div 
            className={`flex gap-2 sm:gap-3.5 w-max ${isPaused ? '' : 'animate-marquee'}`}
            style={{ willChange: 'transform' }}
          >
            {duplicatedBlock1.map((photo, index) => {
              const originalIndex = photos.findIndex((p) => p.id === photo.id);
              return (
                <div
                  key={`b1-${photo.id}-${index}`}
                  onClick={() => setSelectedIndex(originalIndex >= 0 ? originalIndex : 0)}
                  className="group relative w-[130px] xs:w-[155px] sm:w-[210px] md:w-[260px] aspect-[4/3] rounded-lg sm:rounded-xl overflow-hidden bg-slate-900 border border-slate-200 hover:border-[#D5A33D] shadow-xs hover:shadow-md flex-shrink-0 cursor-pointer transform hover:scale-[1.02] active:scale-95 transition-all duration-300"
                  title="Cliquer pour afficher en grand et faire défiler"
                >
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover object-center pointer-events-none select-none transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <div className="p-2 rounded-full bg-black/60 text-white backdrop-blur-xs">
                      <Maximize2 className="w-4 h-4 text-[#D5A33D]" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* BLOC 2: Deuxième bloc de défilement horizontal */}
        <div className="relative w-full overflow-hidden bg-white rounded-xl sm:rounded-2xl p-2 sm:p-2.5 border border-slate-200 shadow-xs">
          <div className="absolute left-0 top-0 bottom-0 w-6 sm:w-16 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none rounded-l-xl sm:rounded-l-2xl" />
          <div className="absolute right-0 top-0 bottom-0 w-6 sm:w-16 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none rounded-r-xl sm:rounded-r-2xl" />

          <div 
            className={`flex gap-2 sm:gap-3.5 w-max ${isPaused ? '' : 'animate-marquee'}`}
            style={{ willChange: 'transform' }}
          >
            {duplicatedBlock2.map((photo, index) => {
              const originalIndex = photos.findIndex((p) => p.id === photo.id);
              return (
                <div
                  key={`b2-${photo.id}-${index}`}
                  onClick={() => setSelectedIndex(originalIndex >= 0 ? originalIndex : 0)}
                  className="group relative w-[130px] xs:w-[155px] sm:w-[210px] md:w-[260px] aspect-[4/3] rounded-lg sm:rounded-xl overflow-hidden bg-slate-900 border border-slate-200 hover:border-[#D5A33D] shadow-xs hover:shadow-md flex-shrink-0 cursor-pointer transform hover:scale-[1.02] active:scale-95 transition-all duration-300"
                  title="Cliquer pour afficher en grand et faire défiler"
                >
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover object-center pointer-events-none select-none transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <div className="p-2 rounded-full bg-black/60 text-white backdrop-blur-xs">
                      <Maximize2 className="w-4 h-4 text-[#D5A33D]" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lightbox Modal: Affichage en grand avec défilement fluide des autres images */}
      <AnimatePresence>
        {selectedIndex !== null && currentPhoto && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-between p-3 sm:p-5 md:p-6 bg-black/95 backdrop-blur-md select-none"
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
          >
            {/* Top Bar with Counter and Close Button */}
            <div 
              className="w-full max-w-6xl flex items-center justify-between z-30 pt-1 pb-2"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2.5">
                <span className="px-3 py-1 rounded-full bg-[#102B46] border border-[#D5A33D]/40 text-[#D5A33D] text-xs font-mono font-bold">
                  {selectedIndex + 1} / {photos.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer border border-white/20 active:scale-95"
                  title="Fermer (Échap)"
                  aria-label="Fermer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Central Main Image Container with Left and Right Arrows */}
            <div 
              className="relative w-full max-w-6xl flex-1 flex items-center justify-center my-auto min-h-0"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {/* Previous Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-1 sm:left-3 z-30 p-2.5 sm:p-3.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/25 hover:border-[#D5A33D] shadow-2xl transition-all cursor-pointer hover:scale-110 active:scale-95"
                title="Image précédente (Flèche Gauche)"
                aria-label="Image précédente"
              >
                <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7" />
              </button>

              {/* Main Expanded Image: pure photo sans rien */}
              <div className="relative max-h-[76vh] sm:max-h-[82vh] max-w-full flex items-center justify-center overflow-hidden rounded-2xl shadow-2xl bg-black/40 border border-white/10">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentPhoto.id}
                    src={currentPhoto.imageUrl}
                    alt={currentPhoto.title}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="max-h-[76vh] sm:max-h-[82vh] w-auto max-w-full object-contain mx-auto block rounded-xl shadow-2xl"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>
              </div>

              {/* Next Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-1 sm:right-3 z-30 p-2.5 sm:p-3.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/25 hover:border-[#D5A33D] shadow-2xl transition-all cursor-pointer hover:scale-110 active:scale-95"
                title="Image suivante (Flèche Droite)"
                aria-label="Image suivante"
              >
                <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7" />
              </button>
            </div>

            {/* Bottom Section: Interactive Thumbnails Strip (pure photos) */}
            <div 
              className="w-full max-w-6xl z-30 pt-2 pb-1"
              onClick={(e) => e.stopPropagation()}
            >

              {/* Horizontal Thumbnails Carousel for Direct Access */}
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 overflow-x-auto py-1 px-2 no-scrollbar max-w-full">
                {photos.map((photo, idx) => (
                  <button
                    key={`thumb-${photo.id}`}
                    type="button"
                    onClick={() => setSelectedIndex(idx)}
                    className={`relative w-12 sm:w-16 h-9 sm:h-12 rounded-lg overflow-hidden flex-shrink-0 transition-all cursor-pointer border ${
                      selectedIndex === idx
                        ? 'border-[#D5A33D] ring-2 ring-[#D5A33D]/50 scale-105'
                        : 'border-white/20 opacity-50 hover:opacity-90 hover:border-white/60'
                    }`}
                    title={photo.title}
                  >
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
