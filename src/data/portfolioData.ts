export interface ProfileInfo {
  fullName: string;
  shortName: string;
  professionalTitle: string;
  tagline: string;
  heroPresentation: string;
  motivationStatement: string;
  descriptionBio: string[];
  photoUrl: string;
  photoSecondaryUrl?: string;
  videoUrl?: string;
  cvPdfUrl: string;
  coordinates: string;
  location: string;
  email: string;
  secondaryEmail: string;
  phoneSenegal: string;
  phoneCIV: string;
  whatsapp: string;
  linkedin: string;
  availability: string;
}

export interface TechnicalSkill {
  id: string;
  title: string;
  description: string;
  iconName: string;
  category: 'terrain' | 'calcul' | 'bureau' | 'materiel';
  tags: string[];
}

export interface SoftwareEquipmentItem {
  id: string;
  name: string;
  category: 'logiciel' | 'equipement';
  description: string;
  level: number; // 0 to 100
  brand?: string;
  precision?: string;
  iconName: string;
}

export interface SoftwareLogoItem {
  id: string;
  name: string;
  category: string;
  logoUrl: string;
}

export interface SoftwareCompetence {
  id: string;
  name: string;
  category: string;
  logoUrl: string;
  purpose: string; // Ce dont j'ai utilisé le logiciel pour faire
  methodology: string; // Méthodologie
  results: string; // Résultats obtenus
  tags: string[];
}

export interface TerrainPhoto {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  location: string;
  equipment: string;
  precision: string;
}

export interface KeySubject {
  domain: string;
  desc: string;
}

export interface SemesterModule {
  semester: string;
  title: string;
  courses: string[];
}

export interface AcademicStep {
  period: string;
  diploma: string;
  institution: string;
  location: string;
  details: string;
  highlights: string[];
  logoUrl?: string;
  websiteUrl?: string;
  keySubjects?: KeySubject[];
  semesterModules?: SemesterModule[];
}

export interface ExperienceItem {
  id: string;
  type: 'pfe' | 'universitaire' | 'professionnel';
  role: string;
  organization: string;
  period: string;
  location: string;
  category: 'drone-lidar' | 'ouvrages-art' | 'amenagement' | 'bureau-etudes' | 'foncier-sig' | 'chantier-btp';
  categoryLabel: string;
  mission: string;
  details: string[];
  toolsUsed: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  client: string;
  year: string;
  location: string;
  precision: string;
  imageUrl: string;
  description: string;
  tasks: string[];
  equipment: string[];
  software: string[];
  deliverables: string[];
  isDemo?: boolean;
  externalLink?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: string;
  credentialId: string;
  imageUrl: string;
  tools: string[];
  description: string;
  competencies: string[];
}

export interface SoftwareCategory {
  category: string;
  iconName: string;
  tools: { name: string; description: string; level: number }[];
}


export const initialProfileData: ProfileInfo = {
  fullName: "Plei wonbleon brice emery",
  shortName: "Brice Emery PLEI",
  professionalTitle: "Ingénieur de Conception Géomètre Topographe",
  tagline: "La précision topographique au service des infrastructures routières.",
  heroPresentation: "Professionnel motivé, rigoureux et engagé, je mets mes compétences techniques et de terrain au service des projets de topographie, d'infrastructure et d'aménagement, tout en continuant d'apprendre afin de participer activement au développement de l'entreprise et à la réussite de chaque mission.",
  motivationStatement: "Je suis disposé à mettre mes compétences au service de vos projets d'infrastructures et de topographie et à continuer d'apprendre afin de contribuer efficacement à la réalisation de vos travaux. Rigoureux, motivé et ouvert aux échanges professionnels, je reste disponible pour tout entretien permettant de discuter de mes compétences et de ma contribution à vos projets.",
  descriptionBio: [
    "Ingénieur de conception géomètre-topographe, diplômé de l’UFR Sciences de l’Ingénieur de l’UIDT de Thiès (Sénégal) et issu de l’ESBTP après avoir obtenu mon Baccalauréat au Lycée Scientifique de Yamoussoukro (Côte d’Ivoire), je me consacre avec passion aux travaux topographiques et au traitement des données géospatiales.",
    "Mon parcours m’a permis de réaliser des interventions techniques variées en topographie et géodésie : implantation de bâtiments et d’axes routiers, canevas géodésiques GNSS statiques et suivi topographique de chantiers. J’ai également développé des compétences en traitement de données LiDAR par drone DJI Matrice 300 RTK, en photogrammétrie, en SIG et en production de données géospatiales. Mon projet de fin d’études portait sur l’amélioration de la qualité géométrique des données LiDAR aéroportées, à travers l’optimisation des paramètres de traitement et l’ajustement interbandes multi-logiciels.",
    "Rigoureux, méthodique et attentif aux moindres tolérances, j’allie l'agilité opérationnelle de terrain à la rigueur des calculs de bureau. Je m’engage avec sérieux et esprit d’équipe à contribuer à des projets d’infrastructures fiables et durables."
  ],
  photoUrl: "/assets/aistudio/WhatsApp_Image_2026-10-22_at_22.08.57_a7d00c37.jpeg",
  photoSecondaryUrl: "/assets/aistudio/WhatsApp_Image_2026-10-22_at_22.08.58_49ac1935.jpeg",
  cvPdfUrl: "/assets/aistudio/CV_BRICE_PLEI___1__2c02c888.pdf",
  coordinates: "14°47'28.5\"N 16°55'44.2\"W · Réf. WGS84 / UTM 28N",
  location: "Thiès / Dakar (Sénégal) & Abidjan / Bonoua (Côte d'Ivoire)",
  email: "wbemery.plei@univ-thies.sn",
  secondaryEmail: "emeybriceplei01@gmail.com",
  phoneSenegal: "+221 78 781 32 72",
  phoneCIV: "+225 01 00 55 86 70",
  whatsapp: "+221787813272",
  linkedin: "https://www.linkedin.com/in/brice-emery-plei-379b0422a",
  availability: "Disponible immédiatement pour projets d'infrastructures, missions BTP & bureaux d'études"
};

// 9 Compétences Techniques demandées explicitement dans le prompt (Section 5)
export const technicalSkillsList: TechnicalSkill[] = [
  {
    id: "tech-1",
    title: "Levés topographiques",
    description: "Levés de corps de rue, d'état des lieux, d'assiettes de terrassement et détails d'infrastructures par tachéométrie et GNSS RTK centimétrique.",
    iconName: "Compass",
    category: "terrain",
    tags: ["Tachéométrie", "GNSS RTK", "Levé de détails", "MNT"]
  },
  {
    id: "tech-2",
    title: "Implantation des axes routiers",
    description: "Piquetage d'axes en plan, alignements droits, courbes circulaires, raccordements progressifs (clothoïdes) et repérage des entrées en terre.",
    iconName: "GitCommit",
    category: "terrain",
    tags: ["Piquetage d'axe", "Clothoïdes", "Bornage", "Déports"]
  },
  {
    id: "tech-3",
    title: "Nivellement et contrôle altimétrique",
    description: "Cheminements de nivellement géométrique de précision, rattachement aux repères de nivellement officiel (NGF/IGN) et contrôle des tolérances Z.",
    iconName: "TrendingUp",
    category: "terrain",
    tags: ["Nivellement direct", "Tolérances Z", "Mires invar", "Bornes NGF"]
  },
  {
    id: "tech-4",
    title: "Profils en long et en travers",
    description: "Établissement des profils en long TN et projet, profils en travers types, dévers en courbe, fossés d'assainissement et caniveaux.",
    iconName: "Layers",
    category: "calcul",
    tags: ["Profils TN / Projet", "Dévers", "Pentes", "Assainissement"]
  },
  {
    id: "tech-5",
    title: "Calculs de coordonnées et de cubatures",
    description: "Calculs de polygonales de base, VGP, cheminements encadrés, cubatures de déblais/remblais par méthode des prismes et profils en travers.",
    iconName: "Calculator",
    category: "calcul",
    tags: ["Cubatures terrassement", "Prismes", "VGP", "Polygonales"]
  },
  {
    id: "tech-6",
    title: "Suivi topographique des travaux routiers",
    description: "Contrôle d'épaisseur et de nivellement des couches de forme, fondation, base et roulement, pose de bordures et ouvrages hydrauliques.",
    iconName: "CheckCircle",
    category: "terrain",
    tags: ["Contrôle de couches", "Bordures", "Ouvrages hydrauliques", "Récolement"]
  },
  {
    id: "tech-7",
    title: "Lecture de plans techniques",
    description: "Analyse approfondie de plans de voirie, plans d'exécution d'ouvrages d'art, coupes types, profils et cahiers des clauses techniques particulières.",
    iconName: "FileText",
    category: "bureau",
    tags: ["Plans VRD", "Plans d'ouvrages", "Cahier des charges", "Coupes"]
  },
  {
    id: "tech-8",
    title: "Utilisation des équipements topographiques",
    description: "Maîtrise opérationnelle des stations totales (Leica, Trimble, CHCNAV), récepteurs GNSS bi-fréquence, niveaux numériques et optiques.",
    iconName: "Crosshair",
    category: "materiel",
    tags: ["Stations totales", "GPS / GNSS", "Niveaux numériques", "Prismes"]
  },
  {
    id: "tech-9",
    title: "Logiciels de DAO et de calcul topographique",
    description: "Conception assistée par ordinateur, modélisation routière, calculs topométriques sous AutoCAD, Covadis 17, Civil 3D et QGIS.",
    iconName: "Monitor",
    category: "bureau",
    tags: ["AutoCAD", "Covadis 17", "Civil 3D", "QGIS", "Autopiste"]
  }
];

