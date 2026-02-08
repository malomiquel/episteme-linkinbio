import type { StoryConfig } from "./index";

export const eventConfig: StoryConfig = {
  type: "event",
  title: "Story Save the date",
  filename: "episteme-event",
  dimensions: { width: 1080, height: 1920 },
  fields: [
    { name: "eventName", label: "Nom de l'événement", type: "text", default: "Dégustation d'été", width: "full" },
    { name: "date", label: "Date", type: "text", default: "28 Juin 2025", width: "half" },
    { name: "time", label: "Heure", type: "text", default: "19h00", width: "half" },
    { name: "location", label: "Lieu", type: "text", default: "Paris, 11e", width: "full" },
  ],
};
