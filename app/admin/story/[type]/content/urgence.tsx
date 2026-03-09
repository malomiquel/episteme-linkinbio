import { forwardRef } from "react";
import { StoryLayout } from "./story-layout";

const UrgenceContent = forwardRef<HTMLDivElement, Record<string, string>>(
  function UrgenceContent(
    { badge, percent, headline, eventName, eventDate, eventLocation, cta },
    ref,
  ) {
    const pct = Math.min(100, Math.max(0, Number(percent) || 50));

    return (
      <StoryLayout ref={ref}>
        <div className="flex-1 flex flex-col items-center justify-center w-full px-16">
          <span className="font-(family-name:--font-inter) text-[26px] uppercase tracking-[8px] font-semibold px-12 py-4 rounded-full border-[1.5px] border-gold/30 text-gold/80">
            {badge}
          </span>

          <div className="flex items-baseline gap-2 mt-16">
            <span
              className="font-(family-name:--font-playfair) font-bold leading-none"
              style={{ fontSize: 200, color: "#C9A84C" }}
            >
              {pct}
            </span>
            <span
              className="font-(family-name:--font-playfair) font-bold leading-none"
              style={{ fontSize: 100, color: "rgba(201,168,76,0.6)" }}
            >
              %
            </span>
          </div>

          <div className="w-full mt-10 relative">
            <div
              className="w-full rounded-full overflow-hidden"
              style={{
                height: 28,
                background: "rgba(201,168,76,0.08)",
                border: "1px solid rgba(201,168,76,0.15)",
              }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${pct}%`,
                  background:
                    "linear-gradient(90deg, #8C3A44 0%, #C9A84C 100%)",
                  boxShadow: "0 0 30px rgba(201,168,76,0.3)",
                }}
              />
            </div>

            <div className="flex justify-between mt-4 px-1">
              {[0, 25, 50, 75, 100].map((tick) => (
                <span
                  key={tick}
                  className="font-(family-name:--font-inter) text-[20px]"
                  style={{
                    color:
                      tick <= pct
                        ? "rgba(201,168,76,0.55)"
                        : "rgba(201,168,76,0.2)",
                  }}
                >
                  {tick}%
                </span>
              ))}
            </div>
          </div>

          <p className="font-(family-name:--font-playfair) text-[52px] font-bold text-cream leading-snug text-center mt-14 whitespace-pre-line">
            {headline}
          </p>

          <div className="flex items-center gap-5 mt-14">
            <div className="w-28 h-px bg-gold/25" />
            <div className="size-3.5 rotate-45 border-[1.5px] border-gold/35" />
            <div className="w-28 h-px bg-gold/25" />
          </div>

          <div
            className="flex items-center gap-8 mt-14 px-14 py-8 rounded-[24px]"
            style={{
              background:
                "linear-gradient(160deg, rgba(201,168,76,0.1) 0%, rgba(201,168,76,0.03) 100%)",
              border: "1.5px solid rgba(201,168,76,0.18)",
            }}
          >
            <div className="flex flex-col items-start gap-2">
              <p className="font-(family-name:--font-playfair) text-[40px] font-bold text-cream">
                {eventName}
              </p>
              <p className="font-(family-name:--font-inter) text-[28px] text-gold/60">
                {eventDate} &middot; {eventLocation}
              </p>
            </div>
          </div>

          <p className="font-(family-name:--font-inter) text-[36px] font-semibold text-gold/70 tracking-wide mt-16 text-center">
            {cta}
          </p>
        </div>
      </StoryLayout>
    );
  },
);

export default UrgenceContent;
