import type { StoryConfig } from "./index";

export const thisorthatConfig: StoryConfig = {
  type: "thisorthat",
  title: "Story This or That",
  filename: "episteme-thisorthat",
  dimensions: { width: 1080, height: 1920 },
  fields: [
    { name: "title", label: "Titre", type: "text", default: "Tu préfères ?", width: "full" },
    { name: "optionA", label: "Option A", type: "text", default: "Bordeaux", width: "half" },
    { name: "emojiA", label: "Emoji", type: "text", default: "🍷", width: "half" },
    { name: "optionB", label: "Option B", type: "text", default: "Bourgogne", width: "half" },
    { name: "emojiB", label: "Emoji", type: "text", default: "🥂", width: "half" },
  ],
  hint: "Ajoute le sticker « Sondage » d'Instagram sur l'emplacement prévu entre les deux options pour que tes abonnés puissent voter.",
};
