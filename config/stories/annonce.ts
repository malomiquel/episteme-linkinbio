import type { StoryConfig } from "./index";

const EMOJIS = ["🍷", "🎵", "🎨", "🧀", "🥂", "🔥", "⚡", "🎭", "🎶", "🍇", "🎟️"];

export const annonceConfig: StoryConfig = {
  type: "annonce",
  title: "Générateur de story",
  filename: "episteme-story",
  dimensions: { width: 1080, height: 1920 },
  emojis: EMOJIS,
  fields: [
    { name: "label", label: "Badge", type: "text", default: "Nouveau quiz", width: "full" },
    { name: "title", label: "Titre", type: "text", default: "Quel vin es-tu ?", width: "full" },
    { name: "subtitle", label: "Sous-titre", type: "text", default: "Découvre ton profil", width: "full" },
    { name: "cta", label: "Appel à l'action (bas)", type: "text", default: "Lien dans la bio", width: "full" },
    { name: "emoji", label: "Emoji", type: "emoji-picker", default: "🍷" },
  ],
};
