export const siteConfig = {
  name: "Episteme",
  handle: "@asso_episteme",
  tagline: "L'art de faire revivre",
  categories: ["Vin", "Art", "Musique"],
  contactEmail: "assoepisteme@gmail.com",
  instagramUrl: "https://www.instagram.com/asso_episteme/",
  helloassoUrl: "https://www.helloasso.com/associations/episteme",
};

export const nextEvent = {
  name: "Transmission",
  date: "2026-03-14T19:30:00",
  location: "River's King, Paris",
  time: "19h30",
  ticketUrl: "https://www.helloasso.com/associations/episteme",
  // Passe à true quand l'événement est officiellement annoncé et la billetterie ouverte
  announced: false,
};

export const links = [
  {
    title: "Billetterie",
    description: "Réserve ta place pour nos événements",
    href: "https://www.helloasso.com/associations/episteme",
    icon: "ticket" as const,
    external: true,
  },
  {
    title: "Instagram",
    description: "Suis-nous pour les dernières actus",
    href: "https://www.instagram.com/asso_episteme/",
    icon: "instagram" as const,
    external: true,
  },
  {
    title: "Nos événements passés",
    description: "Revivez les meilleurs moments",
    href: "#events",
    icon: "wine" as const,
    external: false,
  },
  {
    title: "Nous contacter",
    description: "Partenariats, questions, collaborations",
    href: "mailto:contact@asso-episteme.fr",
    icon: "contact" as const,
    external: false,
  },
];

export const pastEvents = [
  { name: "Vinum Noctis I", date: "6 février 2026", emoji: "🍷" },
  { name: "Soirée RCPA", date: "22 novembre 2025", emoji: "🏉" },
  { name: "Shamrock Tours", date: "12 septembre 2025", emoji: "🍀" },
  { name: "Fête de la Musique", date: "21 juin 2025", emoji: "🎵" },
];
