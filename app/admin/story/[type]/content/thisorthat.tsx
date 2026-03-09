import { forwardRef } from "react";
import { StoryLayout } from "./story-layout";

const ThisOrThatContent = forwardRef<HTMLDivElement, Record<string, string>>(
  function ThisOrThatContent({ title, optionA, optionB, emojiA, emojiB }, ref) {
    return (
      <StoryLayout ref={ref}>

        <div
          className="absolute top-0 left-0 right-0"
          style={{
            height: "50%",
            background:
              "linear-gradient(180deg, rgba(140,58,68,0.15) 0%, transparent 100%)",
          }}
        />


        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: "50%",
            background:
              "linear-gradient(0deg, rgba(201,168,76,0.08) 0%, transparent 100%)",
          }}
        />

        <div className="flex flex-col items-center pt-24 px-14">
          <span className="font-(family-name:--font-inter) text-[20px] uppercase tracking-[6px] font-semibold px-10 py-3.5 rounded-full border-[1.5px] border-gold/30 text-gold/70">
            This or That
          </span>

          <h1 className="font-(family-name:--font-playfair) text-[70px] font-bold text-cream leading-tight mt-10 text-center">
            {title}
          </h1>
        </div>

        <div className="flex-1 flex flex-col items-center w-full mt-24 px-14 gap-24">
          <div
            className="w-full rounded-4xl py-10 flex flex-col items-center"
            style={{
              background:
                "linear-gradient(160deg, rgba(140,58,68,0.2) 0%, rgba(140,58,68,0.06) 100%)",
              border: "1.5px solid rgba(140,58,68,0.3)",
              boxShadow: "0 0 60px rgba(140,58,68,0.08)",
            }}
          >
            <span className="text-[100px] mb-4">{emojiA}</span>
            <p className="font-(family-name:--font-playfair) text-[60px] font-bold text-cream">
              {optionA}
            </p>
          </div>

          <div className="w-full rounded-3xl flex flex-col items-center justify-center py-24 -my-2">
            <span className="text-3xl opacity-40 mb-2">📊</span>
            <p className="font-(family-name:--font-inter) text-[18px] text-gold/25 tracking-wide">
              Sticker Sondage ici
            </p>
          </div>

          <div
            className="w-full rounded-4xl py-10 flex flex-col items-center"
            style={{
              background:
                "linear-gradient(160deg, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0.04) 100%)",
              border: "1.5px solid rgba(201,168,76,0.25)",
              boxShadow: "0 0 60px rgba(201,168,76,0.06)",
            }}
          >
            <span className="text-[100px] mb-4">{emojiB}</span>
            <p className="font-(family-name:--font-playfair) text-[60px] font-bold text-cream">
              {optionB}
            </p>
          </div>
        </div>
      </StoryLayout>
    );
  },
);

export default ThisOrThatContent;
