import { forwardRef } from "react";
import { StoryLayout } from "./story-layout";

const PublicationContent = forwardRef<HTMLDivElement, Record<string, string>>(
  function PublicationContent({ badge, category, title, description, cta, emoji }, ref) {
    return (
      <StoryLayout ref={ref}>

        <div className="mt-14">
          <span className="font-(family-name:--font-inter) text-[22px] uppercase tracking-[6px] font-semibold px-10 py-4 rounded-full border-[1.5px] border-[#C9A84C]/30 text-[#C9A84C]/80">
            {badge}
          </span>
        </div>


        <div
          className="mx-14 mt-14 rounded-[32px] flex flex-col items-center px-14 py-16 relative"
          style={{
            background: "linear-gradient(170deg, rgba(201,168,76,0.09) 0%, rgba(201,168,76,0.02) 100%)",
            border: "1.5px solid rgba(201,168,76,0.18)",
            boxShadow: "0 0 80px rgba(201,168,76,0.06), inset 0 0 60px rgba(201,168,76,0.03)",
          }}
        >

          <div className="flex items-center gap-3 mb-10">
            <span className="text-[36px] leading-none">{emoji}</span>
            <p className="font-(family-name:--font-inter) text-[22px] uppercase tracking-[4px] font-medium text-[#C9A84C]/55">
              {category}
            </p>
          </div>


          <div className="w-[80px] h-px bg-[#C9A84C]/20 mb-10" />


          <h1 className="font-(family-name:--font-playfair) text-[72px] font-bold text-[#F5F0E8] leading-[1.15] text-center">
            {title}
          </h1>


          <p
            className="font-(family-name:--font-inter) text-[30px] leading-[1.6] text-center mt-10 px-4"
            style={{ color: "rgba(245,240,232,0.55)" }}
          >
            {description}
          </p>
        </div>


        <div className="flex-1" />


        <div className="flex items-center gap-5">
          <div className="w-[120px] h-px bg-[#C9A84C]/25" />
          <div className="w-3.5 h-3.5 rotate-45 border-[1.5px] border-[#C9A84C]/40" />
          <div className="w-[120px] h-px bg-[#C9A84C]/25" />
        </div>


        <p className="font-(family-name:--font-inter) text-[28px] font-medium text-[#C9A84C]/60 tracking-wide mt-10">
          {cta}
        </p>
      </StoryLayout>
    );
  },
);

export default PublicationContent;
