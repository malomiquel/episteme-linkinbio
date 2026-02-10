import { forwardRef } from "react";

const QuoteContent = forwardRef<HTMLDivElement, Record<string, string>>(
  function QuoteContent({ quote, author }, ref) {
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
              radial-gradient(ellipse at 50% 40%, rgba(80,35,48,0.6) 0%, transparent 55%),
              radial-gradient(ellipse at 70% 15%, rgba(201,168,76,0.1) 0%, transparent 40%),
              radial-gradient(ellipse at 30% 80%, rgba(140,58,68,0.18) 0%, transparent 50%)
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
          {/* Big opening quote */}
          <p
            className="font-(family-name:--font-playfair) leading-none mb-6"
            style={{ fontSize: 200, color: "rgba(201,168,76,0.15)" }}
          >
            &ldquo;
          </p>

          {/* Quote text */}
          <p className="font-(family-name:--font-playfair) italic text-[52px] text-[#F5F0E8] leading-snug text-center px-8 -mt-20">
            {quote}
          </p>

          {/* Separator */}
          <div className="flex items-center gap-5 mt-14 mb-10">
            <div className="w-[100px] h-px bg-[#C9A84C]/25" />
            <div className="w-3.5 h-3.5 rotate-45 border-[1.5px] border-[#C9A84C]/35" />
            <div className="w-[100px] h-px bg-[#C9A84C]/25" />
          </div>

          {/* Author */}
          <p className="font-(family-name:--font-inter) text-[30px] font-semibold text-[#C9A84C]/70 tracking-wide">
            — {author}
          </p>

          {/* Handle */}
          <div className="flex items-center gap-5 mt-20">
            <div className="w-[48px] h-[48px] rounded-full border-[1.5px] border-[#C9A84C]/30 overflow-hidden">
              <img src="/logo.svg" alt="Episteme" className="w-full h-full object-cover" />
            </div>
            <p className="font-(family-name:--font-inter) text-[22px] text-[#C9A84C]/40 tracking-wider">
              @asso_episteme
            </p>
          </div>
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

export default QuoteContent;
