import React, { useState, useEffect } from 'react';
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
import { 
  UserRound, 
  Layers, 
  Briefcase, 
  GraduationCap,
  Home,
  Send
} from 'lucide-react';

export default function App() {
  const [profile, setProfile] = useState<ProfileInfo>(initialProfileData);
  const [isDataCustomizerOpen, setIsDataCustomizerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('accueil');

  const handleUpdateProfile = (updated: Partial<ProfileInfo>) => {
    setProfile(prev => ({ ...prev, ...updated }));
  };

  const handleResetDefaults = () => {
    setProfile(initialProfileData);
  };

  // Smooth vertical scrolling helper
  const handleScrollTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Track active section on vertical scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['accueil', 'a-propos', 'competences', 'projets', 'experiences', 'contact'];
      const scrollPosition = window.scrollY + 220;

      for (let i = sections.length - 1; i >= 0; i--) {
        const secId = sections[i];
        const el = document.getElementById(secId);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(secId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle URL hash on initial load (e.g., #formations)
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;

    if (hash === 'formations') {
      window.dispatchEvent(new CustomEvent('switch-tab', { detail: 'formation' }));
      const el = document.getElementById('experiences');
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 200);
      }
      return;
    }

    const targetEl = document.getElementById(hash);
    if (targetEl) {
      setTimeout(() => targetEl.scrollIntoView({ behavior: 'smooth' }), 200);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F3F6F9] text-[#102B46] flex flex-col font-sans selection:bg-[#D5A33D] selection:text-[#102B46] overflow-x-hidden">
      
      {/* 1. Header / Barre de navigation principale fixe */}
      <Navbar 
        onOpenDataCustomizer={() => setIsDataCustomizerOpen(true)}
        activeSection={activeSection}
      />

      {/* 2. Flux vertical continu de toutes les sections */}
      <main className="flex-1 w-full flex flex-col">
        
        {/* SECTION 1 : ACCUEIL & IMMERSION */}
        <section id="accueil" aria-label="Accueil et Immersion">
          <HeroSection profile={profile} />
          <TerrainMarquee photos={terrainPhotos} />
        </section>

        {/* SECTION 2 : À PROPOS DE MOI */}
        <section id="a-propos" aria-label="À propos de moi">
          <AboutSection 
            profile={profile}
            onOpenDataCustomizer={() => setIsDataCustomizerOpen(true)}
          />
        </section>

        {/* SECTION 3 : COMPÉTENCES LOGICIELLES & TECHNIQUES */}
        <section id="competences" aria-label="Compétences et Logiciels">
          <TechnicalSkillsSection />
        </section>

        {/* SECTION 4 : PROJETS RÉALISÉS */}
        <section id="projets" aria-label="Projets Réalisés sur le Terrain">
          <ProjectsSection projects={projectsData} />
        </section>

        {/* SECTION 5 : EXPÉRIENCES & FORMATIONS */}
        <section id="experiences" aria-label="Expériences et Formations">
          <ExperienceTimelineSection />
        </section>

        {/* SECTION 6 : CONTACT */}
        <section id="contact" aria-label="Contact et Réseau">
          <ContactSection profile={profile} />
        </section>

      </main>

      {/* 3. Pied de page */}
      <Footer profile={profile} />

      {/* 4. Barre de Navigation Rapide Mobile Épurée (Dock inférieur optimisé avec logos soignés) */}
      <aside 
        aria-label="Navigation rapide mobile" 
        className="fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] left-2.5 right-2.5 max-w-md mx-auto z-40 sm:hidden"
      >
        <div className="bg-[#0A1826]/92 backdrop-blur-2xl border border-white/12 rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.55),0_1px_0_rgba(255,255,255,0.08)_inset] p-1.5 grid grid-cols-6 gap-1 text-white">
          
          {/* 1. Accueil */}
          <button
            type="button"
            onClick={() => handleScrollTo('accueil')}
            className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl transition-all cursor-pointer ${
              activeSection === 'accueil' ? 'bg-[#D5A33D]/20 text-[#D5A33D]' : 'hover:bg-white/5 text-slate-300'
            }`}
            title="Accueil"
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${activeSection === 'accueil' ? 'bg-[#D5A33D]/30' : 'bg-white/[0.06]'}`}>
              <Home className={`w-4 h-4 ${activeSection === 'accueil' ? 'text-[#D5A33D]' : 'text-slate-200'}`} strokeWidth={1.8} />
            </div>
            <span className="text-[9px] font-sans font-medium mt-1 truncate w-full text-center tracking-tight">Accueil</span>
          </button>

          {/* 2. À propos */}
          <button
            type="button"
            onClick={() => handleScrollTo('a-propos')}
            className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl transition-all cursor-pointer ${
              activeSection === 'a-propos' ? 'bg-[#D5A33D]/20 text-[#D5A33D]' : 'hover:bg-white/5 text-slate-300'
            }`}
            title="À propos de moi"
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${activeSection === 'a-propos' ? 'bg-[#D5A33D]/30' : 'bg-white/[0.06]'}`}>
              <UserRound className={`w-4 h-4 ${activeSection === 'a-propos' ? 'text-[#D5A33D]' : 'text-slate-200'}`} strokeWidth={1.8} />
            </div>
            <span className="text-[9px] font-sans font-medium mt-1 truncate w-full text-center tracking-tight">À propos</span>
          </button>

          {/* 3. Logiciels */}
          <button
            type="button"
            onClick={() => handleScrollTo('competences')}
            className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl transition-all cursor-pointer ${
              activeSection === 'competences' ? 'bg-[#D5A33D]/20 text-[#D5A33D]' : 'hover:bg-white/5 text-slate-300'
            }`}
            title="Compétences logicielles"
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${activeSection === 'competences' ? 'bg-[#D5A33D]/30' : 'bg-white/[0.06]'}`}>
              <Layers className={`w-4 h-4 ${activeSection === 'competences' ? 'text-[#D5A33D]' : 'text-slate-200'}`} strokeWidth={1.8} />
            </div>
            <span className="text-[9px] font-sans font-medium mt-1 truncate w-full text-center tracking-tight">Logiciels</span>
          </button>

          {/* 4. Projets */}
          <button
            type="button"
            onClick={() => handleScrollTo('projets')}
            className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl transition-all cursor-pointer ${
              activeSection === 'projets' ? 'bg-[#D5A33D]/20 text-[#D5A33D]' : 'hover:bg-white/5 text-slate-300'
            }`}
            title="Projets réalisés"
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${activeSection === 'projets' ? 'bg-[#D5A33D]/30' : 'bg-white/[0.06]'}`}>
              <Briefcase className={`w-4 h-4 ${activeSection === 'projets' ? 'text-[#D5A33D]' : 'text-slate-200'}`} strokeWidth={1.8} />
            </div>
            <span className="text-[9px] font-sans font-medium mt-1 truncate w-full text-center tracking-tight">Projets</span>
          </button>

          {/* 5. Parcours */}
          <button
            type="button"
            onClick={() => handleScrollTo('experiences')}
            className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl transition-all cursor-pointer ${
              activeSection === 'experiences' ? 'bg-[#D5A33D]/20 text-[#D5A33D]' : 'hover:bg-white/5 text-slate-300'
            }`}
            title="Expériences et Formations"
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${activeSection === 'experiences' ? 'bg-[#D5A33D]/30' : 'bg-white/[0.06]'}`}>
              <GraduationCap className={`w-4 h-4 ${activeSection === 'experiences' ? 'text-[#D5A33D]' : 'text-slate-200'}`} strokeWidth={1.8} />
            </div>
            <span className="text-[9px] font-sans font-medium mt-1 truncate w-full text-center tracking-tight">Parcours</span>
          </button>

          {/* 6. Contact */}
          <button
            type="button"
            onClick={() => handleScrollTo('contact')}
            className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl transition-all cursor-pointer ${
              activeSection === 'contact' ? 'bg-[#D5A33D]/20 text-[#D5A33D]' : 'hover:bg-white/5 text-slate-300'
            }`}
            title="Me contacter"
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${activeSection === 'contact' ? 'bg-[#D5A33D]/30' : 'bg-white/[0.06]'}`}>
              <Send className={`w-4 h-4 ${activeSection === 'contact' ? 'text-[#D5A33D]' : 'text-slate-200'}`} strokeWidth={1.8} />
            </div>
            <span className="text-[9px] font-sans font-medium mt-1 truncate w-full text-center tracking-tight">Contact</span>
          </button>

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
