import { forwardRef } from "react";
import { StoryLayout } from "./story-layout";

const QuoteContent = forwardRef<HTMLDivElement, Record<string, string>>(
  function QuoteContent({ quote, author }, ref) {
    return (
      <StoryLayout ref={ref}>
        <div className="flex-1 flex flex-col items-center justify-center w-full px-14">

          <p
            className="font-(family-name:--font-playfair) leading-none mb-6"
            style={{ fontSize: 200, color: "rgba(201,168,76,0.15)" }}
          >
            &ldquo;
          </p>


          <p className="font-(family-name:--font-playfair) italic text-[52px] text-[#F5F0E8] leading-snug text-center px-8 -mt-20">
            {quote}
          </p>


          <div className="flex items-center gap-5 mt-14 mb-10">
            <div className="w-[100px] h-px bg-[#C9A84C]/25" />
            <div className="w-3.5 h-3.5 rotate-45 border-[1.5px] border-[#C9A84C]/35" />
            <div className="w-[100px] h-px bg-[#C9A84C]/25" />
          </div>


          <p className="font-(family-name:--font-inter) text-[30px] font-semibold text-[#C9A84C]/70 tracking-wide">
            — {author}
          </p>


          <div className="flex items-center gap-5 mt-20">
            <div className="w-[48px] h-[48px] rounded-full border-[1.5px] border-[#C9A84C]/30 overflow-hidden">
              <img src="/logo.svg" alt="Episteme" className="w-full h-full object-cover" />
            </div>
            <p className="font-(family-name:--font-inter) text-[22px] text-[#C9A84C]/40 tracking-wider">
              @asso_episteme
            </p>
          </div>
        </div>
      </StoryLayout>
    );
  },
);

export default QuoteContent;