// Banque des 12 Logiciels Topographiques & Géomatiques avec Logos Officiels Fournis
export const softwareLogosList: SoftwareLogoItem[] = [
  {
    id: "soft-autocad",
    name: "Autodesk AutoCAD",
    category: "DAO & Conception 2D/3D",
    logoUrl: "/assets/aistudio/image_2c97c130.png"
  },
  {
    id: "soft-covadis",
    name: "Covadis 17 & Autopiste",
    category: "Conception Routière & VRD",
    logoUrl: "/assets/aistudio/image_85a29157.png"
  },
  {
    id: "soft-djiterra",
    name: "DJI TERRA",
    category: "Traitement LiDAR & Drone",
    logoUrl: "/assets/aistudio/image_3a5bb697.png"
  },
  {
    id: "soft-terrasolid",
    name: "Terrasolid (TerraScan / TerraMatch)",
    category: "Ajustement LiDAR & Classification",
    logoUrl: "/assets/aistudio/image_29454c72.png"
  },
  {
    id: "soft-cloudcompare",
    name: "CloudCompare",
    category: "Contrôle Qualité & Nuages 3D",
    logoUrl: "/assets/aistudio/image_909efca1.png"
  },
  {
    id: "soft-infinity",
    name: "Leica Infinity",
    category: "Calculs Géodésiques & GNSS",
    logoUrl: "/assets/aistudio/image_197fd9ad.png"
  },
  {
    id: "soft-pix4d",
    name: "Pix4Dmapper",
    category: "Photogrammétrie Aérienne",
    logoUrl: "/assets/aistudio/image_9f2c7b5e.png"
  },
  {
    id: "soft-3dsurvey",
    name: "3Dsurvey",
    category: "Topographie Drone & Surfaces 3D",
    logoUrl: "/assets/aistudio/image_c68df9bd.png"
  },
  {
    id: "soft-qgis",
    name: "QGIS",
    category: "Système d'Information Géographique",
    logoUrl: "/assets/aistudio/image_f7e8bd4a.png"
  },
  {
    id: "soft-arcgis",
    name: "ArcGIS Pro",
    category: "Géotraitement & Cartographie Spatiale",
    logoUrl: "/assets/aistudio/image_a021c32c.png"
  },
  {
    id: "soft-globalmapper",
    name: "Global Mapper",
    category: "Conversion Géospatiale & LiDAR",
    logoUrl: "/assets/aistudio/image_a95bf5a4.png"
  },
  {
    id: "soft-metashape",
    name: "Agisoft Metashape",
    category: "Photogrammétrie Drone & 3D",
    logoUrl: "/assets/aistudio/image_a0eb8781.png"
  },
  {
    id: "soft-googleearth",
    name: "Google Earth & GEE",
    category: "Télédétection & Imagerie Satellitaire",
    logoUrl: "/assets/aistudio/image_64127037.png"
  },
  {
    id: "soft-rstudio",
    name: "RStudio",
    category: "Analyse Statistique & Contrôle Qualité",
    logoUrl: "/assets/aistudio/image_7bcb9d58.png"
  },
  {
    id: "soft-python",
    name: "Python",
    category: "Programmation & Traitement Géospatial",
    logoUrl: "/assets/python_logo.svg"
  }
];

