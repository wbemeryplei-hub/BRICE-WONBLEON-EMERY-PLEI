import React, { useState, useEffect } from 'react';
import { 
  academicCurriculum, 
  professionalExperiences, 
  AcademicStep, 
  ExperienceItem 
} from '../data/portfolioData';
import { 
  Briefcase, 
  GraduationCap, 
  MapPin, 
  Check, 
  Compass, 
  Building2,
  Clock,
  Layers,
  Sparkles,
  ExternalLink,
  BookOpen,
  FolderKanban,
  HardHat,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X
} from 'lucide-react';
import { TopoContours } from './TopoBackground';

export const ExperienceTimelineSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'experiences' | 'formation'>('experiences');
  const [expFilter, setExpFilter] = useState<'all' | 'pfe' | 'universitaire' | 'professionnel'>('all');
  const [expandedCurriculumIdx, setExpandedCurriculumIdx] = useState<number | null>(0); // Master M1/M2 expanded by default
  const [pfePhotoIndex, setPfePhotoIndex] = useState<number>(0);
  const [isPfeCarouselPaused, setIsPfeCarouselPaused] = useState<boolean>(false);
  const [lightboxPhotoIndex, setLightboxPhotoIndex] = useState<number | null>(null);

  const pfeFieldPhotos = [
    {
      src: '/assets/aistudio/image_5eee2972.png',
      title: 'Drone DJI Matrice 300 RTK & LiDAR',
      description: 'Vecteur aéroporté équipé de la charge utile LiDAR sur cible de décollage (Cabinet XYZ)'
    },
    {
      src: '/assets/aistudio/WhatsApp_Image_2026-10-29_at_11.52.44_544e7acc.jpeg',
      title: 'Acquisition terrain & canne GNSS RTK',
      description: 'Brice Emery PLEI en déplacement terrain avec équipement récepteur GNSS RTK et sac à dos'
    },
    {
      src: '/assets/aistudio/WhatsApp_Image_2026-10-29_at_11.52.43_9364dc73.jpeg',
      title: 'Implantation des cibles GCP au sol',
      description: 'Fixation au marteau des cibles de calage et points de contrôle pour le nuage de points LiDAR'
    },
    {
      src: '/assets/aistudio/WhatsApp_Image_2026-10-29_at_11.52.44__1__439700eb.jpeg',
      title: 'Équipe d’intervention & base mobile',
      description: 'Préparation de la mission de vol avec véhicule d’intervention tout-terrain et canne topographique'
    }
  ];

  // Défilement automatique des photos du PFE (toutes les 3,2 secondes)
  useEffect(() => {
    if (isPfeCarouselPaused || lightboxPhotoIndex !== null) return;
    const interval = setInterval(() => {
      setPfePhotoIndex((prev) => (prev + 1) % pfeFieldPhotos.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [isPfeCarouselPaused, lightboxPhotoIndex, pfeFieldPhotos.length]);

  // Navigation clavier pour la visionneuse plein écran (Flèche gauche / droite et Échap)
  useEffect(() => {
    if (lightboxPhotoIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setLightboxPhotoIndex((prev) => (prev !== null ? (prev + 1) % pfeFieldPhotos.length : 0));
      } else if (e.key === 'ArrowLeft') {
        setLightboxPhotoIndex((prev) => (prev !== null ? (prev - 1 + pfeFieldPhotos.length) % pfeFieldPhotos.length : 0));
      } else if (e.key === 'Escape') {
        setLightboxPhotoIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxPhotoIndex, pfeFieldPhotos.length]);

  useEffect(() => {
    // Listen to hash changes (#formations or #experiences)
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#formations' || hash === '#formation') {
        setActiveTab('formation');
      } else if (hash === '#experiences' || hash === '#experience') {
        setActiveTab('experiences');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);

    // Listen to custom switch-tab event from other components
    const handleCustomTab = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail === 'formation' || detail === 'experiences') {
        setActiveTab(detail);
      }
    };
    window.addEventListener('switch-tab', handleCustomTab);

    return () => {
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('switch-tab', handleCustomTab);
    };
  }, []);

  const pfeExperiences = professionalExperiences.filter(e => e.type === 'pfe');
  const uniExperiences = professionalExperiences.filter(e => e.type === 'universitaire');
  const proExperiences = professionalExperiences.filter(e => e.type === 'professionnel');

  const filteredExperiences = expFilter === 'all'
    ? professionalExperiences
    : professionalExperiences.filter(e => e.type === expFilter);

  return (
    <section 
      id="experiences" 
      className="relative py-16 sm:py-24 bg-white text-[#102B46] border-b border-slate-200 overflow-x-hidden"
    >
      {/* Target anchor for direct #formations navigation */}
      <div id="formations" className="absolute -top-24 pointer-events-none" />

      {/* Background Grid & Contours */}
      <div className="absolute inset-0 topo-contour-pattern opacity-40 pointer-events-none" />
      <TopoContours className="opacity-15" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#102B46]/5 border border-[#102B46]/15 text-xs font-mono font-bold text-[#102B46] uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-[#D5A33D]" />
            <span>PARCOURS PROFESSIONNEL & ACADÉMIQUE</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-black text-[#102B46] tracking-tight uppercase font-heading">
            Expériences et Formation
          </h2>
          
          <div className="w-16 h-1 bg-[#D5A33D] mx-auto rounded-full" />
        </div>

        {/* View Switcher: Expériences / Formation */}
        <div className="flex justify-center mb-10 sm:mb-12 px-2">
          <div className="grid grid-cols-2 w-full max-w-md p-1 rounded-xl bg-slate-100 border border-slate-200 shadow-xs">
            <button
              type="button"
              onClick={() => {
                setActiveTab('experiences');
                window.history.replaceState(null, '', '#experiences');
              }}
              className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 rounded-lg text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer font-mono text-center ${
                activeTab === 'experiences'
                  ? 'bg-[#102B46] text-[#D5A33D] shadow-sm'
                  : 'text-slate-600 hover:text-[#102B46]'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Expériences & Projets</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('formation');
                window.history.replaceState(null, '', '#formations');
              }}
              className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 rounded-lg text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer font-mono text-center ${
                activeTab === 'formation'
                  ? 'bg-[#102B46] text-[#D5A33D] shadow-sm'
                  : 'text-slate-600 hover:text-[#102B46]'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Formation & Maquette UIDT</span>
            </button>
          </div>
        </div>

        {/* TAB 1: Expériences & Projets (Distinction claire PFE / Projets Universitaires / Expériences Terrain) */}
        {activeTab === 'experiences' && (
          <div className="max-w-6xl mx-auto space-y-12">
            
            {/* Filter Pills for Experience Categories (clean, without decorative icons) */}
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto px-2">
              <button
                type="button"
                onClick={() => setExpFilter('all')}
                className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs font-mono font-bold tracking-wider transition-all cursor-pointer ${
                  expFilter === 'all'
                    ? 'bg-[#102B46] text-[#D5A33D] shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                }`}
              >
                Toutes les catégories ({professionalExperiences.length})
              </button>
              
              <button
                type="button"
                onClick={() => setExpFilter('pfe')}
                className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs font-mono font-bold tracking-wider transition-all cursor-pointer ${
                  expFilter === 'pfe'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200'
                }`}
              >
                1. Projet de Fin d'Études ({pfeExperiences.length})
              </button>

              <button
                type="button"
                onClick={() => setExpFilter('universitaire')}
                className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs font-mono font-bold tracking-wider transition-all cursor-pointer ${
                  expFilter === 'universitaire'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200'
                }`}
              >
                2. Projets Universitaires ({uniExperiences.length})
              </button>

              <button
                type="button"
                onClick={() => setExpFilter('professionnel')}
                className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs font-mono font-bold tracking-wider transition-all cursor-pointer ${
                  expFilter === 'professionnel'
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200'
                }`}
              >
                3. Projets Professionnels Terrain ({proExperiences.length})
              </button>
            </div>

            {/* SEPARATED CATEGORIES PRESENTATION */}
            
            {/* PART 1: PROJET DE FIN D'ÉTUDES (PFE) */}
            {(expFilter === 'all' || expFilter === 'pfe') && (
              <div className="space-y-4">
                <div className="border-b border-amber-200 pb-2">
                  <h3 className="text-lg font-bold font-heading text-[#102B46] uppercase tracking-wide">
                    1. Projet de Fin d’Études (PFE)
                  </h3>
                  <p className="text-xs font-mono text-slate-500">
                    Cabinet Géomètre Expert XYZ · Ingénieur géomètre-topographe stagiaire
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {pfeExperiences.map((exp) => (
                    <div 
                      key={exp.id}
                      className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-amber-50/70 via-white to-amber-50/20 border-2 border-amber-300 hover:border-amber-500 shadow-md transition-all space-y-6"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-200/80 pb-4">
                        <div className="space-y-1 text-center sm:text-left">
                          <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-amber-500 text-white shadow-xs">
                            Projet de Fin d'Études d'Ingénieur
                          </span>
                          <h4 className="text-base sm:text-xl font-black text-[#102B46] font-heading mt-1">
                            {exp.role}
                          </h4>
                          <p className="text-xs font-mono font-bold text-amber-900 flex items-center justify-center sm:justify-start gap-1.5">
                            <Building2 className="w-3.5 h-3.5 text-amber-700" />
                            <span>Structure d’accueil : {exp.organization}</span>
                          </p>
                        </div>

                        <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                          <span className="text-xs font-mono font-bold text-amber-900 bg-amber-100/90 border border-amber-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-amber-700" />
                            <span>Année {exp.period}</span>
                          </span>
                          <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            <span>{exp.location}</span>
                          </span>
                        </div>
                      </div>

                      {/* Theme Highlight Box */}
                      <div className="p-4 sm:p-5 rounded-xl bg-white border border-amber-200 shadow-xs space-y-2">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-800 block">
                          Thème de recherche & d'ingénierie :
                        </span>
                        <p className="text-sm sm:text-base font-bold text-[#102B46] leading-relaxed">
                          « {exp.mission} »
                        </p>
                      </div>

                      {/* Key details if present */}
                      {exp.details && exp.details.length > 0 && (
                        <div className="space-y-2.5">
                          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 block">
                            Méthodologie opérationnelle & approche multi-logiciels :
                          </span>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                            {exp.details.map((detail, idx) => (
                              <li key={`pfe-det-${idx}`} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-700 flex items-start gap-2.5">
                                <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                                <span className="leading-snug">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Photos réelles du terrain - PFE (Défilement interactif & automatique) */}
                      <div className="pt-4 border-t border-amber-200/80 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
                            <span>Photos de terrain & opérations réelles (PFE) :</span>
                          </span>
                          <span className="text-[11px] font-mono text-amber-800">
                            (Défilement automatique · Cliquez pour agrandir et naviguer)
                          </span>
                        </div>

                        {/* Grand carrousel avec défilement automatique & contrôles manuels */}
                        <div 
                          className="relative rounded-2xl overflow-hidden border-2 border-amber-300 bg-slate-950 shadow-md group select-none"
                          onMouseEnter={() => setIsPfeCarouselPaused(true)}
                          onMouseLeave={() => setIsPfeCarouselPaused(false)}
                          onTouchStart={() => setIsPfeCarouselPaused(true)}
                          onTouchEnd={() => setIsPfeCarouselPaused(false)}
                        >
                          {/* Image principale cliquable pour ouvrir la visionneuse */}
                          <div 
                            className="aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden relative cursor-pointer"
                            onClick={() => setLightboxPhotoIndex(pfePhotoIndex)}
                            title="Cliquer pour agrandir en plein écran"
                          >
                            <img 
                              src={pfeFieldPhotos[pfePhotoIndex].src} 
                              alt={`Photo terrain PFE ${pfePhotoIndex + 1}`}
                              className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                              loading="lazy"
                            />

                            {/* Dégradé d'ombre pour lisibilité */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />

                            {/* Badge compteur & titre */}
                            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 right-14 sm:right-20 pointer-events-none text-white space-y-0.5">
                              <span className="inline-block px-2 py-0.5 rounded-md bg-[#D5A33D] text-[#102B46] font-mono font-bold text-[10px] sm:text-xs">
                                Photo {pfePhotoIndex + 1} / {pfeFieldPhotos.length}
                              </span>
                              <p className="text-xs sm:text-sm font-bold text-white truncate drop-shadow-sm">
                                {pfeFieldPhotos[pfePhotoIndex].title}
                              </p>
                            </div>

                            {/* Bouton d'agrandissement en haut à droite */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setLightboxPhotoIndex(pfePhotoIndex);
                              }}
                              className="absolute top-3 right-3 p-2 rounded-xl bg-black/60 hover:bg-black/85 text-white border border-white/20 transition-all cursor-pointer backdrop-blur-xs shadow-lg hover:scale-105"
                              title="Agrandir en plein écran"
                              aria-label="Agrandir en plein écran"
                            >
                              <Maximize2 className="w-4 h-4 text-[#D5A33D]" />
                            </button>
                          </div>

                          {/* Bouton précédent */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setPfePhotoIndex((prev) => (prev - 1 + pfeFieldPhotos.length) % pfeFieldPhotos.length);
                            }}
                            className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-black/65 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer hover:scale-110 shadow-lg"
                            title="Photo précédente"
                            aria-label="Photo précédente"
                          >
                            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#D5A33D]" />
                          </button>

                          {/* Bouton suivant */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setPfePhotoIndex((prev) => (prev + 1) % pfeFieldPhotos.length);
                            }}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-black/65 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer hover:scale-110 shadow-lg"
                            title="Photo suivante"
                            aria-label="Photo suivante"
                          >
                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#D5A33D]" />
                          </button>

                          {/* Puces de navigation */}
                          <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs border border-white/15">
                            {pfeFieldPhotos.map((_, dotIdx) => (
                              <button
                                key={`pfe-dot-${dotIdx}`}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setPfePhotoIndex(dotIdx);
                                }}
                                className={`transition-all rounded-full cursor-pointer ${
                                  pfePhotoIndex === dotIdx 
                                    ? 'w-5 h-2 bg-[#D5A33D]' 
                                    : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                                }`}
                                title={`Afficher photo ${dotIdx + 1}`}
                                aria-label={`Afficher photo ${dotIdx + 1}`}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Rangée de miniatures interactives cliquables */}
                        <div className="grid grid-cols-4 gap-2 pt-1">
                          {pfeFieldPhotos.map((photo, pIdx) => {
                            const isCurrent = pfePhotoIndex === pIdx;
                            return (
                              <button
                                key={`pfe-thumb-${pIdx}`}
                                type="button"
                                onClick={() => {
                                  setPfePhotoIndex(pIdx);
                                  setLightboxPhotoIndex(pIdx);
                                }}
                                className={`group relative rounded-xl overflow-hidden border-2 transition-all text-left bg-slate-900 aspect-[4/3] cursor-pointer ${
                                  isCurrent
                                    ? 'border-[#D5A33D] ring-2 ring-[#D5A33D]/40 scale-[1.02]'
                                    : 'border-amber-200/80 hover:border-amber-400 opacity-75 hover:opacity-100'
                                }`}
                                title={`Cliquer pour voir : ${photo.title}`}
                              >
                                <img 
                                  src={photo.src} 
                                  alt={`Miniature PFE ${pIdx + 1}`}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                  loading="lazy"
                                />
                                <div className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/70 font-mono text-[9px] text-[#D5A33D] font-bold">
                                  {pIdx + 1}/4
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Tools used if present */}
                      {exp.toolsUsed && exp.toolsUsed.length > 0 && (
                        <div className="pt-3 border-t border-amber-200/60 space-y-2">
                          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-600 block">
                            Équipements & logiciels mobilisés pour l'étude :
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {exp.toolsUsed.map((tool, tIdx) => (
                              <span 
                                key={`pfe-tool-${tIdx}`}
                                className="text-xs font-mono px-3 py-1 rounded-lg bg-white border border-amber-200 text-[#102B46] font-bold shadow-2xs"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PART 2: PROJETS UNIVERSITAIRES */}
            {(expFilter === 'all' || expFilter === 'universitaire') && (
              <div className="space-y-4">
                <div className="border-b border-emerald-200 pb-2">
                  <h3 className="text-lg font-bold font-heading text-[#102B46] uppercase tracking-wide">
                    2. Projets Universitaires
                  </h3>
                  <p className="text-xs font-mono text-slate-500">
                    Université Iba Der Thiam de Thiès (UIDT) · Formation d'Ingénieur Géomètre-Topographe
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {uniExperiences.map((exp, uIdx) => (
                    <div 
                      key={exp.id}
                      className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50/50 via-white to-emerald-50/20 border-2 border-emerald-300 hover:border-emerald-500 shadow-md transition-all flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-3.5">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-100 pb-3">
                          <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider bg-emerald-600 text-white shadow-2xs">
                            Projet 2.{uIdx + 1}
                          </span>
                          <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                            {exp.period}
                          </span>
                        </div>

                        <div>
                          <h4 className="text-base font-bold text-[#102B46] font-heading leading-snug">
                            {exp.role}
                          </h4>
                          <p className="text-xs font-mono font-bold text-emerald-800 mt-1 flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{exp.organization}</span>
                          </p>
                        </div>

                        <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                          {exp.mission}
                        </div>

                        {exp.details && exp.details.length > 0 && (
                          <div className="space-y-1.5 pt-1">
                            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                              Techniques & volets abordés :
                            </span>
                            <ul className="space-y-1.5">
                              {exp.details.map((detail, idx) => (
                                <li key={`uni-det-${idx}`} className="text-xs font-semibold text-slate-700 flex items-start gap-2 bg-slate-50/80 p-2 rounded-lg border border-slate-100">
                                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {exp.toolsUsed && exp.toolsUsed.length > 0 && (
                        <div className="pt-3 border-t border-emerald-100 flex flex-wrap gap-1.5">
                          {exp.toolsUsed.map((tool, tIdx) => (
                            <span 
                              key={`uni-tool-${tIdx}`}
                              className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-[#102B46] font-medium border border-emerald-200"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PART 3: PROJETS PROFESSIONNELS DE TERRAIN */}
            {(expFilter === 'all' || expFilter === 'professionnel') && (
              <div className="space-y-4">
                <div className="border-b border-blue-200 pb-2">
                  <h3 className="text-lg font-bold font-heading text-[#102B46] uppercase tracking-wide">
                    3. Projets Professionnels de Terrain
                  </h3>
                  <p className="text-xs font-mono text-slate-500">
                    Missions opérationnelles sur chantiers de BTP, régularisations foncières et bureaux d'études
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {proExperiences.map((exp, pIdx) => (
                    <div 
                      key={exp.id}
                      className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-[#102B46] shadow-xs hover:shadow-xl transition-all flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-slate-100 pb-2.5">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-[#102B46] text-[#D5A33D] px-2.5 py-0.5 rounded">
                            Terrain 3.{pIdx + 1}
                          </span>
                          <span className="text-[11px] font-mono text-slate-500">
                            {exp.period}
                          </span>
                        </div>

                        <div>
                          <h4 className="text-sm sm:text-base font-bold text-[#102B46] font-heading leading-snug">
                            {exp.role}
                          </h4>
                          <p className="text-xs font-mono font-bold text-[#D5A33D] mt-1 flex items-center gap-1">
                            <Building2 className="w-3 h-3 text-[#D5A33D]" />
                            <span>{exp.organization}</span>
                          </p>
                          <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            <span>{exp.location}</span>
                          </span>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed">
                          {exp.mission}
                        </p>

                        <ul className="space-y-1 pt-1">
                          {exp.details.slice(0, 3).map((detail, idx) => (
                            <li key={`pro-det-${idx}`} className="text-xs text-slate-600 flex items-start gap-1.5">
                              <Check className="w-3.5 h-3.5 text-[#D5A33D] shrink-0 mt-0.5" />
                              <span className="line-clamp-2">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-2.5 border-t border-slate-100 flex flex-wrap gap-1">
                        {exp.toolsUsed.map((tool, tIdx) => (
                          <span 
                            key={`pro-tool-${tIdx}`}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-50 text-slate-700 border border-slate-200"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: Formation et Diplômes */}
        {activeTab === 'formation' && (
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {academicCurriculum.map((acad, idx) => (
                <div 
                  key={`acad-${idx}`}
                  className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 hover:border-[#D5A33D] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-5 group"
                >
                  <div className="space-y-4">
                    {/* Period and Location Badge */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <span className="text-xs font-mono font-bold text-[#D5A33D] bg-[#D5A33D]/10 px-3 py-1 rounded-md flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-[#D5A33D]" />
                        <span>{acad.period}</span>
                      </span>
                      <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{acad.location}</span>
                      </span>
                    </div>

                    {/* School Logo + Diploma Title & Institution */}
                    <div className="flex items-start gap-4">
                      {acad.logoUrl && (
                        acad.websiteUrl ? (
                          <a
                            href={acad.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white border border-slate-200 p-1.5 flex items-center justify-center shrink-0 shadow-xs hover:border-[#D5A33D] hover:shadow-md transition-all group/link relative"
                            title={`Visiter le site officiel de ${acad.institution} (${acad.websiteUrl})`}
                          >
                            <img 
                              src={acad.logoUrl} 
                              alt={`Logo ${acad.institution}`} 
                              className="max-h-full max-w-full object-contain group-hover/link:scale-105 transition-transform"
                              loading="lazy"
                            />
                            <span className="absolute -bottom-1 -right-1 p-0.5 bg-white rounded-full border border-slate-200 shadow-xs text-slate-400 group-hover/link:text-[#D5A33D]">
                              <ExternalLink className="w-3 h-3" />
                            </span>
                          </a>
                        ) : (
                          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white border border-slate-200 p-1.5 flex items-center justify-center shrink-0 shadow-2xs">
                            <img 
                              src={acad.logoUrl} 
                              alt={`Logo ${acad.institution}`} 
                              className="max-h-full max-w-full object-contain"
                              loading="lazy"
                            />
                          </div>
                        )
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-bold text-[#102B46] font-heading group-hover:text-blue-950 transition-colors leading-snug">
                          {acad.diploma}
                        </h3>
                        
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <p className="text-xs font-mono font-bold text-[#D5A33D] flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5 shrink-0" />
                            <span>{acad.institution}</span>
                          </p>

                          {acad.websiteUrl && (
                            <a
                              href={acad.websiteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[10px] font-mono text-sky-700 hover:text-sky-900 bg-sky-50 hover:bg-sky-100 px-2 py-0.5 rounded border border-sky-200 transition-colors"
                              title={`Accéder au site officiel (${acad.websiteUrl})`}
                            >
                              <span>Site officiel</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Description details */}
                    {acad.details && (
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                        {acad.details}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Lightbox Modal interactive avec défilement suivant/précédent pour les photos du PFE */}
      {lightboxPhotoIndex !== null && (
        <div 
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6"
          onClick={() => setLightboxPhotoIndex(null)}
        >
          {/* Barre supérieure : Compteur, Titre & Bouton Fermer */}
          <div 
            className="w-full max-w-6xl mx-auto flex items-center justify-between gap-4 text-white pb-3 border-b border-white/10 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-[#D5A33D] text-[#102B46]">
                Photo {lightboxPhotoIndex + 1} / {pfeFieldPhotos.length}
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-200 truncate max-w-[200px] xs:max-w-xs sm:max-w-md">
                {pfeFieldPhotos[lightboxPhotoIndex].title}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setLightboxPhotoIndex(null)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Fermer la visionneuse (Échap)"
              aria-label="Fermer"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Zone centrale : Image avec boutons Précédent & Suivant */}
          <div 
            className="relative flex-1 w-full max-w-6xl mx-auto flex items-center justify-center my-2 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Bouton Défilement Précédent */}
            <button
              type="button"
              onClick={() => setLightboxPhotoIndex((prev) => (prev !== null ? (prev - 1 + pfeFieldPhotos.length) % pfeFieldPhotos.length : 0))}
              className="absolute left-1 sm:left-4 z-20 p-2.5 sm:p-3.5 rounded-full bg-black/70 hover:bg-black/95 text-white border border-white/20 hover:scale-110 transition-all cursor-pointer shadow-2xl"
              title="Photo précédente (Flèche gauche)"
              aria-label="Photo précédente"
            >
              <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7 text-[#D5A33D]" />
            </button>

            {/* Photo affichée */}
            <div className="max-h-[72vh] max-w-full flex items-center justify-center rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black">
              <img 
                key={pfeFieldPhotos[lightboxPhotoIndex].src}
                src={pfeFieldPhotos[lightboxPhotoIndex].src} 
                alt={pfeFieldPhotos[lightboxPhotoIndex].title}
                className="max-h-[70vh] w-auto max-w-full object-contain select-none"
              />
            </div>

            {/* Bouton Défilement Suivant */}
            <button
              type="button"
              onClick={() => setLightboxPhotoIndex((prev) => (prev !== null ? (prev + 1) % pfeFieldPhotos.length : 0))}
              className="absolute right-1 sm:right-4 z-20 p-2.5 sm:p-3.5 rounded-full bg-black/70 hover:bg-black/95 text-white border border-white/20 hover:scale-110 transition-all cursor-pointer shadow-2xl"
              title="Photo suivante (Flèche droite)"
              aria-label="Photo suivante"
            >
              <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7 text-[#D5A33D]" />
            </button>
          </div>

          {/* Barre inférieure : Miniatures cliquables pour défiler directement */}
          <div 
            className="w-full max-w-md mx-auto pt-2 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-4 gap-2 p-1.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              {pfeFieldPhotos.map((photo, thumbIdx) => {
                const isActive = lightboxPhotoIndex === thumbIdx;
                return (
                  <button
                    key={`modal-thumb-${thumbIdx}`}
                    type="button"
                    onClick={() => setLightboxPhotoIndex(thumbIdx)}
                    className={`relative rounded-xl overflow-hidden aspect-[4/3] border-2 transition-all cursor-pointer ${
                      isActive 
                        ? 'border-[#D5A33D] ring-2 ring-[#D5A33D]/60 scale-105' 
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                    title={photo.title}
                  >
                    <img 
                      src={photo.src} 
                      alt={`Miniature ${thumbIdx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
