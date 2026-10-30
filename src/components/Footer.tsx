import React from 'react';
import { ProfileInfo } from '../data/portfolioData';
import { Compass, ArrowUp, Phone, Mail, MapPin, Linkedin } from 'lucide-react';

interface FooterProps {
  profile: ProfileInfo;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: "Accueil", href: "#accueil" },
    { label: "À propos", href: "#a-propos" },
    { label: "Compétences Logicielles", href: "#competences" },
    { label: "Mes Projets Terrains", href: "#projets" },
    { label: "Expériences", href: "#experiences" },
    { label: "Contact", href: "#contact" },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B1E31] text-white border-t border-white/10 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-white/10">
          
          {/* Identity: Name & Professional Title */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#D5A33D] text-[#102B46] flex items-center justify-center font-bold">
                <Compass className="w-4 h-4" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white font-heading">
                {profile.fullName}
              </h3>
            </div>
            <p className="text-xs font-mono text-[#D5A33D] uppercase tracking-wider pl-10 font-medium">
              INGÉNIEUR DE CONCEPTION GÉOMÈTRE TOPOGRAPHE
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center gap-5 sm:gap-7 text-xs font-mono uppercase tracking-wider text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="hover:text-[#D5A33D] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Back to top button */}
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs font-mono text-[#D5A33D] hover:text-white transition-colors cursor-pointer self-start md:self-auto"
            title="Revenir en haut de la page"
          >
            <span>Haut de page</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Coordonnées & Bottom Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400 text-center sm:text-left">
          
          {/* Coordinates summary */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-[11px]">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Phone className="w-3 h-3 text-[#D5A33D]" />
              <span>{profile.phoneSenegal} / {profile.phoneCIV}</span>
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Mail className="w-3 h-3 text-[#D5A33D]" />
              <span>{profile.email}</span>
            </span>
            {profile.linkedin && (
              <a 
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-slate-300 hover:text-[#D5A33D] transition-colors"
                title="Consulter le profil LinkedIn de Brice Emery PLEI"
              >
                <Linkedin className="w-3 h-3 text-[#D5A33D]" />
                <span>LinkedIn</span>
              </a>
            )}
          </div>

          {/* Automatic Year Copyright (Required by Prompt Section 11) */}
          <div className="text-slate-400 text-[11px]">
            © {currentYear} {profile.fullName}. Tous droits réservés.
          </div>

        </div>

      </div>
    </footer>
  );
};
