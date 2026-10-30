import React, { useState, useEffect } from 'react';
import { ProfileInfo } from '../data/portfolioData';
import { 
  ArrowRight, 
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  FileText
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
    </section>
  );
};
