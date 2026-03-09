import type { StoryConfig } from "./index";

export const diffusionConfig: StoryConfig = {
  type: "diffusion",
  title: "Story Diffusion Match",
  filename: "episteme-story-diffusion",
  dimensions: { width: 1080, height: 1920 },
  fields: [
    {
      name: "team1",
      label: "Équipe 1",
      type: "text",
      default: "France",
      width: "half",
    },
    {
      name: "team2",
      label: "Équipe 2",
      type: "text",
      default: "Angleterre",
      width: "half",
    },
    {
      name: "matchTime",
      label: "Heure du match",
      type: "text",
      default: "21h10",
      width: "half",
    },
    {
      name: "matchDate",
      label: "Date",
      type: "text",
      default: "14 mars 2026",
      width: "half",
    },
    {
      name: "eventName",
      label: "Nom de la soirée",
      type: "text",
      default: "Transmission II",
      width: "full",
    },
    {
      name: "venue",
      label: "Lieu",
      type: "text",
      default: "River's King, Paris",
      width: "full",
    },
    {
      name: "cta",
      label: "Appel à l'action",
      type: "text",
      default: "Lien en bio",
      width: "full",
    },
  ],
};
