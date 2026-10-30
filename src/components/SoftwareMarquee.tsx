import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Layers, 
  Map, 
  Box, 
  Cpu, 
  Satellite, 
  Compass, 
  Tablet, 
  Database,
  Eye,
  Crosshair,
  Sparkles,
  Pause,
  Play
} from 'lucide-react';

export interface SoftwareBadge {
  name: string;
  role: string;
  category: string;
  colorScheme: {
    bg: string;
    border: string;
    text: string;
    badgeBg: string;
    badgeText: string;
    iconBg: string;
  };
  iconType: string;
}

export const softwareToolsList: SoftwareBadge[] = [
  {
    name: 'AutoCAD',
    role: 'DAO / CAO & Plans de Projet',
    category: 'Conception CAO',
    colorScheme: {
      bg: 'bg-red-50/60 hover:bg-red-50',
      border: 'border-red-200/80 hover:border-red-400',
      text: 'text-red-950',
      badgeBg: 'bg-red-100 text-red-800',
      badgeText: 'text-red-700',
      iconBg: 'bg-red-600 text-white'
    },
    iconType: 'layers'
  },
  {
    name: 'Covadis 17',
    role: 'VRD, MNT, Profils & Cubatures',
    category: 'Génie Civil & VRD',
    colorScheme: {
      bg: 'bg-blue-50/70 hover:bg-blue-50',
      border: 'border-blue-200/90 hover:border-blue-400',
      text: 'text-blue-950',
      badgeBg: 'bg-blue-100 text-blue-800',
      badgeText: 'text-blue-700',
      iconBg: 'bg-blue-700 text-white'
    },
    iconType: 'box'
  },
  {
    name: 'DJI Terra',
    role: 'LiDAR L1 & Photogrammétrie',
    category: 'Drone & Capteurs',
    colorScheme: {
      bg: 'bg-sky-50/70 hover:bg-sky-50',
      border: 'border-sky-200/90 hover:border-sky-400',
      text: 'text-sky-950',
      badgeBg: 'bg-sky-100 text-sky-800',
      badgeText: 'text-sky-700',
      iconBg: 'bg-sky-600 text-white'
    },
    iconType: 'cpu'
  },
  {
    name: 'CloudCompare',
    role: 'Nuages de Points 3D & Recalage',
    category: 'Métrologie 3D',
    colorScheme: {
      bg: 'bg-cyan-50/60 hover:bg-cyan-50',
      border: 'border-cyan-200/80 hover:border-cyan-400',
      text: 'text-cyan-950',
      badgeBg: 'bg-cyan-100 text-cyan-800',
      badgeText: 'text-cyan-700',
      iconBg: 'bg-cyan-700 text-white'
    },
    iconType: 'box'
  },
  {
    name: 'Agisoft Metashape',
    role: 'Aérotriangulation & Orthophotos',
    category: 'Photogrammétrie',
    colorScheme: {
      bg: 'bg-indigo-50/60 hover:bg-indigo-50',
      border: 'border-indigo-200/80 hover:border-indigo-400',
      text: 'text-indigo-950',
      badgeBg: 'bg-indigo-100 text-indigo-800',
      badgeText: 'text-indigo-700',
      iconBg: 'bg-indigo-600 text-white'
    },
    iconType: 'eye'
  },
  {
    name: 'QGIS',
    role: 'SIG, Analyses Spatiales & Carto',
    category: 'Système SIG',
    colorScheme: {
      bg: 'bg-emerald-50/60 hover:bg-emerald-50',
      border: 'border-emerald-200/80 hover:border-emerald-400',
      text: 'text-emerald-950',
      badgeBg: 'bg-emerald-100 text-emerald-800',
      badgeText: 'text-emerald-700',
      iconBg: 'bg-emerald-600 text-white'
    },
    iconType: 'map'
  },
  {
    name: 'ArcGIS Pro',
    role: 'Géodatabases & Géotraitement',
    category: 'Esri SIG Avancé',
    colorScheme: {
      bg: 'bg-blue-50/70 hover:bg-blue-50',
      border: 'border-blue-300 hover:border-blue-500',
      text: 'text-blue-950',
      badgeBg: 'bg-blue-100 text-blue-900',
      badgeText: 'text-blue-800',
      iconBg: 'bg-blue-800 text-white'
    },
    iconType: 'map'
  },
  {
    name: 'Civil 3D',
    role: 'Infrastructures & Voirie Avancée',
    category: 'Autodesk Civil',
    colorScheme: {
      bg: 'bg-slate-50 hover:bg-white',
      border: 'border-slate-300 hover:border-slate-400',
      text: 'text-slate-900',
      badgeBg: 'bg-slate-200 text-slate-800',
      badgeText: 'text-slate-700',
      iconBg: 'bg-slate-800 text-white'
    },
    iconType: 'layers'
  },
  {
    name: 'SPATIX (TerraMatch / TerraScan)',
    role: 'Ajustement Inter-Bandes LiDAR',
    category: 'LiDAR Avancé',
    colorScheme: {
      bg: 'bg-violet-50/60 hover:bg-violet-50',
      border: 'border-violet-200 hover:border-violet-400',
      text: 'text-violet-950',
      badgeBg: 'bg-violet-100 text-violet-800',
      badgeText: 'text-violet-700',
      iconBg: 'bg-violet-700 text-white'
    },
    iconType: 'crosshair'
  },
  {
    name: 'Leica Infinity',
    role: 'Calcul de Réseaux & Lignes de Base',
    category: 'Géodésie & GNSS',
    colorScheme: {
      bg: 'bg-amber-50/60 hover:bg-amber-50',
      border: 'border-amber-200 hover:border-amber-400',
      text: 'text-amber-950',
      badgeBg: 'bg-amber-100 text-amber-800',
      badgeText: 'text-amber-700',
      iconBg: 'bg-amber-600 text-white'
    },
    iconType: 'satellite'
  },
  {
    name: 'RTKLIB',
    role: 'Post-traitement GNSS PPK / Statique',
    category: 'Post-Calcul GNSS',
    colorScheme: {
      bg: 'bg-sky-50/60 hover:bg-sky-50',
      border: 'border-sky-200 hover:border-sky-400',
      text: 'text-sky-950',
      badgeBg: 'bg-sky-100 text-sky-800',
      badgeText: 'text-sky-700',
      iconBg: 'bg-sky-700 text-white'
    },
    iconType: 'satellite'
  },
  {
    name: 'KoboToolbox',
    role: 'Collecte Nomade Géoréférencée',
    category: 'Enquêtes Terrain',
    colorScheme: {
      bg: 'bg-teal-50/60 hover:bg-teal-50',
      border: 'border-teal-200 hover:border-teal-400',
      text: 'text-teal-950',
      badgeBg: 'bg-teal-100 text-teal-800',
      badgeText: 'text-teal-700',
      iconBg: 'bg-teal-600 text-white'
    },
    iconType: 'tablet'
  },
  {
    name: 'Global Mapper',
    role: 'Conversions Spatiales & Découpe MNT',
    category: 'Traitement Données',
    colorScheme: {
      bg: 'bg-emerald-50/50 hover:bg-emerald-50',
      border: 'border-emerald-200 hover:border-emerald-400',
      text: 'text-emerald-950',
      badgeBg: 'bg-emerald-100 text-emerald-800',
      badgeText: 'text-emerald-700',
      iconBg: 'bg-emerald-700 text-white'
    },
    iconType: 'database'
  },
  {
    name: 'Google Earth Engine & GEE',
    role: 'Imagerie Satellite & Télédétection',
    category: 'Observation Terre',
    colorScheme: {
      bg: 'bg-blue-50/60 hover:bg-blue-50',
      border: 'border-blue-200 hover:border-blue-400',
      text: 'text-blue-950',
      badgeBg: 'bg-blue-100 text-blue-800',
      badgeText: 'text-blue-700',
      iconBg: 'bg-blue-600 text-white'
    },
    iconType: 'compass'
  },
  {
    name: '3D Survey',
    role: 'Surfaces MNT & Cubatures Carrière',
    category: 'Modélisation 3D',
    colorScheme: {
      bg: 'bg-sky-50/50 hover:bg-sky-50',
      border: 'border-sky-200 hover:border-sky-400',
      text: 'text-sky-950',
      badgeBg: 'bg-sky-100 text-sky-800',
      badgeText: 'text-sky-700',
      iconBg: 'bg-sky-500 text-white'
    },
    iconType: 'box'
  },
  {
    name: 'Python',
    role: 'Scripts Géospatiaux & Traitement de Données',
    category: 'Programmation',
    colorScheme: {
      bg: 'bg-amber-50/60 hover:bg-amber-50',
      border: 'border-amber-300 hover:border-amber-500',
      text: 'text-amber-950',
      badgeBg: 'bg-amber-100 text-amber-900',
      badgeText: 'text-amber-800',
      iconBg: 'bg-amber-600 text-white'
    },
    iconType: 'cpu'
  }
];

