import type { StoryConfig } from "./index";

export const factConfig: StoryConfig = {
  type: "fact",
  title: "Story Le saviez-vous ?",
  filename: "episteme-fact",
  dimensions: { width: 1080, height: 1920 },
  fields: [
    { name: "title", label: "Titre", type: "text", default: "Le saviez-vous ?", width: "full" },
    { name: "fact", label: "Fait / anecdote", type: "textarea", default: "Il faut environ 600 raisins pour produire une seule bouteille de vin.", rows: 4, width: "full" },
  ],
};
