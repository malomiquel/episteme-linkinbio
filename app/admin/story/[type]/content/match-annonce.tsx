import { forwardRef } from "react";
import { StoryLayout } from "./story-layout";

const MatchAnnonceContent = forwardRef<HTMLDivElement, Record<string, string>>(
  function MatchAnnonceContent({ line1, line2, line3, emoji }, ref) {
    return (
      <StoryLayout ref={ref} background="#1A0C10">
        <div
          className="absolute"
          style={{
            top: "35%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)",
          }}
        />

        <div className="flex-1 flex flex-col items-center justify-center w-full px-16 gap-0">
          <p
            className="font-(family-name:--font-inter) uppercase tracking-[10px] font-medium text-center"
            style={{ fontSize: 40, color: "#C9A84C" }}
          >
            {line1}
          </p>

          <div
            className="w-16 h-px mt-10 mb-10"
            style={{ background: "rgba(201,168,76,0.4)" }}
          />

          <p
            className="font-(family-name:--font-playfair) font-bold italic text-center leading-tight"
            style={{ fontSize: 110, color: "#F5F0E8" }}
          >
            {line2}
          </p>

          <p className="mt-10 leading-none" style={{ fontSize: 120 }}>
            {emoji}
          </p>

          <p
            className="font-(family-name:--font-playfair) italic text-center leading-snug mt-10"
            style={{ fontSize: 52, color: "#C9A84C" }}
          >
            {line3}
          </p>
        </div>
      </StoryLayout>
    );
  },
);

export default MatchAnnonceContent;
