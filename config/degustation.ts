export interface Stand {
  id: string;
  name: string;
  emoji: string;
  description?: string;
}

export const STANDS: Stand[] = [
  { id: "stand-1", name: "Champagne Maison Demière", emoji: "🥂" },
  { id: "stand-2", name: "Rosé Domaine Gassier", emoji: "🌸" },
  { id: "stand-3", name: "Armagnac Armin", emoji: "🥃" },
  { id: "stand-4", name: "Mon Chenin — A. Monmousseau", emoji: "🍾" },
  { id: "stand-5", name: "Chinon Rouge", emoji: "🍷" },
];

export function getStand(id: string): Stand | undefined {
  return STANDS.find((s) => s.id === id);
}