// Compétences Logicielles structurées avec Objectif / Méthodologie / Résultats obtenus
export const softwareCompetenciesList: SoftwareCompetence[] = [
  {
    id: "comp-metashape",
    name: "AGISOFT METASHAPE",
    category: "Photogrammétrie Drone & Modélisation 3D",
    logoUrl: "/assets/aistudio/image_a0eb8781.png",
    purpose: "Traitement photogrammétrique d'images drone, aérotriangulation, génération de nuages denses 3D et orthophotoplans géoréférencés.",
    methodology: "Alignement précis des caméras, calage par cibles GCP et vérification par checkpoints, densification de nuages de points, maillage polygonal texturé et génération de MNS/MNT.",
    results: "Orthophotoplans centimétriques et modèles numériques 3D texturés de haute résolution pour plans d'aménagement et métrés de terrassement.",
    tags: ["Photogrammétrie", "Aérotriangulation", "GCP & Checkpoints", "Orthophotos", "MNS 3D"]
  },
  {
    id: "comp-djiterra",
    name: "DJI TERRA",
    category: "Traitement LiDAR Drone & Reconstruction",
    logoUrl: "/assets/aistudio/image_3a5bb697.png",
    purpose: "Traitement direct et géoréférencement des données brutes acquises par le drone DJI Matrice 300 RTK équipé du capteur LiDAR Zenmuse L1.",
    methodology: "Importation des fichiers bruts IMU, GNSS et trajectoire POS. Calage des bandes de vol, filtrage des retours d'échos multiples, reconstruction géométrique 3D et génération de nuages de points denses géoréférencés dans le système de projection UTM.",
    results: "Production de nuages de points LAS géoréférencés d'une densité supérieure à 200 pts/m², extraction de MNS et orthophotos haute résolution pour l'analyse de qualité géométrique.",
    tags: ["DJI Matrice 300 RTK", "Zenmuse L1", "Trajectoire POS", "Nuages LAS", "UTM"]
  },
  {
    id: "comp-terrasolid",
    name: "TERRASOLID (TerraScan / TerraMatch / Spatix)",
    category: "Ajustement Interbandes & Classification LiDAR",
    logoUrl: "/assets/aistudio/image_29454c72.png",
    purpose: "Réalisation du Projet de Fin d'Études portant sur l'amélioration de la qualité géométrique des données LiDAR aéroportées et l'ajustement interbandes multi-logiciels (strip adjustment).",
    methodology: "Découpage et appariement des bandes de vol sous TerraMatch. Calcul des résidus planimétriques (dX, dY) et altimétriques (dZ) entre bandes adjacentes. Correction automatique des décalages angulaires (roll, pitch, yaw) et des biais d'altitude. Classification automatisée sol / sursol / végétation / bâti sous TerraScan.",
    results: "Élimination des décalages interbandes, réduction des résidus altimétriques Z à moins de 3 cm, et génération d'un Modèle Numérique de Terrain (MNT) épuré de haute fidélité pour études d'ingénierie.",
    tags: ["TerraMatch", "TerraScan", "Strip Adjustment", "Classification Sol", "MNT Haute Fidélité"]
  },
  {
    id: "comp-covadis",
    name: "COVADIS 17 & AUTOPISTE",
    category: "Conception Géométrique Routière & VRD",
    logoUrl: "/assets/aistudio/image_85a29157.png",
    purpose: "Conception géométrique d'infrastructures routières, modélisation de surfaces MNT, établissement des profils en long/travers et calculs volumétriques de cubatures.",
    methodology: "Génération du MNT par triangulation de Delaunay. Tracé d'axe en plan avec raccordements progressifs (clothoïdes), calcul dynamique des dévers, ligne rouge projet et application des profils en travers types paramétrés. Calcul des volumes de terrassement par méthode des profils et prismes.",
    results: "Dossiers d'exécution complets, carnets de piquetage d'axe, cahiers de profils en travers cotés et métrés quantitatifs rigoureux de déblais/remblais pour chantiers de travaux publics.",
    tags: ["MNT Triangulé", "Axes en Plan", "Clothoïdes", "Profils en Long/Travers", "Cubatures Déblai/Remblai"]
  },
  {
    id: "comp-autocad",
    name: "AUTODESK AUTOCAD",
    category: "Dessin Assisté par Ordinateur (DAO) & Plans d'Exécution",
    logoUrl: "/assets/aistudio/image_2c97c130.png",
    purpose: "Élaboration de plans d'exécution topographiques, plans de récolement de voiries et réseaux divers (VRD), calage géométrique d'ouvrages d'art et mise en page normative.",
    methodology: "Exploitation méthodique des calques normalisés, intégration des coordonnées WGS84/UTM, dessin vectoriel à l'échelle, habillage cartographique et édition de cartouches normés pour tirage papier et export DWG/PDF.",
    results: "Plans topographiques d'exécution d'une grande clarté graphique, directement exploitables sur le terrain par les chefs de chantier, géomètres-experts et conducteurs de travaux.",
    tags: ["DAO 2D/3D", "Plans de Récolement", "VRD", "Calage Ouvrages d'Art", "DWG/PDF"]
  },
  {
    id: "comp-cloudcompare",
    name: "CLOUDCOMPARE",
    category: "Contrôle Qualité Géométrique 3D & Nuages de Points",
    logoUrl: "/assets/aistudio/image_909efca1.png",
    purpose: "Audit géométrique tridimensionnel et analyse statistique comparative des nuages de points LiDAR avant et après ajustement interbandes.",
    methodology: "Calcul des distances absolues et signées Cloud-to-Cloud (C2C) et Cloud-to-Mesh (C2M), calcul des écarts quadratiques moyens (RMSE), génération des courbes de distribution gaussienne et cartographie des résidus par gradients de couleurs.",
    results: "Validation statistique et graphique de l'amélioration de la qualité géométrique, prouvant l'abaissement des écarts à l'intérieur des tolérances strictes de conception routière.",
    tags: ["Cloud-to-Cloud (C2C)", "RMSE", "Histogrammes Gaussiens", "Cartographie des Résidus"]
  },
  {
    id: "comp-infinity",
    name: "LEICA INFINITY",
    category: "Calculs Géodésiques & Compensation de Réseaux GNSS",
    logoUrl: "/assets/aistudio/image_197fd9ad.png",
    purpose: "Traitement des observations GNSS statiques et compensation des réseaux géodésiques d'appui (projet de réaménagement urbain Lat Dior à Thiès).",
    methodology: "Import des données brutes RINEX, calcul des vecteurs de lignes de base GNSS, détection et résolution des ambiguïtés de phase, compensation par les moindres carrés en réseau libre et contraint.",
    results: "Canevas géodésique de haute stabilité avec coordonnées fermées à une précision sub-centimétrique, assurant un rattachement spatial rigoureux pour tous les travaux d'infrastructure.",
    tags: ["Lignes de Base GNSS", "Fichiers RINEX", "Moindres Carrés", "Ellipses d'Erreur"]
  },
  {
    id: "comp-pix4d-3dsurvey",
    name: "PIX4D & 3DSURVEY",
    category: "Photogrammétrie Drone & Surfaces 3D",
    logoUrl: "/assets/aistudio/image_9f2c7b5e.png",
    purpose: "Traitement photogrammétrique d'images drone pour relevés d'état des lieux, cartographie de précision et calculs volumétriques d'excavation.",
    methodology: "Aérotriangulation par points homologues, intégration des points de calage (GCP) et de contrôle (Checkpoints) relevés au GNSS RTK, génération de nuages denses, maillages texturés et MNS.",
    results: "Orthophotoplans géoréférencés haute résolution (GSD < 2 cm/pixel), Modèles Numériques de Surface et bilans de cubatures vérifiés avec rigueur.",
    tags: ["Aérotriangulation", "GCP & Checkpoints", "Orthophotos", "MNS 3D", "Cubatures"]
  },
  {
    id: "comp-qgis-arcgis",
    name: "QGIS & ARCGIS PRO",
    category: "Systèmes d'Information Géographique (SIG)",
    logoUrl: "/assets/aistudio/image_f7e8bd4a.png",
    purpose: "Structuration de géodatabases spatiales, analyses de superposition raster/vecteur, géotraitements thématiques et cartographie d'aménagement territorial.",
    methodology: "Création et gestion de géodatabases, reprojection cartographique à la volée, calculs de bassins versants et pentes, intégration d'enquêtes géoréférencées KoboToolbox et sémiologie graphique appliquée.",
    results: "Production de cartes d'aménagement urbain et de couches SIG interactives d'aide à la décision pour la planification d'infrastructures.",
    tags: ["Géodatabases", "Géotraitement Raster/Vecteur", "Bassins Versants", "KoboToolbox"]
  },
  {
    id: "comp-globalmapper",
    name: "GLOBAL MAPPER PRO",
    category: "Conversion Géospatiale & Traitement d'Élévation",
    logoUrl: "/assets/aistudio/image_a95bf5a4.png",
    purpose: "Interopérabilité multi-formats, conversion de projections cartographiques et contrôle rapide des profils d'élévation MNT/LiDAR.",
    methodology: "Import/export croisé de nuages LiDAR (LAS/LAZ), rasters géoTIFF et vecteurs DXF/SHP, reprojection dynamique et extraction automatique de courbes de niveau.",
    results: "Génération rapide de profils en travers préliminaires et synchronisation fluide entre les flux de données drone, CAO et SIG sans déformation spatiale.",
    tags: ["Conversion Formats", "Reprojection Cartographique", "Courbes de Niveau", "LAS/LAZ/GeoTIFF"]
  },
  {
    id: "comp-googleearth",
    name: "GOOGLE EARTH & GOOGLE EARTH ENGINE (GEE)",
    category: "Télédétection & Imagerie Satellitaire",
    logoUrl: "/assets/aistudio/image_64127037.png",
    purpose: "Reconnaissance préalable de site, planification des missions de terrain et analyse multi-temporelle d'imagerie spatiale.",
    methodology: "Exploration 3D de la topographie avant intervention, détection des contraintes de visibilité et d'accès, utilisation de scripts sous Google Earth Engine pour le suivi de zones d'aménagement.",
    results: "Optimisation du temps d'intervention sur le terrain, sécurisation des plans de vol drone et repérage précis des bornes géodésiques environnantes.",
    tags: ["Reconnaissance Terrain", "Google Earth Engine", "Séries Temporelles", "Modélisation 3D"]
  }
];

// Logiciels et Équipements demandés explicitement (Section 6)
export const softwareEquipmentList: SoftwareEquipmentItem[] = [
  {
    id: "eq-autocad",
    name: "AutoCAD",
    category: "logiciel",
    description: "Dessin assisté par ordinateur 2D/3D, élaboration de plans de récolement routier, plans d'exécution et mise en page normative.",
    level: 95,
    iconName: "Cpu"
  },
  {
    id: "eq-covadis",
    name: "Covadis (v17 / Autopiste)",
    category: "logiciel",
    description: "Calculs topométriques, modélisation de MNT, conception d'axes en plan, profils en long/travers, cubatures et voiries VRD.",
    level: 96,
    iconName: "Layers"
  },
  {
    id: "eq-civil3d",
    name: "Civil 3D",
    category: "logiciel",
    description: "Modélisation géométrique des corridors routiers, calcul dynamique de dévers, surfaces de projet et réseaux d'assainissement.",
    level: 90,
    iconName: "Box"
  },
  {
    id: "eq-station-totale",
    name: "Station Totale",
    category: "equipement",
    brand: "Leica / CHCNAV / Trimble",
    precision: "Précision angulaire 1\" à 2\" · Mesure EDM sans prisme jusqu'à 1000m",
    description: "Mise en station, relèvement spatial libre, implantation d'axes au millimètre, mesures de détails et cheminements polygonaux.",
    level: 96,
    iconName: "Crosshair"
  },
  {
    id: "eq-gnss-rtk",
    name: "GPS / GNSS RTK",
    category: "equipement",
    brand: "Bi-fréquence multi-constellations",
    precision: "Centimétrique : ± 8 mm H / 15 mm V",
    description: "Positionnement cinématique en temps réel (RTK / NTRIP), observations géodésiques statiques de longue durée et calculs PPP.",
    level: 95,
    iconName: "Satellite"
  },
  {
    id: "eq-niveau",
    name: "Niveau Automatique & Numérique",
    category: "equipement",
    brand: "Optique & Numérique avec mires à code-barres",
    precision: "Écart type au km : ± 0.3 mm à 1.5 mm",
    description: "Nivellement direct fermé, contrôle des cotes de seuils, profils en travers hydrauliques et calage altimétrique NGF des repères.",
    level: 94,
    iconName: "Gauge"
  }
];

