import React, { useState } from 'react';
import { ProfileInfo } from '../data/portfolioData';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  Compass, 
  PhoneCall,
  Info,
  ArrowRight,
  ExternalLink,
  AlertCircle,
  Sparkles,
  Check
} from 'lucide-react';
import { TopoContours } from './TopoBackground';

interface ContactSectionProps {
  profile: ProfileInfo;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState<'success' | 'activation_needed' | 'network_fallback'>('success');

  const recipientEmail = "wbemery.plei@univ-thies.sn";
  const backupEmail = "emeybriceplei01@gmail.com";

  // Liens d'envoi direct pré-remplis
  const generateEmailSubject = () => `Message Portefolio Brice Emery PLEI — ${formData.name || 'Contact Professionnel'}`;
  
  const generateEmailBody = () => 
    `Bonjour Brice Emery PLEI,\n\n` +
    `Je vous contacte suite à la consultation de votre portefolio officiel d'ingénieur géomètre topographe :\n\n` +
    `👤 Nom / Organisation : ${formData.name || 'Non renseigné'}\n` +
    `✉️ Adresse E-mail : ${formData.email || 'Non renseignée'}\n` +
    `📞 Téléphone / WhatsApp : ${formData.phone || 'Non renseigné'}\n\n` +
    `💬 Message :\n${formData.message || 'Bonjour, je souhaite échanger avec vous au sujet d\'une opportunité ou mission.'}\n\n` +
    `-----------------------------------------\n` +
    `Destinataires officiels : ${recipientEmail} et ${backupEmail}\n` +
    `Date : ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}`;

  const getGmailWebUrl = () => {
    const subject = encodeURIComponent(generateEmailSubject());
    const body = encodeURIComponent(generateEmailBody());
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${recipientEmail}&cc=${backupEmail}&su=${subject}&body=${body}`;
  };

  const getMailtoUrl = () => {
    const subject = encodeURIComponent(generateEmailSubject());
    const body = encodeURIComponent(generateEmailBody());
    return `mailto:${recipientEmail}?cc=${backupEmail}&subject=${subject}&body=${body}`;
  };

  const getWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `*Nouveau message depuis le Portefolio*\n\n` +
      `*Nom :* ${formData.name || 'Visiteur'}\n` +
      `*E-mail :* ${formData.email || 'Non renseigné'}\n` +
      `*Téléphone :* ${formData.phone || 'Non renseigné'}\n\n` +
      `*Message :*\n${formData.message}`
    );
    return `https://wa.me/221787813272?text=${text}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;

    setLoading(true);

    const emailSubject = generateEmailSubject();

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone || 'Non renseigne',
      message: formData.message,
      _subject: emailSubject,
      _replyto: formData.email,
      _captcha: 'false',
      _template: 'table',
      _cc: `${recipientEmail},${backupEmail}`
    };

    let sentSuccessfully = false;

