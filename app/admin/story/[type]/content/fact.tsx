import { forwardRef } from "react";

const FactContent = forwardRef<HTMLDivElement, Record<string, string>>(
  function FactContent({ title, fact }, ref) {
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
              radial-gradient(ellipse at 50% 40%, rgba(80,35,48,0.65) 0%, transparent 55%),
              radial-gradient(ellipse at 30% 15%, rgba(201,168,76,0.12) 0%, transparent 45%),
              radial-gradient(ellipse at 70% 80%, rgba(140,58,68,0.2) 0%, transparent 50%)
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

        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-14">
          {/* Emoji */}
          <div className="text-[100px] mb-10">💡</div>

          {/* Badge */}
          <span className="font-(family-name:--font-inter) text-[20px] uppercase tracking-[6px] font-semibold px-10 py-3.5 rounded-full border-[1.5px] border-[#C9A84C]/30 text-[#C9A84C]/70 mb-14">
            Culture
          </span>

          {/* Title */}
          <h1 className="font-(family-name:--font-playfair) text-[76px] font-bold text-[#F5F0E8] leading-[1.1] text-center mb-10">
            {title}
          </h1>

          {/* Separator */}
          <div className="flex items-center gap-5 mb-12">
            <div className="w-[120px] h-px bg-[#C9A84C]/20" />
            <div className="w-3.5 h-3.5 rotate-45 border-[1.5px] border-[#C9A84C]/35" />
            <div className="w-[120px] h-px bg-[#C9A84C]/20" />
          </div>

          {/* Fact box */}
          <div
            className="w-full rounded-[32px] px-14 py-14"
            style={{
              background:
                "linear-gradient(160deg, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0.04) 100%)",
              border: "1.5px solid rgba(201,168,76,0.25)",
              boxShadow:
                "0 0 80px rgba(201,168,76,0.06), inset 0 1px 0 rgba(201,168,76,0.1)",
            }}
          >
            <p className="font-(family-name:--font-inter) text-[36px] text-[#F5F0E8]/90 leading-relaxed text-center">
              {fact}
            </p>
          </div>

          {/* Handle */}
          <p className="font-(family-name:--font-inter) text-[22px] text-[#C9A84C]/40 mt-16 tracking-wider">
            @asso_episteme
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

export default FactContent;
