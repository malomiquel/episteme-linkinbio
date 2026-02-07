"use client";

import { useState, useCallback, useRef } from "react";
import { toPng } from "html-to-image";
import {
  questions,
  results,
  calculateResult,
  type WineProfile,
} from "../config/quiz";

type Stage = "intro" | "question" | "result";

function track(event: string, data?: Record<string, string>) {
  window.umami?.track(event, data);
}

export function Quiz() {
  const [stage, setStage] = useState<Stage>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState<Record<WineProfile, number>>({
    bordeaux: 0,
    champagne: 0,
    rhone: 0,
    sancerre: 0,
    chateauneuf: 0,
  });
  const [fade, setFade] = useState(false);
  const [resultProfile, setResultProfile] = useState<WineProfile>("bordeaux");
  const [sharing, setSharing] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const transition = useCallback((fn: () => void) => {
    setFade(true);
    setTimeout(() => {
      fn();
      setFade(false);
    }, 300);
  }, []);

  function handleStart() {
    track("quiz_started");
    transition(() => setStage("question"));
  }

  function handleAnswer(answerScores: Partial<Record<WineProfile, number>>, answerText: string) {
    track("quiz_answer", {
      question: questions[currentQ].question,
      answer: answerText,
    });

    const newScores = { ...scores };
    for (const [key, value] of Object.entries(answerScores)) {
      newScores[key as WineProfile] += value ?? 0;
    }
    setScores(newScores);

    if (currentQ < questions.length - 1) {
      transition(() => setCurrentQ(currentQ + 1));
    } else {
      const winner = calculateResult(newScores);
      setResultProfile(winner);
      track("quiz_completed", { result: results[winner].name });
      transition(() => setStage("result"));
    }
  }

  function handleRestart() {
    track("quiz_restarted");
    transition(() => {
      setStage("intro");
      setCurrentQ(0);
      setScores({
        bordeaux: 0,
        champagne: 0,
        rhone: 0,
        sancerre: 0,
        chateauneuf: 0,
      });
    });
  }

  async function handleShare() {
    if (!cardRef.current || sharing) return;
    setSharing(true);

    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 3,
        cacheBust: true,
      });

      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const file = new File([blob], "quel-vin-es-tu.png", { type: "image/png" });

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        track("quiz_shared", { method: "native", result: result.name });
        await navigator.share({
          files: [file],
          title: "Quel vin es-tu ?",
          text: "Découvre quel vin tu es ! 🍷 @asso_episteme",
        });
      } else {
        track("quiz_shared", { method: "download", result: result.name });
        const link = document.createElement("a");
        link.download = "quel-vin-es-tu.png";
        link.href = dataUrl;
        link.click();
      }
    } catch (err) {
      if ((err as Error)?.name !== "AbortError") {
        try {
          const dataUrl = await toPng(cardRef.current, { pixelRatio: 3 });
          const link = document.createElement("a");
          link.download = "quel-vin-es-tu.png";
          link.href = dataUrl;
          link.click();
        } catch {
          // silent fail
        }
      }
    } finally {
      setSharing(false);
    }
  }

  const result = results[resultProfile];

  return (
    <div
      className={`w-full max-w-md mx-auto transition-opacity duration-300 ${fade ? "opacity-0" : "opacity-100"}`}
    >
      {/* Intro */}
      {stage === "intro" && (
        <div className="text-center">
          <div className="text-6xl mb-6">🍷</div>
          <h1 className="font-(family-name:--font-playfair) text-3xl font-bold text-cream mb-3">
            Quel vin es-tu ?
          </h1>
          <p className="text-cream/50 text-sm mb-2">par Episteme</p>
          <p className="text-cream/40 text-sm mb-8 max-w-xs mx-auto">
            6 questions pour découvrir quel vin correspond à ta personnalité.
          </p>
          <button
            onClick={handleStart}
            className="bg-gold text-dark px-8 py-3.5 rounded-full font-semibold text-sm transition-all hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(201,168,76,0.25)] cursor-pointer"
          >
            Commencer le quiz
          </button>
        </div>
      )}

      {/* Questions */}
      {stage === "question" && (
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="flex-1 h-1 bg-cream/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gold rounded-full transition-all duration-500"
                style={{
                  width: `${((currentQ + 1) / questions.length) * 100}%`,
                }}
              />
            </div>
            <span className="text-xs text-cream/30 tabular-nums whitespace-nowrap">
              {currentQ + 1}/{questions.length}
            </span>
          </div>

          <h2 className="font-(family-name:--font-playfair) text-2xl font-bold text-cream text-center mb-8">
            {questions[currentQ].question}
          </h2>

          <div className="flex flex-col gap-3">
            {questions[currentQ].answers.map((answer, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(answer.scores, answer.text)}
                className="w-full text-left bg-dark-card/80 border border-cream/8 rounded-2xl p-4 text-cream/90 text-[15px] transition-all duration-200 hover:border-gold/40 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,0,0,0.3)] cursor-pointer backdrop-blur-sm active:scale-[0.98]"
              >
                {answer.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Result */}
      {stage === "result" && (
        <div className="text-center">
          <div
            ref={cardRef}
            className="rounded-3xl p-8 mb-6 border border-cream/10"
            style={{ background: result.color }}
          >
            <p
              className="text-xs uppercase tracking-[3px] mb-4"
              style={{ color: result.accent }}
            >
              Tu es un
            </p>
            <div className="text-5xl mb-4">{result.emoji}</div>
            <h2 className="font-(family-name:--font-playfair) text-3xl font-bold mb-1 text-cream">
              {result.name}
            </h2>
            <p
              className="font-(family-name:--font-playfair) italic text-lg mb-5"
              style={{ color: result.accent }}
            >
              {result.title}
            </p>
            <p className="text-sm text-cream/60 leading-relaxed mb-6 max-w-xs mx-auto">
              {result.description}
            </p>
            <div className="flex justify-center gap-2 flex-wrap">
              {result.traits.map((trait) => (
                <span
                  key={trait}
                  className="text-xs px-3 py-1.5 rounded-full border"
                  style={{
                    borderColor: result.accent + "40",
                    color: result.accent,
                  }}
                >
                  {trait}
                </span>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-cream/8">
              <p className="text-[11px] text-cream/25 tracking-wide">
                @asso_episteme
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={handleShare}
              disabled={sharing}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] text-white px-7 py-3 rounded-full font-semibold text-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(225,48,108,0.3)] cursor-pointer disabled:opacity-50 disabled:cursor-wait"
            >
              {sharing ? (
                "Préparation..."
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  Partager en story
                </>
              )}
            </button>

            <a
              href="https://www.instagram.com/asso_episteme/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("quiz_follow_instagram", { result: result.name })}
              className="inline-flex items-center justify-center gap-2 bg-gold text-dark px-7 py-3 rounded-full font-semibold text-sm transition-all hover:bg-gold-light hover:-translate-y-0.5 cursor-pointer"
            >
              Suivre Episteme sur Instagram
            </a>

            <button
              onClick={handleRestart}
              className="text-cream/40 text-sm py-2 transition-colors hover:text-cream cursor-pointer"
            >
              Refaire le quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
