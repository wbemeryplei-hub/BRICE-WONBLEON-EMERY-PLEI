import React, { useState } from 'react';
import { 
  Certification, 
  SoftwareCategory, 
  hardwareSkillsData, 
  professionalAptitudes 
} from '../data/portfolioData';
import { 
  Award, 
  ShieldCheck, 
  Cpu, 
  Maximize2, 
  X, 
  CheckCircle2, 
  FileText, 
  ExternalLink,
  Satellite,
  Compass,
  Check
} from 'lucide-react';
import { motion } from 'motion/react';

interface CertificationsSkillsProps {
  certifications: Certification[];
  softwareSkills: SoftwareCategory[];
}

export const CertificationsSkills: React.FC<CertificationsSkillsProps> = ({
  certifications,
  softwareSkills,
}) => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  return (
    <motion.section 
      id="certifications" 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="py-14 sm:py-20 bg-white border-b border-slate-200 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="pb-6 sm:pb-8 border-b border-sky-100">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-800 font-mono bg-sky-50 px-2.5 py-0.5 rounded border border-sky-200">
            <span className="w-2 h-2 rounded-none bg-sky-600 transform rotate-45" />
            <span>PORTFOLIO · Qualifications Certifiées & Outils du CV</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 mt-1.5 font-heading">
            Certifications, Compétences Logiciels & Appareils
          </h2>
          <p className="text-xs sm:text-sm lg:text-base text-slate-600 mt-1.5 max-w-3xl leading-relaxed">
            Maîtrise complète de la chaîne d'ingénierie géomatique : photogrammétrie 3D, traitement des nuages de points LiDAR aéroportés, géodésie GNSS multi-fréquence, conception routière sous Covadis et analyses spatiales avancées.
          </p>
        </div>

        {/* Section 1: The 4 Official Certificates Grid */}
        <div className="mt-8 sm:mt-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2 font-heading">
                <Award className="w-5 h-5 text-sky-600" />
                <span>Certifications Professionnelles (4 Attestations Officielles)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Délivrées par INTL Data Consulting, Udemy & Home Made School
              </p>
            </div>
            <span className="text-[11px] sm:text-xs font-mono text-sky-900 bg-sky-50 border border-sky-200 rounded-lg px-3 py-1.5 self-start sm:self-auto font-medium">
              Touchez ou cliquez sur un certificat pour l'agrandir
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {certifications.map((cert) => (
              <motion.div
                key={cert.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="group bg-gradient-to-br from-white to-sky-50/20 border border-sky-200 hover:border-sky-400 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                {/* Certificate Visual Image Preview */}
                <div 
                  onClick={() => setSelectedCert(cert)}
                  className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 border-b border-sky-100 cursor-pointer"
                >
                  <img
                    src={cert.imageUrl}
                    alt={cert.title}
                    className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500 bg-slate-900/5 p-2 sm:p-3"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Top Overlay Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono">
                    <span className="bg-blue-950/85 backdrop-blur-md px-2.5 py-0.5 rounded text-sky-300 font-bold border border-sky-400/30">
                      {cert.year}
                    </span>
                    <span className="bg-white/95 backdrop-blur-md px-2.5 py-1 rounded text-blue-900 font-bold flex items-center gap-1 shadow-2xs group-hover:bg-sky-500 group-hover:text-white transition-colors">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Plein écran</span>
                    </span>
                  </div>

                  {/* ID watermark badge */}
                  <div className="absolute bottom-3 right-3 bg-slate-900/85 backdrop-blur-md px-2.5 py-0.5 rounded text-[10px] font-mono text-sky-200">
                    ID : {cert.credentialId}
                  </div>
                </div>

                {/* Certificate Details & Technical Description */}
                <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between space-y-3 sm:space-y-4">
                  <div className="space-y-2.5 sm:space-y-3">
                    
                    {/* Issuer */}
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                      <span className="text-blue-900 font-bold uppercase tracking-wider bg-sky-100/80 px-2 py-0.5 rounded border border-sky-200 text-[11px]">
                        {cert.issuer}
                      </span>
                    </div>

                    {/* Certificate Title */}
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug font-heading">
                      {cert.title}
                    </h4>

                    {/* Software & Tools Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {cert.tools.map((tool, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] sm:text-[11px] font-mono bg-sky-50 text-blue-900 border border-sky-200 px-2.5 py-0.5 rounded font-semibold"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>

                    {/* Comprehensive Technical Description */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                      {cert.description}
                    </p>

                    {/* Acquired Competencies Checklist */}
                    <div className="pt-2.5 border-t border-sky-100 space-y-1">
                      <span className="text-[10px] sm:text-[11px] font-mono text-slate-500 uppercase tracking-wider block font-semibold">
                        Compétences Clés Validées :
                      </span>
                      {cert.competencies.map((comp, cIdx) => (
                        <div key={cIdx} className="flex items-start gap-1.5 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 mt-0.5 shrink-0" />
                          <span>{comp}</span>
                        </div>
                      ))}
                    </div>

                  </div>

                  {/* Card Footer with Verification Status */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                    <span className="text-emerald-700 flex items-center gap-1.5 font-bold">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      Certificat Vérifié
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedCert(cert)}
                      className="text-sky-700 hover:text-blue-800 font-bold underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Aperçu diplôme</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section 2: Compétences Logiciels (Exactement selon le CV) */}
        <div className="mt-14 sm:mt-16 pt-10 sm:pt-12 border-t border-sky-100">
          <div className="mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2 font-heading">
              <Cpu className="w-5 h-5 text-sky-600" />
              <span>Compétences Logiciels (Organisation du CV)</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Photogrammétrie, Traitement LiDAR, Positionnement GNSS, Traitement SIG, Images Satellitaires, Projection Routière et Outils d'Enquête.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {softwareSkills.map((category, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-white to-sky-50/20 border border-sky-200 rounded-2xl p-4 sm:p-5 hover:border-sky-300 hover:shadow-md transition-all shadow-xs space-y-3.5"
              >
                <div className="pb-2.5 border-b border-sky-100 flex items-center justify-between">
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-900 font-mono">
                    {category.category}
                  </h4>
                  <span className="w-2 h-2 rounded-full bg-sky-500" />
                </div>

                <div className="space-y-2.5">
                  {category.tools.map((tool: { name: string; description: string; level: number }, tIdx: number) => (
                    <div 
                      key={tIdx} 
                      className="p-2.5 rounded-xl bg-white/80 border border-sky-100 hover:border-sky-300 transition-colors space-y-1"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-xs sm:text-sm text-slate-900 font-heading">
                          {tool.name}
                        </span>
                        <span className="text-[10px] font-mono font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                          Opérationnel
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-sans">
                        {tool.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Compétences Appareils & Aptitudes Professionnelles */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          
          {/* Hardware & Equipment in Deep Blue */}
          <div className="lg:col-span-6 bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 text-white rounded-2xl p-5 sm:p-7 space-y-4 shadow-md">
            <div>
              <span className="text-xs font-mono text-sky-300 font-bold uppercase tracking-wider">
                Compétences Appareils Topographiques
              </span>
              <h4 className="text-lg sm:text-xl font-bold mt-1 font-heading text-white">
                Instruments de Mesure & Capteurs Maîtrisés
              </h4>
              <p className="text-xs text-slate-300 mt-1">
                Pratique opérationnelle sur chantiers et en campagnes d'acquisition aéroportée.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {hardwareSkillsData.map((item, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm border border-sky-400/20 p-3.5 rounded-xl space-y-1">
                  <div className="text-xs font-bold text-sky-300 font-mono">
                    {item.name}
                  </div>
                  <p className="text-[11px] text-slate-200">
                    {item.desc}
                  </p>
                  <div className="text-[10px] font-mono text-sky-400 font-semibold pt-1">
                    Précision : {item.precision}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Aptitudes Professionnelles in Clean White & Sky Blue */}
          <div className="lg:col-span-6 bg-gradient-to-br from-white via-sky-50/20 to-slate-50 border border-sky-200 rounded-2xl p-5 sm:p-7 space-y-4 shadow-xs">
            <div>
              <span className="text-xs font-mono text-blue-900 font-bold uppercase tracking-wider">
                Savoir-Être & Rigueur Métier
              </span>
              <h4 className="text-lg sm:text-xl font-bold mt-1 font-heading text-slate-900">
                Aptitudes & Qualités Professionnelles
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Compétences comportementales issues directement du profil de Brice Emery PLEI.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {professionalAptitudes.map((apt, idx) => (
                <div key={idx} className="bg-white border border-sky-100 p-3 rounded-xl shadow-2xs space-y-0.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                    <Check className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                    <span>{apt.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight pl-5">
                    {apt.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Lightbox Zoom Modal for Certificate */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white border border-sky-200 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-sky-50/80 border-b border-sky-100 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-blue-900 font-bold flex-wrap">
                  <span className="bg-sky-100 px-2 py-0.5 rounded">{selectedCert.issuer}</span>
                  <span aria-hidden="true" className="text-slate-300">/</span>
                  <span className="text-slate-600">{selectedCert.year}</span>
                  <span aria-hidden="true" className="text-slate-300">/</span>
                  <span className="text-emerald-700 font-semibold">ID : {selectedCert.credentialId}</span>
                </div>
                <h3 className="text-base sm:text-xl font-black text-slate-900 mt-1 font-heading">
                  {selectedCert.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="p-2 rounded-full bg-white hover:bg-slate-200 text-slate-700 transition-colors shrink-0 border border-slate-200 cursor-pointer"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body with Full Certificate Image */}
            <div className="p-3 sm:p-6 overflow-y-auto space-y-4 bg-slate-100 flex-1 flex flex-col items-center justify-center">
              <div className="w-full bg-white rounded-xl shadow-lg border border-slate-300 p-2 overflow-hidden flex items-center justify-center">
                <img
                  src={selectedCert.imageUrl}
                  alt={selectedCert.title}
                  className="max-h-[55vh] sm:max-h-[62vh] w-auto object-contain mx-auto"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Bottom description banner */}
              <div className="w-full bg-white p-3.5 sm:p-4 rounded-xl border border-sky-200 text-xs sm:text-sm text-slate-700 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold font-mono text-blue-900">
                  <FileText className="w-4 h-4 text-sky-600" />
                  <span>DÉTAIL DU PROGRAMME DE CERTIFICATION</span>
                </div>
                <p className="leading-relaxed text-slate-600 text-xs sm:text-sm">
                  {selectedCert.description}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedCert.tools.map((tool, idx) => (
                    <span key={idx} className="text-[10px] sm:text-[11px] font-mono bg-sky-50 text-blue-900 border border-sky-200 px-2 py-0.5 rounded font-semibold">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-3.5 sm:p-4 bg-sky-50/80 border-t border-sky-100 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-600 truncate mr-2">Brice Emery PLEI · Ingénieur Géomètre - Topographe</span>
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg shadow-2xs cursor-pointer shrink-0"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

    </motion.section>
  );
};