export const academicCurriculum: AcademicStep[] = [
  {
    period: "2024 – 2026",
    diploma: "INGÉNIEUR DE CONCEPTION Géomètre Topographe (Master GTP)",
    institution: "UFRSI — Université Iba Der Thiam de Thiès (UIDT)",
    location: "Thiès, Sénégal",
    logoUrl: "/assets/aistudio/image_4141da06.png",
    websiteUrl: "https://www.uidt.sn/",
    details: "Formation axée sur la pratique des différents matériels.",
    highlights: [
      "Pratique intensive des matériels et instruments de pointe (stations totales, GNSS bi-fréquence, LiDAR et drone)",
      "Traitement et calculs de haute précision sur logiciels spécialisés",
      "Projet de fin d'études de conception géomètre topographe"
    ],
    semesterModules: [
      {
        semester: "Semestre 7 (Master 1)",
        title: "Géodésie, GNSS & Traitement Spatial",
        courses: [
          "Géodésie et Techniques Spatiales 2",
          "GNSS Opérationnel (Statique, RTK, PPK, PPP)",
          "Photogrammétrie 2 & Aérotriangulation",
          "SIG 2 & Analyse Spatiale Avancée",
          "Télédétection 1 & Imagerie Satellitaire",
          "Calcul d’erreurs et compensation par moindres carrés 1",
          "Expertise Foncière & Gestion Cadastrale",
          "Génie Civil & VRD 1"
        ]
      },
      {
        semester: "Semestre 8 (Master 1)",
        title: "Infrastructures, DAO & Projets Topo",
        courses: [
          "Méthodes Topographiques Avancées",
          "SIG 3 & Géodatabases Relationnelles",
          "Projets de Topographie 2a & 2b (Terrain)",
          "DAO 2 (Conception d'Infrastructures & VRD)",
          "Expertise & Droit de l'Urbanisme",
          "Évaluation Immobilière & Foncière",
          "Stage d'Imprégnation Professionnelle ST1"
        ]
      },
      {
        semester: "Semestre 9 (Master 2)",
        title: "LiDAR, Haute Précision & Travaux Publics",
        courses: [
          "Laser-Radar-grammétrie (LiDAR Aéroporté & Terrestre)",
          "Télédétection 2 & Traitement Numérique de Nuages 3D",
          "Géodésie Spatiale 4 & Référentiels Mondiaux",
          "Compensation des Grands Réseaux 3",
          "Photogrammétrie & MNT 4",
          "Tracé en Travaux Publics & Modélisation Routière",
          "Réorganisation Foncière & Hydraulique Appliquée",
          "Management de Projet & Éthique Professionnelle"
        ]
      },
      {
        semester: "Semestre 10 (Master 2)",
        title: "Projet de Fin d'Études & Soutenance",
        courses: [
          "PFE d'Ingénieur (600h de recherche et développement opérationnel)",
          "Stage professionnel d'ingénieur en entreprise (Cabinet XYZ)",
          "Soutenance officielle du diplôme d'Ingénieur de Conception devant jury"
        ]
      }
    ],
    keySubjects: [
      { domain: "LiDAR & Photogrammétrie Drone", desc: "Acquisition DJI Matrice 300, nuages LAS, filtrage, classification et ajustement inter-bandes" },
      { domain: "Conception Routière & VRD", desc: "Tracés en plan, profils en long/travers, axes, cubatures et terrassements sous Covadis/AutoCAD" },
      { domain: "Géodésie & Moindres Carrés", desc: "Compensation de réseaux, calculs de résidus et transformation de coordonnées WGS84/UTM" },
      { domain: "Ouvrages d'Art", desc: "Études préparatoires, contraintes techniques, implantation et suivi de culées et appuis" },
      { domain: "SIG & Foncier", desc: "Géodatabases spatiales, expertise foncière, droit de l'urbanisme et aménagements urbains" },
      { domain: "Contrôle Qualité & Précision", desc: "Analyse statistique RStudio des points de contrôle GCP et tolérances géométriques" }
    ]
  },
  {
    period: "2023 – 2024",
    diploma: "LICENCE 3 Professionnelle Géomètre Topographe (L3 GTP)",
    institution: "UFRSI — Université Iba Der Thiam de Thiès (UIDT)",
    location: "Thiès, Sénégal",
    logoUrl: "/assets/aistudio/image_4141da06.png",
    websiteUrl: "https://www.uidt.sn/",
    details: "Formation axée sur la pratique des différents matériels.",
    highlights: [
      "Pratique intensive des matériels de terrain (stations totales, niveaux de précision, GNSS)",
      "80 heures de travaux pratiques intensifs de mesures réelles sur le terrain",
      "Élaboration de plans cadastraux, calculs topométriques et projets pluridisciplinaires"
    ],
    semesterModules: [
      {
        semester: "Semestre 5 (Licence 3)",
        title: "Topométrie, Instruments & Droit Foncier",
        courses: [
          "Géodésie et Techniques Spatiales 1",
          "Astronomie Géodésique 1",
          "Topométrie 1C & 2 (Méthodes et Instruments)",
          "TP Topographie Intensifs (80 heures de pratique de terrain)",
          "Droit Foncier Général & Cadastre",
          "DAO 1 (Dessin Assisté par Ordinateur)",
          "Probabilités & Statistiques Appliquées"
        ]
      },
      {
        semester: "Semestre 6 (Licence 3)",
        title: "Photogrammétrie, Cartographie & SIG",
        courses: [
          "Photogrammétrie Aérienne 1",
          "Cartographie Numérique & Systèmes de Projection",
          "Systèmes d'Information Géographique 1 (SIG)",
          "Projet de Topographie 1 (Mise en situation réelle)",
          "Pratiques Professionnelles du Géomètre-Expert",
          "Algorithmique & Programmation Scientifique (Matlab)"
        ]
      }
    ],
    keySubjects: [
      { domain: "Topométrie & Mesures", desc: "Tachéométrie, nivellement géométrique de précision, cheminements et polygonales" },
      { domain: "TP Terrain Intensifs (80h)", desc: "Mise en station, centrage forcé, visées directes et calculs de polygonation" },
      { domain: "Photogrammétrie & Cartographie", desc: "Stéréophotogrammétrie, stéréorestitution, orthorectification et projection" },
      { domain: "Droit Foncier & Cadastre", desc: "Législation foncière, bornage, conservation foncière et délimitation" },
      { domain: "DAO & SIG 1", desc: "Cartographie vectorielle sous AutoCAD et analyse spatiale sous QGIS" }
    ]
  },
  {
    period: "2019 – 2021",
    diploma: "BREVET DE TECHNICIEN SUPÉRIEUR (BTS) Topographie",
    institution: "ESBTP (École Spéciale du Bâtiment et des Travaux Publics)",
    location: "Yamoussoukro, Côte d'Ivoire",
    logoUrl: "/assets/aistudio/image_a3194f9c.png",
    websiteUrl: "https://esbtp-ci.net/",
    details: "Diplôme axé plus sur la pratique, sanctionné ensuite par un stage qui permet de valider le diplôme. Ce cursus a constitué le début de l'initiation à la topographie.",
    highlights: [
      "Pratique des matériels de mesure topographique de chantier (stations totales et niveaux optiques)",
      "Stage professionnel de validation et initiation aux travaux de terrain",
      "Calculs topométriques et implantations sur chantiers de BTP"
    ]
  },
  {
    period: "2017 – 2019",
    diploma: "BACCALAURÉAT Série C (Mathématiques & Sciences Physiques)",
    institution: "Lycée Scientifique de Yamoussoukro — AS_42",
    location: "Yamoussoukro, Côte d'Ivoire",
    logoUrl: "/assets/aistudio/image_3a2db283.png",
    websiteUrl: "https://lyceescientifiqueyamoussoukro.net/",
    details: "Formation dans une école de renom en Côte d'Ivoire, série C.",
    highlights: [
      "Filière d'excellence en Mathématiques et Sciences Physiques",
      "Lycée Scientifique d'excellence nationale de Yamoussoukro"
    ]
  }
];

