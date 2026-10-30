import React, { useState } from 'react';
import { ProjectItem } from '../data/portfolioData';
import { 
  MapPin, 
  X, 
  ArrowRight,
  ExternalLink,
  Globe,
  Layers,
  Maximize2
} from 'lucide-react';
import { TopoContours } from './TopoBackground';

interface ProjectsSectionProps {
  projects: ProjectItem[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const categories = [
    { id: 'all', label: `Tous les projets (${projects.length})` },
    { id: 'cadastre', label: 'Cadastre' },
    { id: 'geodesie', label: 'Géodésie & GNSS' },
    { id: 'chantier', label: 'Chantier & Implantation' },
    { id: 'universitaire', label: 'Universitaire' },
    { id: 'recherche', label: 'Recherche & WebSIG' }
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section 
      id="projets" 
      className="relative py-16 sm:py-24 bg-[#F3F6F9] text-[#102B46] border-b border-slate-200 overflow-hidden"
    >
      {/* Background Topo Lines */}
      <div className="absolute inset-0 topo-contour-pattern opacity-50 pointer-events-none" />
      <TopoContours className="opacity-15" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-black text-[#102B46] tracking-tight uppercase font-heading">
            Projets Réalisés
          </h2>
          <div className="w-16 h-1 bg-[#D5A33D] mx-auto rounded-full" />
        </div>

        {/* Categories Filter Strip */}
        <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl shadow-xs overflow-x-auto no-scrollbar max-w-4xl mx-auto mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 sm:px-4 py-2 text-xs font-mono font-semibold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#102B46] text-[#D5A33D] font-bold shadow-xs'
                  : 'text-slate-600 hover:text-[#102B46] hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setActiveProject(project)}
              className="group bg-white border border-slate-200 hover:border-[#D5A33D] rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1"
            >
              <div>
                {/* Project Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Category Pill Tag */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-[#102B46]/90 backdrop-blur-md px-3 py-1 rounded-full text-white text-[11px] font-mono border border-[#D5A33D]/40 font-semibold shadow-xs">
                      {project.categoryLabel}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="p-1.5 rounded-lg bg-black/60 backdrop-blur-md text-white inline-flex items-center">
                      <Maximize2 className="w-3.5 h-3.5 text-[#D5A33D]" />
                    </span>
                  </div>
                </div>

                {/* Card Body : Titre, Lieu, Description brève, Logiciel utilisé */}
                <div className="p-5 sm:p-6 space-y-3.5">
                  
                  {/* Titre */}
                  <h3 className="text-base font-bold text-[#102B46] group-hover:text-blue-950 font-heading leading-snug">
                    {project.title}
                  </h3>

                  {/* Lieu où ça a été fait */}
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-[#D5A33D] shrink-0" />
                    <span>Lieu : <strong className="text-[#102B46]">{project.location}</strong></span>
                  </div>

                  {/* Description brève */}
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Logiciel utilisé */}
                  <div className="pt-2 border-t border-slate-100 space-y-1.5">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                      <Layers className="w-3 h-3 text-[#D5A33D]" />
                      <span>Logiciel{project.software.length > 1 ? 's' : ''} utilisé{project.software.length > 1 ? 's' : ''} :</span>
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.software.map((soft, sIdx) => (
                        <span 
                          key={`soft-${sIdx}`}
                          className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-100 text-[#102B46] font-semibold border border-slate-200"
                        >
                          {soft}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Card Footer: Lien direct si disponible ou bouton Agrandir */}
              <div className="px-5 sm:px-6 pb-5 pt-0 space-y-2">
                {project.externalLink && (
                  <a
                    href={project.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold font-mono uppercase tracking-wider transition-all shadow-xs"
                    title="Accéder à la plateforme en ligne"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Accéder à la plateforme (prtm2.netlify.app)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                
                <button
                  type="button"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#102B46] hover:bg-[#163a5e] text-[#D5A33D] text-xs font-bold uppercase tracking-wider font-mono transition-colors shadow-xs group-hover:shadow-md cursor-pointer"
                >
                  <span>Voir le projet</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Modal: Vue épurée et nette du projet */}
      {activeProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-3xl max-h-[92vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-slate-200 my-auto">
            
            {/* Modal Top Header */}
            <div className="p-4 sm:p-5 bg-[#102B46] text-white flex items-center justify-between gap-4 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-[#D5A33D] text-[#102B46] font-bold shrink-0">
                  {activeProject.categoryLabel}
                </span>
                <span className="text-xs font-mono text-slate-300 truncate">
                  {activeProject.title}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0"
                title="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content: Image, Titre, Lieu, Description brève, Logiciel utilisé */}
            <div className="p-4 sm:p-7 overflow-y-auto space-y-5">
              
              {/* Photo du projet nette et claire */}
              <div className="relative w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-sm">
                <img
                  src={activeProject.imageUrl}
                  alt={activeProject.title}
                  className="w-full max-h-[380px] object-contain sm:object-cover bg-slate-950 mx-auto"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Titre */}
              <div>
                <h3 className="text-xl sm:text-2xl font-black font-heading text-[#102B46] leading-snug">
                  {activeProject.title}
                </h3>
              </div>

              {/* Lieu où ça a été fait */}
              <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono">
                <MapPin className="w-4 h-4 text-[#D5A33D] shrink-0" />
                <span className="text-slate-600">Lieu de réalisation :</span>
                <strong className="text-[#102B46] text-sm">{activeProject.location}</strong>
              </div>

              {/* Description brève */}
              <div className="space-y-1.5">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                  Description :
                </span>
                <p className="text-sm text-slate-700 leading-relaxed bg-slate-50/70 p-4 rounded-xl border border-slate-100">
                  {activeProject.description}
                </p>
              </div>

              {/* Logiciel(s) utilisé(s) */}
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#D5A33D]" />
                  <span>Logiciel{activeProject.software.length > 1 ? 's' : ''} utilisé{activeProject.software.length > 1 ? 's' : ''} :</span>
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeProject.software.map((sw, idx) => (
                    <span 
                      key={`modal-sw-${idx}`}
                      className="text-xs font-mono px-3 py-1.5 rounded-lg bg-[#102B46] text-white font-semibold shadow-2xs"
                    >
                      {sw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Lien direct pour PRT M2 si présent */}
              {activeProject.externalLink && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs mt-3">
                  <div className="space-y-0.5">
                    <p className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                      <Globe className="w-4 h-4 text-emerald-700" />
                      <span>Plateforme interactive en ligne :</span>
                    </p>
                    <a
                      href={activeProject.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-mono font-bold text-emerald-700 hover:text-emerald-900 underline underline-offset-2 break-all"
                    >
                      {activeProject.externalLink}
                    </a>
                  </div>

                  <a
                    href={activeProject.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-xs shrink-0"
                  >
                    <span>Ouvrir la plateforme</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

            </div>

            {/* Modal Bottom Actions */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
              <span className="text-xs font-mono text-slate-500 hidden sm:inline">
                Brice Emery PLEI · Portefolio
              </span>

              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#102B46] text-[#D5A33D] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#163a5e] transition-colors cursor-pointer text-center"
              >
                Fermer
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
