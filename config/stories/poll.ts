import type { StoryConfig } from "./index";

export const pollConfig: StoryConfig = {
  type: "poll",
  title: "Story Sondage",
  filename: "episteme-sondage",
  dimensions: { width: 1080, height: 1920 },
  fields: [
    { name: "topic", label: "Sujet / question", type: "text", default: "Plutôt rouge ou blanc ?", width: "full" },
  ],
  hint: "Télécharge l'image puis ajoute le sticker « Sondage » d'Instagram sur l'emplacement prévu.",
};
