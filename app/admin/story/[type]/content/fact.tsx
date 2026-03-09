import { forwardRef } from "react";
import { StoryLayout } from "./story-layout";

const FactContent = forwardRef<HTMLDivElement, Record<string, string>>(
  function FactContent({ title, fact, source }, ref) {
    const sourceText = source?.trim();

    return (
      <StoryLayout ref={ref}>

        <div className="flex flex-col items-center justify-center w-full flex-1 px-16">
          <div className="text-[120px] mb-12">💡</div>

          <span className="font-(family-name:--font-inter) text-[36px] uppercase tracking-[7px] font-semibold px-12 py-4 rounded-full border-[2px] border-gold/30 text-gold/70 mb-16">
            Culture
          </span>

          <h1 className="font-(family-name:--font-playfair) text-[86px] font-bold text-cream leading-[1.08] text-center mb-12">
            {title}
          </h1>

          <div className="flex items-center gap-6 mb-14">
            <div className="w-36 h-px bg-gold/20" />
            <div className="w-4 h-4 rotate-45 border-[2px] border-gold/35" />
            <div className="w-36 h-px bg-gold/20" />
          </div>

          <div
            className="w-full rounded-4xl px-16 py-16"
            style={{
              background:
                "linear-gradient(160deg, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0.04) 100%)",
              border: "2px solid rgba(201,168,76,0.25)",
              boxShadow:
                "0 0 90px rgba(201,168,76,0.06), inset 0 1px 0 rgba(201,168,76,0.1)",
            }}
          >
            <p className="font-(family-name:--font-inter) text-[42px] text-cream/90 leading-relaxed text-center">
              {fact}
            </p>
          </div>

          {sourceText && (
            <p className="font-(family-name:--font-inter) text-[28px] text-gold/50 leading-relaxed text-center mt-10 px-8">
              Source: {sourceText}
            </p>
          )}
        </div>
      </StoryLayout>
    );
  },
);

export default FactContent;
