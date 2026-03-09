import { forwardRef } from "react";
import { StoryLayout } from "./story-layout";

const AnnonceContent = forwardRef<HTMLDivElement, Record<string, string>>(
  function AnnonceContent({ title, subtitle, emoji, label, cta }, ref) {
    return (
      <StoryLayout ref={ref}>

        <div className="flex-1 flex flex-col items-center justify-center text-center">

          <span className="font-(family-name:--font-inter) text-3xl uppercase tracking-[10px] font-semibold px-12 py-4 rounded-full border-2 border-gold/30 text-gold/80">
            {label}
          </span>


          <div className="text-[120px] mt-12 leading-none">{emoji}</div>


          <h1 className="font-(family-name:--font-playfair) text-7xl font-bold text-cream leading-tight mt-10">
            {title}
          </h1>


          <p className="font-(family-name:--font-playfair) italic text-5xl text-gold-light/75 mt-6">
            {subtitle}
          </p>


          <div className="flex items-center gap-5 mt-16">
            <div className="w-35 h-0.5 bg-gold/25" />
            <div className="size-4 rotate-45 border-[1.5px] border-gold/40" />
            <div className="w-35 h-0.5 bg-gold/25" />
          </div>


          <p className="font-(family-name:--font-inter) text-4xl font-medium text-gold/60 tracking-wide mt-14">
            {cta}
          </p>
        </div>
      </StoryLayout>
    );
  },
);

export default AnnonceContent;
