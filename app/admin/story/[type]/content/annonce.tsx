import Image from "next/image";
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
          background: "#2A1520",
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
              "radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(0,0,0,0.2) 100%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center w-full h-full">
          {/* Header — logo + handle */}
          <div className="flex items-center gap-6 pt-24">
            <div className="size-30 rounded-full border-2 border-gold/50 overflow-hidden">
              <Image
                src="/logo.svg"
                alt="Episteme"
                className="w-full h-full object-cover"
                width={120}
                height={120}
              />
            </div>
            <p className="font-(family-name:--font-inter) text-3xl text-gold/50 tracking-wider">
              @asso_episteme
            </p>
          </div>

          {/* Main section */}
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            {/* Badge */}
            <span className="font-(family-name:--font-inter) text-3xl uppercase tracking-[10px] font-semibold px-12 py-4 rounded-full border-2 border-gold/30 text-gold/80">
              {label}
            </span>

            {/* Emoji */}
            <div className="text-[120px] mt-12 leading-none">{emoji}</div>

            {/* Title */}
            <h1 className="font-(family-name:--font-playfair) text-7xl font-bold text-cream leading-tight mt-10">
              {title}
            </h1>

            {/* Subtitle */}
            <p className="font-(family-name:--font-playfair) italic text-5xl text-gold-light/75 mt-6">
              {subtitle}
            </p>

            {/* Separator */}
            <div className="flex items-center gap-5 mt-16">
              <div className="w-35 h-0.5 bg-gold/25" />
              <div className="size-4 rotate-45 border-[1.5px] border-gold/40" />
              <div className="w-35 h-0.5 bg-gold/25" />
            </div>

            {/* Call to action */}
            <p className="font-(family-name:--font-inter) text-4xl font-medium text-gold/60 tracking-wide mt-14">
              {cta}
            </p>
          </div>

          {/* Bottom ornament */}
          <div className="flex items-center gap-3 mb-30">
            <div className="w-12 h-0.5 bg-gold/20" />
            <div className="size-3.5 rotate-45 bg-gold/20" />
            <div className="w-12 h-0.5 bg-gold/20" />
          </div>
        </div>
      </div>
    );
  },
);

export default AnnonceContent;
