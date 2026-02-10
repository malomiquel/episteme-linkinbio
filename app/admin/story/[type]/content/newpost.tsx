import Image from "next/image";
import { forwardRef } from "react";

type Variant =
  | "or"
  | "pourpre"
  | "nuit"
  | "vin"
  | "emeraude"
  | "saphir"
  | "ambre"
  | "rose"
  | "olive"
  | "lavande";

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
    bg: "#2A1520",
    bgOverlay:
      "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.2) 100%)",
    accentFaded: "rgba(201,168,76,0.5)",
    badgeBorder: "rgba(201,168,76,0.3)",
    badgeText: "rgba(201,168,76,0.7)",
    text: "#F5F0E8",
    textSoft: "rgba(201,168,76,0.45)",
    frameBorder: "rgba(201,168,76,0.25)",
    frameBg:
      "linear-gradient(170deg, rgba(201,168,76,0.07) 0%, rgba(201,168,76,0.015) 100%)",
    glow1:
      "radial-gradient(ellipse at 50% 35%, rgba(80,35,48,0.65) 0%, transparent 55%)",
    glow2:
      "radial-gradient(ellipse at 30% 10%, rgba(201,168,76,0.1) 0%, transparent 40%)",
    glow3:
      "radial-gradient(ellipse at 70% 85%, rgba(140,58,68,0.2) 0%, transparent 50%)",
    ornament: "rgba(201,168,76,0.2)",
  },
  pourpre: {
    bg: "#1E0F28",
    bgOverlay:
      "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.2) 100%)",
    accentFaded: "rgba(225,48,108,0.5)",
    badgeBorder: "rgba(225,48,108,0.3)",
    badgeText: "rgba(225,48,108,0.7)",
    text: "#F5F0F8",
    textSoft: "rgba(225,48,108,0.45)",
    frameBorder: "rgba(225,48,108,0.2)",
    frameBg:
      "linear-gradient(170deg, rgba(131,58,180,0.08) 0%, rgba(225,48,108,0.02) 100%)",
    glow1:
      "radial-gradient(ellipse at 50% 30%, rgba(131,58,180,0.5) 0%, transparent 55%)",
    glow2:
      "radial-gradient(ellipse at 25% 70%, rgba(225,48,108,0.15) 0%, transparent 45%)",
    glow3:
      "radial-gradient(ellipse at 75% 15%, rgba(247,119,55,0.08) 0%, transparent 40%)",
    ornament: "rgba(225,48,108,0.2)",
  },
  nuit: {
    bg: "#14192A",
    bgOverlay:
      "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.2) 100%)",
    accentFaded: "rgba(100,180,220,0.5)",
    badgeBorder: "rgba(100,180,220,0.25)",
    badgeText: "rgba(100,180,220,0.65)",
    text: "#E8F0F8",
    textSoft: "rgba(100,180,220,0.4)",
    frameBorder: "rgba(100,180,220,0.2)",
    frameBg:
      "linear-gradient(170deg, rgba(100,180,220,0.06) 0%, rgba(100,180,220,0.01) 100%)",
    glow1:
      "radial-gradient(ellipse at 50% 30%, rgba(26,58,92,0.7) 0%, transparent 55%)",
    glow2:
      "radial-gradient(ellipse at 20% 80%, rgba(100,180,220,0.08) 0%, transparent 45%)",
    glow3:
      "radial-gradient(ellipse at 80% 15%, rgba(40,80,120,0.2) 0%, transparent 40%)",
    ornament: "rgba(100,180,220,0.2)",
  },
  vin: {
    bg: "#22141C",
    bgOverlay:
      "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.2) 100%)",
    accentFaded: "rgba(200,120,130,0.5)",
    badgeBorder: "rgba(200,120,130,0.25)",
    badgeText: "rgba(200,120,130,0.65)",
    text: "#F5EDE8",
    textSoft: "rgba(200,120,130,0.4)",
    frameBorder: "rgba(200,120,130,0.2)",
    frameBg:
      "linear-gradient(170deg, rgba(200,120,130,0.06) 0%, rgba(200,120,130,0.01) 100%)",
    glow1:
      "radial-gradient(ellipse at 50% 35%, rgba(107,29,42,0.6) 0%, transparent 55%)",
    glow2:
      "radial-gradient(ellipse at 25% 15%, rgba(200,120,130,0.1) 0%, transparent 40%)",
    glow3:
      "radial-gradient(ellipse at 70% 80%, rgba(61,15,24,0.3) 0%, transparent 50%)",
    ornament: "rgba(200,120,130,0.2)",
  },
  emeraude: {
    bg: "#0F1E1A",
    bgOverlay:
      "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.2) 100%)",
    accentFaded: "rgba(80,200,150,0.5)",
    badgeBorder: "rgba(80,200,150,0.25)",
    badgeText: "rgba(80,200,150,0.65)",
    text: "#E8F5F0",
    textSoft: "rgba(80,200,150,0.4)",
    frameBorder: "rgba(80,200,150,0.2)",
    frameBg:
      "linear-gradient(170deg, rgba(80,200,150,0.06) 0%, rgba(80,200,150,0.01) 100%)",
    glow1:
      "radial-gradient(ellipse at 50% 30%, rgba(16,90,70,0.6) 0%, transparent 55%)",
    glow2:
      "radial-gradient(ellipse at 20% 80%, rgba(80,200,150,0.1) 0%, transparent 45%)",
    glow3:
      "radial-gradient(ellipse at 75% 15%, rgba(40,120,90,0.25) 0%, transparent 40%)",
    ornament: "rgba(80,200,150,0.2)",
  },
  saphir: {
    bg: "#0A1428",
    bgOverlay:
      "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.2) 100%)",
    accentFaded: "rgba(70,130,220,0.5)",
    badgeBorder: "rgba(70,130,220,0.25)",
    badgeText: "rgba(70,130,220,0.65)",
    text: "#E8F0FF",
    textSoft: "rgba(70,130,220,0.4)",
    frameBorder: "rgba(70,130,220,0.2)",
    frameBg:
      "linear-gradient(170deg, rgba(70,130,220,0.06) 0%, rgba(70,130,220,0.01) 100%)",
    glow1:
      "radial-gradient(ellipse at 50% 35%, rgba(20,50,110,0.65) 0%, transparent 55%)",
    glow2:
      "radial-gradient(ellipse at 25% 10%, rgba(70,130,220,0.12) 0%, transparent 40%)",
    glow3:
      "radial-gradient(ellipse at 70% 85%, rgba(40,80,150,0.2) 0%, transparent 50%)",
    ornament: "rgba(70,130,220,0.2)",
  },
  ambre: {
    bg: "#281A0F",
    bgOverlay:
      "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.2) 100%)",
    accentFaded: "rgba(255,160,70,0.5)",
    badgeBorder: "rgba(255,160,70,0.3)",
    badgeText: "rgba(255,160,70,0.7)",
    text: "#FFF5E8",
    textSoft: "rgba(255,160,70,0.45)",
    frameBorder: "rgba(255,160,70,0.25)",
    frameBg:
      "linear-gradient(170deg, rgba(255,160,70,0.07) 0%, rgba(255,160,70,0.015) 100%)",
    glow1:
      "radial-gradient(ellipse at 50% 30%, rgba(140,70,20,0.6) 0%, transparent 55%)",
    glow2:
      "radial-gradient(ellipse at 30% 75%, rgba(255,160,70,0.1) 0%, transparent 45%)",
    glow3:
      "radial-gradient(ellipse at 75% 15%, rgba(200,100,30,0.2) 0%, transparent 40%)",
    ornament: "rgba(255,160,70,0.2)",
  },
  rose: {
    bg: "#28141E",
    bgOverlay:
      "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.2) 100%)",
    accentFaded: "rgba(255,150,180,0.5)",
    badgeBorder: "rgba(255,150,180,0.3)",
    badgeText: "rgba(255,150,180,0.7)",
    text: "#FFF0F5",
    textSoft: "rgba(255,150,180,0.45)",
    frameBorder: "rgba(255,150,180,0.25)",
    frameBg:
      "linear-gradient(170deg, rgba(255,150,180,0.07) 0%, rgba(255,150,180,0.015) 100%)",
    glow1:
      "radial-gradient(ellipse at 50% 35%, rgba(140,50,80,0.6) 0%, transparent 55%)",
    glow2:
      "radial-gradient(ellipse at 25% 15%, rgba(255,150,180,0.1) 0%, transparent 40%)",
    glow3:
      "radial-gradient(ellipse at 70% 80%, rgba(200,80,120,0.2) 0%, transparent 50%)",
    ornament: "rgba(255,150,180,0.2)",
  },
  olive: {
    bg: "#1E1E14",
    bgOverlay:
      "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.2) 100%)",
    accentFaded: "rgba(180,190,120,0.5)",
    badgeBorder: "rgba(180,190,120,0.3)",
    badgeText: "rgba(180,190,120,0.7)",
    text: "#F5F5E8",
    textSoft: "rgba(180,190,120,0.45)",
    frameBorder: "rgba(180,190,120,0.25)",
    frameBg:
      "linear-gradient(170deg, rgba(180,190,120,0.07) 0%, rgba(180,190,120,0.015) 100%)",
    glow1:
      "radial-gradient(ellipse at 50% 30%, rgba(80,85,50,0.65) 0%, transparent 55%)",
    glow2:
      "radial-gradient(ellipse at 30% 80%, rgba(180,190,120,0.08) 0%, transparent 45%)",
    glow3:
      "radial-gradient(ellipse at 75% 15%, rgba(120,130,70,0.2) 0%, transparent 40%)",
    ornament: "rgba(180,190,120,0.2)",
  },
  lavande: {
    bg: "#1A1428",
    bgOverlay:
      "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.2) 100%)",
    accentFaded: "rgba(180,150,230,0.5)",
    badgeBorder: "rgba(180,150,230,0.3)",
    badgeText: "rgba(180,150,230,0.7)",
    text: "#F5F0FF",
    textSoft: "rgba(180,150,230,0.45)",
    frameBorder: "rgba(180,150,230,0.25)",
    frameBg:
      "linear-gradient(170deg, rgba(180,150,230,0.07) 0%, rgba(180,150,230,0.015) 100%)",
    glow1:
      "radial-gradient(ellipse at 50% 35%, rgba(80,60,120,0.6) 0%, transparent 55%)",
    glow2:
      "radial-gradient(ellipse at 25% 75%, rgba(180,150,230,0.1) 0%, transparent 45%)",
    glow3:
      "radial-gradient(ellipse at 75% 15%, rgba(120,90,170,0.2) 0%, transparent 40%)",
    ornament: "rgba(180,150,230,0.2)",
  },
};

