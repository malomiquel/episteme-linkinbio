import { wineQuizConfig } from "./quiz";
import { accordQuizConfig } from "./quiz-accords";
import type { QuizConfig } from "./quiz";

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
    path: "/quiz/vin",
    label: "Nouveau quiz",
    emoji: "🍷",
    title: "Quel vin es-tu ?",
    description: "Découvre quel vin correspond à ta personnalité",
  },
  accords: {
    id: "accords",
    config: accordQuizConfig,
    path: "/quiz/accords",
    label: "Quiz",
    emoji: "🍽️",
    title: "Quel accord mets-vin es-tu ?",
    description: "Découvre quel accord mets-vin te correspond",
  },
};
