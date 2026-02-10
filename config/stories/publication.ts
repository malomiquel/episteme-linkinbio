import type { StoryConfig } from "./index";

const EMOJIS = ["📰", "📖", "✍️", "🍷", "🎨", "🎵", "🧀", "🍇", "📝", "💡"];

export const publicationConfig: StoryConfig = {
  type: "publication",
  title: "Story Publication",
  filename: "episteme-publication",
  dimensions: { width: 1080, height: 1920 },
  emojis: EMOJIS,
  fields: [
    { name: "badge", label: "Badge", type: "text", default: "Nouvel article", width: "full" },
    { name: "category", label: "Catégorie", type: "text", default: "Culture & Vin", width: "full" },
    { name: "title", label: "Titre", type: "textarea", default: "Le terroir bordelais", rows: 2, width: "full" },
    { name: "description", label: "Extrait / description", type: "textarea", default: "Découvrez l'histoire fascinante des vignobles les plus emblématiques de France.", rows: 3, width: "full" },
    { name: "cta", label: "Appel à l'action", type: "text", default: "Lire sur notre profil", width: "full" },
    { name: "emoji", label: "Emoji", type: "emoji-picker", default: "📰" },
  ],
  hint: "Idéal pour annoncer un article, un post éducatif ou une publication longue.",
};
