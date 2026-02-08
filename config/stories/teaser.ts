import type { StoryConfig } from "./index";

const EMOJIS = ["🍷", "🎵", "🎨", "🧀", "🥂", "🔥", "⚡", "🎭", "🎶", "🍇"];

export const teaserConfig: StoryConfig = {
  type: "teaser",
  title: "Story Teaser",
  filename: "episteme-story-teaser",
  dimensions: { width: 1080, height: 1920 },
  emojis: EMOJIS,
  fields: [
    { name: "title", label: "Titre", type: "textarea", default: "Quelque chose\nse prépare...", rows: 2, width: "full" },
    { name: "subtitle", label: "Sous-titre", type: "text", default: "Restez attentifs", width: "half" },
    { name: "transition", label: "Transition", type: "text", default: "En attendant...", width: "half" },
    { name: "ctaText", label: "Appel à l'action", type: "text", default: "Découvre quel vin tu es", width: "full" },
    { name: "linkNote", label: "Note lien", type: "text", default: "🔗 Lien en bio", width: "half" },
    { name: "shareNote", label: "Note partage", type: "text", default: "Partage ton résultat\nen story !", width: "half" },
    { name: "ctaEmoji", label: "Emoji", type: "emoji-picker", default: "🍷" },
  ],
};
