import React from 'react';
import { 
  ProfileInfo, 
  AcademicStep, 
  ExperienceItem, 
  ProjectItem, 
  Certification,
  softwareSkillsData,
  hardwareSkillsData,
  professionalAptitudes
} from '../data/portfolioData';
import { X, Printer, Compass, CheckCircle2, MapPin, Mail, Phone, MessageCircle, Download, ExternalLink } from 'lucide-react';
import { downloadCvPdf, openCvInNewTab } from '../utils/downloadCv';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileInfo;
  curriculum: AcademicStep[];
  experiences: ExperienceItem[];
  projects: ProjectItem[];
  certifications: Certification[];
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  profile,
  curriculum,
  experiences,
  projects,
  certifications
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white border border-slate-300 rounded-2xl shadow-2xl overflow-hidden my-8 flex flex-col max-h-[92vh]">
        
        {/* Modal Top Bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-blue-900 font-bold">
            <Compass className="w-4 h-4 text-sky-600" />
            <span>CURRICULUM VITAE D'INGÉNIEUR GÉOMÈTRE - TOPOGRAPHE</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => downloadCvPdf(profile.cvPdfUrl, 'CV_BRICE_PLEI_Ingenieur_Topographe.pdf')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-bold transition-colors shadow-2xs cursor-pointer text-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Télécharger PDF</span>
            </button>
            <button
              type="button"
              onClick={() => openCvInNewTab(profile.cvPdfUrl)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-100 hover:bg-sky-200 text-blue-900 font-semibold transition-colors shadow-2xs cursor-pointer text-xs border border-sky-300"
              title="Ouvrir le PDF en pleine page dans le navigateur"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Ouvrir PDF</span>
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium transition-colors shadow-2xs cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-sky-400" />
              <span>Imprimer</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors cursor-pointer"
              aria-label="Fermer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Resume Content (matching exact CV structure) */}
        <div className="p-8 space-y-8 bg-white text-slate-800 overflow-y-auto print:max-h-none print:p-0 print:bg-white print:text-black">
          
          {/* Header */}
          <div className="border-b-2 border-slate-900 pb-6 print:border-black flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight print:text-black font-heading">
                {profile.shortName}
              </h1>
              <p className="text-sm font-bold uppercase tracking-wider text-blue-700 print:text-black mt-1 font-mono">
                {profile.professionalTitle}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Nom officiel : {profile.fullName}
              </p>
              <p className="text-xs text-slate-600 mt-2 max-w-xl print:text-gray-700 leading-relaxed">
                {profile.tagline}
              </p>
            </div>

            <div className="text-xs font-mono text-slate-700 print:text-gray-800 space-y-1.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-600 print:text-black shrink-0" />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-blue-600 print:text-black shrink-0" />
                <span>Sénégal : {profile.phoneSenegal}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-blue-600 print:text-black shrink-0" />
                <span>Côte d'Ivoire : {profile.phoneCIV}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-600 print:text-black shrink-0" />
                <span>{profile.location}</span>
              </div>
            </div>
          </div>

          {/* Section Profil */}
          <div className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-blue-900 font-mono print:text-black border-b border-slate-200 pb-1">
              Profil Professionnel
            </h2>
            <div className="text-xs text-slate-700 print:text-gray-800 space-y-2 leading-relaxed">
              {profile.descriptionBio.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>

          {/* Expériences Professionnelles */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-blue-900 font-mono print:text-black border-b border-slate-200 pb-1">
              Expériences Professionnelles (Chantiers & Bureaux d'Études)
            </h2>
            <div className="space-y-3">
              {experiences.map((exp) => (
                <div key={exp.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 print:border-gray-300 print:bg-white space-y-1">
                  <div className="flex justify-between items-start text-xs font-mono">
                    <span className="font-bold text-slate-900 print:text-black text-sm">{exp.role}</span>
                    <span className="text-sky-700 font-semibold print:text-gray-600">{exp.period}</span>
                  </div>
                  <div className="text-xs text-slate-500 print:text-gray-600 font-medium">
                    {exp.organization} — {exp.location}
                  </div>
                  <p className="text-xs text-slate-700 print:text-gray-800 mt-1 leading-relaxed">
                    {exp.mission}
                  </p>
                  <div className="pt-2 flex flex-wrap gap-1">
                    {exp.toolsUsed.map((tool, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-600">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Diplômes & Formations */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-blue-900 font-mono print:text-black border-b border-slate-200 pb-1">
              Diplômes & Formations Supérieures
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {curriculum.map((step, idx) => (
                <div key={idx} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 print:border-gray-300 print:bg-white space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="font-bold text-slate-900 print:text-black">{step.diploma}</span>
                    <span className="text-blue-700 font-semibold print:text-gray-600">{step.period}</span>
                  </div>
                  <div className="text-xs text-slate-500 print:text-gray-600">
                    {step.institution} ({step.location})
                  </div>
                  <p className="text-xs text-slate-600 print:text-gray-800 mt-1">
                    {step.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Logiciels & Appareils */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h2 className="text-sm font-bold uppercase tracking-wider text-blue-900 font-mono print:text-black border-b border-slate-200 pb-1">
                Compétences Logiciels
              </h2>
              <div className="space-y-1 text-xs text-slate-700">
                <p><strong>Photogrammétrie :</strong> 3D Survey, Agisoft Metashape, Pix4D</p>
                <p><strong>Traitement LiDAR :</strong> DJI TERRA, SPATIX (TerraMatch, TerraScan)</p>
                <p><strong>Positionnement GNSS :</strong> Leica Infinity, RTKLIB, calculs PPP</p>
                <p><strong>Traitement SIG :</strong> QGIS, ArcGIS Pro, Global Mapper, CloudCompare</p>
                <p><strong>Image Satellitaire :</strong> Google Earth Engine</p>
                <p><strong>Projection Routière :</strong> Covadis 17, AutoCAD, Autopiste</p>
                <p><strong>Outils d'enquête :</strong> KoboToolbox, KoboCollect, QField</p>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-sm font-bold uppercase tracking-wider text-blue-900 font-mono print:text-black border-b border-slate-200 pb-1">
                Appareils & Aptitudes
              </h2>
              <div className="space-y-1 text-xs text-slate-700">
                <p><strong>Appareils :</strong> Récepteurs GNSS RTK, Station Totale électronique, Niveau de chantier, Drones & capteur LiDAR Zenmuse L1</p>
                <p><strong>Aptitudes :</strong> Organisation et planification, esprit d'anticipation, grande capacité d'adaptation, apprentissage rapide, rigueur, esprit d'équipe.</p>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-blue-900 font-mono print:text-black border-b border-slate-200 pb-1">
              Certifications Professionnelles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {certifications.map((c) => (
                <div key={c.id} className="flex items-start gap-2 text-slate-700 print:text-gray-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                  <span><strong>{c.title}</strong> — {c.issuer} ({c.year})</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs font-mono">
          <span className="text-slate-500">Document généré d'après le CV officiel de Brice Emery PLEI</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-300 rounded-lg transition-colors shadow-2xs cursor-pointer"
          >
            Fermer l'aperçu
          </button>
        </div>

      </div>
    </div>
  );
};
