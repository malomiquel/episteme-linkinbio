import { wineQuizConfig } from "./quiz";
import { accordQuizConfig } from "./quiz-accords";
import type { QuizConfig } from "./quiz";

// ── Registre des quiz ──
// Ajoute ici chaque nouveau quiz. Le composant Quiz est générique,
// il suffit d'un config + un entry ici pour tout câbler.

export interface QuizEntry {
  id: string;
  config: QuizConfig;
  path: string;
  label: string; // Badge affiché ("Quiz", "Nouveau", "Blind test"…)
  emoji: string;
  title: string; // Titre affiché sur la home
  description: string; // Sous-titre affiché sur la home
}

export const quizzes: Record<string, QuizEntry> = {
  vin: {
    id: "vin",
    config: wineQuizConfig,
    path: "/quiz",
    label: "Quiz",
    emoji: "🍷",
    title: "Quel vin es-tu ?",
    description: "Découvre quel vin correspond à ta personnalité",
  },
  accords: {
    id: "accords",
    config: accordQuizConfig,
    path: "/quiz/accords",
    label: "Nouveau quiz",
    emoji: "🍽️",
    title: "Quel accord mets-vin es-tu ?",
    description: "Découvre quel accord mets-vin te correspond",
  },
};

// ── Quiz mis en avant sur la page d'accueil ──
// Change juste `quizId` et les dates pour switcher.
// Si `until` est passé, le quiz ne s'affiche plus en featured.
// Si `from` est dans le futur, il ne s'affiche pas encore.
// Mets `null` pour ne rien mettre en avant.

export const featured: {
  quizId: string | null;
  from?: string; // Date ISO — optionnel, début de mise en avant
  until?: string; // Date ISO — optionnel, fin de mise en avant
} = {
  quizId: "accords",
  // from: "2026-02-01",
  // until: "2026-04-01",
};

// ── Helper ──

export function getFeaturedQuiz(): QuizEntry | null {
  if (!featured.quizId) return null;

  const now = new Date();

  if (featured.from && now < new Date(featured.from)) return null;
  if (featured.until && now > new Date(featured.until)) return null;

  return quizzes[featured.quizId] ?? null;
}
