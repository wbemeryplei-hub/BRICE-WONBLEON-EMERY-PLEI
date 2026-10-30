import React from 'react';
import { ProfileInfo } from '../data/portfolioData';
import { 
  Layers,
  User,
  ArrowRight
} from 'lucide-react';
import { TopoContours } from './TopoBackground';

interface AboutSectionProps {
  profile: ProfileInfo;
  onOpenDataCustomizer?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  const pfeSoftware = [
    {
      id: 'dji-terra',
      name: 'DJI TERRA',
      category: 'Traitement LiDAR & Nuages 3D',
      logoUrl: '/assets/aistudio/image_2296bca7.png'
    },
    {
      id: 'terrasolid',
      name: 'TERRASOLID',
      category: 'TerraScan / TerraMatch / Spatix',
      logoUrl: '/assets/aistudio/image_9c81ccb2.png'
    },
    {
      id: 'global-mapper',
      name: 'GLOBAL MAPPER',
      category: 'Profils & Conversion Géospatiale',
      logoUrl: '/assets/aistudio/image_6684ccd4.png'
    },
    {
      id: 'agisoft-metashape',
      name: 'AGISOFT METASHAPE',
      category: 'Photogrammétrie Drone',
      logoUrl: '/assets/aistudio/image_a0eb8781.png'
    },
    {
      id: 'rstudio',
      name: 'RSTUDIO',
      category: 'Analyse Statistique & Contrôle GCP',
      logoUrl: '/assets/aistudio/image_7bcb9d58.png'
    }
  ];

