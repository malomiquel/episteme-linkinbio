import { forwardRef } from "react";

type Variant = "or" | "pourpre" | "nuit" | "vin";

interface Theme {
  bg: string;
  bgOverlay: string;
  accentFaded: string;
  badgeBorder: string;
  badgeText: string;
  text: string;
  textSoft: string;
  frameBorder: string;
  frameBg: string;
  glow1: string;
  glow2: string;
  glow3: string;
  ornament: string;
}

const THEMES: Record<Variant, Theme> = {
  or: {
    bg: "#1E0A12",
    bgOverlay: "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.5) 100%)",
    accentFaded: "rgba(201,168,76,0.5)",
    badgeBorder: "rgba(201,168,76,0.3)",
    badgeText: "rgba(201,168,76,0.7)",
    text: "#F5F0E8",
    textSoft: "rgba(201,168,76,0.45)",
    frameBorder: "rgba(201,168,76,0.25)",
    frameBg: "linear-gradient(170deg, rgba(201,168,76,0.07) 0%, rgba(201,168,76,0.015) 100%)",
    glow1: "radial-gradient(ellipse at 50% 35%, rgba(80,35,48,0.65) 0%, transparent 55%)",
    glow2: "radial-gradient(ellipse at 30% 10%, rgba(201,168,76,0.1) 0%, transparent 40%)",
    glow3: "radial-gradient(ellipse at 70% 85%, rgba(140,58,68,0.2) 0%, transparent 50%)",
    ornament: "rgba(201,168,76,0.2)",
  },
  pourpre: {
    bg: "#12061A",
    bgOverlay: "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.55) 100%)",
    accentFaded: "rgba(225,48,108,0.5)",
    badgeBorder: "rgba(225,48,108,0.3)",
    badgeText: "rgba(225,48,108,0.7)",
    text: "#F5F0F8",
    textSoft: "rgba(225,48,108,0.45)",
    frameBorder: "rgba(225,48,108,0.2)",
    frameBg: "linear-gradient(170deg, rgba(131,58,180,0.08) 0%, rgba(225,48,108,0.02) 100%)",
    glow1: "radial-gradient(ellipse at 50% 30%, rgba(131,58,180,0.5) 0%, transparent 55%)",
    glow2: "radial-gradient(ellipse at 25% 70%, rgba(225,48,108,0.15) 0%, transparent 45%)",
    glow3: "radial-gradient(ellipse at 75% 15%, rgba(247,119,55,0.08) 0%, transparent 40%)",
    ornament: "rgba(225,48,108,0.2)",
  },
  nuit: {
    bg: "#080F1A",
    bgOverlay: "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.5) 100%)",
    accentFaded: "rgba(100,180,220,0.5)",
    badgeBorder: "rgba(100,180,220,0.25)",
    badgeText: "rgba(100,180,220,0.65)",
    text: "#E8F0F8",
    textSoft: "rgba(100,180,220,0.4)",
    frameBorder: "rgba(100,180,220,0.2)",
    frameBg: "linear-gradient(170deg, rgba(100,180,220,0.06) 0%, rgba(100,180,220,0.01) 100%)",
    glow1: "radial-gradient(ellipse at 50% 30%, rgba(26,58,92,0.7) 0%, transparent 55%)",
    glow2: "radial-gradient(ellipse at 20% 80%, rgba(100,180,220,0.08) 0%, transparent 45%)",
    glow3: "radial-gradient(ellipse at 80% 15%, rgba(40,80,120,0.2) 0%, transparent 40%)",
    ornament: "rgba(100,180,220,0.2)",
  },
  vin: {
    bg: "#140810",
    bgOverlay: "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.5) 100%)",
    accentFaded: "rgba(200,120,130,0.5)",
    badgeBorder: "rgba(200,120,130,0.25)",
    badgeText: "rgba(200,120,130,0.65)",
    text: "#F5EDE8",
    textSoft: "rgba(200,120,130,0.4)",
    frameBorder: "rgba(200,120,130,0.2)",
    frameBg: "linear-gradient(170deg, rgba(200,120,130,0.06) 0%, rgba(200,120,130,0.01) 100%)",
    glow1: "radial-gradient(ellipse at 50% 35%, rgba(107,29,42,0.6) 0%, transparent 55%)",
    glow2: "radial-gradient(ellipse at 25% 15%, rgba(200,120,130,0.1) 0%, transparent 40%)",
    glow3: "radial-gradient(ellipse at 70% 80%, rgba(61,15,24,0.3) 0%, transparent 50%)",
    ornament: "rgba(200,120,130,0.2)",
  },
};