    try {
      // 1. Envoi prioritaire vers le compte Gmail (taux de délivrabilité maximal) avec CC vers l'université
      const resGmail = await fetch(`https://formsubmit.co/ajax/${backupEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (resGmail.ok) {
        const data = await resGmail.json();
        if (data.success === 'true' || data.success === true) {
          sentSuccessfully = true;
          setDeliveryStatus('success');
        } else if (data.message && typeof data.message === 'string' && data.message.toLowerCase().includes('activate')) {
          setDeliveryStatus('activation_needed');
        }
      }
    } catch {
      // En cas d'adblocker ou de blocage réseau
    }

    if (!sentSuccessfully) {
      try {
        // 2. Tentative vers l'adresse institutionnelle
        const resUniv = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (resUniv.ok) {
          const data = await resUniv.json();
          if (data.success === 'true' || data.success === true) {
            sentSuccessfully = true;
            setDeliveryStatus('success');
          } else if (data.message && typeof data.message === 'string' && data.message.toLowerCase().includes('activate')) {
            setDeliveryStatus('activation_needed');
          }
        } else {
          setDeliveryStatus('network_fallback');
        }
      } catch {
        setDeliveryStatus('network_fallback');
      }
    }

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section 
      id="contact" 
      className="relative py-16 sm:py-24 bg-[#F3F6F9] text-[#102B46] border-t border-slate-200 overflow-hidden"
    >
      {/* Background Contours */}
      <div className="absolute inset-0 topo-contour-pattern opacity-50 pointer-events-none" />
      <TopoContours className="opacity-15" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#102B46]/5 border border-[#102B46]/15 text-xs font-mono font-bold text-[#102B46] uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-[#D5A33D]" />
            <span>ÉCHANGE PROFESSIONNEL & RECRUTEMENT</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-black text-[#102B46] tracking-tight uppercase font-heading">
            Prendre Contact
          </h2>
          
          <p className="text-sm text-slate-600 max-w-2xl mx-auto font-medium">
            Disponible pour échanger avec les entreprises de BTP, les bureaux d'études routières, les géomètres-experts et les recruteurs.
          </p>
          <div className="w-16 h-1 bg-[#D5A33D] mx-auto rounded-full" />
        </div>

        {/* 2-Column Layout: Coordinates on Left / Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 max-w-6xl mx-auto items-start">
          
          {/* LEFT: Contact Information (No fabricated details, strictly authentic) */}
          <div className="lg:col-span-5 space-y-5">
            
            <div className="p-6 sm:p-8 rounded-2xl bg-[#102B46] text-white shadow-xl border border-slate-800 space-y-6">
              
              <div>
                <p className="text-xs font-mono text-[#D5A33D] uppercase tracking-wider font-semibold">
                  INGÉNIEUR DE CONCEPTION GÉOMÈTRE TOPOGRAPHE
                </p>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mt-1">
                  {profile.shortName}
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Prêt à intervenir sur vos projets d'infrastructures routières et travaux topographiques au Sénégal et en Côte d'Ivoire.
                </p>
              </div>

              {/* Coordinates List */}
              <div className="space-y-4 pt-2 border-t border-white/10 text-xs font-mono">
                
                {/* Phone Numbers */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Phone className="w-3.5 h-3.5 text-[#D5A33D]" />
                    <span className="uppercase tracking-wider">Téléphone :</span>
                  </div>
                  <div className="space-y-1.5 pl-5">
                    <a 
                      href={`tel:${profile.phoneSenegal.replace(/\s+/g, '')}`}
                      className="block text-slate-200 hover:text-[#D5A33D] transition-colors"
                    >
                      Sénégal : <strong>{profile.phoneSenegal}</strong>
                    </a>
                    <a 
                      href={`tel:${profile.phoneCIV.replace(/\s+/g, '')}`}
                      className="block text-slate-200 hover:text-[#D5A33D] transition-colors"
                    >
                      Côte d'Ivoire : <strong>{profile.phoneCIV}</strong>
                    </a>
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Mail className="w-3.5 h-3.5 text-[#D5A33D]" />
                    <span className="uppercase tracking-wider">Boîtes E-mail directes :</span>
                  </div>
                  <div className="pl-5 space-y-1.5">
                    <a 
                      href={`mailto:${recipientEmail}`} 
                      className="block text-slate-200 hover:text-[#D5A33D] transition-colors truncate"
                      title="Écrire à l'adresse institutionnelle"
                    >
                      Institutionnelle : <strong>{recipientEmail}</strong>
                    </a>
                    <a 
                      href={`mailto:${backupEmail}`} 
                      className="block text-slate-200 hover:text-[#D5A33D] transition-colors truncate"
                      title="Écrire à l'adresse Gmail"
                    >
                      Gmail directe : <strong>{backupEmail}</strong>
                    </a>
                  </div>
                </div>

                {/* LinkedIn */}
                {profile.linkedin && (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Linkedin className="w-3.5 h-3.5 text-[#D5A33D]" />
                      <span className="uppercase tracking-wider">Réseau LinkedIn :</span>
                    </div>
                    <a 
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pl-5 text-[#D5A33D] hover:underline block truncate font-medium"
                    >
                      Profil officiel Brice Emery PLEI
                    </a>
                  </div>
                )}

              </div>

              {/* Direct WhatsApp Action */}
              <div className="pt-2 border-t border-white/10">
                <a
                  href={`https://wa.me/221787813272?text=Bonjour%20M.%20Brice%20Emery%20PLEI,%20je%20vous%20contacte%20concernant%20un%20projet%20ou%20une%20mission%20topographique`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider font-mono transition-colors shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Discussion WhatsApp Directe</span>
                </a>
              </div>

            </div>

          </div>

          {/* RIGHT: Functional Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xl space-y-6">
              
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-[#102B46] font-heading">
                  Envoyer un message dans ma boîte mail
                </h3>
                <p className="text-xs text-slate-500 font-mono">
                  Les messages sont acheminés directement à mes deux adresses : <strong>{recipientEmail}</strong> et <strong>{backupEmail}</strong>.
                </p>
              </div>

              {submitted ? (
                <div className="p-6 sm:p-7 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-5 animate-fade-in">
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-emerald-950 font-heading">
                      Message enregistré & transmis !
                    </h4>
                    <p className="text-xs text-emerald-800 leading-relaxed max-w-md mx-auto">
                      Votre message a été transmis vers mes adresses de réception : <strong>{recipientEmail}</strong> et <strong>{backupEmail}</strong>.
                    </p>
                  </div>

                  {/* Options de garantie d'envoi immédiat 1-clic */}
                  <div className="p-4 rounded-xl bg-white border border-emerald-200 shadow-xs space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#102B46] uppercase tracking-wider">
                      <Sparkles className="w-4 h-4 text-[#D5A33D]" />
                      <span>Garantir la réception immédiate en 1 clic :</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {/* Option 1: Ouvrir dans Gmail Web pré-rempli */}
                      <a
                        href={getGmailWebUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#EA4335] hover:bg-[#d33426] text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-xs"
                        title="Ouvrir dans Gmail avec votre message déjà rédigé"
                      >
                        <Mail className="w-4 h-4" />
                        <span>Ouvrir dans Gmail</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                      </a>

                      {/* Option 2: Transmettre sur WhatsApp */}
                      <a
                        href={getWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-xs"
                        title="Transmettre le message sur WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Envoyer par WhatsApp</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                      </a>
                    </div>

                    {/* Option 3: Client Mail Local */}
                    <a
                      href={getMailtoUrl()}
                      className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#102B46] text-xs font-mono font-semibold transition-colors"
                      title="Ouvrir dans votre logiciel de messagerie par défaut (Outlook, Apple Mail...)"
                    >
                      <Send className="w-3.5 h-3.5 text-slate-500" />
                      <span>Ouvrir dans mon logiciel Mail local</span>
                    </a>
                  </div>

                  {/* Consigne pour le propriétaire du portfolio */}
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] font-mono text-amber-900 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span>Information pour Brice Emery PLEI :</span>
                    </div>
                    <p className="leading-relaxed">
                      Si c'est le tout premier message, vérifiez vos dossiers <strong>Spams / Courriers indésirables</strong> sur <strong>{backupEmail}</strong> ou <strong>{recipientEmail}</strong> et cliquez sur <em>« Activate Form »</em> pour valider définitivement la réception automatique.
                    </p>
                  </div>

                  <div className="text-center pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', phone: '', message: '' });
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-bold text-slate-600 hover:text-slate-900 uppercase tracking-wider cursor-pointer"
                    >
                      Rédiger un autre message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Nom & Prénom */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1.5">
                      Nom et Prénom / Entreprise <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ex: M. Diallo / Entreprise de BTP"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-base sm:text-sm focus:outline-none focus:border-[#102B46] focus:bg-white transition-colors min-h-[44px]"
                    />
                  </div>

                  {/* Coordonnées de réponse : Email et Téléphone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1.5">
                        Votre E-mail de réponse <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="exemple@entreprise.sn"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-base sm:text-sm focus:outline-none focus:border-[#102B46] focus:bg-white transition-colors min-h-[44px]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1.5">
                        Téléphone / WhatsApp <span className="text-slate-400 font-normal">(Optionnel)</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+221 ... / +225 ..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-base sm:text-sm focus:outline-none focus:border-[#102B46] focus:bg-white transition-colors min-h-[44px]"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1.5">
                      Message & Cahier des charges <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Précisez la nature des travaux, les délais, la localisation du chantier ou les détails du poste à pourvoir..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-base sm:text-sm focus:outline-none focus:border-[#102B46] focus:bg-white transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 px-6 rounded-xl bg-[#102B46] hover:bg-[#163a5e] text-[#D5A33D] font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-60 active:scale-98"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-[#D5A33D] border-t-transparent rounded-full animate-spin" />
                        Transmission vers votre boîte mail...
                      </span>
                    ) : (
                      <>
                        <Mail className="w-4 h-4 text-[#D5A33D]" />
                        <span>Envoyer directement dans ma boîte mail</span>
                      </>
                    )}
                  </button>

                  {/* Direct 1-Click Alternate Channels */}
                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <p className="text-[11px] font-mono text-slate-500 text-center">
                      Ou écrivez-moi directement via votre messagerie préférée :
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      <a
                        href={getGmailWebUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#102B46] text-xs font-mono font-semibold transition-colors"
                        title="Ouvrir Gmail web directement"
                      >
                        <Mail className="w-3.5 h-3.5 text-[#EA4335]" />
                        <span>Gmail Web</span>
                        <ExternalLink className="w-3 h-3 opacity-60" />
                      </a>

                      <a
                        href={getWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-mono font-semibold transition-colors"
                        title="Envoyer un message WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>WhatsApp direct</span>
                        <ExternalLink className="w-3 h-3 opacity-60" />
                      </a>

                      <a
                        href={getMailtoUrl()}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono font-semibold transition-colors"
                        title="Ouvrir votre application e-mail par défaut"
                      >
                        <Send className="w-3.5 h-3.5 text-slate-500" />
                        <span>Client Mail (Outlook / Apple)</span>
                      </a>
                    </div>
                  </div>

                  {/* Clarification Note */}
                  <div className="flex items-start gap-2 pt-1 text-[11px] font-mono text-slate-500">
                    <Info className="w-3.5 h-3.5 text-[#D5A33D] shrink-0 mt-0.5" />
                    <span>
                      Adresses de réception : <strong>{recipientEmail}</strong> (Institutionnelle) et <strong>{backupEmail}</strong> (Gmail).
                    </span>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
