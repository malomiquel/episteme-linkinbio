"use client";

import { useRef, useState, forwardRef } from "react";
import { toPng } from "html-to-image";

const PRESETS = [
  { emoji: "🍷", label: "Vins" },
  { emoji: "🎵", label: "Musique" },
  { emoji: "🎨", label: "Art" },
  { emoji: "📅", label: "Événements" },
  { emoji: "🧠", label: "Quiz" },
  { emoji: "❓", label: "FAQ" },
  { emoji: "🎬", label: "Coulisses" },
  { emoji: "📸", label: "Photos" },
  { emoji: "🧀", label: "Dégustations" },
  { emoji: "💡", label: "Le saviez-vous" },
  { emoji: "🏆", label: "Partenaires" },
  { emoji: "👋", label: "À propos" },
];

const STYLES = [
  {
    name: "Classique",
    bg: "radial-gradient(circle at 50% 50%, rgba(80,35,48,0.6) 0%, #1E0A12 100%)",
    accent: "rgba(201,168,76,0.35)",
    ring: "rgba(201,168,76,0.4)",
  },
  {
    name: "Or",
    bg: "radial-gradient(circle at 50% 50%, rgba(201,168,76,0.15) 0%, #1E0A12 100%)",
    accent: "rgba(201,168,76,0.2)",
    ring: "rgba(201,168,76,0.5)",
  },
  {
    name: "Pourpre",
    bg: "radial-gradient(circle at 50% 50%, rgba(140,58,68,0.4) 0%, #1E0A12 100%)",
    accent: "rgba(140,58,68,0.3)",
    ring: "rgba(140,58,68,0.5)",
  },
  {
    name: "Nuit",
    bg: "radial-gradient(circle at 50% 50%, rgba(30,20,40,0.8) 0%, #1E0A12 100%)",
    accent: "rgba(201,168,76,0.12)",
    ring: "rgba(201,168,76,0.3)",
  },
];

