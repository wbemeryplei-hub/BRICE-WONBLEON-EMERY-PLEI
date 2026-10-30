import React from 'react';
import { 
  softwareLogosList 
} from '../data/portfolioData';
import { 
  Monitor 
} from 'lucide-react';
import { TopoContours } from './TopoBackground';

export const TechnicalSkillsSection: React.FC = () => {
  return (
    <section 
      id="competences" 
      className="relative py-16 sm:py-24 bg-white text-[#102B46] border-b border-slate-200 overflow-hidden"
    >
      {/* Background Subtle Contours */}
      <div className="absolute inset-0 topo-contour-pattern opacity-40 pointer-events-none" />
      <TopoContours className="opacity-15" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-black text-[#102B46] tracking-tight uppercase font-heading">
            Compétences Techniques Logicielles
          </h2>
          <div className="w-16 h-1 bg-[#D5A33D] mx-auto rounded-full" />
        </div>

        {/* 1. Logiciels déjà utilisés (Grille de logos sans longue description) */}
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <Monitor className="w-4 h-4 text-[#D5A33D]" />
              <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider text-[#102B46] font-mono">
                Logiciels et langages déjà utilisés
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-500 font-semibold">
              {softwareLogosList.length} outils et langages
            </span>
          </div>

          {/* Grille des 12 logos officiels */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4">
            {softwareLogosList.map((soft) => (
              <div 
                key={soft.id}
                className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-[#D5A33D] shadow-2xs hover:shadow-md transition-all flex flex-col items-center justify-between gap-2 group text-center"
              >
                <div className="h-14 sm:h-16 w-full flex items-center justify-center p-1.5">
                  <img 
                    src={soft.logoUrl} 
                    alt={soft.name} 
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                </div>

                <div className="w-full space-y-0.5 pt-1 border-t border-slate-100">
                  <h4 className="font-bold text-xs text-[#102B46] font-heading truncate" title={soft.name}>
                    {soft.name}
                  </h4>
                  <span className="block text-[10px] font-mono text-slate-500 truncate" title={soft.category}>
                    {soft.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
