/**
 * Gestion du téléchargement et de la consultation du CV officiel de Brice Emery PLEI
 * CV PDF hébergé: /assets/aistudio/CV_BRICE_PLEI___1__2c02c888.pdf
 */

export const CV_PDF_URL = "/assets/aistudio/CV_BRICE_PLEI___1__2c02c888.pdf";
export const CV_FILENAME = "CV_Brice_Emery_PLEI_Ingenieur_Topographe.pdf";

export const BRICE_WHATSAPP_NUMBER = '221787813272';
export const WHATSAPP_CONTACT_MESSAGE = "Bonjour M. Brice Emery PLEI, je vous contacte concernant une opportunité professionnelle ou un projet topographique.";
export const WHATSAPP_CONTACT_URL = `https://wa.me/${BRICE_WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_CONTACT_MESSAGE)}`;

export const CV_WHATSAPP_MESSAGE = "J'ai vu votre portefolio et je suis intéressé par votre CV.";
export const CV_WHATSAPP_URL = `https://wa.me/${BRICE_WHATSAPP_NUMBER}?text=${encodeURIComponent(CV_WHATSAPP_MESSAGE)}`;

/**
 * Téléchargement direct du fichier PDF du CV dans le navigateur (mobile et bureau)
 */
export const downloadCvPdf = (
  url: string = CV_PDF_URL,
  filename: string = CV_FILENAME
): boolean => {
  try {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  } catch (err) {
    console.error('Erreur lors du téléchargement du CV:', err);
    window.open(url, '_blank', 'noopener,noreferrer');
    return false;
  }
};

/**
 * Ouvrir le CV PDF dans un nouvel onglet
 */
export const openCvInNewTab = (url: string = CV_PDF_URL): void => {
  window.open(url, '_blank', 'noopener,noreferrer');
};
