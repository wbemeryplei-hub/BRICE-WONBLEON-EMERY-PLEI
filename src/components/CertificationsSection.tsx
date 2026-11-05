import React, { useState, useEffect } from 'react';
import { Award, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { TopoContours } from './TopoBackground';

export interface CertificationItem {
  id: string;
  title: string;
  imageUrl: string;
}

export const certificationsList: CertificationItem[] = [
  {
    id: 'cert-photogrammetrie',
    title: 'Formation en Photogrammétrie par Drone',
    imageUrl: '/assets/aistudio/UC-ab640749-7f67-462c-a70b-a824e8a2b840_38c311be.jpg'
  },
  {
    id: 'cert-conception-routiere',
    title: 'Conception routière de A à Z avec AutoCAD et Covadis 17',
    imageUrl: '/assets/aistudio/UC-a25d6b64-5b0d-4211-803a-f8defc22a860_993f9fd1.jpg'
  },
  {
    id: 'cert-analyse-spatiale',
    title: 'Collecte et Analyse Spatiale',
    imageUrl: '/assets/aistudio/CERTIFICAT_FORMATION_INTL_2_page-0001_b2587010.jpg'
  },
  {
    id: 'cert-analyse-donnees',
    title: 'Collecte et Analyse de Données',
    imageUrl: '/assets/aistudio/CERTIFICAT_FORMATION_INTL_page-0001_3bd0b026.jpg'
  }
];

export const CertificationsSection: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Keyboard navigation for certificate lightbox
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) => (prev !== null ? (prev + 1) % certificationsList.length : 0));
      } else if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) => (prev !== null ? (prev - 1 + certificationsList.length) % certificationsList.length : 0));
      } else if (e.key === 'Escape') {
        setSelectedIndex(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  return (
    <section 
      id="certifications" 
      className="relative py-16 sm:py-24 bg-[#F8FAFC] text-[#102B46] border-b border-slate-200 overflow-hidden"
    >
      {/* Background Topo & Grid */}
      <div className="absolute inset-0 topo-contour-pattern opacity-35 pointer-events-none" />
      <TopoContours className="opacity-15" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header (Titres uniquement sans description) */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#102B46]/5 border border-[#102B46]/15 text-xs font-mono font-bold text-[#102B46] uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-[#D5A33D]" />
            <span>CERTIFICATIONS & QUALIFICATIONS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#102B46] tracking-tight uppercase font-heading">
            Certifications
          </h2>

          <div className="w-16 h-1 bg-[#D5A33D] mx-auto rounded-full" />
        </div>

        {/* Grille des 4 Certificats (Titres uniquement sans aucune description) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {certificationsList.map((cert, idx) => (
            <div
              key={cert.id}
              className="group rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#D5A33D]/60 transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Image du Certificat avec bouton d'agrandissement */}
              <div 
                onClick={() => setSelectedIndex(idx)}
                className="relative aspect-[1.414/1] w-full overflow-hidden bg-slate-900 cursor-pointer select-none"
                title="Cliquer pour afficher le certificat en plein écran"
              >
                <img 
                  src={cert.imageUrl} 
                  alt={cert.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <div className="p-2.5 rounded-full bg-black/70 text-white backdrop-blur-xs border border-white/20">
                    <Maximize2 className="w-4 h-4 text-[#D5A33D]" />
                  </div>
                </div>
              </div>

              {/* Titre uniquement (Aucune description) */}
              <div 
                onClick={() => setSelectedIndex(idx)}
                className="p-4 flex-1 flex items-center justify-center text-center cursor-pointer bg-white"
              >
                <h3 className="text-sm font-bold text-[#102B46] group-hover:text-[#D5A33D] transition-colors line-clamp-2 leading-snug">
                  {cert.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Visionneuse plein écran interactive (Lightbox avec précédent / suivant) */}
      {selectedIndex !== null && (
        <div 
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Barre supérieure : Titre et bouton fermer */}
          <div 
            className="w-full max-w-6xl mx-auto flex items-center justify-between gap-4 text-white pb-3 border-b border-white/10 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-[#D5A33D] text-[#102B46]">
                Certificat {selectedIndex + 1} / {certificationsList.length}
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-200 truncate max-w-[200px] xs:max-w-xs sm:max-w-lg">
                {certificationsList[selectedIndex].title}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setSelectedIndex(null)}
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
            {/* Bouton Précédent */}
            <button
              type="button"
              onClick={() => setSelectedIndex((prev) => (prev !== null ? (prev - 1 + certificationsList.length) % certificationsList.length : 0))}
              className="absolute left-1 sm:left-4 z-20 p-2.5 sm:p-3.5 rounded-full bg-black/70 hover:bg-black/95 text-white border border-white/20 hover:scale-110 transition-all cursor-pointer shadow-2xl"
              title="Certificat précédent (Flèche gauche)"
              aria-label="Précédent"
            >
              <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7 text-[#D5A33D]" />
            </button>

            {/* Image du certificat */}
            <div className="max-h-[75vh] max-w-full flex items-center justify-center rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black">
              <img 
                key={certificationsList[selectedIndex].id}
                src={certificationsList[selectedIndex].imageUrl} 
                alt={certificationsList[selectedIndex].title}
                className="max-h-[74vh] w-auto max-w-full object-contain select-none"
              />
            </div>

            {/* Bouton Suivant */}
            <button
              type="button"
              onClick={() => setSelectedIndex((prev) => (prev !== null ? (prev + 1) % certificationsList.length : 0))}
              className="absolute right-1 sm:right-4 z-20 p-2.5 sm:p-3.5 rounded-full bg-black/70 hover:bg-black/95 text-white border border-white/20 hover:scale-110 transition-all cursor-pointer shadow-2xl"
              title="Certificat suivant (Flèche droite)"
              aria-label="Suivant"
            >
              <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7 text-[#D5A33D]" />
            </button>
          </div>

          {/* Barre inférieure : Miniatures cliquables */}
          <div 
            className="w-full max-w-md mx-auto pt-2 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-4 gap-2 p-1.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              {certificationsList.map((c, thumbIdx) => {
                const isActive = selectedIndex === thumbIdx;
                return (
                  <button
                    key={`modal-cert-thumb-${thumbIdx}`}
                    type="button"
                    onClick={() => setSelectedIndex(thumbIdx)}
                    className={`relative rounded-xl overflow-hidden aspect-[1.414/1] border-2 transition-all cursor-pointer ${
                      isActive 
                        ? 'border-[#D5A33D] ring-2 ring-[#D5A33D]/60 scale-105' 
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                    title={c.title}
                  >
                    <img 
                      src={c.imageUrl} 
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
