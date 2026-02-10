import Image from "next/image";
import { forwardRef } from "react";

const EventContent = forwardRef<HTMLDivElement, Record<string, string>>(
  function EventContent({ eventName, date, time, location }, ref) {
    return (
      <div
        ref={ref}
        className="relative flex flex-col items-center overflow-hidden"
        style={{ width: 1080, height: 1920, background: "#2A1520" }}
      >
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 50% 30%, rgba(80,35,48,0.7) 0%, transparent 55%),
              radial-gradient(ellipse at 20% 70%, rgba(201,168,76,0.08) 0%, transparent 45%),
              radial-gradient(ellipse at 80% 20%, rgba(140,58,68,0.2) 0%, transparent 50%)
            `,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.2) 100%)",
          }}
        />

        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-14">
          {/* Logo */}
          <div className="size-30 rounded-full border-[2.5px] border-gold/50 overflow-hidden shadow-[0_0_60px_rgba(201,168,76,0.12)] mb-10">
            <Image
              src="/logo.svg"
              alt="Episteme"
              className="w-full h-full object-cover"
              width={120}
              height={120}
            />
          </div>

          {/* Save the date badge */}
          <span className="font-(family-name:--font-inter) text-2xl uppercase tracking-[6px] font-semibold px-10 py-3.5 rounded-full border-[1.5px] border-gold/30 text-gold/70 mb-16">
            Save the date
          </span>

          {/* Event name */}
          <h1 className="font-(family-name:--font-playfair) text-[80px] font-bold text-cream leading-[1.1] text-center mb-14 px-4">
            {eventName}
          </h1>

          {/* Separator */}
          <div className="flex items-center gap-5 mb-14">
            <div className="w-[120px] h-px bg-gold/20" />
            <div className="w-3.5 h-3.5 rotate-45 border-[1.5px] border-gold/35" />
            <div className="w-[120px] h-px bg-gold/20" />
          </div>

          {/* Info cards */}
          <div className="flex gap-6 w-full px-4">
            {/* Date */}
            <div
              className="flex-1 rounded-[28px] py-10 flex flex-col items-center"
              style={{
                background:
                  "linear-gradient(160deg, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0.04) 100%)",
                border: "1.5px solid rgba(201,168,76,0.2)",
              }}
            >
              <p className="font-(family-name:--font-inter) text-2xl uppercase tracking-[4px] text-gold/50 mb-4">
                Date
              </p>
              <p className="font-(family-name:--font-playfair) text-5xl font-bold text-cream text-center px-4">
                {date}
              </p>
            </div>

            {/* Heure */}
            <div
              className="w-65 rounded-[28px] py-10 flex flex-col items-center"
              style={{
                background:
                  "linear-gradient(160deg, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0.04) 100%)",
                border: "1.5px solid rgba(201,168,76,0.2)",
              }}
            >
              <p className="font-(family-name:--font-inter) text-2xl uppercase tracking-[4px] text-gold/50 mb-4">
                Heure
              </p>
              <p className="font-(family-name:--font-playfair) text-5xl font-bold text-cream">
                {time}
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-4 mt-12">
            <span className="text-[32px]">📍</span>
            <p className="font-(family-name:--font-inter) text-[34px] text-cream/70">
              {location}
            </p>
          </div>
        </div>

        {/* Bottom ornament */}
        <div className="absolute bottom-[120px] flex items-center gap-3">
          {/* CTA */}
          <div className="w-12 h-px bg-gold/20" />
          <div className="w-2.5 h-2.5 rotate-45 bg-gold/20" />
          <div className="w-12 h-px bg-gold/20" />
        </div>
      </div>
    );
  },
);

export default EventContent;