const NewPostContent = forwardRef<HTMLDivElement, Record<string, string>>(
  function NewPostContent({ format, variant, caption, postImage }, ref) {
    const isPost = format === "post";
    const t = THEMES[(variant as Variant) || "or"];
    // Post: 1080x1350 (ratio 4:5) → 680x850
    // Reel: 1080x1920 (ratio 9:16) → 480x854
    const imageWidth = isPost ? 680 : 480;
    const imageHeight = isPost ? 850 : 854;

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
          className="absolute top-15 left-15 w-30 h-30"
          style={{
            borderTop: `1.5px solid ${t.frameBorder}`,
            borderLeft: `1.5px solid ${t.frameBorder}`,
          }}
        />
        <div
          className="absolute top-15 right-15 w-30 h-30"
          style={{
            borderTop: `1.5px solid ${t.frameBorder}`,
            borderRight: `1.5px solid ${t.frameBorder}`,
          }}
        />
        <div
          className="absolute bottom-15 left-15 w-30 h-30"
          style={{
            borderBottom: `1.5px solid ${t.frameBorder}`,
            borderLeft: `1.5px solid ${t.frameBorder}`,
          }}
        />
        <div
          className="absolute bottom-15 right-15 w-30 h-30"
          style={{
            borderBottom: `1.5px solid ${t.frameBorder}`,
            borderRight: `1.5px solid ${t.frameBorder}`,
          }}
        />

        <div className="relative z-10 flex flex-col items-center w-full h-full px-14">
          {/* Header */}
          <div className="flex items-center gap-5 pt-30">
            <div
              className="size-30 rounded-full overflow-hidden"
              style={{
                border: `2px solid ${t.accentFaded}`,
                boxShadow: `0 0 50px ${t.frameBorder}`,
              }}
            >
              <Image
                src="/logo.svg"
                alt="Episteme"
                className="w-full h-full object-cover"
                width={120}
                height={120}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p
                className="font-(family-name:--font-playfair) text-4xl font-bold"
                style={{ color: `${t.text}e6` }}
              >
                Episteme
              </p>
              <p
                className="font-(family-name:--font-inter) text-3xl tracking-wide"
                style={{ color: t.textSoft }}
              >
                @asso_episteme
              </p>
            </div>
          </div>

          {/* Badge */}
          <div className="mt-24">
            <span
              className="font-(family-name:--font-inter) text-2xl uppercase tracking-[6px] font-semibold px-10 py-3.5 rounded-full"
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
            className="font-(family-name:--font-playfair) text-6xl font-bold leading-tight mt-12 text-center px-8"
            style={{ color: t.text }}
          >
            {caption}
          </p>

          {/* Separator */}
          <div className="flex items-center gap-5 mt-12 mb-12">
            <div className="w-30 h-px" style={{ background: t.ornament }} />
            <div
              className="w-3.5 h-3.5 rotate-45"
              style={{ border: `1.5px solid ${t.ornament}` }}
            />
            <div className="w-30 h-px" style={{ background: t.ornament }} />
          </div>

          {/* Post/Reel Image */}
          {postImage ? (
            <div className="flex-1 flex items-center justify-center">
              <div
                data-exclude-from-export="true"
                className="rounded-3xl overflow-hidden relative"
                style={{
                  width: imageWidth,
                  height: imageHeight,
                  border: `2px solid ${t.frameBorder}`,
                  boxShadow: `0 0 80px ${t.frameBorder}`,
                }}
              >
                <Image
                  src={postImage}
                  alt="Post"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ) : (
            <div className="flex-1" />
          )}

          {/* CTA */}
          <p
            className="font-(family-name:--font-inter) text-[28px] font-medium tracking-wide mb-[140px]"
            style={{ color: t.textSoft }}
          >
            Voir sur notre profil
          </p>
        </div>

        {/* Bottom ornament */}
        <div className="absolute bottom-[100px] flex items-center gap-3">
          <div className="w-12 h-px" style={{ background: t.ornament }} />
          <div
            className="w-2.5 h-2.5 rotate-45"
            style={{ background: t.ornament }}
          />
          <div className="w-12 h-px" style={{ background: t.ornament }} />
        </div>
      </div>
    );
  },
);

export default NewPostContent;
