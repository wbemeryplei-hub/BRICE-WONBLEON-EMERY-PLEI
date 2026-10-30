import React, { useState } from 'react';
import { ProfileInfo } from '../data/portfolioData';
import { X, Copy, Check, RefreshCw, Info } from 'lucide-react';

interface DataCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileInfo;
  onUpdateProfile: (updated: Partial<ProfileInfo>) => void;
  onResetDefaults: () => void;
}

export const DataCustomizerModal: React.FC<DataCustomizerModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile,
  onResetDefaults,
}) => {
  const [copied, setCopied] = useState(false);
  const [localBio, setLocalBio] = useState(profile.descriptionBio.join('\n\n'));
  const [localTagline, setLocalTagline] = useState(profile.tagline);
  const [localEmail, setLocalEmail] = useState(profile.email);
  const [localPhoneSenegal, setLocalPhoneSenegal] = useState(profile.phoneSenegal);
  const [localPhoneCIV, setLocalPhoneCIV] = useState(profile.phoneCIV);
  const [localLocation, setLocalLocation] = useState(profile.location);

  if (!isOpen) return null;

  const handleApply = () => {
    onUpdateProfile({
      tagline: localTagline,
      descriptionBio: localBio.split('\n\n').filter(p => p.trim().length > 0),
      email: localEmail,
      phoneSenegal: localPhoneSenegal,
      phoneCIV: localPhoneCIV,
      location: localLocation,
    });
    onClose();
  };

  const copyPromptTemplate = () => {
    const template = `Voici mes informations à insérer dans mon portfolio :

1. À PROPOS :
- Titre : ${profile.professionalTitle}
- Nom : ${profile.fullName}
- Slogan / Tagline : ${localTagline}
- Description / Bio :
${localBio}

2. CONTACT :
- Email : ${localEmail}
- Téléphone Sénégal : ${localPhoneSenegal}
- Téléphone Côte d'Ivoire : ${localPhoneCIV}
- Coordonnées géodésiques : ${profile.coordinates}

3. NOUVEAUX PROJETS OU ÉVOLUTIONS À AJOUTER :
[Ajoutez vos projets, dates, matériels et précisions ici]

4. PARCOURS ACADÉMIQUE OU CERTIFICATIONS SUPPLÉMENTAIRES :
[Indiquez vos diplômes et mentions récents]`;

    navigator.clipboard.writeText(template);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border border-slate-300 rounded-2xl shadow-2xl overflow-hidden my-6">
        
        {/* Header */}
        <div className="p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <h3 className="text-base font-bold text-slate-900 font-heading">
              Espace Informations & Personnalisation
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info banner */}
        <div className="p-4 bg-amber-50 border-b border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>
            Le design et l'architecture complète sont prêts en thème blanc et gris. Vous pouvez tester des modifications rapides ici, ou cliquer sur <strong>"Copier le modèle de texte"</strong> pour m'envoyer vos textes dans le chat au fur et à mesure !
          </span>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto text-xs font-mono">
          
          <div>
            <label className="block text-slate-700 uppercase mb-1 font-bold">
              Nom Officiel (Fixé)
            </label>
            <input
              type="text"
              disabled
              value={profile.fullName}
              className="w-full px-3 py-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 cursor-not-allowed font-semibold"
            />
          </div>

          <div>
            <label className="block text-slate-700 uppercase mb-1 font-bold">
              Titre Professionnel (Fixé)
            </label>
            <input
              type="text"
              disabled
              value={profile.professionalTitle}
              className="w-full px-3 py-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 cursor-not-allowed font-semibold"
            />
          </div>

          <div>
            <label className="block text-slate-700 uppercase mb-1 font-bold">
              Phrase d'accroche (Tagline)
            </label>
            <input
              type="text"
              value={localTagline}
              onChange={(e) => setLocalTagline(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-slate-700 uppercase mb-1 font-bold">
              Description / Bio (séparez les paragraphes par une ligne vide)
            </label>
            <textarea
              rows={6}
              value={localBio}
              onChange={(e) => setLocalBio(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 font-sans text-xs focus:border-amber-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-700 uppercase mb-1 font-bold">
                Email
              </label>
              <input
                type="email"
                value={localEmail}
                onChange={(e) => setLocalEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-slate-700 uppercase mb-1 font-bold">
                Tél. Sénégal
              </label>
              <input
                type="text"
                value={localPhoneSenegal}
                onChange={(e) => setLocalPhoneSenegal(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-slate-700 uppercase mb-1 font-bold">
                Tél. Côte d'Ivoire
              </label>
              <input
                type="text"
                value={localPhoneCIV}
                onChange={(e) => setLocalPhoneCIV(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 focus:border-amber-500"
              />
            </div>
          </div>

        </div>

        {/* Footer actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={copyPromptTemplate}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors shadow-2xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
              <span>{copied ? "Modèle Copié !" : "Copier modèle pour le chat"}</span>
            </button>
            <button
              type="button"
              onClick={onResetDefaults}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 text-xs transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Réinitialiser</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 text-xs"
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
            >
              Appliquer à la vue
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
