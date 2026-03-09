import { forwardRef } from "react";
import { StoryLayout } from "./story-layout";

const TeaserContent = forwardRef<HTMLDivElement, Record<string, string>>(
  function TeaserContent(
    { title, subtitle, transition, ctaEmoji, ctaText, linkNote, shareNote },
    ref,
  ) {
    const titleLines = title.split("\n");

    return (
      <StoryLayout ref={ref}>

        <div className="flex flex-col items-center text-center mt-16 px-12">
          <h1 className="font-(family-name:--font-playfair) text-[82px] font-bold leading-[1.15]">
            {titleLines.map((line, i) => (
              <span key={i} className="block">
                {i === 0 ? (
                  <span style={{ color: "#F5F0E8" }}>{line}</span>
                ) : (
                  <span className="italic" style={{ color: "#E8D48B" }}>
                    {line}
                  </span>
                )}
              </span>
            ))}
          </h1>


          <p className="font-(family-name:--font-inter) text-[26px] uppercase tracking-[8px] text-gold/65 font-semibold mt-10">
            {subtitle}
          </p>
        </div>


        <div className="flex items-center gap-5 mt-14">
          <div className="w-30 h-px bg-gold/25" />
          <div className="w-3.5 h-3.5 rotate-45 border-[1.5px] border-gold/35" />
          <div className="w-30 h-px bg-gold/25" />
        </div>


        <p className="font-(family-name:--font-playfair) italic text-[38px] text-cream/80 mt-14">
          {transition}
        </p>


        <div className="text-[80px] mt-6 leading-none">{ctaEmoji}</div>


        <p className="font-(family-name:--font-playfair) text-[56px] font-bold text-cream leading-tight mt-6 text-center px-14">
          {ctaText}
        </p>


        <div className="flex-1" />


        {linkNote && (
          <div
            className="flex items-center justify-center gap-4 px-12 py-4 rounded-full mx-14"
            style={{
              border: "1.5px solid rgba(201,168,76,0.25)",
              background: "rgba(201,168,76,0.06)",
            }}
          >
            <p className="font-(family-name:--font-inter) text-[28px] font-semibold tracking-wide text-gold-light/80 text-center">
              {linkNote}
            </p>
          </div>
        )}


        {shareNote && (
          <p className="font-(family-name:--font-inter) text-[26px] text-cream/35 text-center leading-snug mt-8 px-16">
            {shareNote.split("\n").map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </p>
        )}
      </StoryLayout>
    );
  },
);

export default TeaserContent;