const NewPostContent = forwardRef<HTMLDivElement, Record<string, string>>(
  function NewPostContent({ format, variant, caption }, ref) {
    const isPost = format === "post";
    const previewW = isPost ? 680 : 480;
    const previewH = isPost ? 680 : 854;
    const t = THEMES[(variant as Variant) || "or"];

    return (
      <div
        ref={ref}
        className="relative flex flex-col items-center overflow-hidden"
        style={{ width: 1080, height: 1920, background: t.bg }}
      >
        {/* Background glows */}
        <div
          className="absolute inset-0"
          style={{ background: `${t.glow1}, ${t.glow2}, ${t.glow3}` }}
        />
        <div className="absolute inset-0" style={{ background: t.bgOverlay }} />

        {/* Decorative corner lines */}
        <div
          className="absolute top-[60px] left-[60px] w-[120px] h-[120px]"
          style={{
            borderTop: `1.5px solid ${t.frameBorder}`,
            borderLeft: `1.5px solid ${t.frameBorder}`,
          }}
        />
        <div
          className="absolute top-[60px] right-[60px] w-[120px] h-[120px]"
          style={{
            borderTop: `1.5px solid ${t.frameBorder}`,
            borderRight: `1.5px solid ${t.frameBorder}`,
          }}
        />
        <div
          className="absolute bottom-[60px] left-[60px] w-[120px] h-[120px]"
          style={{
            borderBottom: `1.5px solid ${t.frameBorder}`,
            borderLeft: `1.5px solid ${t.frameBorder}`,
          }}
        />
        <div
          className="absolute bottom-[60px] right-[60px] w-[120px] h-[120px]"
          style={{
            borderBottom: `1.5px solid ${t.frameBorder}`,
            borderRight: `1.5px solid ${t.frameBorder}`,
          }}
        />

        <div className="relative z-10 flex flex-col items-center w-full h-full px-14">
          {/* Header */}
          <div className="flex items-center gap-5 pt-[120px]">
            <div
              className="w-[90px] h-[90px] rounded-full overflow-hidden"
              style={{
                border: `2px solid ${t.accentFaded}`,
                boxShadow: `0 0 50px ${t.frameBorder}`,
              }}
            >
              <img
                src="/logo.svg"
                alt="Episteme"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p
                className="font-(family-name:--font-playfair) text-[28px] font-bold"
                style={{ color: `${t.text}e6` }}
              >
                Episteme
              </p>
              <p
                className="font-(family-name:--font-inter) text-[20px] tracking-wide"
                style={{ color: t.textSoft }}
              >
                @asso_episteme
              </p>
            </div>
          </div>

          {/* Badge */}
          <div className="mt-12">
            <span
              className="font-(family-name:--font-inter) text-[20px] uppercase tracking-[6px] font-semibold px-10 py-3.5 rounded-full"
              style={{
                border: `1.5px solid ${t.badgeBorder}`,
                color: t.badgeText,
              }}
            >
              {isPost ? "Nouveau post" : "Nouveau réel"}
            </span>
          </div>

          {/* Caption */}
          <p
            className="font-(family-name:--font-playfair) text-[48px] font-bold leading-tight mt-10 text-center px-4"
            style={{ color: t.text }}
          >
            {caption}
          </p>

          {/* Separator */}
          <div className="flex items-center gap-5 mt-10">
            <div className="w-[100px] h-px" style={{ background: t.ornament }} />
            <div
              className="w-3.5 h-3.5 rotate-45"
              style={{ border: `1.5px solid ${t.ornament}` }}
            />
            <div className="w-[100px] h-px" style={{ background: t.ornament }} />
          </div>

          {/* Preview placeholder */}
          <div className="mt-10 flex items-center justify-center flex-1">
            <div
              className="rounded-[24px] flex flex-col items-center justify-center relative"
              style={{
                width: previewW,
                height: previewH,
                border: `3px dashed ${t.frameBorder}`,
                background: t.frameBg,
                boxShadow: `0 0 100px ${t.frameBorder}, inset 0 0 60px ${t.frameBorder}`,
              }}
            >
              <div
                className="w-[70px] h-[70px] rounded-full flex items-center justify-center mb-5"
                style={{
                  background: t.frameBg,
                  border: `1.5px solid ${t.frameBorder}`,
                }}
              >
                <span className="text-[32px] opacity-50">
                  {isPost ? "🖼️" : "🎬"}
                </span>
              </div>
              <p
                className="font-(family-name:--font-inter) text-[20px] tracking-wide"
                style={{ color: t.textSoft }}
              >
                Capture {isPost ? "du post" : "du réel"} ici
              </p>
              <p
                className="font-(family-name:--font-inter) text-[16px] mt-2 opacity-40"
                style={{ color: t.textSoft }}
              >
                {isPost ? "1:1" : "9:16"}
              </p>
            </div>
          </div>

          {/* CTA */}
          <p
            className="font-(family-name:--font-inter) text-[22px] tracking-wider mb-[140px]"
            style={{ color: t.textSoft }}
          >
            Voir sur notre profil
          </p>
        </div>

        {/* Bottom ornament */}
        <div className="absolute bottom-[100px] flex items-center gap-3">
          <div className="w-12 h-px" style={{ background: t.ornament }} />
          <div className="w-2.5 h-2.5 rotate-45" style={{ background: t.ornament }} />
          <div className="w-12 h-px" style={{ background: t.ornament }} />
        </div>
      </div>
    );
  },
);

export default NewPostContent;
