"use client";

import { useRef, useState, forwardRef } from "react";
import { toPng } from "html-to-image";

const EMOJIS = ["🍷", "🎵", "🎨", "🧀", "🥂", "🔥", "⚡", "🎭", "🎶", "🍇"];

export default function StoryPage() {
  const storyRef = useRef<HTMLDivElement>(null);
  const [generating, setGenerating] = useState(false);
  const [title, setTitle] = useState("Quel vin es-tu ?");
  const [subtitle, setSubtitle] = useState("Découvre ton profil");
  const [emoji, setEmoji] = useState("🍷");
  const [label, setLabel] = useState("Nouveau quiz");

  async function handleDownload() {
    if (!storyRef.current || generating) return;
    setGenerating(true);

    try {
      const dataUrl = await toPng(storyRef.current, {
        pixelRatio: 3,
        cacheBust: true,
      });
      const link = document.createElement("a");
      link.download = `episteme-story-${title.toLowerCase().replace(/\s+/g, "-")}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      if ((err as Error)?.name !== "AbortError") {
        try {
          const dataUrl = await toPng(storyRef.current!, { pixelRatio: 3 });
          const link = document.createElement("a");
          link.download = "episteme-story.png";
          link.href = dataUrl;
          link.click();
        } catch {
          // silent fail
        }
      }
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div className="min-h-screen bg-dark flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 p-6 lg:p-12">
      {/* Controls */}
      <div className="w-full max-w-sm flex flex-col gap-5 lg:sticky lg:top-12">
        <h1 className="font-(family-name:--font-playfair) text-2xl font-bold text-cream">
          Générateur de story
        </h1>

        <div>
          <label className="text-xs text-cream/40 uppercase tracking-wider mb-1.5 block">
            Badge
          </label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full bg-dark-card/80 border border-cream/10 rounded-xl px-4 py-3 text-cream text-sm outline-none focus:border-gold/40 transition-colors"
            placeholder="Nouveau quiz"
          />
        </div>

        <div>
          <label className="text-xs text-cream/40 uppercase tracking-wider mb-1.5 block">
            Titre du jeu / quiz
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-dark-card/80 border border-cream/10 rounded-xl px-4 py-3 text-cream text-sm outline-none focus:border-gold/40 transition-colors"
            placeholder="Quel vin es-tu ?"
          />
        </div>

        <div>
          <label className="text-xs text-cream/40 uppercase tracking-wider mb-1.5 block">
            Sous-titre
          </label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full bg-dark-card/80 border border-cream/10 rounded-xl px-4 py-3 text-cream text-sm outline-none focus:border-gold/40 transition-colors"
            placeholder="Découvre ton profil"
          />
        </div>

        <div>
          <label className="text-xs text-cream/40 uppercase tracking-wider mb-1.5 block">
            Emoji
          </label>
          <div className="flex flex-wrap gap-2">
            {EMOJIS.map((e) => (
              <button
                key={e}
                onClick={() => setEmoji(e)}
                className={`w-11 h-11 rounded-xl text-xl flex items-center justify-center transition-all cursor-pointer ${
                  emoji === e
                    ? "bg-gold/20 border-2 border-gold/60 scale-110"
                    : "bg-dark-card/80 border border-cream/10 hover:border-cream/25"
                }`}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleDownload}
          disabled={generating}
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] text-white px-8 py-3.5 rounded-full font-semibold text-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(225,48,108,0.3)] cursor-pointer disabled:opacity-50 disabled:cursor-wait mt-2"
        >
          {generating ? "Génération..." : "Télécharger la story"}
        </button>

        <p className="text-cream/20 text-xs text-center">
          Image 1080×1920 — prête pour Instagram Stories
        </p>
      </div>

      {/* Preview */}
      <div className="origin-top scale-[0.4] sm:scale-[0.5] lg:scale-[0.45]">
        <StoryContent
          ref={storyRef}
          title={title}
          subtitle={subtitle}
          emoji={emoji}
          label={label}
        />
      </div>
    </div>
  );
}

interface StoryContentProps {
  title: string;
  subtitle: string;
  emoji: string;
  label: string;
}

const StoryContent = forwardRef<HTMLDivElement, StoryContentProps>(
  function StoryContent({ title, subtitle, emoji, label }, ref) {
    return (
      <div
        ref={ref}
        className="relative flex flex-col items-center justify-center overflow-hidden"
        style={{
          width: 1080,
          height: 1920,
          background: "#1E0A12",
        }}
      >
        {/* Background layers */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 50% 25%, rgba(80,35,48,0.55) 0%, transparent 60%),
              radial-gradient(ellipse at 50% 70%, rgba(140,58,68,0.14) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 15%, rgba(201,168,76,0.07) 0%, transparent 45%)
            `,
          }}
        />
        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(0,0,0,0.45) 100%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-16">
          {/* Logo */}
          <div className="w-[144px] h-[144px] rounded-full border-[2.5px] border-[#C9A84C]/60 overflow-hidden shadow-[0_0_50px_rgba(201,168,76,0.1)]">
            <img
              src="/logo.svg"
              alt="Episteme"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Handle */}
          <p className="font-(family-name:--font-inter) text-[24px] text-[#C9A84C]/60 mt-10 tracking-wide">
            @asso_episteme
          </p>

          {/* Badge */}
          <div className="mt-16 mb-6">
            <span className="font-(family-name:--font-inter) text-[20px] uppercase tracking-[5px] font-semibold px-8 py-3 rounded-full border-[1.5px] border-[#C9A84C]/30 text-[#C9A84C]/80">
              {label}
            </span>
          </div>

          {/* Emoji */}
          <div className="text-[96px] mt-8 leading-none">{emoji}</div>

          {/* Title */}
          <h1 className="font-(family-name:--font-playfair) text-[72px] font-bold text-[#F5F0E8] leading-tight mt-10">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="font-(family-name:--font-playfair) italic text-[36px] text-[#E8D48B]/70 mt-6">
            {subtitle}
          </p>

          {/* Separator */}
          <div className="flex items-center gap-4 mt-14">
            <div className="w-[140px] h-px bg-[#C9A84C]/25" />
            <div
              className="w-3 h-3 rotate-45 border border-[#C9A84C]/40"
              style={{ borderWidth: 1.5 }}
            />
            <div className="w-[140px] h-px bg-[#C9A84C]/25" />
          </div>

          {/* Espace libre pour sticker lien Instagram */}
          <div className="mt-10 h-[140px] flex items-center">
            <p className="font-(family-name:--font-inter) text-[22px] text-[#C9A84C]/30 tracking-wider">
              Lien dans la bio
            </p>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="absolute bottom-[140px] flex items-center gap-3">
          <div className="w-10 h-px bg-[#C9A84C]/15" />
          <div className="w-2 h-2 rotate-45 bg-[#C9A84C]/15" />
          <div className="w-10 h-px bg-[#C9A84C]/15" />
        </div>
      </div>
    );
  },
);
