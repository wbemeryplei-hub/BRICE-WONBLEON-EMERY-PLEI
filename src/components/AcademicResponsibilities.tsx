import React, { useState } from 'react';
import { AcademicStep, ExperienceItem } from '../data/portfolioData';
import { 
  GraduationCap, 
  Briefcase, 
  CheckCircle2, 
  MapPin, 
  Building, 
  Wrench,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';

interface AcademicResponsibilitiesProps {
  curriculum: AcademicStep[];
  experiences: ExperienceItem[];
}

export const AcademicResponsibilities: React.FC<AcademicResponsibilitiesProps> = ({
  curriculum,
  experiences,
}) => {
  const [activeTab, setActiveTab] = useState<'both' | 'experiences' | 'academic'>('both');

  return (
    <motion.section 
      id="parcours" 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="py-14 sm:py-20 bg-white border-b border-slate-200 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 pb-6 sm:pb-8 border-b border-sky-100">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-800 font-mono bg-sky-50 px-2.5 py-0.5 rounded border border-sky-200">
              <span className="w-2 h-2 rounded-none bg-sky-600 transform rotate-45" />
              <span>PORTFOLIO · CV OFFICIEL BRICE EMERY PLEI</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 mt-1.5 font-heading">
              Diplômes, Formations & Expériences Professionnelles
            </h2>
            <p className="text-xs sm:text-sm lg:text-base text-slate-600 mt-1.5 max-w-3xl leading-relaxed">
              Une trajectoire solide d'ingénieur géomètre-topographe alliant formation d'excellence en géodésie (UIDT Thiès & ESBTP Yamoussoukro) et expériences opérationnelles sur chantiers, vols LiDAR et bureaux d'études.
            </p>
          </div>

          {/* Interactive Tab Switcher (Touch friendly on mobile) */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 border border-slate-200 rounded-xl self-stretch sm:self-auto overflow-x-auto shadow-2xs">
            <button
              type="button"
              onClick={() => setActiveTab('both')}
              className={`flex-1 sm:flex-none px-3 sm:px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer text-center ${
                activeTab === 'both' ? 'bg-blue-700 text-white shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Vue Complète
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('experiences')}
              className={`flex-1 sm:flex-none px-3 sm:px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer text-center ${
                activeTab === 'experiences' ? 'bg-blue-700 text-white shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Expériences ({experiences.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('academic')}
              className={`flex-1 sm:flex-none px-3 sm:px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer text-center ${
                activeTab === 'academic' ? 'bg-blue-700 text-white shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Diplômes ({curriculum.length})
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className={`mt-8 sm:mt-12 grid gap-10 sm:gap-12 ${activeTab === 'both' ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1 max-w-5xl mx-auto'}`}>
          
          {/* Column 1: Expériences Professionnelles (Exact CV items) */}
          {(activeTab === 'both' || activeTab === 'experiences') && (
            <div className={activeTab === 'both' ? 'lg:col-span-7 space-y-6' : 'space-y-6'}>
              <div className="flex items-center justify-between pb-3 border-b border-sky-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-heading">Expériences Professionnelles</h3>
                    <span className="text-[11px] sm:text-xs font-mono text-slate-500">Missions de terrain & bureau d'études</span>
                  </div>
                </div>
              </div>

              {/* Timeline Container */}
              <div className="relative pl-5 sm:pl-6 space-y-5 sm:space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-sky-200">
                {experiences.map((exp) => (
                  <div key={exp.id} className="relative group">
                    {/* Node marker */}
                    <div className="absolute -left-[25px] sm:-left-[27px] top-2 w-3.5 h-3.5 rounded-full bg-white border-2 border-blue-600 group-hover:bg-blue-600 transition-colors shadow-2xs" />

                    <div className="bg-gradient-to-br from-white to-sky-50/30 border border-sky-200/90 rounded-2xl p-4 sm:p-6 hover:border-sky-400 hover:shadow-md transition-all shadow-xs space-y-3">
                      
                      {/* Top meta strip */}
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                        <span className="text-blue-900 font-bold bg-blue-100/80 border border-blue-200 px-2.5 py-0.5 rounded text-[11px] sm:text-xs">
                          {exp.period}
                        </span>
                        <span className="flex items-center gap-1 text-slate-600 font-medium text-[11px] sm:text-xs">
                          <MapPin className="w-3.5 h-3.5 text-sky-600" />
                          {exp.location}
                        </span>
                      </div>

                      {/* Role & Organization */}
                      <div>
                        <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors font-heading leading-snug">
                          {exp.role}
                        </h4>
                        <div className="flex items-center gap-1.5 text-xs text-slate-700 font-semibold mt-1">
                          <Building className="w-3.5 h-3.5 text-sky-600" />
                          <span>{exp.organization}</span>
                        </div>
                      </div>

                      {/* Main Mission Description from CV */}
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal bg-white/90 p-3 rounded-xl border border-slate-200/90">
                        {exp.mission}
                      </p>

                      {/* Sub-details / deliverables */}
                      {exp.details && exp.details.length > 0 && (
                        <div className="space-y-1.5 pt-1">
                          {exp.details.map((detail, dIdx) => (
                            <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-600">
                              <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 mt-0.5 shrink-0" />
                              <span>{detail}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Tools Used Badge Strip */}
                      <div className="pt-2.5 border-t border-sky-100 flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold mr-1 flex items-center gap-1">
                          <Wrench className="w-3 h-3 text-sky-600" />
                          Outils :
                        </span>
                        {exp.toolsUsed.map((tool, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] sm:text-[11px] font-mono bg-sky-100/70 text-blue-900 border border-sky-200 px-2 py-0.5 rounded font-medium"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Column 2: Diplômes et Formations (Exact CV items) */}
          {(activeTab === 'both' || activeTab === 'academic') && (
            <div className={activeTab === 'both' ? 'lg:col-span-5 space-y-6' : 'space-y-6'}>
              <div className="flex items-center justify-between pb-3 border-b border-sky-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-heading">Diplômes & Formations</h3>
                    <span className="text-[11px] sm:text-xs font-mono text-slate-500">Cursus universitaire & diplômes d'État</span>
                  </div>
                </div>
              </div>

              {/* Academic Timeline Container */}
              <div className="relative pl-5 sm:pl-6 space-y-5 sm:space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-blue-200">
                {curriculum.map((step, idx) => (
                  <div key={idx} className="relative group">
                    {/* Node marker */}
                    <div className="absolute -left-[25px] sm:-left-[27px] top-2 w-3.5 h-3.5 rounded-full bg-white border-2 border-sky-500 group-hover:bg-sky-500 transition-colors shadow-2xs" />

                    <div className="bg-gradient-to-br from-white to-blue-50/30 border border-sky-200/90 rounded-2xl p-4 sm:p-5 hover:border-sky-400 hover:shadow-md transition-all shadow-xs space-y-2.5">
                      
                      {/* Period & Location */}
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                        <span className="text-blue-900 font-bold bg-blue-50 border border-blue-200 px-2 py-0.5 rounded text-[11px] sm:text-xs">
                          {step.period}
                        </span>
                        <span className="flex items-center gap-1 text-slate-600 font-medium text-[11px] sm:text-xs">
                          <MapPin className="w-3.5 h-3.5 text-sky-600" />
                          {step.location}
                        </span>
                      </div>

                      {/* Diploma Title */}
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors font-heading leading-snug">
                        {step.diploma}
                      </h4>

                      {/* Institution */}
                      <div className="flex items-center gap-1.5 text-xs text-slate-700 font-medium">
                        <Building className="w-3.5 h-3.5 text-sky-600" />
                        <span>{step.institution}</span>
                      </div>

                      {/* Details */}
                      <p className="text-xs text-slate-600 leading-relaxed pt-1">
                        {step.details}
                      </p>

                      {/* Key highlights */}
                      <div className="pt-2 border-t border-slate-200 space-y-1">
                        {step.highlights.map((item, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-1.5 text-xs text-slate-700">
                            <ChevronRight className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </motion.section>
  );
};
