import { forwardRef } from "react";
import Image from "next/image";

const TeaserContent = forwardRef<HTMLDivElement, Record<string, string>>(
  function TeaserContent(
    { title, subtitle, transition, ctaEmoji, ctaText, linkNote, shareNote },
    ref,
  ) {
    const titleLines = title.split("\n");

    return (
      <div
        ref={ref}
        className="relative flex flex-col items-center overflow-hidden"
        style={{ width: 1080, height: 1920, background: "#2A1520" }}
      >
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 50% 30%, rgba(80,35,48,0.55) 0%, transparent 60%),
              radial-gradient(ellipse at 50% 65%, rgba(140,58,68,0.12) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 15%, rgba(201,168,76,0.06) 0%, transparent 45%)
            `,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(0,0,0,0.2) 100%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center w-full h-full">
          {/* Logo + handle */}
          <div className="flex flex-col items-center pt-40">
            <div className="w-40 h-40 rounded-full border-[2.5px] border-gold/50 overflow-hidden shadow-[0_0_60px_rgba(201,168,76,0.08)]">
              <Image
                src="/logo.svg"
                alt="Episteme"
                className="w-full h-full object-cover"
                width={120}
                height={120}
              />
            </div>
            <p className="font-(family-name:--font-inter) text-[26px] text-gold/50 tracking-wider mt-8">
              @asso_episteme
            </p>
          </div>

          {/* Teaser title */}
          <div className="flex flex-col items-center text-center mt-16 px-12">
            <h1 className="font-(family-name:--font-playfair) text-[82px] font-bold leading-[1.15]">
              {titleLines.map((line, i) => (
                <span key={i} className="block">
                  {i === 0 ? (
                    <span style={{ color: "#F5F0E8" }}>{line}</span>
                  ) : (
                    <span className="italic" style={{ color: "#E8D48B" }}>
                      {line}
                    </span>
                  )}
                </span>
              ))}
            </h1>

            {/* Subtitle */}
            <p className="font-(family-name:--font-inter) text-[26px] uppercase tracking-[8px] text-gold/65 font-semibold mt-10">
              {subtitle}
            </p>
          </div>

          {/* Separator */}
          <div className="flex items-center gap-5 mt-14">
            <div className="w-30 h-px bg-gold/25" />
            <div className="w-3.5 h-3.5 rotate-45 border-[1.5px] border-gold/35" />
            <div className="w-30 h-px bg-gold/25" />
          </div>

          {/* Transition text */}
          <p className="font-(family-name:--font-playfair) italic text-[38px] text-cream/80 mt-14">
            {transition}
          </p>

          {/* CTA emoji */}
          <div className="text-[80px] mt-6 leading-none">{ctaEmoji}</div>

          {/* CTA text */}
          <p className="font-(family-name:--font-playfair) text-[56px] font-bold text-cream leading-tight mt-6 text-center px-14">
            {ctaText}
          </p>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Link note */}
          {linkNote && (
            <div
              className="flex items-center justify-center gap-4 px-12 py-4 rounded-full mx-14"
              style={{
                border: "1.5px solid rgba(201,168,76,0.25)",
                background: "rgba(201,168,76,0.06)",
              }}
            >
              <p className="font-(family-name:--font-inter) text-[28px] font-semibold tracking-wide text-gold-light/80 text-center">
                {linkNote}
              </p>
            </div>
          )}

          {/* Share note */}
          {shareNote && (
            <p className="font-(family-name:--font-inter) text-[26px] text-cream/35 text-center leading-snug mt-8 px-16">
              {shareNote.split("\n").map((line, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </p>
          )}

          {/* Bottom ornament */}
          <div className="flex items-center gap-3 mt-10 mb-25">
            <div className="w-12 h-px bg-gold/20" />
            <div className="w-2.5 h-2.5 rotate-45 bg-gold/20" />
            <div className="w-12 h-px bg-gold/20" />
          </div>
        </div>
      </div>
    );
  },
);

export default TeaserContent;
