import React, { useState } from 'react';
import {
  initialProfileData,
  terrainPhotos,
  projectsData,
  ProfileInfo
} from './data/portfolioData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TerrainMarquee } from './components/TerrainMarquee';
import { AboutSection } from './components/AboutSection';
import { TechnicalSkillsSection } from './components/TechnicalSkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceTimelineSection } from './components/ExperienceTimelineSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { DataCustomizerModal } from './components/DataCustomizerModal';
import { CV_WHATSAPP_URL } from './utils/downloadCv';
import { 
  MessageCircle, 
  FileDown, 
  UserRound, 
  Layers, 
  Briefcase, 
  Compass 
} from 'lucide-react';

export default function App() {
  const [profile, setProfile] = useState<ProfileInfo>(initialProfileData);
  const [isDataCustomizerOpen, setIsDataCustomizerOpen] = useState(false);

  const handleUpdateProfile = (updated: Partial<ProfileInfo>) => {
    setProfile(prev => ({ ...prev, ...updated }));
  };

  const handleResetDefaults = () => {
    setProfile(initialProfileData);
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F6F9] text-[#102B46] flex flex-col font-sans selection:bg-[#D5A33D] selection:text-[#102B46] pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))] sm:pb-0 overflow-x-hidden">
      
      {/* 1. Header / Navigation */}
      <Navbar 
        onOpenDataCustomizer={() => setIsDataCustomizerOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* Section 3: Page d'Accueil (Hero) */}
        <HeroSection 
          profile={profile}
        />

        {/* Visual Immersion: Les deux blocs de défilement horizontal terrain */}
        <TerrainMarquee 
          photos={terrainPhotos}
        />

        {/* Section 4: Section À Propos */}
        <AboutSection 
          profile={profile}
          onOpenDataCustomizer={() => setIsDataCustomizerOpen(true)}
        />

        {/* Section 5 & 6: Compétences Techniques, Logiciels & Équipements */}
        <TechnicalSkillsSection />

        {/* Section 7: Projets d'Ingénierie & Topographie */}
        <ProjectsSection projects={projectsData} />

        {/* Section 8: Expériences et Formation (Chronologie Verticale) */}
        <ExperienceTimelineSection />

        {/* Section 9: Section Contact */}
        <ContactSection profile={profile} />

      </main>

      {/* Section 11: Pied de Page Minimaliste */}
      <Footer profile={profile} />

      {/* Mobile Sticky Quick Dock for Smartphones: Doux, épuré, élégant et ergonomique */}
      <aside 
        aria-label="Navigation rapide mobile" 
        className="fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] left-2.5 right-2.5 max-w-md mx-auto z-40 sm:hidden"
      >
        <div className="bg-[#0A1826]/90 backdrop-blur-2xl border border-white/12 rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.55),0_1px_0_rgba(255,255,255,0.08)_inset] p-1.5 grid grid-cols-6 gap-1 text-white">
          
          {/* 1. À propos de moi */}
          <a
            href="#a-propos"
            onClick={(e) => handleScrollTo(e, '#a-propos')}
            className="group flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl hover:bg-white/5 active:scale-95 transition-transform duration-150"
            title="À propos de moi"
          >
            <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-white/[0.06] group-hover:bg-white/12 transition-colors">
              <UserRound className="w-4 h-4 text-slate-200 group-hover:text-[#D5A33D] transition-colors" strokeWidth={1.8} />
            </div>
            <span className="text-[9px] font-sans font-medium text-slate-300 mt-1 truncate w-full text-center tracking-tight">À propos</span>
          </a>

          {/* 2. Compétences logicielles */}
          <a
            href="#competences"
            onClick={(e) => handleScrollTo(e, '#competences')}
            className="group flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl hover:bg-white/5 active:scale-95 transition-transform duration-150"
            title="Compétences logicielles"
          >
            <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-white/[0.06] group-hover:bg-white/12 transition-colors">
              <Layers className="w-4 h-4 text-slate-200 group-hover:text-[#D5A33D] transition-colors" strokeWidth={1.8} />
            </div>
            <span className="text-[9px] font-sans font-medium text-slate-300 mt-1 truncate w-full text-center tracking-tight">Logiciels</span>
          </a>

          {/* 3. Immersion terrain et réalité chantier (entre Logiciels et Projets) */}
          <a
            href="#photos-terrain"
            onClick={(e) => handleScrollTo(e, '#photos-terrain')}
            className="group flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl hover:bg-amber-500/10 active:scale-95 transition-transform duration-150"
            title="Immersion terrain et réalité chantier"
          >
            <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-[#D5A33D]/15 border border-[#D5A33D]/30 group-hover:bg-[#D5A33D]/25 transition-colors">
              <Compass className="w-4 h-4 text-[#D5A33D]" strokeWidth={1.8} />
            </div>
            <span className="text-[9px] font-sans font-semibold text-amber-300 mt-1 truncate w-full text-center tracking-tight">Terrain</span>
          </a>

          {/* 4. Projets réalisés */}
          <a
            href="#projets"
            onClick={(e) => handleScrollTo(e, '#projets')}
            className="group flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl hover:bg-white/5 active:scale-95 transition-transform duration-150"
            title="Projets réalisés"
          >
            <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-white/[0.06] group-hover:bg-white/12 transition-colors">
              <Briefcase className="w-4 h-4 text-slate-200 group-hover:text-[#D5A33D] transition-colors" strokeWidth={1.8} />
            </div>
            <span className="text-[9px] font-sans font-medium text-slate-300 mt-1 truncate w-full text-center tracking-tight">Projets</span>
          </a>

          {/* 5. WhatsApp */}
          <a
            href="https://wa.me/221787813272?text=Bonjour%20M.%20Brice%20Emery%20PLEI,%20je%20vous%20contacte%20concernant%20un%20projet%20ou%20une%20mission%20topographique"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl hover:bg-emerald-500/10 active:scale-95 transition-transform duration-150"
            title="Discussion WhatsApp directe"
          >
            <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-emerald-500/15 border border-emerald-500/30 group-hover:bg-emerald-500/25 transition-colors shadow-2xs">
              <MessageCircle className="w-4 h-4 text-emerald-300" strokeWidth={1.8} />
            </div>
            <span className="text-[9px] font-sans font-semibold text-emerald-400 mt-1 truncate w-full text-center tracking-tight">WhatsApp</span>
          </a>

          {/* 6. Télécharger mon CV */}
          <a
            href={CV_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl hover:bg-[#D5A33D]/10 active:scale-95 transition-transform duration-150"
            title="Demander mon CV sur WhatsApp"
          >
            <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-[#D5A33D]/15 border border-[#D5A33D]/30 group-hover:bg-[#D5A33D]/25 transition-colors shadow-2xs">
              <FileDown className="w-4 h-4 text-[#D5A33D]" strokeWidth={1.8} />
            </div>
            <span className="text-[9px] font-sans font-semibold text-[#D5A33D] mt-1 truncate w-full text-center tracking-tight">Mon CV</span>
          </a>

        </div>
      </aside>

      {/* Quick Customizer Modal */}
      <DataCustomizerModal
        isOpen={isDataCustomizerOpen}
        onClose={() => setIsDataCustomizerOpen(false)}
        profile={profile}
        onUpdateProfile={handleUpdateProfile}
        onResetDefaults={handleResetDefaults}
      />
    </div>
  );
}
