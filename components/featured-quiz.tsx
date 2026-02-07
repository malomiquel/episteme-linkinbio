"use client";

import { useEffect, useState } from "react";

interface FeaturedQuizData {
  id: string;
  emoji: string;
  title: string;
  label: string;
  description: string;
}

export function FeaturedQuiz() {
  const [quiz, setQuiz] = useState<FeaturedQuizData | null>(null);

  useEffect(() => {
    fetch("/api/admin/featured")
      .then((r) => r.json())
      .then((res) => {
        const { featured, quizzes } = res;
        if (!featured.quizId) return;

        const now = new Date();
        if (featured.from && now < new Date(featured.from)) return;
        if (featured.until && now > new Date(featured.until)) return;

        const match = quizzes.find(
          (q: FeaturedQuizData) => q.id === featured.quizId,
        );
        if (match) setQuiz(match);
      })
      .catch(() => {});
  }, []);

  if (!quiz) return null;

  return (
    <a
      href={`/quiz/${quiz.id}`}
      data-umami-event="link_click"
      data-umami-event-title={`${quiz.label} - ${quiz.title}`}
      className="w-full group flex items-center gap-4 rounded-2xl p-4 mb-6 border border-gold/25 bg-gradient-to-r from-wine-dark/60 to-wine/40 backdrop-blur-sm transition-all duration-300 hover:border-gold/50 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(201,168,76,0.15)] animate-fade-in-up"
      style={{ animationDelay: "200ms" }}
    >
      <div className="w-11 h-11 rounded-xl bg-gold/15 flex items-center justify-center text-xl shrink-0">
        {quiz.emoji}
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-[15px] font-semibold text-cream/90">
            {quiz.title}
          </h3>
          <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-gold/20 text-gold">
            {quiz.label}
          </span>
        </div>
        <p className="text-xs text-cream/35">{quiz.description}</p>
      </div>
      <span className="ml-auto text-gold/40 text-lg transition-all duration-300 group-hover:text-gold group-hover:translate-x-0.5">
        ›
      </span>
    </a>
  );
}
