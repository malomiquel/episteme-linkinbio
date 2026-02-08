"use client";

import { useRef, useState, forwardRef } from "react";
import { toPng } from "html-to-image";

type SlideType = "cover" | "content" | "cta";

interface Slide {
  id: number;
  type: SlideType;
  // cover
  badge?: string;
  title?: string;
  subtitle?: string;
  emoji?: string;
  // content
  number?: string;
  heading?: string;
  body?: string;
  // cta
  ctaLine1?: string;
  ctaLine2?: string;
  ctaEmoji?: string;
}

let nextId = 1;

function makeSlide(type: SlideType): Slide {
  const id = nextId++;
  if (type === "cover")
    return {
      id,
      type,
      badge: "Culture vin",
      title: "5 choses à savoir\nsur le Bordeaux",
      subtitle: "Swipe pour découvrir →",
      emoji: "🍷",
    };
  if (type === "content")
    return {
      id,
      type,
      number: "01",
      heading: "Le terroir",
      body: "Le Bordeaux tire sa richesse de sols argilo-calcaires uniques qui donnent aux vins leur complexité et leur profondeur.",
    };
  return {
    id,
    type,
    ctaLine1: "Envie d'en savoir plus ?",
    ctaLine2: "Lien dans la bio",
    ctaEmoji: "🔗",
  };
}

const STYLE = {
  bg: "#1E0A12",
  gold: "#C9A84C",
  cream: "#F5F0E8",
  wine: "rgba(140,58,68,1)",
};

