import React, { useState } from 'react';
import { Menu, X, Compass, ArrowDownRight, FileText, MessageCircle } from 'lucide-react';
import { CV_WHATSAPP_URL } from '../utils/downloadCv';

interface NavbarProps {
  onOpenDataCustomizer?: () => void;
  activeSection?: string;
  // Backward compatibility props if needed
  activePageIndex?: number;
  onNavigateToPage?: (index: number, subTab?: 'experiences' | 'formation') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenDataCustomizer,
  activeSection = 'accueil',
  activePageIndex,
  onNavigateToPage
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Exact navigation items:
  const navLinks = [
    { label: "Accueil", href: "#accueil", sectionId: "accueil" },
    { label: "À propos", href: "#a-propos", sectionId: "a-propos" },
    { label: "Compétences Logicielles", href: "#competences", sectionId: "competences" },
    { label: "Mes Projets Terrains", href: "#projets", sectionId: "projets" },
    { label: "Expériences", href: "#experiences", sectionId: "experiences", subTab: 'experiences' as const },
    { label: "Formations", href: "#formations", sectionId: "experiences", subTab: 'formation' as const },
  ];

  const handleScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement>, 
    href: string, 
    subTab?: 'experiences' | 'formation'
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (subTab) {
      window.dispatchEvent(new CustomEvent('switch-tab', { detail: subTab }));
      window.history.replaceState(null, '', href);
    }

    const targetId = href === '#formations' ? '#experiences' : href;
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#102B46] text-white border-b border-white/10 shadow-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16 sm:h-20">
          
          {/* Brand Wordmark: PORTFOLIO en gras */}
          <a 
            href="#accueil" 
            onClick={(e) => handleScrollTo(e, "#accueil")}
            className="flex items-center text-white whitespace-nowrap shrink-0 group"
          >
            <span className="text-lg sm:text-xl font-black uppercase tracking-wider text-white group-hover:text-[#D5A33D] transition-colors font-heading">
              PORTEFOLIO
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-xs font-semibold uppercase tracking-wider text-slate-300">
            {navLinks.map((link) => {
              const isActive = activeSection === link.sectionId;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href, link.subTab)}
                  className={`transition-all whitespace-nowrap relative py-1.5 px-2.5 rounded-lg font-mono ${
                    isActive
                      ? 'text-[#D5A33D] font-bold bg-white/10 shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-[#D5A33D] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Buttons: Télécharger CV (Redirection WhatsApp) + Contact */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <a
              href={CV_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 hover:border-[#D5A33D]/50 border border-white/20 rounded-lg transition-colors whitespace-nowrap cursor-pointer font-mono"
              title="Demander mon CV sur WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#D5A33D]" />
              <span>Télécharger mon CV</span>
            </a>

            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, "#contact")}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#102B46] bg-[#D5A33D] hover:bg-[#e4b34d] rounded-lg transition-all shadow-sm whitespace-nowrap font-mono"
            >
              <span>Me contacter</span>
              <ArrowDownRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-white hover:text-[#D5A33D] hover:bg-white/10 border border-white/15 focus:outline-none transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#D5A33D]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-white/10 bg-[#102B46] px-4 pt-3 pb-6 space-y-4 shadow-2xl">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.sectionId;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href, link.subTab)}
                  className={`px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between border-b border-white/5 last:border-none uppercase tracking-wider ${
                    isActive ? 'text-[#D5A33D] bg-white/10' : 'text-slate-200 hover:text-[#D5A33D] hover:bg-white/5'
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="text-[#D5A33D] font-mono text-xs">→</span>
                </a>
              );
            })}
          </div>

          <div className="pt-2">
            <a
              href={CV_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 text-center cursor-pointer font-mono"
            >
              <MessageCircle className="w-4 h-4 text-[#D5A33D]" />
              <span>Télécharger mon CV</span>
            </a>
          </div>

          <div className="pt-1">
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, "#contact")}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#D5A33D] text-[#102B46] font-black text-xs uppercase tracking-wider text-center shadow-md font-mono"
            >
              <span>Me contacter</span>
              <ArrowDownRight className="w-4 h-4" />
            </a>
          </div>

          <div className="pt-2 text-center text-xs font-mono text-slate-400">
            Sénégal : +221 78 781 32 72 · CI : +225 01 00 55 86 70
          </div>
        </div>
      )}
    </header>
  );
};
