import React, { useRef, useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Maximize2, 
  X, 
  Film, 
  ExternalLink,
  Download,
  AlertCircle
} from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title?: string;
  description?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoUrl,
  title = "Vidéo Opérationnelle de Démonstration Terrain",
  description = "Présentation pratique des instruments et levés topographiques · UIDT UFR SI"
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      setHasError(false);
      setIsPlaying(false);
      // Petite temporisation pour assurer le montage DOM avant tentative de lecture
      const timer = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play()
            .then(() => setIsPlaying(true))
            .catch((err) => {
              console.log("Lecture automatique avec son bloquée par le navigateur, passage en manuel :", err);
              setIsPlaying(false);
            });
        }
      }, 250);
      return () => clearTimeout(timer);
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => {
          console.error("Erreur de lecture :", err);
          setHasError(true);
          setErrorMessage("Impossible de démarrer la lecture automatique. Cliquez sur 'Ouvrir en plein écran' ou utilisez le lecteur natif ci-dessous.");
        });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleRestart = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play()
      .then(() => setIsPlaying(true))
      .catch(() => {});
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen().catch(() => {});
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl w-full bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-3.5 sm:p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-white">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400 shrink-0">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold font-mono text-sky-300 uppercase tracking-wide">
                {title}
              </h3>
              <p className="text-[11px] text-slate-400 truncate max-w-xs sm:max-w-md">
                {description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-300 text-xs font-mono transition-colors"
              title="Ouvrir le fichier vidéo MP4 directement"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Ouvrir en plein écran</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Fermer la vidéo"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Player Box */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center group overflow-hidden">
          <video
            ref={videoRef}
            playsInline
            controls
            preload="auto"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onError={(e) => {
              console.error("Erreur de chargement vidéo :", e);
              setHasError(true);
              setErrorMessage("Le format vidéo n'a pas pu être prévisualisé directement par votre navigateur. Vous pouvez l'ouvrir ou la télécharger ci-dessous.");
            }}
            className="w-full h-full object-contain"
          >
            <source src={videoUrl} type="video/mp4" />
            Votre navigateur ne supporte pas la balise vidéo HTML5.
          </video>

          {/* Fallback Overlay if Error */}
          {hasError && (
            <div className="absolute inset-0 bg-slate-900/90 flex flex-col items-center justify-center p-6 text-center text-white space-y-3 z-20">
              <AlertCircle className="w-10 h-10 text-amber-400" />
              <p className="text-sm font-medium text-slate-200 max-w-md">
                {errorMessage}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <a
                  href={videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Ouvrir dans un nouvel onglet</span>
                </a>
                <a
                  href={videoUrl}
                  download="Demonstration_Topographie_Brice_PLEI.mp4"
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 border border-slate-700"
                >
                  <Download className="w-4 h-4" />
                  <span>Télécharger la vidéo</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Player Controls Bar */}
        <div className="p-3 sm:p-4 bg-slate-950 text-xs font-mono text-slate-300 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={togglePlay}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold transition-colors cursor-pointer"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isPlaying ? 'Pause' : 'Lire'}</span>
            </button>

            <button
              type="button"
              onClick={handleRestart}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Recommencer depuis le début"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={toggleMute}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title={isMuted ? "Activer le son" : "Couper le son"}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-amber-400" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-300 text-xs transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Ouvrir en plein écran</span>
            </a>

            <button
              type="button"
              onClick={handleFullscreen}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Plein écran"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
