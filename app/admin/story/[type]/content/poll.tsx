import { forwardRef } from "react";
import { StoryLayout } from "./story-layout";

const PollContent = forwardRef<HTMLDivElement, Record<string, string>>(
  function PollContent({ topic }, ref) {
    return (
      <StoryLayout ref={ref}>
        <div className="flex flex-col items-center w-full flex-1 px-14">

          <div className="mt-16">
            <span className="font-(family-name:--font-inter) text-[20px] uppercase tracking-[6px] font-semibold px-10 py-3.5 rounded-full border-[1.5px] border-[#C9A84C]/30 text-[#C9A84C]/70">
              Sondage
            </span>
          </div>


          <h1 className="font-(family-name:--font-playfair) text-[68px] font-bold text-[#F5F0E8] leading-[1.15] mt-14 text-center px-4">
            {topic}
          </h1>


          <div className="flex items-center gap-5 mt-12">
            <div className="w-[120px] h-px bg-[#C9A84C]/20" />
            <div className="w-3.5 h-3.5 rotate-45 border-[1.5px] border-[#C9A84C]/35" />
            <div className="w-[120px] h-px bg-[#C9A84C]/20" />
          </div>


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
      </StoryLayout>
    );
  },
);

export default PollContent;
