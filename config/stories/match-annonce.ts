import type { StoryConfig } from "./index";

export const matchAnnonceConfig: StoryConfig = {
  type: "match-annonce",
  title: "Story Annonce match",
  filename: "episteme-story-match-annonce",
  dimensions: { width: 1080, height: 1920 },
  fields: [
    {
      name: "line1",
      label: "Ligne 1 (setup)",
      type: "text",
      default: "On a une surprise",
      width: "full",
    },
    {
      name: "line2",
      label: "Ligne 2 (punch)",
      type: "text",
      default: "Le sport aussi, ça se déguste",
      width: "full",
    },
    {
      name: "emoji",
      label: "Emoji",
      type: "text",
      default: "🏉",
      width: "half",
    },
    {
      name: "line3",
      label: "Ligne 3 (mystère)",
      type: "text",
      default: "Le 14 mars à bord...",
      width: "full",
    },
  ],
};