export const professionalExperiences: ExperienceItem[] = [
  {
    id: "exp-1",
    type: "pfe",
    role: "Ingénieur géomètre topographe stagiaire",
    organization: "Cabinet XYZ",
    period: "2026",
    location: "Sénégal",
    category: "drone-lidar",
    categoryLabel: "Projet de fin d'étude",
    mission: "Amélioration de la qualité géométrique des données LiDAR aéroportées par optimisation des paramètres de traitement et ajustement inter-bandes multi-logiciels",
    details: [],
    toolsUsed: ["Drone DJI Matrice 300", "DJI Terra", "Spatial TerraSolid", "Global Mapper", "RStudio", "Agisoft Metashape", "Python"]
  },
  {
    id: "exp-2",
    type: "universitaire",
    role: "Ingénieur géomètre topographe, stagiaire projet d'ouvrage d'art",
    organization: "Études techniques",
    period: "04/2026 – 05/2026",
    location: "Thiès, Sénégal",
    category: "ouvrages-art",
    categoryLabel: "Projet Universitaire",
    mission: "Étude technique orientée vers la réalisation et l'exécution des ouvrages d'art",
    details: [],
    toolsUsed: []
  },
  {
    id: "exp-3",
    type: "universitaire",
    role: "Ingénieur géomètre topographe stagiaire — Projet pluridisciplinaire et réaménagement urbain",
    organization: "Université Iba Der Thiam de Thiès (UIDT) · Zone de Ladior",
    period: "12/2025 – 03/2026",
    location: "Thiès, Sénégal",
    category: "amenagement",
    categoryLabel: "Projet Universitaire Pluridisciplinaire",
    mission: "Projet combinant les techniques GNSS, la photogrammétrie terrestre et l'urbanisme dans une démarche intégrée de réaménagement urbain.",
    details: [],
    toolsUsed: []
  },
  {
    id: "exp-4",
    type: "professionnel",
    role: "Technicien Géomètre Topographe — Responsable Bureau d'Étude",
    organization: "GEA-HOLDING BONOUA",
    period: "03/2023 – 08/2023",
    location: "Bonoua, Côte d'Ivoire",
    category: "bureau-etudes",
    categoryLabel: "Expérience Professionnelle Terrain",
    mission: "Responsable du bureau d’étude, chargé de la gestion et du traitement des données issues des levés topographiques et des implantations, du suivi des livrables techniques et du contrôle qualité.",
    details: [
      "Supervision et validation de l'ensemble des livrables techniques avant transmission aux maîtres d'œuvre",
      "Traitement numérique des données brutes de terrain et intégration dans les bases de données topographiques",
      "Interventions ciblées sur le terrain pour les opérations de contrôle contradictoire et vérifications de tolérance",
      "Coordination directe entre les brigades de mesure terrain et les ingénieurs d'études"
    ],
    toolsUsed: ["AutoCAD", "Covadis", "QGIS", "Global Mapper", "Stations Totales"]
  },
  {
    id: "exp-5",
    type: "professionnel",
    role: "Technicien Stagiaire Géomètre Topographe — SIG & Foncier",
    organization: "GEOFONCIA BONOUA",
    period: "02/2022 – 01/2023",
    location: "Bonoua, Côte d'Ivoire",
    category: "foncier-sig",
    categoryLabel: "Expérience Professionnelle Terrain",
    mission: "Participation à plusieurs projets en SIG et topographie, réalisation du plan d’assemblage de Bonoua, gestion de bases de données spatiales et opérations foncières.",
    details: [
      "Élaboration et actualisation du plan d'assemblage cadastral de la commune de Bonoua",
      "Gestion et structuration de bases de données géographiques (SIG)",
      "Travaux de levés et d'implantation topographiques à Tchatchèvé et Soumalékro",
      "Contribution aux opérations de régularisation foncière légale et à la pose de poteaux électriques"
    ],
    toolsUsed: ["ArcGIS Pro", "QGIS", "KoboToolbox / QField", "GNSS RTK", "AutoCAD"]
  },
  {
    id: "exp-6",
    type: "professionnel",
    role: "Technicien Stagiaire Géomètre Topographe — Topographie de Chantier",
    organization: "CABINET GÉOMÈTRE EXPERT KOUAMELAN",
    period: "09/2021 – 12/2021",
    location: "Koumassi & Treichville, Côte d'Ivoire",
    category: "chantier-btp",
    categoryLabel: "Expérience Professionnelle Terrain",
    mission: "Topographie opérationnelle de chantier, participation aux travaux d’implantation et de contrôle d’un immeuble R+5 à Treichville et travaux de levés à Koumassi.",
    details: [
      "Implantation d'axes porteurs, voiles béton et poteaux pour un immeuble R+5 à Treichville",
      "Contrôle de verticalité, aplombs et nivellement des planchers",
      "Levés d'état des lieux, récolements et implantations parcellaires dans la commune de Koumassi"
    ],
    toolsUsed: ["Station Totale électronique", "Niveau de chantier", "Mires", "Plomb optique", "AutoCAD"]
  }
];

