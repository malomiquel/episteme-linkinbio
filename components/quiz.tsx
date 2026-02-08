"use client";

import { useState, useCallback, useRef } from "react";
import { toPng } from "html-to-image";
import { type QuizConfig, wineQuizConfig } from "../config/quiz";
import { ResultCard } from "./result-card";

type Stage = "intro" | "question" | "result";

function track(event: string, data?: Record<string, string>) {
  window.umami?.track(event, data);
}

interface QuizProps {
  config?: QuizConfig;
}

export function Quiz({ config = wineQuizConfig }: QuizProps) {
  const profiles = Object.keys(config.results);
  const initialScores = Object.fromEntries(profiles.map((k) => [k, 0]));

  const [stage, setStage] = useState<Stage>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>(initialScores);
  const [fade, setFade] = useState(false);
  const [resultProfile, setResultProfile] = useState(profiles[0]);
  const [sharing, setSharing] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareRef = useRef<HTMLDivElement>(null);

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

  function handleAnswer(
    answerScores: Record<string, number>,
    answerText: string,
  ) {
    track("quiz_answer", {
      question: config.questions[currentQ].question,
      answer: answerText,
      step: String(currentQ + 1),
    });

    const newScores = { ...scores };
    for (const [key, value] of Object.entries(answerScores)) {
      newScores[key] = (newScores[key] ?? 0) + (value ?? 0);
    }
    setScores(newScores);

    if (currentQ < config.questions.length - 1) {
      transition(() => setCurrentQ(currentQ + 1));
    } else {
      let max = 0;
      let winner = profiles[0];
      for (const [key, value] of Object.entries(newScores)) {
        if (value > max) {
          max = value;
          winner = key;
        }
      }
      setResultProfile(winner);
      track("quiz_completed", {
        result: config.results[winner].name,
        profile: winner,
      });
      transition(() => setStage("result"));
    }
  }

  function handleRestart() {
    track("quiz_restarted", { previous_result: resultProfile });
    setCopied(false);
    transition(() => {
      setStage("intro");
      setCurrentQ(0);
      setScores(Object.fromEntries(profiles.map((k) => [k, 0])));
    });
  }

  async function handleCopyLink() {
    const url = `${window.location.origin}${config.resultBasePath}/${resultProfile}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      track("quiz_link_copied", {
        result: result.name,
        profile: resultProfile,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  async function handleShare() {
    if (!shareRef.current || sharing) return;
    setSharing(true);

    const shareUrl = `${window.location.origin}${config.resultBasePath}/${resultProfile}`;
    const shareText = `Je suis ${result.name} (${result.title}) ! Fais le quiz :`;

    try {
      const dataUrl = await toPng(shareRef.current, {
        pixelRatio: 2,
        cacheBust: true,
      });

      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const file = new File([blob], `${config.shareFileName}.png`, {
        type: "image/png",
      });

      // Try native share with image
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        track("quiz_shared", {
          method: "native",
          result: result.name,
          profile: resultProfile,
        });
        await navigator.share({
          files: [file],
          title: `Je suis ${result.name} !`,
          text: shareText,
          url: shareUrl,
        });
        return;
      }

      // Native share without image (Android fallback)
      if (navigator.share) {
        track("quiz_shared", {
          method: "native_no_image",
          result: result.name,
          profile: resultProfile,
        });
        await navigator.share({
          title: `Je suis ${result.name} !`,
          text: shareText,
          url: shareUrl,
        });
        return;
      }

      // Desktop fallback: download image
      track("quiz_shared", {
        method: "download",
        result: result.name,
        profile: resultProfile,
      });
      const link = document.createElement("a");
      link.download = `${config.shareFileName}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      if ((err as Error)?.name === "AbortError") return;

      // Image generation failed — try share without image
      if (navigator.share) {
        try {
          track("quiz_shared", {
            method: "native_no_image",
            result: result.name,
            profile: resultProfile,
          });
          await navigator.share({
            title: `Je suis ${result.name} !`,
            text: shareText,
            url: shareUrl,
          });
          return;
        } catch (e) {
          if ((e as Error)?.name === "AbortError") return;
        }
      }

      // Last resort: try download again
      try {
        const dataUrl = await toPng(shareRef.current!, { pixelRatio: 2 });
        const link = document.createElement("a");
        link.download = `${config.shareFileName}.png`;
        link.href = dataUrl;
        link.click();
      } catch {}
    } finally {
      setSharing(false);
    }
  }

  const result = config.results[resultProfile];

  return (
    <div
      className={`w-full max-w-md mx-auto transition-opacity duration-300 ${fade ? "opacity-0" : "opacity-100"}`}
    >
            {stage === "intro" && (
        <div className="text-center">
          <div className="text-6xl mb-6">{config.emoji}</div>
          <h1 className="font-(family-name:--font-playfair) text-3xl font-bold text-cream mb-3">
            {config.title}
          </h1>
          <p className="text-cream/50 text-sm mb-2">{config.subtitle}</p>
          <p className="text-cream/40 text-sm mb-8 max-w-xs mx-auto">
            {config.description}
          </p>
          <button
            onClick={handleStart}
            className="bg-gold text-dark px-8 py-3.5 rounded-full font-semibold text-sm transition-all hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(201,168,76,0.25)] cursor-pointer"
          >
            Commencer le quiz
          </button>
        </div>
      )}

            {stage === "question" && (
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="flex-1 h-1 bg-cream/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gold rounded-full transition-all duration-500"
                style={{
                  width: `${((currentQ + 1) / config.questions.length) * 100}%`,
                }}
              />
            </div>
            <span className="text-xs text-cream/30 tabular-nums whitespace-nowrap">
              {currentQ + 1}/{config.questions.length}
            </span>
          </div>

          <h2 className="font-(family-name:--font-playfair) text-2xl font-bold text-cream text-center mb-8">
            {config.questions[currentQ].question}
          </h2>

          <div className="flex flex-col gap-3">
            {config.questions[currentQ].answers.map((answer, i) => (
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

            {stage === "result" && (
        <div className="text-center">
          <div style={{ position: "fixed", left: -9999, top: -9999 }}>
            <div
              ref={shareRef}
              style={{
                width: 360,
                height: 640,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "32px 28px 80px 28px",
                background: `
                  radial-gradient(circle at 50% 35%, ${result.accent}18 0%, transparent 50%),
                  radial-gradient(circle at 50% 50%, transparent 40%, rgba(0,0,0,0.3) 100%),
                  ${result.color}
                `,
              }}
            >
              <div
                style={{ transform: "scale(0.82)", transformOrigin: "center" }}
              >
                <ResultCard result={result} />
              </div>
              <div style={{ marginTop: 20, textAlign: "center" }}>
                <p
                  style={{
                    color: result.accent,
                    fontSize: 16,
                    fontWeight: 600,
                    fontFamily: "var(--font-playfair)",
                    marginBottom: 6,
                  }}
                >
                  {config.shareCta}
                </p>
                <p
                  style={{
                    color: "rgba(245,240,232,0.25)",
                    fontSize: 14,
                    letterSpacing: "1.5px",
                  }}
                >
                  @asso_episteme
                </p>
              </div>
            </div>
          </div>

                    <ResultCard result={result} />

          <div className="flex flex-col gap-3 mt-6">
            <button
              onClick={handleShare}
              disabled={sharing}
              className="inline-flex items-center justify-center gap-2 bg-linear-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] text-white px-7 py-3 rounded-full font-semibold text-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(225,48,108,0.3)] cursor-pointer disabled:opacity-50 disabled:cursor-wait"
            >
              {sharing ? (
                "Préparation..."
              ) : (
                <>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  Partager en story
                </>
              )}
            </button>
            <p className="text-cream/30 text-xs">
              N&apos;oublie pas de nous taguer @asso_episteme !
            </p>

            <button
              onClick={handleCopyLink}
              className="inline-flex items-center justify-center gap-2 bg-dark-card/80 border border-cream/8 text-cream/80 px-7 py-3 rounded-full font-semibold text-sm transition-all hover:border-gold/40 hover:-translate-y-0.5 cursor-pointer backdrop-blur-sm"
            >
              {copied ? (
                "Lien copié !"
              ) : (
                <>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                  Copier le lien de mon résultat
                </>
              )}
            </button>

            <a
              href="https://www.instagram.com/asso_episteme/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                track("quiz_follow_instagram", {
                  result: result.name,
                  profile: resultProfile,
                })
              }
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
