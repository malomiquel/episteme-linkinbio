import { forwardRef } from "react";

const ThisOrThatContent = forwardRef<HTMLDivElement, Record<string, string>>(
  function ThisOrThatContent({ title, optionA, optionB, emojiA, emojiB }, ref) {
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
              radial-gradient(ellipse at 50% 10%, rgba(201,168,76,0.1) 0%, transparent 40%),
              radial-gradient(ellipse at 50% 50%, rgba(80,35,48,0.5) 0%, transparent 55%)
            `,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.2) 100%)",
          }}
        />

        {/* Top half — Option A — warm tint */}
        <div
          className="absolute top-0 left-0 right-0"
          style={{
            height: "50%",
            background:
              "linear-gradient(180deg, rgba(140,58,68,0.15) 0%, transparent 100%)",
          }}
        />

        {/* Bottom half — Option B — gold tint */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: "50%",
            background:
              "linear-gradient(0deg, rgba(201,168,76,0.08) 0%, transparent 100%)",
          }}
        />

        <div className="relative z-10 flex flex-col items-center w-full h-full">
          {/* Header */}
          <div className="flex flex-col items-center pt-[110px] px-14">
            <div className="flex items-center gap-5 mb-10">
              <div className="w-[80px] h-[80px] rounded-full border-[2px] border-[#C9A84C]/50 overflow-hidden">
                <img src="/logo.svg" alt="Episteme" className="w-full h-full object-cover" />
              </div>
              <p className="font-(family-name:--font-inter) text-[22px] text-[#C9A84C]/50 tracking-wider">
                @asso_episteme
              </p>
            </div>

            <span className="font-(family-name:--font-inter) text-[20px] uppercase tracking-[6px] font-semibold px-10 py-3.5 rounded-full border-[1.5px] border-[#C9A84C]/30 text-[#C9A84C]/70">
              This or That
            </span>

            <h1 className="font-(family-name:--font-playfair) text-[64px] font-bold text-[#F5F0E8] leading-tight mt-10 text-center">
              {title}
            </h1>
          </div>

          {/* Two options split */}
          <div className="flex-1 flex flex-col items-center justify-center w-full px-14 gap-8">
            {/* Option A */}
            <div
              className="w-full rounded-[32px] py-14 flex flex-col items-center"
              style={{
                background:
                  "linear-gradient(160deg, rgba(140,58,68,0.2) 0%, rgba(140,58,68,0.06) 100%)",
                border: "1.5px solid rgba(140,58,68,0.3)",
                boxShadow: "0 0 60px rgba(140,58,68,0.08)",
              }}
            >
              <span className="text-[72px] mb-4">{emojiA}</span>
              <p className="font-(family-name:--font-playfair) text-[48px] font-bold text-[#F5F0E8]">
                {optionA}
              </p>
            </div>

            {/* Sticker sondage placeholder */}
            <div
              className="w-full rounded-[24px] flex flex-col items-center justify-center py-6 -my-2"
              style={{
                border: "3px dashed rgba(201,168,76,0.25)",
                background:
                  "linear-gradient(170deg, rgba(201,168,76,0.07) 0%, rgba(201,168,76,0.015) 100%)",
              }}
            >
              <span className="text-[28px] opacity-40 mb-2">📊</span>
              <p className="font-(family-name:--font-inter) text-[18px] text-[#C9A84C]/25 tracking-wide">
                Sticker Sondage ici
              </p>
            </div>

            {/* Option B */}
            <div
              className="w-full rounded-[32px] py-14 flex flex-col items-center"
              style={{
                background:
                  "linear-gradient(160deg, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0.04) 100%)",
                border: "1.5px solid rgba(201,168,76,0.25)",
                boxShadow: "0 0 60px rgba(201,168,76,0.06)",
              }}
            >
              <span className="text-[72px] mb-4">{emojiB}</span>
              <p className="font-(family-name:--font-playfair) text-[48px] font-bold text-[#F5F0E8]">
                {optionB}
              </p>
            </div>
          </div>

          {/* Bottom text */}
          <p className="font-(family-name:--font-inter) text-[24px] text-[#C9A84C]/25 tracking-wider mb-[160px]">
            Votez en story !
          </p>
        </div>

        {/* Bottom ornament */}
        <div className="absolute bottom-[120px] flex items-center gap-3">
          <div className="w-12 h-px bg-[#C9A84C]/20" />
          <div className="w-2.5 h-2.5 rotate-45 bg-[#C9A84C]/20" />
          <div className="w-12 h-px bg-[#C9A84C]/20" />
        </div>
      </div>
    );
  },
);

export default ThisOrThatContent;
