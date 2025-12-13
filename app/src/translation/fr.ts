import type { AppTranslation } from "../types/app-translation";

export const FR: AppTranslation = {
  devices: "Appareils",
  connections: "Connections",
  settings: "Parametres",
  add: "Ajouter",
  edit: "Modifier",
  delete: "Supprimer",
  noConnection: "Non connecté",

  deleteConfirmation: "Etes vous sur de vouloir supprimer cet element ?",
  cancel: "Annuler",

  addDevice: "Ajouter appareil",
  editDevice: "Modifier appareil",
  deleteDevice: "Supprimer appareil",
  name: "Nom",
  macAddress: "Adresse mac",
  ipAddressIOptional: "Adresse IP (Facultatif: utilisé pour PING)",

  addConnection: "Ajouter connection",
  editConnection: "Modifier connection",
  deleteConnection: "Supprimer connection",
  authenthication: "Athenthification",
  useAuthenthication: "Utiliser l'authenthification",
  username: "Nom d'utilisateur",
  connectionAuthenthication: "Authenthification de connexion",
  password: "Mot de passe",
  connect: "Connexion",
  connected: "Connecté",
  disconnected: "Deconnecté",
  close: "Fermer",

  theme: "Thème",
  system: "Système",
  light: "Clair",
  dark: "Sombre",
  language: "Langue",

  powerStatus: "Etat d'allumage",
  deviceOn: "L'appareil est allumé",
  deviceOff: "L'appareil est eteint",
  loading: "Chargement...",
  error: "Erreur",
  errorOccured: "Une erreur est survenue",
  noContent: "Pas de contenu",
  connectionError:
    "Une erreure est survenue durant la connexion veuillez verifier vos identifians ansi que le réseau",
  noResponse: "Pas de réponse",
  timeoutMessage: "Le délai est ecoulé est aucuné réponse n'a ete recue",
  wolSent: "Le WOL (Wake-On-Lan) a ete envoyé",
  install: "Installer",

  notFound: "Introvable",
  landingPage: "Page d'acceuil",

  noDevices: {
    title: "Pas d'appareils",
    subTitle: "Commencer par ajouter des appareils",
  },
  noConnections: {
    title: "Pas de connexions",
    subTitle: "Commancer par ajouter des connexions au broker MQTT",
  },
};