const renderIcon = (type: string, className: string = 'w-5 h-5') => {
  switch (type) {
    case 'layers': return <Layers className={className} />;
    case 'box': return <Box className={className} />;
    case 'cpu': return <Cpu className={className} />;
    case 'eye': return <Eye className={className} />;
    case 'map': return <Map className={className} />;
    case 'satellite': return <Satellite className={className} />;
    case 'tablet': return <Tablet className={className} />;
    case 'database': return <Database className={className} />;
    case 'compass': return <Compass className={className} />;
    case 'crosshair': return <Crosshair className={className} />;
    default: return <Sparkles className={className} />;
  }
};

export const SoftwareMarquee: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  // Dupliquer la liste pour un défilement infini sans à-coup
  const marqueeItems = [...softwareToolsList, ...softwareToolsList];

  return (
    <section className="py-7 sm:py-10 bg-gradient-to-r from-sky-50/60 via-white to-sky-50/60 border-y border-sky-200/80 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-3 sm:mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-pulse" />
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-950 font-mono">
              Environnement Logiciel & Chaîne Numérique Géomatique
            </h3>
          </div>
          
          <div className="flex items-center justify-between sm:justify-end gap-3">
            <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
              Défilement continu · Outils certifiés et opérationnels du CV
            </span>
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:py-1.5 rounded-lg bg-white hover:bg-sky-50 text-slate-700 text-[11px] font-mono font-semibold border border-sky-200 shadow-2xs transition-colors cursor-pointer"
              title={isPaused ? "Reprendre le défilement" : "Mettre en pause"}
            >
              {isPaused ? <Play className="w-3 h-3 text-sky-600" /> : <Pause className="w-3 h-3 text-sky-600" />}
              <span>{isPaused ? "Défiler" : "Pause"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Marquee Track Container with subtle fade edges */}
      <div 
        className="relative w-full overflow-hidden select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Left & Right gradient masks for smooth fade */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

        {/* Continuous horizontal scrolling track */}
        <div 
          className={`flex items-center gap-3 sm:gap-5 w-max py-1 sm:py-2 ${isPaused ? '' : 'animate-marquee'}`}
          style={{ willChange: 'transform' }}
        >
          {marqueeItems.map((software, idx) => (
            <div
              key={`${software.name}-${idx}`}
              className={`shrink-0 flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-2xl border ${software.colorScheme.border} ${software.colorScheme.bg} shadow-2xs hover:shadow-md transition-all duration-300 cursor-default`}
            >
              {/* Icon badge */}
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl ${software.colorScheme.iconBg} flex items-center justify-center shrink-0 shadow-xs`}>
                {renderIcon(software.iconType, 'w-4 h-4 sm:w-5 sm:h-5')}
              </div>

              {/* Software Information */}
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className={`text-xs sm:text-base font-black tracking-tight ${software.colorScheme.text} font-heading`}>
                    {software.name}
                  </span>
                  <span className={`text-[9px] sm:text-[10px] font-mono font-bold px-1.5 sm:px-2 py-0.5 rounded-md ${software.colorScheme.badgeBg}`}>
                    {software.category}
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs font-mono text-slate-600 font-medium">
                  {software.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile touch hint */}
      <div className="max-w-7xl mx-auto px-4 mt-2 sm:hidden text-center">
        <span className="text-[10px] font-mono text-slate-500">
          ✦ Touchez l'écran pour suspendre le défilement et lire les outils
        </span>
      </div>
    </section>
  );
};
