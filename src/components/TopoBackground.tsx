import React from 'react';

export const TopoContours: React.FC<{ className?: string; dark?: boolean }> = ({ 
  className = "opacity-40",
  dark = false
}) => {
  const strokeNavy = dark ? "rgba(213, 163, 61, 0.25)" : "rgba(16, 43, 70, 0.12)";
  const strokeGold = dark ? "rgba(213, 163, 61, 0.4)" : "rgba(213, 163, 61, 0.28)";
  const strokeSubtle = dark ? "rgba(255, 255, 255, 0.08)" : "rgba(16, 43, 70, 0.07)";

  return (
    <svg 
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`} 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 1440 900" 
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path 
        d="M-50,260 C200,220 450,380 700,300 C950,220 1200,340 1500,260" 
        fill="none" 
        stroke={strokeNavy}
        strokeWidth="1.2" 
        strokeDasharray="4 4"
      />
      <path 
        d="M-50,340 C250,280 500,460 780,370 C1060,280 1280,420 1500,340" 
        fill="none" 
        stroke={strokeGold} 
        strokeWidth="1.2" 
      />
      <path 
        d="M-50,420 C300,360 600,520 850,440 C1100,360 1320,490 1500,420" 
        fill="none" 
        stroke={strokeNavy} 
        strokeWidth="1.5" 
      />
      <path 
        d="M-50,500 C350,430 650,580 920,510 C1190,440 1380,550 1500,500" 
        fill="none" 
        stroke={strokeSubtle} 
        strokeWidth="1" 
      />
      <path 
        d="M-50,580 C400,510 720,640 1000,570 C1280,500 1420,600 1500,580" 
        fill="none" 
        stroke={strokeGold} 
        strokeWidth="1" 
        strokeDasharray="6 3"
      />
      <path 
        d="M-50,660 C450,580 780,700 1080,630 C1380,560 1450,650 1500,660" 
        fill="none" 
        stroke={strokeSubtle} 
        strokeWidth="1" 
      />
    </svg>
  );
};

export const TechnicalCrosshair: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`relative flex items-center justify-center w-8 h-8 pointer-events-none text-[#D5A33D]/60 ${className}`}>
      <div className="absolute w-full h-[1px] bg-current"></div>
      <div className="absolute h-full w-[1px] bg-current"></div>
      <div className="w-4 h-4 rounded-full border border-current"></div>
    </div>
  );
};
