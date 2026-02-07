import type { QuizConfig, WineResult } from "./quiz";

export type EventProfile = "vinumnoctis" | "transmission" | "fetemusique" | "shamrock" | "rcpa";

export const eventResults: Record<EventProfile, WineResult> = {
  vinumnoctis: {
    name: "Vinum Noctis",
    emoji: "🍷",
    title: "L'Esthète",
    description:
      "Comme une Vinum Noctis, tu recherches l'élégance et la profondeur. Ambiance tamisée, bons crus et conversations passionnantes : tu transformes chaque dégustation en moment suspendu.",
    traits: ["Raffiné(e)", "Curieux(se)", "Épicurien(ne)"],
    color: "#2E0A18",
    accent: "#C9A84C",
  },
  transmission: {
    name: "Transmission",
    emoji: "🎵",
    title: "Le/La Passionné(e)",
    description:
      "Comme une soirée Transmission, tu vis chaque instant à fond. Musique, énergie collective, frissons : tu es de ceux qui créent des souvenirs inoubliables et qui fédèrent autour d'une vibe unique.",
    traits: ["Intense", "Fédérateur(rice)", "Vibrant(e)"],
    color: "#1A0A2E",
    accent: "#B07FD0",
  },
  fetemusique: {
    name: "Fête de la Musique",
    emoji: "☀️",
    title: "Le/La Solaire",
    description:
      "Comme la Fête de la Musique, tu incarnes la joie de vivre et la spontanéité. En terrasse ou dans la rue, tu es celui/celle qui lance la danse et qui rend chaque moment léger et festif.",
    traits: ["Spontané(e)", "Joyeux(se)", "Contagieux(se)"],
    color: "#2E2A0A",
    accent: "#F5D76E",
  },
  shamrock: {
    name: "Shamrock Tours",
    emoji: "🍀",
    title: "L'Aventurier(ère)",
    description:
      "Comme un Shamrock Tours, tu es toujours partant(e) pour l'aventure. Nouveaux lieux, nouvelles rencontres, imprévus : tu vis pour ces moments de découverte qui sortent de l'ordinaire.",
    traits: ["Aventurier(ère)", "Ouvert(e)", "Enthousiaste"],
    color: "#0A2E1A",
    accent: "#6ECF8E",
  },
  rcpa: {
    name: "Soirée RCPA",
    emoji: "🏉",
    title: "Le/La Convivial(e)",
    description:
      "Comme une soirée RCPA, tu es l'âme du groupe. Esprit d'équipe, rires, et troisièmes mi-temps mémorables : autour de toi, tout le monde se sent à sa place et les amitiés se forgent naturellement.",
    traits: ["Fédérateur(rice)", "Généreux(se)", "Énergique"],
    color: "#0E1A2E",
    accent: "#5F9FD4",
  },
};

const s = (scores: Partial<Record<EventProfile, number>>): Record<string, number> =>
  scores as Record<string, number>;

const questions = [
  {
    question: "Ton rôle dans un groupe d'amis ?",
    answers: [
      { text: "Celui/celle qui choisit le bon resto", scores: s({ vinumnoctis: 3, shamrock: 1 }) },
      { text: "Celui/celle qui met l'ambiance", scores: s({ transmission: 3, fetemusique: 1 }) },
      { text: "Celui/celle qui organise tout", scores: s({ rcpa: 3, shamrock: 1 }) },
      { text: "Celui/celle qui propose un plan inattendu", scores: s({ shamrock: 3, fetemusique: 1 }) },
    ],
  },
  {
    question: "Ta soirée parfaite ?",
    answers: [
      { text: "Dégustation dans un lieu intimiste", scores: s({ vinumnoctis: 3, transmission: 1 }) },
      { text: "Concert dans une salle mythique", scores: s({ transmission: 3, fetemusique: 1 }) },
      { text: "Apéro en terrasse au coucher du soleil", scores: s({ fetemusique: 3, shamrock: 1 }) },
      { text: "Soirée sportive entre potes", scores: s({ rcpa: 3, vinumnoctis: 1 }) },
    ],
  },
  {
    question: "Qu'est-ce qui te fait vibrer ?",
    answers: [
      { text: "Découvrir un nouveau cru exceptionnel", scores: s({ vinumnoctis: 3, shamrock: 1 }) },
      { text: "Le drop d'un morceau qui envoie", scores: s({ transmission: 3, rcpa: 1 }) },
      { text: "Un moment imprévu qui devient magique", scores: s({ shamrock: 2, fetemusique: 2 }) },
      { text: "L'énergie collective d'un groupe soudé", scores: s({ rcpa: 3, transmission: 1 }) },
    ],
  },
  {
    question: "On te propose un week-end surprise. Tu espères...",
    answers: [
      { text: "Un domaine viticole dans le Sud", scores: s({ vinumnoctis: 3, fetemusique: 1 }) },
      { text: "Un festival immersif", scores: s({ transmission: 3, shamrock: 1 }) },
      { text: "Un road trip sans itinéraire", scores: s({ shamrock: 3, fetemusique: 1 }) },
      { text: "Un tournoi sportif avec les copains", scores: s({ rcpa: 3, transmission: 1 }) },
    ],
  },
  {
    question: "Ta qualité principale ?",
    answers: [
      { text: "Mon sens du détail", scores: s({ vinumnoctis: 3, transmission: 1 }) },
      { text: "Mon énergie communicative", scores: s({ fetemusique: 3, rcpa: 1 }) },
      { text: "Ma curiosité sans limite", scores: s({ shamrock: 3, vinumnoctis: 1 }) },
      { text: "Ma loyauté envers mes proches", scores: s({ rcpa: 3, fetemusique: 1 }) },
    ],
  },
  {
    question: "Choisis un mot.",
    answers: [
      { text: "Élégance", scores: s({ vinumnoctis: 3, transmission: 1 }) },
      { text: "Frissons", scores: s({ transmission: 3, shamrock: 1 }) },
      { text: "Liberté", scores: s({ fetemusique: 2, shamrock: 2 }) },
      { text: "Fraternité", scores: s({ rcpa: 3, vinumnoctis: 1 }) },
    ],
  },
];

export const eventQuizConfig: QuizConfig = {
  questions,
  results: eventResults,
  title: "Quel événement Episteme es-tu ?",
  subtitle: "par Episteme",
  description: "6 questions pour découvrir quel événement te correspond.",
  emoji: "🎭",
  shareFileName: "quel-event-episteme-es-tu",
  shareCta: "Et toi, quel événement es-tu ?",
  resultBasePath: "/quiz/events/result",
};
