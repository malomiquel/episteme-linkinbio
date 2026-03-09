import type { StoryConfig } from "./index";

export const urgenceConfig: StoryConfig = {
  type: "urgence",
  title: "Story Urgence / FOMO",
  filename: "episteme-story-urgence",
  dimensions: { width: 1080, height: 1920 },
  fields: [
    {
      name: "badge",
      label: "Badge",
      type: "text",
      default: "Places limitées",
      width: "half",
    },
    {
      name: "percent",
      label: "Pourcentage vendu",
      type: "text",
      default: "50",
      width: "half",
      hint: "Nombre entre 0 et 100",
    },
    {
      name: "headline",
      label: "Titre",
      type: "text",
      default: "Déjà 50% des places early vendues",
      width: "full",
    },
    {
      name: "eventName",
      label: "Événement",
      type: "text",
      default: "Transmission II",
      width: "full",
    },
    {
      name: "eventDate",
      label: "Date",
      type: "text",
      default: "14 mars 2026",
      width: "half",
    },
    {
      name: "eventLocation",
      label: "Lieu",
      type: "text",
      default: "River's King, Paris",
      width: "half",
    },
    {
      name: "cta",
      label: "Appel à l'action",
      type: "text",
      default: "Réserve ta place maintenant",
      width: "full",
    },
    {
      name: "linkNote",
      label: "Note lien",
      type: "text",
      default: "Lien en bio",
      width: "half",
    },
  ],
};
