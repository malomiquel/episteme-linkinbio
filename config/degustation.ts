export interface Stand {
  id: string;
  name: string;
  emoji: string;
  description?: string;
}

export const STANDS: Stand[] = [
  { id: "stand-1", name: "Bordeaux Rouge", emoji: "🍷", description: "Château Margaux 2018" },
  { id: "stand-2", name: "Champagne", emoji: "🥂", description: "Blanc de Blancs" },
  { id: "stand-3", name: "Bourgogne Blanc", emoji: "🫧", description: "Chablis Premier Cru" },
  { id: "stand-4", name: "Côtes-du-Rhône", emoji: "🌿", description: "Grenache & Syrah" },
  { id: "stand-5", name: "Sancerre", emoji: "⚡", description: "Sauvignon Blanc" },
  { id: "stand-6", name: "Châteauneuf-du-Pape", emoji: "🔥", description: "Cuvée du Pape" },
];

export function getStand(id: string): Stand | undefined {
  return STANDS.find((s) => s.id === id);
}
