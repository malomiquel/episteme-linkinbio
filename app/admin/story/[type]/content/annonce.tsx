import { forwardRef } from "react";

const AnnonceContent = forwardRef<HTMLDivElement, Record<string, string>>(
  function AnnonceContent({ title, subtitle, emoji, label, cta }, ref) {
    return (
      <div
        ref={ref}
        className="relative flex flex-col items-center overflow-hidden"
        style={{
          width: 1080,
          height: 1920,
          background: "#1E0A12",
        }}
      >
        {/* Background gradients */}
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
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(0,0,0,0.45) 100%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center w-full h-full">
          {/* Header — logo + handle */}
          <div className="flex items-center gap-6 pt-[110px]">
            <div className="w-[80px] h-[80px] rounded-full border-[2px] border-[#C9A84C]/50 overflow-hidden">
              <img
                src="/logo.svg"
                alt="Episteme"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="font-(family-name:--font-inter) text-[24px] text-[#C9A84C]/50 tracking-wider">
              @asso_episteme
            </p>
          </div>

          {/* Main section */}
          <div className="flex-1 flex flex-col items-center justify-center text-center px-14 -mt-8">
            {/* Badge */}
            <span className="font-(family-name:--font-inter) text-[22px] uppercase tracking-[6px] font-semibold px-10 py-4 rounded-full border-[1.5px] border-[#C9A84C]/30 text-[#C9A84C]/80">
              {label}
            </span>

            {/* Emoji */}
            <div className="text-[120px] mt-12 leading-none">{emoji}</div>

            {/* Title */}
            <h1 className="font-(family-name:--font-playfair) text-[80px] font-bold text-[#F5F0E8] leading-tight mt-10">
              {title}
            </h1>

            {/* Subtitle */}
            <p className="font-(family-name:--font-playfair) italic text-[42px] text-[#E8D48B]/75 mt-6">
              {subtitle}
            </p>

            {/* Separator */}
            <div className="flex items-center gap-5 mt-16">
              <div className="w-[140px] h-px bg-[#C9A84C]/25" />
              <div className="w-3.5 h-3.5 rotate-45 border-[1.5px] border-[#C9A84C]/40" />
              <div className="w-[140px] h-px bg-[#C9A84C]/25" />
            </div>

            {/* Call to action */}
            <p className="font-(family-name:--font-inter) text-[32px] font-medium text-[#C9A84C]/60 tracking-wide mt-14">
              {cta}
            </p>
          </div>

          {/* Bottom ornament */}
          <div className="flex items-center gap-3 mb-[120px]">
            <div className="w-12 h-px bg-[#C9A84C]/20" />
            <div className="w-2.5 h-2.5 rotate-45 bg-[#C9A84C]/20" />
            <div className="w-12 h-px bg-[#C9A84C]/20" />
          </div>
        </div>
      </div>
    );
  },
);

export default AnnonceContent;
