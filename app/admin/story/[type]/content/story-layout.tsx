import Image from "next/image";
import { forwardRef } from "react";

interface StoryLayoutProps {
  children: React.ReactNode;
  background?: string;
}

export const StoryLayout = forwardRef<HTMLDivElement, StoryLayoutProps>(
  function StoryLayout({ children, background = "#2A1520" }, ref) {
    return (
      <div
        ref={ref}
        className="relative flex flex-col items-center overflow-hidden"
        style={{ width: 1080, height: 1920, background }}
      >

        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 50% 20%, rgba(80,35,48,0.65) 0%, transparent 55%),
              radial-gradient(ellipse at 30% 75%, rgba(140,58,68,0.2) 0%, transparent 50%),
              radial-gradient(ellipse at 70% 10%, rgba(201,168,76,0.08) 0%, transparent 40%)
            `,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.25) 100%)",
          }}
        />

        <div className="relative z-10 flex flex-col items-center w-full h-full">

          <div className="flex items-center gap-6 pt-24">
            <div className="size-32 rounded-full border-2 border-gold/50 overflow-hidden">
              <Image
                src="/logo.svg"
                alt="Episteme"
                className="w-full h-full object-cover"
                width={128}
                height={128}
              />
            </div>
            <p
              className="font-(family-name:--font-inter) text-3xl tracking-wider"
              style={{ color: "#C9A84C" }}
            >
              @asso_episteme
            </p>
          </div>


          {children}


          <div className="flex items-center gap-4 mb-24">
            <div className="w-28 h-px" style={{ background: "rgba(201,168,76,0.4)" }} />
            <div className="size-3.5 rotate-45 border border-gold/50" />
            <div className="w-28 h-px" style={{ background: "rgba(201,168,76,0.4)" }} />
          </div>
        </div>
      </div>
    );
  },
);