export const terrainPhotos: TerrainPhoto[] = [
  {
    id: "terrain-1",
    title: "Station Totale CHCNAV CTS-112R4 sur Trépied Lourd",
    subtitle: "Brice Emery PLEI en opération de mise en station et visée optique sur mire",
    imageUrl: "/assets/aistudio/WhatsApp_Image_2026-10-23_at_09.06.07_9d843d73.jpeg",
    location: "Chantier d'ingénierie UIDT UFR SI — Thiès",
    equipment: "Station Totale CHCNAV CTS-112R4 & Réflecteur prismatique",
    precision: "Précision angulaire 2\" · ± 2.0 mm"
  },
  {
    id: "terrain-2",
    title: "Levé GNSS RTK Bi-Fréquence en Temps Réel",
    subtitle: "Acquisition centimétrique de points de calage et polygonation",
    imageUrl: "/assets/aistudio/WhatsApp_Image_2026-10-23_at_09.06.09_9329ebe9.jpeg",
    location: "Zone de voirie et aménagements",
    equipment: "Mobiles GNSS RTK & Contrôleur de carnet nomade",
    precision: "± 8 mm H / ± 15 mm V"
  },
  {
    id: "terrain-3",
    title: "Mesure de Précision & Contrôle Géométrique d'Axe",
    subtitle: "Implantation et visée optique sur cible de raccordement",
    imageUrl: "/assets/aistudio/WhatsApp_Image_2026-10-23_at_09.06.09__1__f5532e6f.jpeg",
    location: "Plateforme génie civil & terrassement",
    equipment: "Station totale électronique CHCNAV & Prisme",
    precision: "Tolérance sub-centimétrique"
  },
  {
    id: "terrain-4",
    title: "Centrage Forcé sur Borne Géodésique de Référence",
    subtitle: "Vérification des niveaux toriques et calage de l'axe vertical",
    imageUrl: "/assets/aistudio/WhatsApp_Image_2026-10-23_at_09.06.09__2__f63e4dae.jpeg",
    location: "Réseau géodésique local — Canevas Lat Dior",
    equipment: "Embase de précision & Plomb optique",
    precision: "Erreur de centrage < 0.5 mm"
  },
  {
    id: "terrain-5",
    title: "Supervision Technique & Brigade de Piquetage",
    subtitle: "Brice Emery PLEI coordonnant les mesures d'infrastructures",
    imageUrl: "/assets/aistudio/WhatsApp_Image_2026-10-23_at_09.06.10_125d2bf9.jpeg",
    location: "Chantier routier & VRD",
    equipment: "Équipement complet de brigade topographique",
    precision: "Conformité cahier des charges VRD"
  },
  {
    id: "terrain-6",
    title: "Visée Réflecteur & Contrôle de Polygonation",
    subtitle: "Fermeture des cheminements et calculs de compensation d'angle",
    imageUrl: "/assets/aistudio/WhatsApp_Image_2026-10-23_at_09.06.10__1__a3c4090b.jpeg",
    location: "Tracé linéaire et voiries d'accès",
    equipment: "Station totale & Prisme haute précision",
    precision: "± 1.0 mm + 1.5 ppm"
  },
  {
    id: "terrain-7",
    title: "Reconnaissance de Borne Foncire & Rattachement",
    subtitle: "Contrôle de limites de propriété et levé cadastral",
    imageUrl: "/assets/aistudio/WhatsApp_Image_2026-10-23_at_13.29.24_769decbd.jpeg",
    location: "Périmètre foncier régional",
    equipment: "Système de positionnement géodésique",
    precision: "Rattachement UTM WGS84"
  },
  {
    id: "terrain-8",
    title: "Audit Altimétrique & Nivellement Indirect",
    subtitle: "Contrôle des profils en long et profils en travers",
    imageUrl: "/assets/aistudio/WhatsApp_Image_2026-10-23_at_13.29.24__1__5e78a27a.jpeg",
    location: "Zone d'infrastructures urbaines",
    equipment: "Station totale & Mires numériques",
    precision: "Nivellement géométrique classe I"
  },
  {
    id: "terrain-9",
    title: "Mesures Opérationnelles sous Contraintes Thermiques",
    subtitle: "Prise en compte de la réfraction et des gradients atmosphériques",
    imageUrl: "/assets/aistudio/WhatsApp_Image_2026-10-23_at_13.29.24__2__45cdd449.jpeg",
    location: "Chantier ouvert en région chaude",
    equipment: "Station totale avec compensation bi-axiale",
    precision: "Correction atmosphérique ppm active"
  },
  {
    id: "terrain-10",
    title: "Travaux Pratiques d'Excellence — UFR SI Thiès",
    subtitle: "Application des protocoles de micro-triangulation et relèvement libre",
    imageUrl: "/assets/aistudio/WhatsApp_Image_2026-10-23_at_13.29.24__3__c1366373.jpeg",
    location: "Campus Université Iba Der Thiam",
    equipment: "Station totale CHCNAV & Prisme 360°",
    precision: "Tolérance d'implantation ± 2 mm"
  },
  {
    id: "terrain-11",
    title: "Station Totale CHCNAV CTS-112R4 en Opération",
    subtitle: "Mise en station, contrôle des visées et axes de voirie",
    imageUrl: "/assets/aistudio/WhatsApp_Image_2026-10-23_at_09.06.10__2__78be900d.jpeg",
    location: "Chantier d'infrastructures et VRD",
    equipment: "Station totale CHCNAV & Trépied aluminium",
    precision: "Précision angulaire 2\""
  },
  {
    id: "terrain-12",
    title: "Levé GNSS RTK avec Canne et Contrôleur Nomade",
    subtitle: "Acquisition de points d'axe et contrôles altimétriques",
    imageUrl: "/assets/aistudio/WhatsApp_Image_2026-10-23_at_13.29.22__1__9329ebe9.jpeg",
    location: "Plateforme d'aménagements et voirie",
    equipment: "Récepteur GNSS RTK bi-fréquence & canne 2m",
    precision: "± 8 mm H / ± 15 mm V"
  },
  {
    id: "terrain-13",
    title: "Bornage Géodésique & Matérialisation de Repère Fondamental",
    subtitle: "Pose et coulage de borne géodésique bétonnée avec tube repère de centrage",
    imageUrl: "/assets/aistudio/WhatsApp_Image_2026-10-27_at_11.05.28__6__d8899ef3.jpeg",
    location: "Site de canevas géodésique & aménagement",
    equipment: "Borne béton, coffrage, outillage de maçonnerie topographique",
    precision: "Stabilité millimétrique du repère"
  },
  {
    id: "terrain-14",
    title: "Contrôle de Station GNSS & Saisie sur Carnet Nomade",
    subtitle: "Brice Emery PLEI vérifiant les coordonnées géodésiques et le carnet d'observations",
    imageUrl: "/assets/aistudio/WhatsApp_Image_2026-10-27_at_11.05.28_6a098992.jpeg",
    location: "Base géodésique de référence permanente",
    equipment: "Récepteur GNSS géodésique CHCNAV & Contrôleur nomade",
    precision: "Résolution de phase d'ondes L1/L2"
  },
  {
    id: "terrain-15",
    title: "Lecture et Calage des Plans d'Exécution sur le Terrain",
    subtitle: "Brigade topographique analysant les plans de voirie et de piquetage",
    imageUrl: "/assets/aistudio/WhatsApp_Image_2026-10-27_at_11.05.30__3__4dd2e3ae.jpeg",
    location: "Zone de tracé et emprise de projet",
    equipment: "Plans d'exécution cotés & Carnet topographique",
    precision: "Conformité géométrique d'implantation"
  },
  {
    id: "terrain-16",
    title: "Nivellement Optique de Haute Précision",
    subtitle: "Visée directe au niveau automatique GeoMax pour profil altimétrique",
    imageUrl: "/assets/aistudio/WhatsApp_Image_2026-10-27_at_11.05.30__4__dbf62cd1.jpeg",
    location: "Plateforme voirie et terrassement urbain",
    equipment: "Niveau optique de précision GeoMax & Trépied lourd",
    precision: "Tolérance altimétrique < 1 mm/km"
  },
  {
    id: "terrain-17",
    title: "Nivellement Géométrique de Fouilles & Terrassements",
    subtitle: "Équipe de topométrie avec mire à code-barres sur chantier de fondations",
    imageUrl: "/assets/aistudio/WhatsApp_Image_2026-10-27_at_11.05.30__5__50df535c.jpeg",
    location: "Chantier de génie civil et terrassement",
    equipment: "Mire de nivellement de précision & EPI réglementaires",
    precision: "Contrôle altimétrique des cotes de fond de fouille"
  },
  {
    id: "terrain-18",
    title: "Mise en Station GNSS de Haute Précision sur Borne",
    subtitle: "Calage d'antenne bi-fréquence et enregistrement de données statiques",
    imageUrl: "/assets/aistudio/WhatsApp_Image_2026-10-27_at_11.05.27_e301103d.jpeg",
    location: "Point géodésique de raccordement",
    equipment: "Récepteur GNSS CHCNAV, trépied à branches coulissantes",
    precision: "Précision statique ± 3 mm + 0.5 ppm"
  },
  {
    id: "terrain-19",
    title: "Centrage et Réglage Altimétrique de l'Antenne GNSS",
    subtitle: "Brice Emery PLEI ajustant l'axe vertical de la tête GNSS sur plot bétonné",
    imageUrl: "/assets/aistudio/WhatsApp_Image_2026-10-27_at_11.05.27__1__1b161e2a.jpeg",
    location: "Réseau de bornage et canevas d'appui",
    equipment: "Tête GNSS RTK, embase de calage & nivelle sphérique",
    precision: "Centrage forcé millimétrique"
  }
];

