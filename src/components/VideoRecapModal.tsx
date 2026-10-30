import React, { useState, useEffect, useRef, useCallback } from 'react';
import { recapAudio } from '../utils/audioRecap';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Music,
  Compass
} from 'lucide-react';

interface VideoRecapModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
}

export const VideoRecapModal: React.FC<VideoRecapModalProps> = ({
  isOpen,
  onClose,
  images
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');
  
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const slideDurationMs = 4500; // 4.5s per slide for optimal cinematic feel

  // Start music and auto-slide when opened
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      setIsPlaying(true);
      setProgress(0);
      recapAudio.play();
    } else {
      recapAudio.stop();
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    }
    return () => {
      recapAudio.stop();
    };
  }, [isOpen]);

  // Handle slide advance
  const handleNext = useCallback(() => {
    setSlideDirection('next');
    setCurrentIndex(prev => (prev + 1) % images.length);
    setProgress(0);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setSlideDirection('prev');
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
    setProgress(0);
  }, [images.length]);

  // Interval for auto progression and progress bar
  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const intervalTime = 40; // update progress smoothly every 40ms
    const step = (intervalTime / slideDurationMs) * 100;

    const timer = setInterval(() => {
      setProgress(old => {
        if (old >= 100) {
          handleNext();
          return 0;
        }
        return old + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isOpen, isPlaying, handleNext, slideDurationMs]);

  // Audio mute/unmute
  const handleToggleMute = () => {
    const muted = recapAudio.toggleMute();
    setIsMuted(muted);
  };

  // Play/pause toggle
  const handleTogglePlay = () => {
    if (isPlaying) {
      recapAudio.pause();
      setIsPlaying(false);
    } else {
      recapAudio.play();
      setIsPlaying(true);
    }
  };

  // Fullscreen toggle
  const handleToggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === ' ') {
        e.preventDefault();
        handleTogglePlay();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'm' || e.key === 'M') {
        handleToggleMute();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleNext, handlePrev, onClose, isPlaying]);

  // Mobile Touch Swipe Handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Horizontal swipe threshold: 45px, more horizontal than vertical
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        handleNext(); // swiped left -> next
      } else {
        handlePrev(); // swiped right -> prev
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  if (!isOpen || images.length === 0) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl animate-fade-in select-none"
      role="dialog"
      aria-modal="true"
    >
      <div 
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative w-full h-full max-w-7xl max-h-screen sm:max-h-[94vh] flex flex-col bg-slate-950 sm:rounded-3xl overflow-hidden border border-slate-800/80 shadow-2xl"
      >
        {/* Top Control Bar: Audio indicator & Fullscreen/Close */}
        <div className="absolute top-0 left-0 right-0 z-40 p-3 sm:p-5 flex items-center justify-between bg-gradient-to-b from-black/85 via-black/40 to-transparent pointer-events-auto">
          {/* Audio Indicator with soft sound equalizer */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handleToggleMute}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 hover:bg-slate-800/90 text-white border border-white/20 text-xs font-mono backdrop-blur-md transition-all cursor-pointer shadow-lg active:scale-95"
              title={isMuted ? "Activer la musique de fond" : "Couper la musique"}
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5 text-rose-400" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
              )}
              <span className="text-[11px] font-semibold text-slate-200 flex items-center gap-1">
                <Music className="w-3 h-3 text-sky-300" />
                <span className="hidden xs:inline">
                  {isMuted ? "Musique douce (coupée)" : "Ambiance douce"}
                </span>
              </span>

              {/* Animated soft equalizer bars */}
              {!isMuted && isPlaying && (
                <span className="flex items-end gap-0.5 h-3 ml-0.5">
                  <span className="w-0.5 bg-sky-400 rounded-full animate-bounce h-2" style={{ animationDuration: '900ms', animationDelay: '0ms' }} />
                  <span className="w-0.5 bg-sky-300 rounded-full animate-bounce h-3" style={{ animationDuration: '750ms', animationDelay: '150ms' }} />
                  <span className="w-0.5 bg-sky-400 rounded-full animate-bounce h-1.5" style={{ animationDuration: '1100ms', animationDelay: '300ms' }} />
                  <span className="w-0.5 bg-blue-300 rounded-full animate-bounce h-2.5" style={{ animationDuration: '800ms', animationDelay: '200ms' }} />
                </span>
              )}
            </button>

            {/* Photo Counter */}
            <span className="text-[11px] font-mono text-white/90 bg-black/60 px-3 py-1 rounded-full border border-white/15 backdrop-blur-md shadow-md">
              {currentIndex + 1} / {images.length}
            </span>
          </div>

          {/* Right Action Icons: Fullscreen and Close */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleToggleFullscreen}
              className="p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-slate-800 text-white border border-white/20 backdrop-blur-md transition-colors cursor-pointer shadow-lg active:scale-95"
              title={isFullscreen ? "Quitter le plein écran" : "Mode plein écran"}
              aria-label="Plein écran"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4 text-sky-300" /> : <Maximize2 className="w-4 h-4 text-sky-300" />}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-rose-950/80 hover:text-rose-300 text-white border border-white/20 backdrop-blur-md transition-colors cursor-pointer shadow-lg active:scale-95"
              title="Fermer la vidéo récap"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Top Glowing Timeline Progress Bar */}
        <div className="absolute top-0 left-0 right-0 z-50 h-1 sm:h-1.5 bg-white/15 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-sky-400 via-blue-500 to-cyan-300 transition-all duration-75 ease-linear shadow-[0_0_12px_rgba(56,189,248,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Center Stage: Pure Image Carousel with Ken Burns & Smooth Cinematic Transitions */}
        {/* Strictly WITHOUT TITLES or text on images, as explicitly requested */}
        <div className="relative flex-1 w-full h-full flex items-center justify-center bg-black overflow-hidden select-none">
          {images.map((imgUrl, idx) => {
            const isCurrent = idx === currentIndex;
            const animationClass = `animate-kenburns-${idx % 5}`;
            
            return (
              <div
                key={`${imgUrl}-${idx}`}
                className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out ${
                  isCurrent 
                    ? 'opacity-100 z-10 scale-100 pointer-events-auto' 
                    : 'opacity-0 z-0 scale-95 pointer-events-none'
                }`}
                style={{
                  transform: isCurrent ? 'translateX(0)' : slideDirection === 'next' ? 'translateX(3%)' : 'translateX(-3%)'
                }}
              >
                {/* Dynamic Ambient Background Blur */}
                <div 
                  className="absolute inset-0 bg-cover bg-center filter blur-3xl opacity-25 scale-125 transition-all duration-1000 ease-out"
                  style={{ backgroundImage: `url(${imgUrl})` }}
                />

                {/* Subtle Cinematic Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none z-10" />

                {/* Main Foreground Image with Hardware-Accelerated Ken Burns Animation */}
                <div className="relative z-20 w-full h-full flex items-center justify-center p-2 sm:p-6 overflow-hidden">
                  <img
                    src={imgUrl}
                    alt=""
                    className={`max-w-full max-h-full object-contain mx-auto rounded-lg sm:rounded-2xl shadow-2xl will-change-transform ${
                      isCurrent ? animationClass : ''
                    }`}
                    referrerPolicy="no-referrer"
                    loading={Math.abs(idx - currentIndex) <= 2 ? 'eager' : 'lazy'}
                  />
                </div>
              </div>
            );
          })}

          {/* Left Arrow Navigation */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3.5 rounded-full bg-black/50 hover:bg-black/85 text-white/80 hover:text-white border border-white/20 backdrop-blur-md transition-all active:scale-90 cursor-pointer shadow-xl hover:border-sky-400/50"
            title="Image précédente"
            aria-label="Image précédente"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Right Arrow Navigation */}
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3.5 rounded-full bg-black/50 hover:bg-black/85 text-white/80 hover:text-white border border-white/20 backdrop-blur-md transition-all active:scale-90 cursor-pointer shadow-xl hover:border-sky-400/50"
            title="Image suivante"
            aria-label="Image suivante"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Bottom Control Bar: Controls & Mini Thumbnail Strip */}
        <div className="relative z-30 p-3 sm:p-4 bg-gradient-to-t from-black via-black/95 to-transparent flex flex-col gap-2.5">
          
          {/* Main Controls Row */}
          <div className="flex items-center justify-between gap-3 max-w-4xl mx-auto w-full">
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Play / Pause button */}
              <button
                type="button"
                onClick={handleTogglePlay}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-slate-950 text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-sky-500/25 cursor-pointer active:scale-95"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                <span>{isPlaying ? "Pause" : "Lecture"}</span>
              </button>

              {/* Audio quick toggle */}
              <button
                type="button"
                onClick={handleToggleMute}
                className="p-2 sm:p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-colors cursor-pointer"
                title={isMuted ? "Activer la musique de fond" : "Couper la musique"}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-sky-300" />}
              </button>
            </div>

            {/* Subtle mobile hint & visual immersion tag */}
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
              <Compass className="w-3.5 h-3.5 text-sky-400 animate-spin" style={{ animationDuration: '12s' }} />
              <span className="hidden sm:inline">Défilement continu animé · Musique d'ambiance</span>
              <span className="sm:hidden">Glissez pour défiler</span>
            </div>
          </div>

          {/* Mini Thumbnail Strip for Smooth Direct Access */}
          <div className="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto py-1 max-w-4xl mx-auto w-full no-scrollbar px-1">
            {images.map((imgUrl, idx) => (
              <button
                key={`thumb-${idx}`}
                type="button"
                onClick={() => {
                  setSlideDirection(idx > currentIndex ? 'next' : 'prev');
                  setCurrentIndex(idx);
                  setProgress(0);
                }}
                className={`relative w-10 h-7 sm:w-13 sm:h-9 rounded-lg overflow-hidden flex-shrink-0 border transition-all cursor-pointer ${
                  currentIndex === idx 
                    ? 'border-sky-400 ring-2 ring-sky-400/60 scale-110 opacity-100 shadow-md shadow-sky-500/30' 
                    : 'border-white/20 opacity-45 hover:opacity-85 hover:border-white/40'
                }`}
                title={`Photo ${idx + 1}`}
              >
                <img 
                  src={imgUrl} 
                  alt="" 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </button>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};