export default function CarouselPage() {
  const slideRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const [generating, setGenerating] = useState(false);
  const [slides, setSlides] = useState<Slide[]>([
    makeSlide("cover"),
    makeSlide("content"),
    { ...makeSlide("content"), id: nextId++, number: "02", heading: "Les cépages", body: "Merlot, Cabernet Sauvignon, Cabernet Franc... Le Bordeaux est un art de l'assemblage entre cépages complémentaires." },
    { ...makeSlide("content"), id: nextId++, number: "03", heading: "Le vieillissement", body: "Un grand Bordeaux peut se bonifier pendant des décennies en cave, développant des arômes de cuir, tabac et fruits confits." },
    makeSlide("cta"),
  ]);
  const [activeIdx, setActiveIdx] = useState(0);

  function updateSlide(id: number, patch: Partial<Slide>) {
    setSlides((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    );
  }

  function addSlide(type: SlideType) {
    const s = makeSlide(type);
    if (type === "content") {
      const contentCount = slides.filter((sl) => sl.type === "content").length;
      s.number = String(contentCount + 1).padStart(2, "0");
      s.heading = "Nouveau point";
      s.body = "Contenu de la slide...";
    }
    setSlides((prev) => [...prev, s]);
    setActiveIdx(slides.length);
  }

  function removeSlide(id: number) {
    if (slides.length <= 1) return;
    const idx = slides.findIndex((s) => s.id === id);
    setSlides((prev) => prev.filter((s) => s.id !== id));
    if (activeIdx >= slides.length - 1) setActiveIdx(Math.max(0, slides.length - 2));
    else if (activeIdx > idx) setActiveIdx(activeIdx - 1);
  }

  async function handleDownloadAll() {
    if (generating) return;
    setGenerating(true);
    try {
      for (let i = 0; i < slides.length; i++) {
        setActiveIdx(i);
        await new Promise((r) => setTimeout(r, 200));
        const el = slideRefs.current.get(slides[i].id);
        if (!el) continue;
        const dataUrl = await toPng(el, { pixelRatio: 3, cacheBust: true });
        const link = document.createElement("a");
        link.download = `episteme-carousel-${i + 1}.png`;
        link.href = dataUrl;
        link.click();
        await new Promise((r) => setTimeout(r, 300));
      }
    } catch {} finally {
      setGenerating(false);
    }
  }

  async function handleDownloadOne() {
    if (generating) return;
    setGenerating(true);
    try {
      const el = slideRefs.current.get(slides[activeIdx].id);
      if (!el) return;
      const dataUrl = await toPng(el, { pixelRatio: 3, cacheBust: true });
      const link = document.createElement("a");
      link.download = `episteme-carousel-${activeIdx + 1}.png`;
      link.href = dataUrl;
      link.click();
    } catch {} finally {
      setGenerating(false);
    }
  }

  const active = slides[activeIdx];

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
          Carrousel Instagram
        </h1>
        <p className="text-cream/30 text-xs leading-relaxed -mt-2">
          Crée des slides pour un post carrousel éducatif ou promotionnel.
        </p>

        {/* Slide tabs */}
        <div className="flex gap-1.5 flex-wrap">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActiveIdx(i)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                activeIdx === i
                  ? "bg-gold/20 border border-gold/40 text-cream"
                  : "bg-dark-card/80 border border-cream/8 text-cream/50 hover:border-cream/20"
              }`}
            >
              {s.type === "cover"
                ? "Couverture"
                : s.type === "cta"
                  ? "CTA"
                  : `Slide ${s.number || i}`}
            </button>
          ))}
        </div>

        {/* Add slide */}
        <div className="flex gap-2">
          <button
            onClick={() => addSlide("content")}
            className="flex-1 py-2 rounded-xl bg-dark-card/80 border border-cream/8 text-cream/50 text-xs hover:border-gold/30 hover:text-cream transition-all cursor-pointer"
          >
            + Slide contenu
          </button>
          {!slides.some((s) => s.type === "cta") && (
            <button
              onClick={() => addSlide("cta")}
              className="flex-1 py-2 rounded-xl bg-dark-card/80 border border-cream/8 text-cream/50 text-xs hover:border-gold/30 hover:text-cream transition-all cursor-pointer"
            >
              + Slide CTA
            </button>
          )}
        </div>

        {/* Edit active slide */}
        {active && (
          <div className="flex flex-col gap-4 bg-dark-card/50 border border-cream/5 rounded-2xl p-4">
            {active.type === "cover" && (
              <>
                <Field
                  label="Badge"
                  value={active.badge || ""}
                  onChange={(v) => updateSlide(active.id, { badge: v })}
                />
                <div>
                  <label className="text-xs text-cream/40 uppercase tracking-wider mb-1.5 block">
                    Titre
                  </label>
                  <textarea
                    value={active.title || ""}
                    onChange={(e) =>
                      updateSlide(active.id, { title: e.target.value })
                    }
                    rows={2}
                    className="w-full bg-dark/80 border border-cream/10 rounded-xl px-4 py-3 text-cream text-sm outline-none focus:border-gold/40 transition-colors resize-none"
                  />
                </div>
                <Field
                  label="Sous-titre"
                  value={active.subtitle || ""}
                  onChange={(v) => updateSlide(active.id, { subtitle: v })}
                />
                <Field
                  label="Emoji"
                  value={active.emoji || ""}
                  onChange={(v) => updateSlide(active.id, { emoji: v })}
                  center
                />
              </>
            )}
            {active.type === "content" && (
              <>
                <Field
                  label="Numéro"
                  value={active.number || ""}
                  onChange={(v) => updateSlide(active.id, { number: v })}
                  center
                />
                <Field
                  label="Titre"
                  value={active.heading || ""}
                  onChange={(v) => updateSlide(active.id, { heading: v })}
                />
                <div>
                  <label className="text-xs text-cream/40 uppercase tracking-wider mb-1.5 block">
                    Texte
                  </label>
                  <textarea
                    value={active.body || ""}
                    onChange={(e) =>
                      updateSlide(active.id, { body: e.target.value })
                    }
                    rows={3}
                    className="w-full bg-dark/80 border border-cream/10 rounded-xl px-4 py-3 text-cream text-sm outline-none focus:border-gold/40 transition-colors resize-none"
                  />
                </div>
              </>
            )}
            {active.type === "cta" && (
              <>
                <Field
                  label="Ligne 1"
                  value={active.ctaLine1 || ""}
                  onChange={(v) => updateSlide(active.id, { ctaLine1: v })}
                />
                <Field
                  label="Ligne 2"
                  value={active.ctaLine2 || ""}
                  onChange={(v) => updateSlide(active.id, { ctaLine2: v })}
                />
                <Field
                  label="Emoji"
                  value={active.ctaEmoji || ""}
                  onChange={(v) => updateSlide(active.id, { ctaEmoji: v })}
                  center
                />
              </>
            )}

            {slides.length > 1 && (
              <button
                onClick={() => removeSlide(active.id)}
                className="text-[11px] text-red-400/60 hover:text-red-400 transition-colors cursor-pointer self-end"
              >
                Supprimer cette slide
              </button>
            )}
          </div>
        )}

        <button
          onClick={handleDownloadOne}
          disabled={generating}
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] text-white px-8 py-3.5 rounded-full font-semibold text-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(225,48,108,0.3)] cursor-pointer disabled:opacity-50 disabled:cursor-wait"
        >
          {generating ? "Génération..." : "Télécharger cette slide"}
        </button>

        <button
          onClick={handleDownloadAll}
          disabled={generating}
          className="inline-flex items-center justify-center gap-2 bg-dark-card/80 border border-cream/10 text-cream/70 px-8 py-3 rounded-full font-semibold text-sm transition-all hover:border-gold/30 hover:text-cream cursor-pointer disabled:opacity-50 disabled:cursor-wait"
        >
          {generating
            ? "Génération..."
            : `Tout télécharger (${slides.length} slides)`}
        </button>

        <p className="text-cream/20 text-xs text-center">
          Format 1080×1350 — optimal pour le feed Instagram
        </p>
      </div>

      {/* Preview */}
      <div className="overflow-hidden shrink-0 w-[378px] h-[473px] sm:w-[486px] sm:h-[608px] lg:w-[454px] lg:h-[567px]">
        <div className="origin-top-left scale-[0.35] sm:scale-[0.45] lg:scale-[0.42]">
          {active && (
            <>
              {active.type === "cover" && (
                <CoverSlide
                  ref={(el) => {
                    if (el) slideRefs.current.set(active.id, el);
                  }}
                  badge={active.badge || ""}
                  title={active.title || ""}
                  subtitle={active.subtitle || ""}
                  emoji={active.emoji || ""}
                  slideCount={slides.length}
                />
              )}
              {active.type === "content" && (
                <ContentSlide
                  ref={(el) => {
                    if (el) slideRefs.current.set(active.id, el);
                  }}
                  number={active.number || ""}
                  heading={active.heading || ""}
                  body={active.body || ""}
                />
              )}
              {active.type === "cta" && (
                <CtaSlide
                  ref={(el) => {
                    if (el) slideRefs.current.set(active.id, el);
                  }}
                  line1={active.ctaLine1 || ""}
                  line2={active.ctaLine2 || ""}
                  emoji={active.ctaEmoji || ""}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Field helper ─────────────────────────────────────── */

function Field({
  label,
  value,
  onChange,
  center,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  center?: boolean;
}) {
  return (
    <div>
      <label className="text-xs text-cream/40 uppercase tracking-wider mb-1.5 block">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full bg-dark/80 border border-cream/10 rounded-xl px-4 py-3 text-cream text-sm outline-none focus:border-gold/40 transition-colors ${center ? "text-center" : ""}`}
      />
    </div>
  );
}

