export type WineProfile = "bordeaux" | "champagne" | "rhone" | "sancerre" | "chateauneuf";

export interface Answer {
  text: string;
  scores: Partial<Record<WineProfile, number>>;
}

export interface Question {
  question: string;
  answers: Answer[];
}

export const questions: Question[] = [
  {
    question: "Ta soirée idéale ?",
    answers: [
      { text: "Dîner aux chandelles", scores: { bordeaux: 3, chateauneuf: 1 } },
      { text: "Apéro entre potes", scores: { rhone: 3, sancerre: 1 } },
      { text: "Soirée dansante", scores: { champagne: 3, rhone: 1 } },
      { text: "Soirée cosy à la maison", scores: { chateauneuf: 3, bordeaux: 1 } },
    ],
  },
  {
    question: "Quel plat te fait craquer ?",
    answers: [
      { text: "Plateau de fromages affinés", scores: { bordeaux: 3, chateauneuf: 1 } },
      { text: "Huîtres et fruits de mer", scores: { sancerre: 3, champagne: 1 } },
      { text: "Côte de boeuf grillée", scores: { rhone: 3, bordeaux: 1 } },
      { text: "Magret de canard aux figues", scores: { chateauneuf: 3, champagne: 1 } },
    ],
  },
  {
    question: "Ta musique de prédilection ?",
    answers: [
      { text: "Jazz & Soul", scores: { bordeaux: 3, chateauneuf: 1 } },
      { text: "Électro & House", scores: { champagne: 3, sancerre: 1 } },
      { text: "Rock & Indie", scores: { rhone: 3, sancerre: 1 } },
      { text: "Hip-hop & R&B", scores: { sancerre: 2, champagne: 2 } },
    ],
  },
  {
    question: "On te décrit plutôt comme...",
    answers: [
      { text: "Mystérieux(se)", scores: { chateauneuf: 3, bordeaux: 1 } },
      { text: "La vie de la fête", scores: { champagne: 3, rhone: 1 } },
      { text: "Calme et posé(e)", scores: { bordeaux: 2, sancerre: 2 } },
      { text: "Aventurier(ère)", scores: { sancerre: 3, rhone: 1 } },
    ],
  },
  {
    question: "Ton moment préféré de la journée ?",
    answers: [
      { text: "Le coucher de soleil", scores: { bordeaux: 2, rhone: 2 } },
      { text: "La nuit", scores: { chateauneuf: 3, champagne: 1 } },
      { text: "Le matin tôt", scores: { sancerre: 3, bordeaux: 1 } },
      { text: "L'heure de l'apéro", scores: { rhone: 2, champagne: 2 } },
    ],
  },
  {
    question: "Choisis un mot.",
    answers: [
      { text: "Élégance", scores: { bordeaux: 3, champagne: 1 } },
      { text: "Liberté", scores: { sancerre: 3, rhone: 1 } },
      { text: "Passion", scores: { chateauneuf: 3, rhone: 1 } },
      { text: "Éclat", scores: { champagne: 3, sancerre: 1 } },
    ],
  },
];

export interface WineResult {
  name: string;
  emoji: string;
  title: string;
  description: string;
  traits: string[];
  color: string;
  accent: string;
}

export const results: Record<WineProfile, WineResult> = {
  bordeaux: {
    name: "Bordeaux Grand Cru",
    emoji: "🏰",
    title: "L'Élégant(e)",
    description:
      "Comme un grand Bordeaux, tu es raffiné(e), structuré(e) et tu te bonifies avec le temps. On te reconnaît à ton charisme naturel et ton goût pour les belles choses.",
    traits: ["Raffiné(e)", "Charismatique", "Intemporel(le)"],
    color: "#4A0E1C",
    accent: "#C9A84C",
  },
  champagne: {
    name: "Champagne",
    emoji: "🥂",
    title: "Le/La Pétillant(e)",
    description:
      "Effervescent(e) et lumineux(se), tu apportes de la joie partout où tu passes. Comme les bulles, ton énergie est contagieuse et on ne se lasse jamais de ta compagnie.",
    traits: ["Festif(ve)", "Joyeux(se)", "Magnétique"],
    color: "#3D3017",
    accent: "#F5D76E",
  },
  rhone: {
    name: "Côtes-du-Rhône",
    emoji: "🤝",
    title: "Le/La Convivial(e)",
    description:
      "Généreux(se) et chaleureux(se) comme un Côtes-du-Rhône, tu es celui/celle qui rassemble. Autour de toi, les soirées deviennent inoubliables et les amitiés se renforcent.",
    traits: ["Généreux(se)", "Chaleureux(se)", "Fédérateur(rice)"],
    color: "#3B1525",
    accent: "#E07A5F",
  },
  sancerre: {
    name: "Sancerre",
    emoji: "⚡",
    title: "L'Audacieux(se)",
    description:
      "Frais(che) et surprenant(e) comme un Sancerre, tu n'as pas peur de sortir des sentiers battus. Ta curiosité et ton originalité te rendent irrésistible.",
    traits: ["Curieux(se)", "Original(e)", "Vif(ve)"],
    color: "#1A3A2A",
    accent: "#8FD9A8",
  },
  chateauneuf: {
    name: "Châteauneuf-du-Pape",
    emoji: "🔥",
    title: "L'Intense",
    description:
      "Profond(e) et captivant(e) comme un Châteauneuf-du-Pape, tu dégages une aura magnétique. Derrière ton mystère se cache une personnalité riche et complexe.",
    traits: ["Mystérieux(se)", "Captivant(e)", "Profond(e)"],
    color: "#2D0A1E",
    accent: "#D4A0C7",
  },
};

export function calculateResult(scores: Record<WineProfile, number>): WineProfile {
  let max = 0;
  let winner: WineProfile = "bordeaux";
  for (const [key, value] of Object.entries(scores)) {
    if (value > max) {
      max = value;
      winner = key as WineProfile;
    }
  }
  return winner;
}

export interface QuizConfig {
  questions: { question: string; answers: { text: string; scores: Record<string, number> }[] }[];
  results: Record<string, WineResult>;
  title: string;
  subtitle: string;
  description: string;
  emoji: string;
  shareFileName: string;
  shareCta: string;
  resultBasePath: string;
}

export const wineQuizConfig: QuizConfig = {
  questions: questions.map((q) => ({
    question: q.question,
    answers: q.answers.map((a) => ({ text: a.text, scores: a.scores as Record<string, number> })),
  })),
  results,
  title: "Quel vin es-tu ?",
  subtitle: "par Episteme",
  description: "6 questions pour découvrir quel vin correspond à ta personnalité.",
  emoji: "🍷",
  shareFileName: "quel-vin-es-tu",
  shareCta: "Et toi, quel vin es-tu ?",
  resultBasePath: "/quiz/vin/result",
};
