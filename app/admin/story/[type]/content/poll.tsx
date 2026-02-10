import { forwardRef } from "react";

const PollContent = forwardRef<HTMLDivElement, Record<string, string>>(
  function PollContent({ topic }, ref) {
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
              radial-gradient(ellipse at 50% 15%, rgba(80,35,48,0.7) 0%, transparent 55%),
              radial-gradient(ellipse at 20% 80%, rgba(140,58,68,0.25) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 60%, rgba(100,40,55,0.2) 0%, transparent 45%),
              radial-gradient(ellipse at 50% 5%, rgba(201,168,76,0.1) 0%, transparent 40%)
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

        <div className="relative z-10 flex flex-col items-center w-full h-full px-14">
          {/* Logo */}
          <div className="flex flex-col items-center pt-[130px]">
            <div className="w-[120px] h-[120px] rounded-full border-[2.5px] border-[#C9A84C]/50 overflow-hidden shadow-[0_0_60px_rgba(201,168,76,0.12)]">
              <img src="/logo.svg" alt="Episteme" className="w-full h-full object-cover" />
            </div>
            <p className="font-(family-name:--font-inter) text-[22px] text-[#C9A84C]/50 mt-7 tracking-wider">
              @asso_episteme
            </p>
          </div>

          {/* Badge */}
          <div className="mt-16">
            <span className="font-(family-name:--font-inter) text-[20px] uppercase tracking-[6px] font-semibold px-10 py-3.5 rounded-full border-[1.5px] border-[#C9A84C]/30 text-[#C9A84C]/70">
              Sondage
            </span>
          </div>

          {/* Topic */}
          <h1 className="font-(family-name:--font-playfair) text-[68px] font-bold text-[#F5F0E8] leading-[1.15] mt-14 text-center px-4">
            {topic}
          </h1>

          {/* Separator */}
          <div className="flex items-center gap-5 mt-12">
            <div className="w-[120px] h-px bg-[#C9A84C]/20" />
            <div className="w-3.5 h-3.5 rotate-45 border-[1.5px] border-[#C9A84C]/35" />
            <div className="w-[120px] h-px bg-[#C9A84C]/20" />
          </div>

          {/* Sticker placeholder */}
          <div className="mt-14 w-full px-4 flex-1 max-h-[520px]">
            <div
              className="w-full h-[480px] rounded-[36px] flex flex-col items-center justify-center"
              style={{
                border: "3px dashed rgba(201,168,76,0.25)",
                background: "linear-gradient(170deg, rgba(201,168,76,0.07) 0%, rgba(201,168,76,0.015) 100%)",
              }}
            >
              <div
                className="w-[80px] h-[80px] rounded-full flex items-center justify-center mb-5"
                style={{
                  background: "linear-gradient(135deg, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0.04) 100%)",
                  border: "1.5px solid rgba(201,168,76,0.15)",
                }}
              >
                <span className="text-[36px] opacity-50">📊</span>
              </div>
              <p className="font-(family-name:--font-inter) text-[22px] text-[#C9A84C]/25 tracking-wide">
                Sticker Sondage ici
              </p>
            </div>
          </div>

          <p className="font-(family-name:--font-inter) text-[24px] text-[#C9A84C]/25 tracking-wider mb-[160px] mt-auto">
            Votez !
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

export default PollContent;
