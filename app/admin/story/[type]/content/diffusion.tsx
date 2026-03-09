import Image from "next/image";
import { forwardRef } from "react";
import { StoryLayout } from "./story-layout";
import { SixNationsLogo } from "@/components/logo/six-nation";

const DiffusionContent = forwardRef<HTMLDivElement, Record<string, string>>(
  function DiffusionContent({ team1, team2, matchTime, matchDate }, ref) {
    return (
      <StoryLayout ref={ref}>
        <div className="flex-1 flex flex-col items-center justify-center gap-36">
          <div className="relative flex flex-col items-center gap-12 p-12 rounded-4xl overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                background: "rgba(255, 255, 255, 0.08)", // très transparent
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                border: "1px solid rgba(255, 255, 255, 0.18)", // fine bordure élégante
                boxShadow: "0 10px 40px rgba(0,0,0,0.12)", // ombre douce
              }}
            />

            {/* Contenu */}
            <div className="relative z-10 flex flex-col items-center gap-12">
              <p
                className="font-(family-name:--font-playfair) font-bold text-center leading-tight"
                style={{
                  fontSize: 72,
                  color: "#F5F0E8",
                  textShadow: "0 1px 12px rgba(0,0,0,0.15)", // très subtil
                }}
              >
                On diffuse le match
              </p>

              <div
                style={{
                  width: 110,
                  height: 125,
                  color: "#F5F0E8",
                  filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.18))",
                }}
              >
                <SixNationsLogo />
              </div>

              <p
                className="font-(family-name:--font-inter) text-[28px] uppercase tracking-[6px] font-medium"
                style={{
                  color: "#C9A84C",
                  letterSpacing: "6px",
                }}
              >
                Dernière journée
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-12 w-full">
            <div
              className="flex items-center justify-center rounded-2xl"
              style={{
                width: 260,
                height: 260,
                background: "#F5F0E8",
                padding: 24,
              }}
            >
              <Image
                src="/Logo_FFR_2019.svg.png"
                alt={team1}
                width={212}
                height={212}
                className="w-full h-full object-contain"
              />
            </div>

            <span
              className="font-(family-name:--font-inter) font-black shrink-0"
              style={{
                fontSize: 52,
                color: "#C9A84C",
                letterSpacing: "0.08em",
              }}
            >
              vs
            </span>

            <div
              className="flex items-center justify-center rounded-2xl"
              style={{
                width: 260,
                height: 260,
                background: "#F5F0E8",
                padding: 24,
              }}
            >
              <Image
                src="/Logo_Rugby_Angleterre.svg.png"
                alt={team2}
                width={212}
                height={212}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div className="flex flex-col items-center">
            <p
              className="font-(family-name:--font-playfair) font-bold leading-none"
              style={{ fontSize: 140, color: "#C9A84C" }}
            >
              {matchTime}
            </p>
            <p
              className="font-(family-name:--font-inter) text-[34px] font-medium mt-2"
              style={{ color: "rgba(245,240,232,0.7)" }}
            >
              {matchDate}
            </p>
          </div>
        </div>
      </StoryLayout>
    );
  },
);

export default DiffusionContent;
