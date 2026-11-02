import React, { useState, useEffect, useRef } from 'react';
import { ProfileInfo, terrainPhotos } from '../data/portfolioData';
import { 
  ArrowRight, 
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  FileText,
  Maximize2,
  X
} from 'lucide-react';
import { TopoContours } from './TopoBackground';
import { CV_WHATSAPP_URL } from '../utils/downloadCv';
import { motion, AnimatePresence } from 'motion/react';

interface HeroSectionProps {
  profile: ProfileInfo;
}

interface HeroSlide {
  id: string;
  url: string;
  title: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ profile }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedTerrainIndex, setSelectedTerrainIndex] = useState<number | null>(null);
  const [isMobileMarqueePaused, setIsMobileMarqueePaused] = useState(false);

  // Touch swipe handling for mobile terrain lightbox
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleNextTerrain = () => {
    setSelectedTerrainIndex((prev) => (prev !== null ? (prev + 1) % terrainPhotos.length : null));
  };

  const handlePrevTerrain = () => {
    setSelectedTerrainIndex((prev) => (prev !== null ? (prev - 1 + terrainPhotos.length) % terrainPhotos.length : null));
  };

  // Keyboard navigation for mobile terrain photo viewer
  useEffect(() => {
    if (selectedTerrainIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setSelectedTerrainIndex((prev) => (prev !== null ? (prev + 1) % terrainPhotos.length : null));
      } else if (e.key === 'ArrowLeft') {
        setSelectedTerrainIndex((prev) => (prev !== null ? (prev - 1 + terrainPhotos.length) % terrainPhotos.length : null));
      } else if (e.key === 'Escape') {
        setSelectedTerrainIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedTerrainIndex]);

  // Exact 06 photos as requested:
  const heroSlides: HeroSlide[] = [
    {
      id: 'slide-1',
      url: '/assets/aistudio/WhatsApp_Image_2026-10-22_at_22.08.57_a7d00c37.jpeg',
      title: 'Brice Emery PLEI sur chantier routier'
    },
    {
      id: 'slide-2',
      url: '/assets/aistudio/WhatsApp_Image_2026-10-22_at_22.08.58_49ac1935.jpeg',
      title: 'Brice Emery PLEI (Tenue Officielle)'
    },
    {
      id: 'slide-3',
      url: '/assets/aistudio/WhatsApp_Image_2026-10-23_at_09.06.10__2__78be900d.jpeg',
      title: 'Station Totale CHCNAV CTS-112R4 sur trépied'
    },
    {
      id: 'slide-4',
      url: '/assets/aistudio/WhatsApp_Image_2026-10-23_at_13.29.22__1__9329ebe9.jpeg',
      title: 'Levé GNSS RTK Bi-Fréquence sur canne'
    },
    {
      id: 'slide-5',
      url: '/assets/aistudio/WhatsApp_Image_2026-10-23_at_13.29.24__3__c1366373.jpeg',
      title: 'Travaux Pratiques d\'Excellence — Station Totale CHCNAV & Prisme 360°'
    },
    {
      id: 'slide-6',
      url: '/assets/aistudio/WhatsApp_Image_2026-10-23_at_09.06.07_9d843d73.jpeg',
      title: 'Opération de visée optique sur mire'
    }
  ];

  // Automatic défilement (2400ms)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
    }, 2400);
    return () => clearInterval(timer);
  }, [isPaused, heroSlides.length]);

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleScrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.querySelector('#projets');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentSlide = heroSlides[currentIndex];

  // Render the Photo Carousel Card (6 photos, no badge overlays, smooth cycle)
  const renderPhotoCard = (isMobile: boolean = false) => (
    <div 
      className={`relative w-full ${isMobile ? 'max-w-[280px] xs:max-w-[310px] sm:max-w-[350px]' : 'max-w-[340px] xs:max-w-[380px] sm:max-w-md'} mx-auto group`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Gold Technical Corner Accents */}
      <div className="absolute -top-2.5 -left-2.5 sm:-top-3 sm:-left-3 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-l-2 border-[#D5A33D] rounded-tl-xl pointer-events-none z-20" />
      <div className="absolute -bottom-2.5 -right-2.5 sm:-bottom-3 sm:-right-3 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-r-2 border-[#D5A33D] rounded-br-xl pointer-events-none z-20" />

      {/* Luminous Glow Backdrop */}
      <div className="absolute -inset-3 sm:-inset-4 bg-gradient-to-tr from-[#D5A33D]/20 via-[#102B46] to-sky-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-700 pointer-events-none -z-10" />

      {/* Main Photo Frame */}
      <div 
        onClick={() => handleNext()}
        className="relative p-2 sm:p-2.5 rounded-2xl bg-[#0B1E31] border border-white/15 shadow-2xl overflow-hidden cursor-pointer select-none transition-transform active:scale-[0.98]"
        title="Toucher ou cliquer pour passer à la photo suivante"
      >
        <div className="aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden rounded-xl relative bg-slate-950 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentSlide.id}
              src={currentSlide.url}
              alt={currentSlide.title}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              className="w-full h-full object-cover object-top"
              referrerPolicy="no-referrer"
              loading="eager"
            />
          </AnimatePresence>

          {/* Gradient shadow overlay at the bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E31] via-transparent to-transparent opacity-60 pointer-events-none" />

          {/* Manual Arrow Controls (Left & Right) */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-1.5 sm:p-2 rounded-full bg-black/60 hover:bg-black/85 text-white border border-white/20 transition-all opacity-80 hover:opacity-100 hover:scale-110"
            title="Photo précédente"
            aria-label="Photo précédente"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-1.5 sm:p-2 rounded-full bg-black/60 hover:bg-black/85 text-white border border-white/20 transition-all opacity-80 hover:opacity-100 hover:scale-110"
            title="Photo suivante"
            aria-label="Photo suivante"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* 6 Clean Navigation Dots */}
          <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1 rounded-xl bg-black/75 backdrop-blur-md border border-white/20">
            {heroSlides.map((slide, idx) => (
              <button
                key={`dot-${slide.id}`}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                className={`transition-all rounded-full cursor-pointer ${
                  currentIndex === idx
                    ? 'w-4 h-2 bg-[#D5A33D] rounded-full'
                    : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                }`}
                title={`Photo ${idx + 1}`}
                aria-label={`Photo ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Technical Caption Card: Nom uniquement */}
        <div className="p-2.5 sm:p-3 bg-[#0F243A] rounded-xl mt-2 border border-white/10 text-center">
          <p className="text-sm sm:text-base font-bold text-white tracking-wide uppercase font-heading">
            {profile.shortName || profile.fullName}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <section 
      id="accueil" 
      className="relative min-h-[calc(100vh-4.5rem)] flex items-center py-8 sm:py-14 lg:py-20 bg-[#102B46] text-white overflow-hidden"
    >
      {/* Background Topographic Contour Lines & Subtle Engineering Grid */}
      <div className="absolute inset-0 topo-dark-pattern opacity-40 pointer-events-none" />
      <TopoContours className="opacity-25" dark={true} />

      {/* Subtle Warm Gold and Deep Navy radial glows */}
      <div className="absolute top-1/4 -right-20 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#D5A33D]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 -left-20 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-sky-900/25 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-14 items-center">
          
          {/* COLUMN (FULL WIDTH ON MOBILE, LEFT 7-COL ON DESKTOP) */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-4 sm:space-y-6 lg:space-y-8"
          >
            {/* BANDEAU DÉFILANT D'IMMERSION TERRAIN (AFFICHE JUSTE AVANT LE TITRE UNIQUEMENT EN MODE MOBILE) */}
            <div className="lg:hidden w-full pb-1 pt-1">
              <div className="flex items-center justify-between gap-2 mb-2 px-0.5">
                <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#D5A33D] bg-white/[0.08] px-2.5 py-1 rounded-full border border-white/15 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D5A33D] animate-pulse" />
                  <span>Immersion Terrain & Réalité Chantier</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">
                  {terrainPhotos.length} photos
                </span>
              </div>

              {/* Ruban horizontal défilant en continu */}
              <div 
                className="relative w-full overflow-hidden rounded-xl bg-[#0B1E31]/90 border border-white/15 p-1.5 shadow-lg select-none"
                onTouchStart={() => setIsMobileMarqueePaused(true)}
                onTouchEnd={() => setIsMobileMarqueePaused(false)}
                onMouseEnter={() => setIsMobileMarqueePaused(true)}
                onMouseLeave={() => setIsMobileMarqueePaused(false)}
              >
                {/* Dégradés d'atténuation sur les côtés gauche et droit */}
                <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-[#0B1E31] to-transparent z-10 pointer-events-none rounded-l-xl" />
                <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[#0B1E31] to-transparent z-10 pointer-events-none rounded-r-xl" />

                <div 
                  className={`flex gap-2 w-max ${isMobileMarqueePaused ? '' : 'animate-marquee'}`}
                  style={{ willChange: 'transform' }}
                >
                  {[...terrainPhotos, ...terrainPhotos].map((photo, pIdx) => {
                    const originalIdx = pIdx % terrainPhotos.length;
                    return (
                      <button
                        key={`hero-mob-terrain-${photo.id}-${pIdx}`}
                        type="button"
                        onClick={() => setSelectedTerrainIndex(originalIdx)}
                        className="group relative w-[105px] xs:w-[120px] aspect-[4/3] rounded-lg overflow-hidden bg-slate-900 border border-white/15 active:border-[#D5A33D] shadow-xs shrink-0 cursor-pointer transition-transform active:scale-95"
                        title={photo.title}
                        aria-label={photo.title}
                      >
                        <img 
                          src={photo.imageUrl}
                          alt={photo.title}
                          className="w-full h-full object-cover object-center pointer-events-none select-none transition-transform duration-300 group-hover:scale-105"
                          loading="eager"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                          <Maximize2 className="w-3.5 h-3.5 text-[#D5A33D]" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Main Title */}
            <div className="space-y-2 sm:space-y-3">
              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white font-heading leading-[1.12]">
                INGÉNIEUR DE CONCEPTION <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D5A33D] via-[#f3c873] to-amber-200">
                  GÉOMÈTRE TOPOGRAPHE
                </span>
              </h1>
            </div>

            {/* MOBILE ONLY: The 6-photo Carousel is placed right below the title */}
            <div className="lg:hidden my-2 sm:my-4">
              {renderPhotoCard(true)}
            </div>

            {/* Presentation paragraph harmonisée avec des mots simples et clairs */}
            <p className="text-xs xs:text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
              {profile.heroPresentation || "Professionnel motivé, rigoureux et engagé, je mets mes compétences techniques et de terrain au service des projets de topographie, d'infrastructure et d'aménagement, tout en continuant d'apprendre afin de participer activement au développement de l'entreprise et à la réussite de chaque mission."}
            </p>

            {/* Two Main Action Buttons:
                - « Mes projets terrains »
                - « Télécharger mon CV » (Redirection directe vers WhatsApp) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              
              {/* Button 1: Mes projets terrains */}
              <a
                href="#projets"
                onClick={handleScrollToProjects}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:py-4 rounded-xl bg-[#D5A33D] hover:bg-[#e4b34d] text-[#102B46] text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-[#D5A33D]/20 hover:shadow-xl hover:shadow-[#D5A33D]/30 cursor-pointer active:scale-98 font-mono min-h-[48px]"
              >
                <span>Mes projets terrains</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* Button 2: Télécharger mon CV (Redirection WhatsApp avec message officiel pré-rempli) */}
              <a
                href={CV_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:py-4 rounded-xl bg-white/10 hover:bg-white/20 hover:border-[#D5A33D]/50 border border-white/25 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer active:scale-98 font-mono min-h-[48px]"
                title="Demander mon CV sur WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-[#D5A33D]" />
                <span>Télécharger mon CV</span>
              </a>

            </div>

          </motion.div>

          {/* DESKTOP ONLY RIGHT COLUMN: The 6-Photo Carousel with Automatic Scrolling */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex lg:col-span-5 flex-col items-center justify-center"
          >
            {renderPhotoCard(false)}
          </motion.div>

        </div>
      </div>

      {/* Lightbox Modal: Visionneuse plein écran pour les photos d'immersion terrain */}
      <AnimatePresence>
        {selectedTerrainIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-between p-3 sm:p-5 bg-black/95 backdrop-blur-md select-none"
            onClick={() => setSelectedTerrainIndex(null)}
            role="dialog"
            aria-modal="true"
          >
            {/* Top Bar with Counter and Close Button */}
            <div 
              className="w-full max-w-5xl flex items-center justify-between z-30 pb-2 border-b border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2.5">
                <span className="px-3 py-1 rounded-full bg-[#102B46] border border-[#D5A33D]/40 text-[#D5A33D] text-xs font-mono font-bold">
                  Photo {selectedTerrainIndex + 1} / {terrainPhotos.length}
                </span>
                <span className="text-xs sm:text-sm font-bold text-white truncate max-w-[200px] xs:max-w-xs sm:max-w-md">
                  {terrainPhotos[selectedTerrainIndex].title}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedTerrainIndex(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer border border-white/20"
                title="Fermer (Échap)"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Central Photo with Left and Right Arrows */}
            <div 
              className="relative w-full max-w-5xl flex-1 flex items-center justify-center my-auto min-h-0"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={(e) => {
                touchStartX.current = e.targetTouches[0].clientX;
                touchEndX.current = null;
              }}
              onTouchMove={(e) => {
                touchEndX.current = e.targetTouches[0].clientX;
              }}
              onTouchEnd={() => {
                if (touchStartX.current === null || touchEndX.current === null) return;
                const diff = touchStartX.current - touchEndX.current;
                if (diff > 45) handleNextTerrain();
                else if (diff < -45) handlePrevTerrain();
                touchStartX.current = null;
                touchEndX.current = null;
              }}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevTerrain();
                }}
                className="absolute left-1 sm:left-3 z-30 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/25 hover:border-[#D5A33D] shadow-2xl transition-all cursor-pointer hover:scale-110 active:scale-95"
                title="Photo précédente (Flèche Gauche)"
                aria-label="Photo précédente"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-[#D5A33D]" />
              </button>

              <div className="relative max-h-[75vh] max-w-full flex items-center justify-center overflow-hidden rounded-2xl shadow-2xl bg-black/40 border border-white/10">
                <img
                  key={terrainPhotos[selectedTerrainIndex].id}
                  src={terrainPhotos[selectedTerrainIndex].imageUrl}
                  alt={terrainPhotos[selectedTerrainIndex].title}
                  className="max-h-[74vh] w-auto max-w-full object-contain rounded-xl"
                  referrerPolicy="no-referrer"
                />
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextTerrain();
                }}
                className="absolute right-1 sm:right-3 z-30 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/25 hover:border-[#D5A33D] shadow-2xl transition-all cursor-pointer hover:scale-110 active:scale-95"
                title="Photo suivante (Flèche Droite)"
                aria-label="Photo suivante"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#D5A33D]" />
              </button>
            </div>

            {/* Bottom thumbnail strip */}
            <div 
              className="w-full max-w-4xl z-30 pt-2"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-center gap-1.5 overflow-x-auto py-1 px-2 no-scrollbar max-w-full">
                {terrainPhotos.map((photo, idx) => (
                  <button
                    key={`hero-thumb-${photo.id}`}
                    type="button"
                    onClick={() => setSelectedTerrainIndex(idx)}
                    className={`relative w-11 sm:w-14 h-8 sm:h-10 rounded-md overflow-hidden flex-shrink-0 transition-all cursor-pointer border ${
                      selectedTerrainIndex === idx
                        ? 'border-[#D5A33D] ring-2 ring-[#D5A33D]/50 scale-105'
                        : 'border-white/20 opacity-50 hover:opacity-90'
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
