import { Countdown } from "../components/countdown";
import { LinkCard } from "../components/link-card";
import { FeaturedQuiz } from "../components/featured-quiz";
import { siteConfig, nextEvent, links, pastEvents } from "../config/site";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <>
      <div className="fixed inset-0 bg-dark z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(201,168,76,0.12)_0%,transparent_50%),radial-gradient(ellipse_at_80%_100%,rgba(140,58,68,0.2)_0%,transparent_50%)]" />
      </div>

      <div className="relative z-10 max-w-120 mx-auto px-5 pt-10 pb-16 flex flex-col items-center font-(family-name:--font-inter)">
        <section
          className="text-center mb-8 animate-fade-in-up"
          style={{ animationDelay: "100ms" }}
        >
          <div className="w-28 h-28 rounded-full border-2 border-gold/60 mx-auto mb-4 overflow-hidden shadow-[0_0_40px_rgba(201,168,76,0.12)]">
            <img
              src="/logo.svg"
              alt="Episteme"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="font-(family-name:--font-playfair) text-3xl font-bold tracking-wide mb-1 text-cream">
            {siteConfig.name}
          </h1>
          <p className="text-sm text-gold/80 mb-3">{siteConfig.handle}</p>
          <p className="font-(family-name:--font-playfair) italic text-base text-cream/50 mb-2">
            {siteConfig.tagline}
          </p>
          <p className="text-xs text-cream/30 tracking-[3px] uppercase font-light">
            {siteConfig.categories.join(" · ")}
          </p>
        </section>

        <FeaturedQuiz />

        <section
          className="w-full bg-linear-to-br from-wine-dark/70 to-wine/50 border border-cream/8 rounded-2xl mb-6 text-center animate-fade-in-up backdrop-blur-sm overflow-hidden relative"
          style={{ animationDelay: "200ms" }}
        >
          {nextEvent.announced ? (
            <div className="p-6">
              <p className="text-[11px] uppercase tracking-[3px] text-gold/80 font-semibold mb-1.5">
                Prochain événement
              </p>
              <h2 className="font-(family-name:--font-playfair) text-[22px] font-bold mb-1 text-cream">
                {nextEvent.name}
              </h2>
              <p className="text-[13px] text-cream/40 mb-5">
                {nextEvent.location} &middot;{" "}
                {new Date(nextEvent.date).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}{" "}
                &middot; {nextEvent.time}
              </p>

              <Countdown targetDate={nextEvent.date} />

              <a
                href={nextEvent.ticketOpen ? nextEvent.ticketUrl : undefined}
                target={nextEvent.ticketOpen ? "_blank" : undefined}
                rel={nextEvent.ticketOpen ? "noopener noreferrer" : undefined}
                data-umami-event={
                  nextEvent.ticketOpen ? "ticket_click" : undefined
                }
                data-umami-event-event={
                  nextEvent.ticketOpen ? nextEvent.name : undefined
                }
                aria-disabled={!nextEvent.ticketOpen}
                className={cn(
                  "inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-sm transition-all",
                  nextEvent.ticketOpen
                    ? "bg-gold text-dark hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(201,168,76,0.25)]"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none",
                )}
              >
                {nextEvent.ticketOpen
                  ? "Réserver ma place"
                  : "Billetterie prochainement"}
              </a>
            </div>
          ) : (
            <div className="relative">
              <div
                className="p-6 blur-md opacity-30 select-none pointer-events-none"
                aria-hidden="true"
              >
                <p className="text-[11px] uppercase tracking-[3px] text-gold/80 font-semibold mb-1.5">
                  Prochain événement
                </p>
                <h2 className="font-(family-name:--font-playfair) text-[22px] font-bold mb-1 text-cream">
                  {nextEvent.name}
                </h2>
                <p className="text-[13px] text-cream/40 mb-5">
                  {nextEvent.location} &middot; ?? mars 2026 &middot; ??h??
                </p>
                <div className="flex justify-center gap-4 sm:gap-6 mb-5">
                  {["Jours", "Heures", "Min", "Sec"].map((label) => (
                    <div key={label} className="flex flex-col items-center">
                      <span className="text-3xl sm:text-4xl font-semibold text-gold-light">
                        ??
                      </span>
                      <span className="text-[10px] uppercase tracking-[2px] text-cream/40 mt-1">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
                <span className="inline-flex bg-gold text-dark px-7 py-3 rounded-full font-semibold text-sm">
                  Réserver ma place
                </span>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="font-(family-name:--font-playfair) text-xl font-bold text-cream mb-2">
                  Quelque chose se prépare...
                </p>
                <p className="text-sm text-gold/70">
                  Restez connectés pour la révélation
                </p>
              </div>
            </div>
          )}
        </section>

        <div className="w-full flex flex-col gap-3 mb-8">
          {links.map((link, i) => (
            <LinkCard key={link.title} {...link} delay={300 + i * 80} />
          ))}
        </div>

        <h3
          className="font-(family-name:--font-playfair) text-lg text-center text-gold/70 mb-4 animate-fade-in-up"
          id="events"
          style={{ animationDelay: "600ms" }}
        >
          Événements passés
        </h3>
        <div
          className="w-full grid grid-cols-2 gap-2.5 mb-8 animate-fade-in-up"
          style={{ animationDelay: "650ms" }}
        >
          {pastEvents.map((event) => (
            <div
              key={event.name}
              className="aspect-square rounded-xl bg-dark-card border border-cream/6 flex flex-col items-center justify-center text-center p-4 transition-colors hover:border-cream/12"
            >
              <span className="text-3xl mb-2">{event.emoji}</span>
              <span className="text-[13px] font-semibold text-cream/80">
                {event.name}
              </span>
              <span className="text-[11px] text-gold/60">{event.date}</span>
            </div>
          ))}
        </div>

        <footer
          className="text-center text-xs text-white mt-8 animate-fade-in-up"
          style={{ animationDelay: "800ms" }}
        >
          <div className="flex justify-center gap-5 mb-3">
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white transition-colors hover:text-gold"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
          <p>&copy; 2026 Episteme &middot; L&apos;art de faire revivre</p>
        </footer>
      </div>
    </>
  );
}