export const certificationsData: Certification[] = [
  {
    id: "cert-1",
    title: "Certificat de Formation Spécialisée : Collecte et Analyse de Données",
    issuer: "INTL DATA CONSULTING",
    year: "Novembre 2024",
    credentialId: "INTL-DATA-2024-CAD",
    imageUrl: "/assets/aistudio/CERTIFICAT_FORMATION_INTL_page-0001_3bd0b026.jpg",
    tools: ["KOBOTOOLBOX", "STATA", "Statistiques Spatiales", "Data Collection Nomade"],
    description: "Certification professionnelle sanctionnant la maîtrise avancée des méthodes de collecte de données numériques de terrain géoréférencées via KoboToolbox, le déploiement opérationnel sur flottes d'appareils mobiles et tablettes, ainsi que l'apurement méthodique, la modélisation statistique inférentielle et l'analyse économétrique spatiale approfondie sous STATA.",
    competencies: [
      "Conception et paramétrage d'enquêtes géolocalisées complexes sur KoboToolbox / XLSForm",
      "Déploiement sur terminaux mobiles et audit d'intégrité de la collecte terrain",
      "Apurement rigoureux, codage et fusion de bases de données volumineuses sous STATA",
      "Analyses descriptives, régressions économétriques et modélisations statistiques"
    ]
  },
  {
    id: "cert-2",
    title: "Certificat d'Accomplissement : Conception Routière de A à Z avec AutoCAD et Covadis 17",
    issuer: "Udemy & Home Made School (Instructeur : Mohamed SOUAG)",
    year: "Septembre 2025",
    credentialId: "UC-a25d6b64-5b0d-4211-803a-f8defc22a860",
    imageUrl: "/assets/aistudio/UC-a25d6b64-5b0d-4211-803a-f8defc22a860_993f9fd1.jpg",
    tools: ["AutoCAD", "Covadis 17", "VRD & Projets Routiers", "Terrassement & Profils"],
    description: "Attestation officielle sanctionnant l'apprentissage intégral et la réalisation de projets de conception routière et de voirie selon les normes géométriques en vigueur : génération de Modèle Numérique de Terrain (MNT), définition précise de l'axe en plan avec raccordements circulaires et clothoïdes, établissement du profil en long TN et projet, application des profils en travers types, calcul des dévers, cubatures de déblais/remblais et métrés quantitatifs d'exécution.",
    competencies: [
      "Modélisation 3D du terrain naturel et triangulation MNT sous Covadis 17",
      "Élaboration des axes en plan, raccordements progressifs et calculs de dévers routiers",
      "Profils en long, profils en travers types paramétrés et bassins d'assainissement",
      "Calcul précis des volumes de terrassement (déblai/remblai) et plans de traçage de voirie"
    ]
  },
  {
    id: "cert-3",
    title: "Certificat d'Accomplissement : Formation Complète en Photogrammétrie par Drone",
    issuer: "Udemy & Home Made School (Instructeur : Mohamed SOUAG)",
    year: "Août 2025",
    credentialId: "UC-ab640749-7f67-462c-a70b-a824e8a2b840",
    imageUrl: "/assets/aistudio/UC-ab640749-7f67-462c-a70b-a824e8a2b840_38c311be.jpg",
    tools: ["Photogrammétrie Drone", "DJI Terra", "Agisoft Metashape", "Covadis & Civil 3D"],
    description: "Certification attestant d'une qualification poussée dans le flux de travail de la photogrammétrie aérienne par drone pour le géomètre topographe : préparation rigoureuse des plans de vol automatisés (taux de recouvrement, hauteur, GSD centimétrique), disposition stratégique et relevé GNSS RTK des cibles au sol (GCP et checkpoints), traitement d'aérotriangulation, génération d'orthomosaïques géoréférencées, extraction de nuages de points denses, MNS, MNT filtré et calculs volumétriques d'excavation.",
    competencies: [
      "Planification de missions de vol drone et calcul du Ground Sample Distance (GSD)",
      "Implantation, numérotation et mesure au millimètre des cibles au sol (GCP / RTK)",
      "Aérotriangulation, génération d'orthophotoplans géoréférencés et nuages de points 3D",
      "Export vers Covadis / AutoCAD pour calculs volumétriques et profils de carrières"
    ]
  },
  {
    id: "cert-4",
    title: "Certificat de Formation Spécialisée : Collecte de Données et Analyse Spatiale",
    issuer: "INTL DATA CONSULTING",
    year: "Octobre - Novembre 2024",
    credentialId: "INTL-DATA-2024-CAS",
    imageUrl: "/assets/aistudio/CERTIFICAT_FORMATION_INTL_2_page-0001_b2587010.jpg",
    tools: ["KOBOTOOLBOX", "QGIS", "Systèmes SIG", "Cartographie & Géomatique"],
    description: "Certification de perfectionnement technique en sciences de l'information géographique et analyse spatiale appliquée. Maîtrise de la chaîne complète reliant la saisie dématérialisée de données géo-localisées sous KoboToolbox aux analyses spatiales complexes sous QGIS : intégration de bases de données spatiales, géoréférencement d'imageries et de cadastres, requêtes spatiales attributaires et géométriques, géotraitements avancés et production de cartes thématiques d'aide à la décision territoriale.",
    competencies: [
      "Interfaçage transparent entre formulaires mobiles KoboToolbox et plateformes SIG",
      "Géoréférencement précis de plans scannés, cadastres et photographies aériennes sous QGIS",
      "Analyses spatiales multicritères, zones tampons, intersections et calculs de densités",
      "Mise en page cartographique normative pour rapports techniques et présentations institutionnelles"
    ]
  }
];

export const softwareSkillsData: SoftwareCategory[] = [
  {
    category: "Photogrammétrie & Nuages de Points",
    iconName: "Camera",
    tools: [
      { name: "3D Survey", description: "Modélisation de surfaces, calculs volumétriques et vectorisation", level: 92 },
      { name: "Agisoft Metashape", description: "Aérotriangulation de précision, nuages denses et orthophotos", level: 95 },
      { name: "Pix4Dmapper", description: "Cartographie photogrammétrique et contrôle des résidus GCP", level: 90 }
    ]
  },
  {
    category: "Traitement LiDAR & Télédétection",
    iconName: "Laser",
    tools: [
      { name: "DJI TERRA", description: "Traitement direct des missions LiDAR Zenmuse L1 et trajectographie", level: 95 },
      { name: "SPATIX (TerraMatch / TerraScan)", description: "Ajustement inter-bandes, classification sol/bâtiment LiDAR", level: 94 },
      { name: "CloudCompare", description: "Alignement fin de nuages de points 3D et analyses géométriques", level: 90 }
    ]
  },
  {
    category: "Positionnement GNSS & Géodésie",
    iconName: "Satellite",
    tools: [
      { name: "Leica Infinity", description: "Compensation des réseaux géodésiques et calcul de lignes de base", level: 92 },
      { name: "RTKLIB", description: "Post-traitement cinématique PPK et calculs GNSS bruts", level: 88 },
      { name: "Calculs PPP & Canne RTK", description: "Positionnement par point précis en ligne (PPP), RTK et statique", level: 96 }
    ]
  },
  {
    category: "Traitement SIG & Imagerie Spatiale",
    iconName: "Map",
    tools: [
      { name: "QGIS & ArcGIS Pro", description: "Gestion de géodatabases, géotraitements et cartographie thématique", level: 95 },
      { name: "Global Mapper", description: "Conversion de formats, découpe MNT et reprojections cartographiques", level: 92 },
      { name: "Google Earth Engine (GEE)", description: "Traitement d'images satellitaires multi-spectrales et séries temporelles", level: 85 }
    ]
  },
  {
    category: "Projection Routière & DAO/CAO",
    iconName: "Layers",
    tools: [
      { name: "Covadis (v17)", description: "MNT, axes en plan, profils en long/travers, cubatures et VRD", level: 96 },
      { name: "AutoCAD & Autopiste", description: "Conception géométrique routière, carrefours et plans de projet", level: 95 }
    ]
  },
  {
    category: "Outils de Collecte Nomade Terrain",
    iconName: "Tablet",
    tools: [
      { name: "KoboToolbox & KoboCollect", description: "Formulaires d'enquêtes géolocalisées XLSForm et synchronisation", level: 96 },
      { name: "QField", description: "Saisie cartographique nomade synchronisée directement avec QGIS", level: 92 }
    ]
  }
];

export const hardwareSkillsData = [
  { name: "Récepteurs GNSS RTK", desc: "Bi-fréquence, modes RTK/PPK, statique et PPP", precision: "± 8 mm H / 15 mm V" },
  { name: "Stations Totales", desc: "Leica, CHCNAV (visée optique, relèvement, piquetage 3D)", precision: "Tolérance angulaire 2\"" },
  { name: "Drones & LiDAR", desc: "DJI Matrice 300 RTK + Capteur LiDAR Zenmuse L1", precision: "GSD centimétrique & nuage 3D dense" },
  { name: "Niveaux de Chantier", desc: "Niveaux numériques & optiques avec mires graduées", precision: "Nivellement géométrique classe I" }
];

