import React, { useState } from 'react';
import { ProfileInfo } from '../data/portfolioData';
import { 
  Compass, 
  Mail, 
  MessageCircle, 
  ShieldCheck, 
  Download, 
  PhoneCall,
  ExternalLink,
  Check,
  Loader2,
  Sparkles,
  MapPin,
  Layers,
  Satellite,
  Building2,
  Drone,
  Play
} from 'lucide-react';
import { TopoContours } from './TopoBackground';
import { downloadCvPdf, openCvInNewTab } from '../utils/downloadCv';
import { motion } from 'motion/react';

interface HeroAboutProps {
  profile: ProfileInfo;
  onDownloadResume?: () => void;
  onOpenVideoRecap?: () => void;
}

export const HeroAbout: React.FC<HeroAboutProps> = ({ 
  profile, 
  onDownloadResume,
  onOpenVideoRecap 
}) => {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const photos = [
    profile.photoUrl,
    profile.photoSecondaryUrl || profile.photoUrl
  ];

  const currentPhoto = photos[activePhotoIndex];
  const whatsappUrl = `https://wa.me/221787813272?text=Bonjour%20M.%20Brice%20Emery%20PLEI,%20je%20vous%20contacte%20concernant%20un%20projet%20ou%20une%20mission%20topographique`;

  const handleDownloadCv = async () => {
    setIsDownloading(true);
    const success = await downloadCvPdf(profile.cvPdfUrl, 'CV_BRICE_PLEI_Ingenieur_Topographe.pdf');
    setIsDownloading(false);
    if (success) {
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3500);
    }
  };

  return (
    <motion.section 
      id="a-propos" 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative min-h-[calc(100vh-4.5rem)] flex items-center py-10 sm:py-16 lg:py-24 bg-gradient-to-b from-white via-sky-50/40 to-slate-50 border-b border-slate-200/80 overflow-hidden"
    >
      {/* Soft Ambient Radial Glows (Sky Blue & Soft Indigo for a luxurious, soft aura) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-sky-200/25 via-blue-200/20 to-sky-100/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-sky-300/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Delicate topographic contour lines & soft grid */}
      <div className="absolute inset-0 topo-grid-pattern opacity-60 pointer-events-none" />
      <TopoContours className="opacity-35" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* 2-Column Responsive Split: Photo FIRST on mobile screens (order-1), Presentation second (order-2) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
          
          {/* PHOTO COLUMN (Order-1 on Mobile, Order-2 on Desktop) */}
          <div className="order-1 lg:order-2 lg:col-span-5 flex flex-col items-center w-full">
            <div className="relative w-full max-w-[310px] xs:max-w-[340px] sm:max-w-sm lg:max-w-md mx-auto group">
              
              {/* Soft Luminous Aura behind the photo */}
              <div className="absolute -inset-3 sm:-inset-4 bg-gradient-to-tr from-sky-400/25 via-blue-500/15 to-sky-300/20 rounded-[2.5rem] blur-2xl group-hover:blur-3xl transition-all duration-700 pointer-events-none" />

              {/* Outer Soft Rounded Frame with double subtle border */}
              <div className="relative p-2.5 sm:p-3 rounded-[2rem] bg-gradient-to-b from-white via-white/95 to-sky-50/80 border border-white/80 shadow-[0_20px_50px_-15px_rgba(2,132,199,0.18)] backdrop-blur-xl">
                
                {/* Upper Soft Glass Badges */}
                <div className="absolute top-5 left-5 z-20 flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-sky-100 text-[11px] font-mono text-blue-900 shadow-sm font-bold">
                  <Compass className="w-3.5 h-3.5 text-sky-600 animate-spin-slow" />
                  <span>UIDT · UFR SI</span>
                </div>

                <div className="absolute top-5 right-5 z-20 flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-100 text-[11px] font-mono text-emerald-700 shadow-sm font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>DIPLÔMÉ</span>
                </div>

                {/* The Main Portrait Image Container */}
                <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl bg-slate-100 relative shadow-inner">
                  <img
                    src={currentPhoto}
                    alt="Brice Emery PLEI - Ingénieur Géomètre Topographe"
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    referrerPolicy="no-referrer"
                    loading="eager"
                  />

                  {/* Soft Floating Photo Switcher with Dots Indicator */}
                  {profile.photoSecondaryUrl && (
                    <button
                      type="button"
                      onClick={() => setActivePhotoIndex((activePhotoIndex + 1) % photos.length)}
                      className="absolute bottom-3 right-3 z-20 px-3 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 text-[11px] font-mono shadow-md cursor-pointer flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                      title="Basculer entre la photo 1 et la photo 2"
                    >
                      <div className="flex items-center gap-1">
                        <span className={`w-2 h-2 rounded-full transition-colors ${activePhotoIndex === 0 ? 'bg-sky-400 ring-2 ring-sky-400/30' : 'bg-white/40'}`} />
                        <span className={`w-2 h-2 rounded-full transition-colors ${activePhotoIndex === 1 ? 'bg-sky-400 ring-2 ring-sky-400/30' : 'bg-white/40'}`} />
                      </div>
                      <span className="text-sky-200 font-medium">Vue {activePhotoIndex + 1}/2</span>
                    </button>
                  )}
                </div>

                {/* Refined and Soft Caption Card beneath the photo */}
                <div className="mt-2.5 p-4 sm:p-5 rounded-2xl bg-white/90 border border-slate-150 text-center space-y-1.5 shadow-xs">
                  <div>
                    {/* Official user text: Plei wonbleon brice emery */}
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight uppercase font-heading">
                      Plei wonbleon brice emery
                    </h2>
                    
                    {/* Official user text: Ingénieur de Conception Géomètre Topographe */}
                    <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-sky-700 font-mono mt-0.5">
                      Ingénieur de Conception Géomètre Topographe
                    </p>
                  </div>

                  {/* Soft bottom institution & availability strip */}
                  <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span className="font-semibold text-blue-900 flex items-center gap-1">
                      <span className="text-sky-500">📍</span> UIDT Thiès
                    </span>
                    <span className="text-emerald-600 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Disponible
                    </span>
                    <span className="text-sky-700 font-bold">ESBTP CI</span>
                  </div>
                </div>

              </div>

              {/* Subtitle assurance tag for mobile */}
              <div className="flex lg:hidden items-center justify-center gap-2 mt-3 text-xs font-mono text-slate-500 text-center">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-sky-500" />
                <span>Profil officiel vérifié · Double cursus Sénégal & CI</span>
              </div>
            </div>
          </div>

          {/* PRESENTATION COLUMN (Order-2 on Mobile, Order-1 on Desktop) */}
          <div className="order-2 lg:order-1 lg:col-span-7 space-y-6 sm:space-y-7">
            
            {/* Top Soft Badges Row */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-900 font-mono bg-white/90 px-3.5 py-1.5 rounded-full border border-sky-200/80 shadow-xs backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-sky-500" />
                <span>PORTFOLIO & CV OFFICIEL</span>
              </div>

              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-sky-800 bg-sky-50/90 px-3 py-1.5 rounded-full border border-sky-200/70 font-semibold shadow-2xs">
                <MapPin className="w-3 h-3 text-sky-600" />
                <span>Thiès / Dakar · Abidjan / Bonoua</span>
              </div>
            </div>

            {/* Main Headline: Soft, authoritative serif typography */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-[1.15] font-heading text-balance">
                Brice Emery PLEI <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-950 via-blue-800 to-sky-600">
                  Ingénieur Géomètre - Topographe
                </span>
              </h1>
              <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">
                Diplômé de l'UFR Sciences de l'Ingénieur (UIDT Thiès)
              </p>
            </div>

            {/* Tagline Card: Soft pill-card with subtle sky-blue glow and gentle accent */}
            <div className="relative p-4 sm:p-5 rounded-2xl bg-white/80 border border-sky-100 shadow-[0_4px_20px_-4px_rgba(2,132,199,0.08)] backdrop-blur-sm">
              <div className="absolute top-3 bottom-3 left-0 w-1.5 bg-gradient-to-b from-sky-400 to-blue-600 rounded-r-full" />
              <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed pl-2 sm:pl-3">
                {profile.tagline}
              </p>
            </div>

            {/* CV Description: Clear, balanced, soft reading flow */}
            <div className="space-y-3.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              {profile.descriptionBio.map((paragraph, idx) => (
                <p key={idx} className="first:text-slate-800 first:font-medium">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* 4 Soft Expertise Micro-Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-2 border-t border-slate-200/70">
              <div className="p-3 rounded-2xl bg-white/80 border border-slate-200/80 shadow-xs hover:border-sky-300 hover:shadow-sm transition-all">
                <div className="flex items-center gap-1.5 text-sky-600 mb-1">
                  <Drone className="w-4 h-4" />
                  <span className="text-[11px] font-mono font-bold uppercase text-blue-900">LiDAR & Drone</span>
                </div>
                <p className="text-xs text-slate-600 font-medium truncate">DJI M300 · Zenmuse L1</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/80 border border-slate-200/80 shadow-xs hover:border-sky-300 hover:shadow-sm transition-all">
                <div className="flex items-center gap-1.5 text-sky-600 mb-1">
                  <Building2 className="w-4 h-4" />
                  <span className="text-[11px] font-mono font-bold uppercase text-blue-900">VRD & Routes</span>
                </div>
                <p className="text-xs text-slate-600 font-medium truncate">Covadis 17 · AutoCAD</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/80 border border-slate-200/80 shadow-xs hover:border-sky-300 hover:shadow-sm transition-all">
                <div className="flex items-center gap-1.5 text-sky-600 mb-1">
                  <Satellite className="w-4 h-4" />
                  <span className="text-[11px] font-mono font-bold uppercase text-blue-900">Géodésie</span>
                </div>
                <p className="text-xs text-slate-600 font-medium truncate">GNSS RTK · PPP · Canevas</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/80 border border-slate-200/80 shadow-xs hover:border-sky-300 hover:shadow-sm transition-all">
                <div className="flex items-center gap-1.5 text-sky-600 mb-1">
                  <Layers className="w-4 h-4" />
                  <span className="text-[11px] font-mono font-bold uppercase text-blue-900">SIG & Foncier</span>
                </div>
                <p className="text-xs text-slate-600 font-medium truncate">QGIS · ArcGIS Pro · Cadastre</p>
              </div>
            </div>

            {/* Action Buttons: Soft, modern, comfortable on mobile & desktop */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              
              {/* WhatsApp direct button (Friendly soft emerald) */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-emerald-600/20 hover:shadow-lg hover:shadow-emerald-600/30 cursor-pointer active:scale-98"
                title="Échanger directement sur WhatsApp au +221 78 781 32 72"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>WhatsApp (+221 78 781 32 72)</span>
              </a>

              {/* Télécharger CV PDF officiel */}
              <div className="w-full sm:w-auto flex-1 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDownloadCv}
                  disabled={isDownloading}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-900 via-blue-800 to-sky-700 hover:from-blue-800 hover:to-sky-600 disabled:opacity-75 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-blue-900/20 hover:shadow-lg hover:shadow-blue-900/30 cursor-pointer active:scale-98"
                  title="Télécharger directement le fichier PDF original du CV"
                >
                  {isDownloading ? (
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                  ) : downloadSuccess ? (
                    <Check className="w-4 h-4 text-emerald-300" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  <span>
                    {isDownloading ? 'Téléchargement...' : downloadSuccess ? 'CV Téléchargé !' : 'Télécharger CV (PDF)'}
                  </span>
                </button>

                {/* Direct Online View in new tab */}
                <button
                  type="button"
                  onClick={() => openCvInNewTab(profile.cvPdfUrl)}
                  className="inline-flex items-center justify-center p-3.5 rounded-2xl bg-white hover:bg-sky-50 text-blue-900 border border-slate-200 hover:border-sky-300 transition-colors cursor-pointer shadow-xs"
                  title="Consulter le CV PDF en pleine page dans le navigateur"
                >
                  <ExternalLink className="w-4 h-4 text-sky-600" />
                </button>
              </div>

              {/* Vidéo Récap avec musique (Demandé par l'utilisateur) */}
              {onOpenVideoRecap && (
                <button
                  type="button"
                  onClick={onOpenVideoRecap}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-sky-600 via-sky-500 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-sky-500/25 hover:shadow-lg hover:shadow-sky-500/35 cursor-pointer active:scale-98 group"
                  title="Visionner la vidéo récapitulative continue avec musique"
                >
                  <span className="p-1 rounded-full bg-white/20 group-hover:scale-110 transition-transform">
                    <Play className="w-3.5 h-3.5 fill-current text-white" />
                  </span>
                  <span>Vidéo Récap</span>
                  <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-mono text-sky-100 flex items-center gap-1">
                    <span>♫</span>
                    <span>Musique</span>
                  </span>
                </button>
              )}

              {/* Email Button */}
              <a
                href={`mailto:${profile.email}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold uppercase tracking-wider border border-slate-200 transition-colors shadow-xs"
              >
                <Mail className="w-4 h-4 text-sky-600" />
                <span>Email Pro</span>
              </a>

            </div>

            {/* Direct Phone Numbers in soft capsule badges */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs font-mono text-slate-600 pt-1">
              <a 
                href={`tel:${profile.phoneSenegal.replace(/\s+/g, '')}`}
                className="flex items-center gap-2 hover:text-blue-700 transition-colors bg-white/90 hover:bg-white px-3.5 py-2 rounded-xl border border-slate-200/90 shadow-2xs backdrop-blur-sm"
              >
                <PhoneCall className="w-3.5 h-3.5 text-sky-600" />
                <span>Sénégal : <strong className="text-slate-900">{profile.phoneSenegal}</strong></span>
              </a>
              <a 
                href={`tel:${profile.phoneCIV.replace(/\s+/g, '')}`}
                className="flex items-center gap-2 hover:text-blue-700 transition-colors bg-white/90 hover:bg-white px-3.5 py-2 rounded-xl border border-slate-200/90 shadow-2xs backdrop-blur-sm"
              >
                <PhoneCall className="w-3.5 h-3.5 text-sky-600" />
                <span>Côte d'Ivoire : <strong className="text-slate-900">{profile.phoneCIV}</strong></span>
              </a>
            </div>

          </div>

        </div>
      </div>

    </motion.section>
  );
};

