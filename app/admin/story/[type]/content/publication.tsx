import { forwardRef } from "react";

const PublicationContent = forwardRef<HTMLDivElement, Record<string, string>>(
  function PublicationContent({ badge, category, title, description, cta, emoji }, ref) {
    return (
      <div
        ref={ref}
        className="relative flex flex-col items-center overflow-hidden"
        style={{ width: 1080, height: 1920, background: "#2A1520" }}
      >
        {/* Background gradients */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 50% 30%, rgba(80,35,48,0.6) 0%, transparent 55%),
              radial-gradient(ellipse at 30% 75%, rgba(201,168,76,0.08) 0%, transparent 45%),
              radial-gradient(ellipse at 70% 10%, rgba(140,58,68,0.18) 0%, transparent 50%)
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

        <div className="relative z-10 flex flex-col items-center w-full h-full">
          {/* Header — logo + handle */}
          <div className="flex items-center gap-6 pt-[110px]">
            <div
              className="w-[80px] h-[80px] rounded-full overflow-hidden"
              style={{
                border: "2px solid rgba(201,168,76,0.5)",
                boxShadow: "0 0 40px rgba(201,168,76,0.15)",
              }}
            >
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

          {/* Badge */}
          <div className="mt-14">
            <span className="font-(family-name:--font-inter) text-[22px] uppercase tracking-[6px] font-semibold px-10 py-4 rounded-full border-[1.5px] border-[#C9A84C]/30 text-[#C9A84C]/80">
              {badge}
            </span>
          </div>

          {/* Publication card */}
          <div
            className="mx-14 mt-14 rounded-[32px] flex flex-col items-center px-14 py-16 relative"
            style={{
              background: "linear-gradient(170deg, rgba(201,168,76,0.09) 0%, rgba(201,168,76,0.02) 100%)",
              border: "1.5px solid rgba(201,168,76,0.18)",
              boxShadow: "0 0 80px rgba(201,168,76,0.06), inset 0 0 60px rgba(201,168,76,0.03)",
            }}
          >
            {/* Category pill */}
            <div className="flex items-center gap-3 mb-10">
              <span className="text-[36px] leading-none">{emoji}</span>
              <p className="font-(family-name:--font-inter) text-[22px] uppercase tracking-[4px] font-medium text-[#C9A84C]/55">
                {category}
              </p>
            </div>

            {/* Thin separator */}
            <div className="w-[80px] h-px bg-[#C9A84C]/20 mb-10" />

            {/* Title */}
            <h1 className="font-(family-name:--font-playfair) text-[72px] font-bold text-[#F5F0E8] leading-[1.15] text-center">
              {title}
            </h1>

            {/* Description */}
            <p
              className="font-(family-name:--font-inter) text-[30px] leading-[1.6] text-center mt-10 px-4"
              style={{ color: "rgba(245,240,232,0.55)" }}
            >
              {description}
            </p>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Separator */}
          <div className="flex items-center gap-5">
            <div className="w-[120px] h-px bg-[#C9A84C]/25" />
            <div className="w-3.5 h-3.5 rotate-45 border-[1.5px] border-[#C9A84C]/40" />
            <div className="w-[120px] h-px bg-[#C9A84C]/25" />
          </div>

          {/* CTA */}
          <p className="font-(family-name:--font-inter) text-[28px] font-medium text-[#C9A84C]/60 tracking-wide mt-10">
            {cta}
          </p>

          {/* Bottom ornament */}
          <div className="flex items-center gap-3 mb-[120px] mt-14">
            <div className="w-12 h-px bg-[#C9A84C]/20" />
            <div className="w-2.5 h-2.5 rotate-45 bg-[#C9A84C]/20" />
            <div className="w-12 h-px bg-[#C9A84C]/20" />
          </div>
        </div>
      </div>
    );
  },
);

export default PublicationContent;