export const professionalAptitudes = [
  { title: "Sens de l'Organisation & Planification", desc: "Rigueur dans l'ordonnancement des campagnes de levé et la gestion des priorités." },
  { title: "Esprit d'Anticipation", desc: "Identification préalable des contraintes de terrain, météo et tolérances d'implantation." },
  { title: "Grande Capacité d'Adaptation", desc: "Aisance en environnement de chantier exigeant comme en bureau d'études." },
  { title: "Apprentissage Rapide", desc: "Assimilation continue des nouveaux logiciels géomatiques et capteurs technologiques." },
  { title: "Autonomie & Rigueur", desc: "Contrôle méthodique des fermetures, tolérances et cohérence des livrables." },
  { title: "Esprit d'Équipe & Collaboration", desc: "Communication fluide avec les chefs de chantier, géomètres-experts et conducteurs de travaux." }
];

export const projectsData: ProjectItem[] = [
  {
    id: "proj-1",
    title: "Projet de Cadastre & Recensement Parcellaire (Projet SEN'SUF)",
    category: "cadastre",
    categoryLabel: "Cadastre & Foncier",
    client: "Projet National SEN'SUF (Sénégal)",
    year: "2025",
    location: "Thiès, Sénégal",
    precision: "Précision centimétrique rattachée GNSS",
    imageUrl: "/assets/aistudio/WhatsApp_Image_2026-10-23_at_09.06.10__2__78be900d.jpeg",
    description: "Levé topographique complet de l'existant à la station totale et recensement parcellaire afin d'alimenter la base de données foncière et de générer le plan cadastral d'ensemble.",
    tasks: [],
    equipment: ["Station Totale CHCNAV", "Récepteur GNSS CHCNAV"],
    software: ["AutoCAD", "Covadis", "QGIS"],
    deliverables: [],
    isDemo: false
  },
  {
    id: "proj-2",
    title: "Configuration & Tests Opérationnels du Récepteur GNSS Stonex",
    category: "geodesie",
    categoryLabel: "Tests Matériels & GNSS",
    client: "Cabinet Geo Holding Group",
    year: "2023",
    location: "Bonoua, Abidjan, Côte d'Ivoire",
    precision: "Précision centimétrique RTK",
    imageUrl: "/assets/aistudio/WhatsApp_Image_2026-10-23_at_09.06.09_9329ebe9.jpeg",
    description: "Paramétrage complet, tests de communication et réalisation de levés expérimentaux de validation sur le terrain avec le nouveau récepteur GNSS Stonex.",
    tasks: [],
    equipment: ["Récepteur GNSS Stonex"],
    software: ["AutoCAD", "Covadis", "QGIS"],
    deliverables: [],
    isDemo: false
  },
  {
    id: "proj-3",
    title: "Nivellement Géométrique Direct & Levés Topographiques (Koumassi)",
    category: "chantier",
    categoryLabel: "Topographie de Chantier",
    client: "Cabinet Géomètre Expert Kouamé-Lan",
    year: "2021",
    location: "Koumassi, Abidjan, Côte d'Ivoire",
    precision: "Altimétrie millimétrique",
    imageUrl: "/assets/aistudio/WhatsApp_Image_2026-10-27_at_11.05.30__4__dbf62cd1.jpeg",
    description: "Nivellement géométrique direct de haute précision au niveau optique GeoMax, cheminement altimétrique fermé et levés topographiques d'état des lieux.",
    tasks: [],
    equipment: ["Niveau optique GeoMax", "Mires de nivellement"],
    software: ["AutoCAD", "Excel"],
    deliverables: [],
    isDemo: false
  },
  {
    id: "proj-4",
    title: "Canevas Géodésique & Densification par Observations GNSS (Bonoua)",
    category: "geodesie",
    categoryLabel: "Géodésie Spatiale",
    client: "Cabinet Géomètre Topographe",
    year: "2023",
    location: "Bonoua, Abidjan, Côte d'Ivoire",
    precision: "Compensation sub-centimétrique",
    imageUrl: "/assets/aistudio/WhatsApp_Image_2026-10-27_at_11.05.28_6a098992.jpeg",
    description: "Détermination planimétrique par polygonation et altimétrique par nivellement géométrique direct, complétées par des observations statiques GNSS pour la densification du canevas.",
    tasks: [],
    equipment: ["Récepteur GNSS Stonex", "Borne géodésique"],
    software: ["CGO (CHCNAV Geomatics Office)", "AutoCAD", "Covadis", "Excel"],
    deliverables: [],
    isDemo: false
  },
  {
    id: "proj-5",
    title: "Mise en Place d'un Canevas Géodésique au Sud d'Abidjan",
    category: "geodesie",
    categoryLabel: "Projet de Fin d'Études (BTS)",
    client: "ESBTP — Projet de Fin d'Études BTS",
    year: "2021",
    location: "Bonoua, Abidjan, Côte d'Ivoire",
    precision: "Observations statiques GNSS de précision",
    imageUrl: "/assets/aistudio/WhatsApp_Image_2026-10-27_at_11.05.27_e301103d.jpeg",
    description: "Suite directe des travaux de nivellement géométrique direct : observation statique GNSS de haute précision des différents points nivelés pour la densification et la constitution du canevas géodésique dans le cadre de mon projet de fin d'études de BTS.",
    tasks: [],
    equipment: ["Récepteur GNSS statique", "Clé dongle"],
    software: ["CGU", "Clé dongle"],
    deliverables: [],
    isDemo: false
  },
  {
    id: "proj-6",
    title: "Implantation des Axes de Bâtiment & Nivellement de Chantier",
    category: "chantier",
    categoryLabel: "Topographie de Chantier",
    client: "Cabinet Géomètre Expert Kouamé-Lan",
    year: "2021",
    location: "Abidjan (Treichville & Koumassi), Côte d'Ivoire",
    precision: "Tolérance d'axe ± 2 mm",
    imageUrl: "/assets/aistudio/WhatsApp_Image_2026-10-27_at_11.05.30__5__50df535c.jpeg",
    description: "Implantation précise des différents axes du bâtiment, contrôle des alignements d'ouvrages et nivellement direct pour le calage altimétrique des semelles et amorces de poteaux.",
    tasks: [],
    equipment: ["Niveau optique de chantier", "Station totale"],
    software: ["AutoCAD", "Excel"],
    deliverables: [],
    isDemo: false
  },
  {
    id: "proj-7",
    title: "Levé de l'Existant & Restitution Cartographique du Bâtiment de l'IUT",
    category: "universitaire",
    categoryLabel: "Projet Universitaire",
    client: "Université Iba Der Thiam de Thiès (UIDT)",
    year: "2024",
    location: "Thiès, Sénégal",
    precision: "Précision centimétrique",
    imageUrl: "/assets/aistudio/WhatsApp_Image_2026-10-23_at_13.29.24_769decbd.jpeg",
    description: "Cheminement polygonal d'appui, levé complet de l'existant à la station totale et modélisation cartographique d'ensemble des bâtiments du campus de l'IUT.",
    tasks: [],
    equipment: ["Station totale électronique"],
    software: ["AutoCAD", "Covadis", "QGIS"],
    deliverables: [],
    isDemo: false
  },
  {
    id: "proj-8",
    title: "PRT M2 — Dynamique des Systèmes de Référence Géodésiques en Afrique",
    category: "recherche",
    categoryLabel: "Recherche & WebSIG",
    client: "Université Iba Der Thiam de Thiès (UFR-SI)",
    year: "2025 – 2026",
    location: "Thiès, Sénégal / Afrique",
    precision: "Cartographie géodésique continentale",
    imageUrl: "/assets/aistudio/image_4bb275e4.png",
    description: "Analyse descriptive et spatiale des réseaux géodésiques africains (ITRF et époques), accompagnée de la conception d'un tableau de bord WebSIG interactif accessible en ligne.",
    tasks: [],
    equipment: ["Plateforme WebSIG"],
    software: ["Web Mapping (Leaflet / React)", "Python", "QGIS"],
    deliverables: [],
    externalLink: "https://prtm2.netlify.app/",
    isDemo: false
  }
];