  return (
    <section 
      id="a-propos" 
      className="relative py-16 sm:py-24 bg-[#F3F6F9] text-[#102B46] border-b border-slate-200 overflow-hidden"
    >
      {/* Subtle background contours */}
      <div className="absolute inset-0 topo-contour-pattern opacity-60 pointer-events-none" />
      <TopoContours className="opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-black text-[#102B46] tracking-tight uppercase font-heading">
            À propos de moi
          </h2>
          <div className="w-16 h-1 bg-[#D5A33D] mx-auto rounded-full" />
        </div>

        {/* Layout en 2 colonnes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* COLONNE GAUCHE (5 cols) : Photo de profil + Thème du PFE juste en bas de la photo */}
          <div className="lg:col-span-5 flex flex-col items-center space-y-5">
            
            {/* 1. Cadre de la Photo */}
            <div className="relative w-full max-w-sm group">
              {/* Gold Technical Corner Accents */}
              <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-[#D5A33D] rounded-tl-xl pointer-events-none z-10" />
              <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-[#D5A33D] rounded-br-xl pointer-events-none z-10" />
              
              <div className="relative rounded-2xl overflow-hidden bg-white p-2.5 shadow-xl border border-slate-200">
                <div className="aspect-[4/5] w-full overflow-hidden rounded-xl bg-slate-100 relative shadow-inner">
                  <img
                    src={profile.photoSecondaryUrl || profile.photoUrl}
                    alt="Brice Emery PLEI — Ingénieur Géomètre Topographe"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>
                <div className="pt-2.5 pb-1 text-center">
                  <p className="text-xs font-mono font-bold text-[#102B46] uppercase tracking-wider">
                    {profile.fullName}
                  </p>
                  <p className="text-[11px] font-mono text-[#D5A33D] font-bold">
                    {profile.professionalTitle}
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Thème de fin d'études JUSTE EN BAS DE LA PHOTO */}
            <div className="w-full max-w-sm p-5 rounded-2xl bg-white border-2 border-[#D5A33D]/40 shadow-lg space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-[#D5A33D]/10 to-transparent pointer-events-none rounded-bl-full" />
              
              <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#102B46] text-[#D5A33D] text-[10px] font-mono font-bold uppercase tracking-wider shadow-xs">
                  Projet de fin d'études
                </span>
                <span className="text-[11px] font-mono font-bold text-slate-500">
                  Cabinet XYZ
                </span>
              </div>

              <div>
                <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Thème du projet :
                </p>
                <h3 className="text-xs sm:text-sm font-black text-[#102B46] uppercase tracking-tight leading-snug font-heading">
                  Amélioration de la qualité géométrique des données LiDAR aéroportées par optimisation des paramètres de traitement et ajustement inter-bandes multi-logiciels
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] font-mono text-slate-600 font-medium">
                <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                  DJI Matrice 300
                </span>
                <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                  LiDAR Zenmuse L1
                </span>
                <span className="px-2 py-0.5 rounded-md bg-[#D5A33D]/15 text-[#102B46] font-bold">
                  Ajustement inter-bandes
                </span>
              </div>
            </div>

          </div>

          {/* COLONNE DROITE (7 cols) : Description rétablie + Différents logiciels utilisés */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. DESCRIPTION À PROPOS DE MOI */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-md space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#D5A33D]" />
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#102B46] font-mono">
                    Parcours & Présentation
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-[#D5A33D] font-bold uppercase">
                  UIDT Thiès · ESBTP
                </span>
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {profile.descriptionBio && profile.descriptionBio.length > 0 ? (
                  profile.descriptionBio.map((paragraph, idx) => (
                    <p key={`bio-${idx}`}>{paragraph}</p>
                  ))
                ) : (
                  <>
                    <p>
                      Ingénieur de conception géomètre-topographe, diplômé de l’UFR Sciences de l’Ingénieur de l’UIDT de Thiès (Sénégal) et issu de l’ESBTP après avoir obtenu mon Baccalauréat au Lycée Scientifique de Yamoussoukro (Côte d’Ivoire), je me consacre avec passion aux travaux topographiques et au traitement des données géospatiales.
                    </p>
                    <p>
                      Mon parcours m’a permis de réaliser des interventions techniques variées en topographie et géodésie : implantation de bâtiments et d’axes routiers, canevas géodésiques GNSS statiques et suivi topographique de chantiers. J’ai également développé des compétences en traitement de données LiDAR par drone DJI Matrice 300 RTK, en photogrammétrie, en SIG et en production de données géospatiales. Mon projet de fin d’études portait sur l’amélioration de la qualité géométrique des données LiDAR aéroportées, à travers l’optimisation des paramètres de traitement et l’ajustement interbandes multi-logiciels.
                    </p>
                    <p>
                      Rigoureux, méthodique et attentif aux moindres tolérances, j’allie l'agilité opérationnelle de terrain à la rigueur des calculs de bureau. Je m’engage avec sérieux et esprit d’équipe à contribuer à des projets d’infrastructures fiables et durables.
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* 2. DIFFÉRENTS LOGICIELS UTILISÉS */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-md space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#D5A33D]" />
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#102B46] font-mono">
                    Différents logiciels utilisés
                  </h4>
                </div>
                <span className="text-[11px] font-mono text-slate-400 font-semibold">
                  LiDAR, Photogrammétrie & Traitement
                </span>
              </div>

              {/* Grille des 6 logiciels / outils */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {pfeSoftware.map((soft) => (
                  <div 
                    key={soft.id}
                    className="p-3 rounded-xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-[#D5A33D] shadow-2xs hover:shadow-sm transition-all flex flex-col items-center justify-between gap-2 group text-center"
                  >
                    <div className="h-12 w-full flex items-center justify-center p-1">
                      <img 
                        src={soft.logoUrl} 
                        alt={soft.name}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                        loading="lazy"
                      />
                    </div>
                    <div className="w-full space-y-0.5">
                      <span className="text-xs font-bold text-[#102B46] font-mono block truncate" title={soft.name}>
                        {soft.name}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono block truncate" title={soft.category}>
                        {soft.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Accès rapide aux sections Expériences et Formation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <a
                href="#experiences"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.hash = 'experiences';
                  window.dispatchEvent(new CustomEvent('switch-tab', { detail: 'experiences' }));
                  document.getElementById('experiences')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#102B46] hover:bg-[#183d63] text-[#D5A33D] text-xs font-bold uppercase tracking-wider font-mono transition-all shadow-sm cursor-pointer"
              >
                <span>Consulter mes Expériences</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="#formations"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.hash = 'formations';
                  window.dispatchEvent(new CustomEvent('switch-tab', { detail: 'formation' }));
                  document.getElementById('formations')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white hover:bg-slate-100 text-[#102B46] border border-slate-300 text-xs font-bold uppercase tracking-wider font-mono transition-all shadow-2xs cursor-pointer"
              >
                <span>Consulter ma Formation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
