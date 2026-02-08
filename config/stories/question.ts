import type { StoryConfig } from "./index";

export const questionConfig: StoryConfig = {
  type: "question",
  title: "Story Questions",
  filename: "episteme-question",
  dimensions: { width: 1080, height: 1920 },
  fields: [
    {
      name: "mode",
      label: "Mode",
      type: "toggle",
      default: "ask",
      options: [
        { id: "ask", label: "Poser une question" },
        { id: "answer", label: "Répondre" },
      ],
    },
    { name: "askTitle", label: "Titre", type: "text", default: "Posez-nous vos questions !", width: "full" },
  ],
  hint: "Télécharge l'image, utilise-la comme fond de story, puis ajoute le sticker « Questions » d'Instagram sur l'emplacement prévu.",
};
