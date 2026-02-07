import type { QuizConfig, WineResult } from "./quiz";

export type AccordProfile = "foiegras" | "fromage" | "sushi" | "entrecote" | "chocolat";

export const accordResults: Record<AccordProfile, WineResult> = {
  foiegras: {
    name: "Foie gras & Sauternes",
    emoji: "✨",
    title: "L'Épicurien(ne)",
    description:
      "Comme l'accord foie gras-Sauternes, tu recherches l'excellence et le raffinement. Tu apprécies les choses rares, les moments suspendus, et tu sais reconnaître la qualité au premier regard.",
    traits: ["Raffiné(e)", "Exigeant(e)", "Élégant(e)"],
    color: "#3D2E10",
    accent: "#E8C547",
  },
  fromage: {
    name: "Fromage & Bordeaux",
    emoji: "🏡",
    title: "Le/La Classique",
    description:
      "Comme le fromage et le Bordeaux, tu es un incontournable. Fiable, chaleureux(se) et ancré(e) dans les traditions, tu rassembles autour de toi avec une simplicité qui fait ta force.",
    traits: ["Authentique", "Chaleureux(se)", "Fiable"],
    color: "#3B1520",
    accent: "#D4A574",
  },
  sushi: {
    name: "Sushi & Champagne",
    emoji: "🌊",
    title: "Le/La Créatif(ve)",
    description:
      "Comme cet accord surprenant, tu adores sortir des sentiers battus. Curieux(se) et moderne, tu mélanges les genres avec audace et tu transforms chaque moment en expérience unique.",
    traits: ["Audacieux(se)", "Moderne", "Surprenant(e)"],
    color: "#0F2B2E",
    accent: "#7EC8B8",
  },
  entrecote: {
    name: "Entrecôte & Côtes-du-Rhône",
    emoji: "🔥",
    title: "Le/La Généreux(se)",
    description:
      "Comme une belle entrecôte avec un Côtes-du-Rhône, tu es généreux(se), franc(he) et convivial(e). Autour de toi, tout est simple, chaleureux et les portions sont toujours copieuses.",
    traits: ["Généreux(se)", "Convivial(e)", "Franc(he)"],
    color: "#2E1810",
    accent: "#E07A5F",
  },
  chocolat: {
    name: "Chocolat noir & Porto",
    emoji: "🌙",
    title: "Le/La Passionné(e)",
    description:
      "Comme le mariage intense du chocolat noir et du Porto, tu vis tout avec passion et profondeur. Derrière ta douceur se cache une personnalité riche, complexe et envoûtante.",
    traits: ["Passionné(e)", "Intense", "Envoûtant(e)"],
    color: "#1E0F28",
    accent: "#C4A0D4",
  },
};

const s = (scores: Partial<Record<AccordProfile, number>>): Record<string, number> =>
  scores as Record<string, number>;

const questions = [
  {
    question: "Ton week-end idéal ?",
    answers: [
      { text: "Brunch dans un bel endroit", scores: s({ foiegras: 3, sushi: 1 }) },
      { text: "Marché du dimanche et cuisine maison", scores: s({ fromage: 3, entrecote: 1 }) },
      { text: "Découvrir un nouveau restaurant", scores: s({ sushi: 3, foiegras: 1 }) },
      { text: "Barbecue entre amis", scores: s({ entrecote: 3, fromage: 1 }) },
    ],
  },
  {
    question: "Comment tu choisis un resto ?",
    answers: [
      { text: "Par la carte des vins", scores: s({ foiegras: 3, fromage: 1 }) },
      { text: "Sur recommandation d'un ami", scores: s({ fromage: 2, entrecote: 2 }) },
      { text: "Je teste les nouveautés", scores: s({ sushi: 3, chocolat: 1 }) },
      { text: "L'ambiance avant tout", scores: s({ chocolat: 3, sushi: 1 }) },
    ],
  },
  {
    question: "Ta saison préférée ?",
    answers: [
      { text: "L'automne et ses couleurs", scores: s({ foiegras: 2, chocolat: 2 }) },
      { text: "L'été et ses apéros", scores: s({ entrecote: 3, fromage: 1 }) },
      { text: "Le printemps et sa fraîcheur", scores: s({ sushi: 3, foiegras: 1 }) },
      { text: "L'hiver au coin du feu", scores: s({ chocolat: 3, entrecote: 1 }) },
    ],
  },
  {
    question: "On t'offre un cadeau, tu préfères...",
    answers: [
      { text: "Un coffret dégustation premium", scores: s({ foiegras: 3, chocolat: 1 }) },
      { text: "Un livre de recettes de chef", scores: s({ fromage: 3, sushi: 1 }) },
      { text: "Un cours de cuisine fusion", scores: s({ sushi: 3, entrecote: 1 }) },
      { text: "Un dîner mystère surprise", scores: s({ chocolat: 2, entrecote: 2 }) },
    ],
  },
  {
    question: "Ta philosophie à table ?",
    answers: [
      { text: "La qualité avant la quantité", scores: s({ foiegras: 3, sushi: 1 }) },
      { text: "Le partage avant tout", scores: s({ entrecote: 3, fromage: 1 }) },
      { text: "Oser de nouvelles saveurs", scores: s({ sushi: 2, chocolat: 2 }) },
      { text: "Se faire plaisir sans compter", scores: s({ chocolat: 3, fromage: 1 }) },
    ],
  },
  {
    question: "Choisis un mot.",
    answers: [
      { text: "Excellence", scores: s({ foiegras: 3, fromage: 1 }) },
      { text: "Authenticité", scores: s({ fromage: 3, entrecote: 1 }) },
      { text: "Découverte", scores: s({ sushi: 3, foiegras: 1 }) },
      { text: "Plaisir", scores: s({ chocolat: 3, entrecote: 1 }) },
    ],
  },
];

export const accordQuizConfig: QuizConfig = {
  questions,
  results: accordResults,
  title: "Quel accord mets-vin es-tu ?",
  subtitle: "par Episteme",
  description: "6 questions pour découvrir quel accord mets-vin te correspond.",
  emoji: "🍽️",
  shareFileName: "quel-accord-es-tu",
  shareCta: "Et toi, quel accord es-tu ?",
  resultBasePath: "/quiz/accords/result",
};