/* ── Slide components ─────────────────────────────────── */

const BG = `
  radial-gradient(ellipse at 50% 30%, rgba(80,35,48,0.5) 0%, transparent 60%),
  radial-gradient(ellipse at 50% 80%, rgba(140,58,68,0.1) 0%, transparent 50%),
  radial-gradient(ellipse at 50% 10%, rgba(201,168,76,0.06) 0%, transparent 45%)
`;

const CoverSlide = forwardRef<
  HTMLDivElement,
  { badge: string; title: string; subtitle: string; emoji: string; slideCount: number }
>(function CoverSlide({ badge, title, subtitle, emoji, slideCount }, ref) {
  const titleLines = title.split("\n");
  return (
    <div
      ref={ref}
      className="relative flex flex-col items-center overflow-hidden"
      style={{ width: 1080, height: 1350, background: STYLE.bg }}
    >
      <div className="absolute inset-0" style={{ background: BG }} />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(0,0,0,0.45) 100%)",
        }}
      />

      {/* Corner lines */}
      {corners("rgba(201,168,76,0.2)")}

      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center px-16">
        {/* Logo */}
        <div className="w-[100px] h-[100px] rounded-full border-[2px] border-[#C9A84C]/40 overflow-hidden mb-8">
          <img
            src="/logo.svg"
            alt="Episteme"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Badge */}
        <span className="font-(family-name:--font-inter) text-[20px] uppercase tracking-[5px] font-semibold px-8 py-3 rounded-full border-[1.5px] border-[#C9A84C]/30 text-[#C9A84C]/70 mb-10">
          {badge}
        </span>

        {/* Emoji */}
        <div className="text-[100px] leading-none mb-6">{emoji}</div>

        {/* Title */}
        <h1 className="font-(family-name:--font-playfair) text-[64px] font-bold leading-[1.15]">
          {titleLines.map((line, i) => (
            <span
              key={i}
              className="block"
              style={{ color: i % 2 === 0 ? STYLE.cream : STYLE.gold }}
            >
              {line}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p className="font-(family-name:--font-inter) text-[26px] text-[#C9A84C]/50 tracking-wide mt-8">
          {subtitle}
        </p>

        {/* Slide counter */}
        <div className="flex gap-2 mt-10">
          {Array.from({ length: slideCount }).map((_, i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                width: i === 0 ? 24 : 8,
                height: 8,
                background:
                  i === 0
                    ? "rgba(201,168,76,0.6)"
                    : "rgba(201,168,76,0.15)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

const ContentSlide = forwardRef<
  HTMLDivElement,
  { number: string; heading: string; body: string }
>(function ContentSlide({ number, heading, body }, ref) {
  return (
    <div
      ref={ref}
      className="relative flex flex-col items-center overflow-hidden"
      style={{ width: 1080, height: 1350, background: STYLE.bg }}
    >
      <div className="absolute inset-0" style={{ background: BG }} />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(0,0,0,0.45) 100%)",
        }}
      />

      {corners("rgba(201,168,76,0.2)")}

      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center px-16">
        {/* Number */}
        <p
          className="font-(family-name:--font-playfair) font-bold leading-none"
          style={{ fontSize: 180, color: "rgba(201,168,76,0.1)" }}
        >
          {number}
        </p>

        {/* Heading */}
        <h2 className="font-(family-name:--font-playfair) text-[58px] font-bold text-[#F5F0E8] leading-tight -mt-8">
          {heading}
        </h2>

        {/* Separator */}
        <div className="flex items-center gap-4 my-10">
          <div className="w-[80px] h-px bg-[#C9A84C]/25" />
          <div className="w-3 h-3 rotate-45 border-[1.5px] border-[#C9A84C]/35" />
          <div className="w-[80px] h-px bg-[#C9A84C]/25" />
        </div>

        {/* Body */}
        <p className="font-(family-name:--font-inter) text-[34px] text-[#F5F0E8]/70 leading-relaxed max-w-[800px]">
          {body}
        </p>

        {/* Handle */}
        <p className="font-(family-name:--font-inter) text-[20px] text-[#C9A84C]/30 tracking-wider mt-16">
          @asso_episteme
        </p>
      </div>
    </div>
  );
});

const CtaSlide = forwardRef<
  HTMLDivElement,
  { line1: string; line2: string; emoji: string }
>(function CtaSlide({ line1, line2, emoji }, ref) {
  return (
    <div
      ref={ref}
      className="relative flex flex-col items-center overflow-hidden"
      style={{ width: 1080, height: 1350, background: STYLE.bg }}
    >
      <div className="absolute inset-0" style={{ background: BG }} />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(0,0,0,0.45) 100%)",
        }}
      />

      {corners("rgba(201,168,76,0.2)")}

      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center px-16">
        {/* Logo */}
        <div className="w-[140px] h-[140px] rounded-full border-[2.5px] border-[#C9A84C]/40 overflow-hidden mb-12">
          <img
            src="/logo.svg"
            alt="Episteme"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Emoji */}
        <div className="text-[90px] leading-none mb-8">{emoji}</div>

        {/* Line 1 */}
        <p className="font-(family-name:--font-playfair) italic text-[46px] text-[#F5F0E8]/60 mb-6">
          {line1}
        </p>

        {/* Line 2 */}
        <p className="font-(family-name:--font-playfair) text-[54px] font-bold text-[#F5F0E8]">
          {line2}
        </p>

        {/* Handle */}
        <div className="flex items-center gap-4 mt-14">
          <div className="w-[60px] h-px bg-[#C9A84C]/25" />
          <p className="font-(family-name:--font-inter) text-[22px] text-[#C9A84C]/50 tracking-wider">
            @asso_episteme
          </p>
          <div className="w-[60px] h-px bg-[#C9A84C]/25" />
        </div>
      </div>
    </div>
  );
});

/* ── Corner decoration ────────────────────────────────── */

function corners(color: string) {
  const size = 50;
  const offset = 40;
  const style = (
    pos: Record<string, number>,
    borders: Record<string, string>,
  ): React.CSSProperties => ({
    position: "absolute",
    width: size,
    height: size,
    ...pos,
    ...borders,
    zIndex: 5,
  });
  return (
    <>
      <div
        style={style(
          { top: offset, left: offset },
          { borderTop: `1.5px solid ${color}`, borderLeft: `1.5px solid ${color}` },
        )}
      />
      <div
        style={style(
          { top: offset, right: offset },
          { borderTop: `1.5px solid ${color}`, borderRight: `1.5px solid ${color}` },
        )}
      />
      <div
        style={style(
          { bottom: offset, left: offset },
          { borderBottom: `1.5px solid ${color}`, borderLeft: `1.5px solid ${color}` },
        )}
      />
      <div
        style={style(
          { bottom: offset, right: offset },
          { borderBottom: `1.5px solid ${color}`, borderRight: `1.5px solid ${color}` },
        )}
      />
    </>
  );
}