export default function HighlightCoversPage() {
  const coverRef = useRef<HTMLDivElement>(null);
  const [generating, setGenerating] = useState(false);
  const [emoji, setEmoji] = useState("🍷");
  const [label, setLabel] = useState("Vins");
  const [styleIdx, setStyleIdx] = useState(0);

  async function handleDownload() {
    if (!coverRef.current || generating) return;
    setGenerating(true);
    try {
      const dataUrl = await toPng(coverRef.current, {
        pixelRatio: 3,
        cacheBust: true,
      });
      const link = document.createElement("a");
      link.download = `episteme-highlight-${label.toLowerCase().replace(/\s+/g, "-")}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      if ((err as Error)?.name !== "AbortError") {
        try {
          const dataUrl = await toPng(coverRef.current!, { pixelRatio: 3 });
          const link = document.createElement("a");
          link.download = "episteme-highlight.png";
          link.href = dataUrl;
          link.click();
        } catch {}
      }
    } finally {
      setGenerating(false);
    }
  }

  async function handleDownloadAll() {
    if (generating) return;
    setGenerating(true);
    try {
      for (const preset of PRESETS) {
        setEmoji(preset.emoji);
        setLabel(preset.label);
        // wait for React to re-render
        await new Promise((r) => setTimeout(r, 150));
        if (!coverRef.current) continue;
        const dataUrl = await toPng(coverRef.current, {
          pixelRatio: 3,
          cacheBust: true,
        });
        const link = document.createElement("a");
        link.download = `episteme-highlight-${preset.label.toLowerCase().replace(/\s+/g, "-")}.png`;
        link.href = dataUrl;
        link.click();
        await new Promise((r) => setTimeout(r, 300));
      }
    } catch {} finally {
      setGenerating(false);
    }
  }

  return (
    <div className="min-h-screen bg-dark flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 p-6 lg:p-12">
      <div className="w-full max-w-sm flex flex-col gap-5 lg:sticky lg:top-12">
        <a
          href="/admin"
          className="flex items-center gap-2 text-sm text-cream/50 hover:text-cream transition-colors w-fit"
        >
          <span className="text-base leading-none">&larr;</span>
          Retour
        </a>
        <h1 className="font-(family-name:--font-playfair) text-2xl font-bold text-cream">
          Couvertures Highlights
        </h1>
        <p className="text-cream/30 text-xs leading-relaxed -mt-2">
          Icônes rondes pour les stories à la une sur votre profil Instagram.
        </p>

        {/* Presets */}
        <div>
          <label className="text-xs text-cream/40 uppercase tracking-wider mb-2 block">
            Préréglages
          </label>
          <div className="grid grid-cols-4 gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => {
                  setEmoji(p.emoji);
                  setLabel(p.label);
                }}
                className={`flex flex-col items-center gap-1 rounded-xl py-2.5 px-1 text-center transition-all cursor-pointer ${
                  emoji === p.emoji && label === p.label
                    ? "bg-gold/15 border border-gold/40"
                    : "bg-dark-card/80 border border-cream/8 hover:border-cream/20"
                }`}
              >
                <span className="text-lg">{p.emoji}</span>
                <span className="text-[10px] text-cream/60 leading-tight">
                  {p.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Custom */}
        <div className="flex gap-3">
          <div className="w-20">
            <label className="text-xs text-cream/40 uppercase tracking-wider mb-1.5 block">
              Emoji
            </label>
            <input
              type="text"
              value={emoji}
              onChange={(e) => setEmoji(e.target.value)}
              className="w-full bg-dark-card/80 border border-cream/10 rounded-xl px-4 py-3 text-cream text-sm outline-none focus:border-gold/40 transition-colors text-center"
            />
          </div>
          <div className="flex-1">
            <label className="text-xs text-cream/40 uppercase tracking-wider mb-1.5 block">
              Label
            </label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full bg-dark-card/80 border border-cream/10 rounded-xl px-4 py-3 text-cream text-sm outline-none focus:border-gold/40 transition-colors"
            />
          </div>
        </div>

        {/* Style */}
        <div>
          <label className="text-xs text-cream/40 uppercase tracking-wider mb-2 block">
            Style
          </label>
          <div className="flex gap-2">
            {STYLES.map((s, i) => (
              <button
                key={s.name}
                onClick={() => setStyleIdx(i)}
                className={`flex-1 py-2.5 rounded-xl text-[11px] font-medium transition-all cursor-pointer ${
                  styleIdx === i
                    ? "bg-gold/15 border border-gold/40 text-cream"
                    : "bg-dark-card/80 border border-cream/8 text-cream/50 hover:border-cream/20"
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleDownload}
          disabled={generating}
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] text-white px-8 py-3.5 rounded-full font-semibold text-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(225,48,108,0.3)] cursor-pointer disabled:opacity-50 disabled:cursor-wait mt-2"
        >
          {generating ? "Génération..." : "Télécharger"}
        </button>

        <button
          onClick={handleDownloadAll}
          disabled={generating}
          className="inline-flex items-center justify-center gap-2 bg-dark-card/80 border border-cream/10 text-cream/70 px-8 py-3 rounded-full font-semibold text-sm transition-all hover:border-gold/30 hover:text-cream cursor-pointer disabled:opacity-50 disabled:cursor-wait"
        >
          {generating ? "Génération..." : "Tout télécharger (12)"}
        </button>

        <p className="text-cream/20 text-xs text-center">
          Image 1080×1080 — recadrée en cercle par Instagram
        </p>
      </div>

      {/* Preview */}
      <div className="flex flex-col items-center gap-6 lg:sticky lg:top-12">
        {/* Actual render (hidden-ish, shown scaled) */}
        <div className="overflow-hidden shrink-0 h-[378px] w-[378px] sm:h-[432px] sm:w-[432px] lg:h-[432px] lg:w-[432px]">
          <div className="origin-top-left scale-[0.35] sm:scale-[0.4] lg:scale-[0.4]">
            <HighlightCover
              ref={coverRef}
              emoji={emoji}
              label={label}
              style={STYLES[styleIdx]}
            />
          </div>
        </div>

        {/* Circle preview — how it looks on Instagram */}
        <div>
          <p className="text-[10px] text-cream/25 uppercase tracking-widest text-center mb-3">
            Aperçu sur le profil
          </p>
          <div className="flex flex-col items-center gap-2">
            <div
              className="w-20 h-20 rounded-full overflow-hidden border-2 border-cream/10"
              style={{
                background: STYLES[styleIdx].bg,
              }}
            >
              <div className="w-full h-full flex items-center justify-center text-3xl">
                {emoji}
              </div>
            </div>
            <span className="text-[11px] text-cream/50">{label}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface CoverProps {
  emoji: string;
  label: string;
  style: (typeof STYLES)[number];
}

const HighlightCover = forwardRef<HTMLDivElement, CoverProps>(
  function HighlightCover({ emoji, label, style }, ref) {
    return (
      <div
        ref={ref}
        className="relative flex flex-col items-center justify-center overflow-hidden"
        style={{
          width: 1080,
          height: 1080,
          background: style.bg,
        }}
      >
        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, transparent 40%, rgba(0,0,0,0.4) 100%)",
          }}
        />

        {/* Subtle ring */}
        <div
          className="absolute rounded-full"
          style={{
            width: 700,
            height: 700,
            border: `2px solid ${style.ring}`,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Inner glow circle */}
        <div
          className="absolute rounded-full"
          style={{
            width: 480,
            height: 480,
            background: style.accent,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            filter: "blur(60px)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-6">
          <span style={{ fontSize: 220, lineHeight: 1 }}>{emoji}</span>
          <p
            className="font-(family-name:--font-inter) text-[42px] font-semibold uppercase tracking-[6px]"
            style={{ color: "rgba(201,168,76,0.7)" }}
          >
            {label}
          </p>
        </div>

        {/* Corner ornaments */}
        <div
          className="absolute"
          style={{
            width: 60,
            height: 60,
            top: 50,
            left: 50,
            borderTop: `1.5px solid ${style.ring}`,
            borderLeft: `1.5px solid ${style.ring}`,
          }}
        />
        <div
          className="absolute"
          style={{
            width: 60,
            height: 60,
            top: 50,
            right: 50,
            borderTop: `1.5px solid ${style.ring}`,
            borderRight: `1.5px solid ${style.ring}`,
          }}
        />
        <div
          className="absolute"
          style={{
            width: 60,
            height: 60,
            bottom: 50,
            left: 50,
            borderBottom: `1.5px solid ${style.ring}`,
            borderLeft: `1.5px solid ${style.ring}`,
          }}
        />
        <div
          className="absolute"
          style={{
            width: 60,
            height: 60,
            bottom: 50,
            right: 50,
            borderBottom: `1.5px solid ${style.ring}`,
            borderRight: `1.5px solid ${style.ring}`,
          }}
        />
      </div>
    );
  },
);
