"use client";

const iconStyles: Record<string, string> = {
  ticket: "bg-wine",
  instagram: "bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#F77737]",
  wine: "bg-gradient-to-br from-wine to-[#9B4D54]",
  contact: "bg-gradient-to-br from-[#4A90D9] to-[#2E6DB4]",
};

const icons: Record<string, string> = {
  ticket: "🎟️",
  instagram: "📸",
  wine: "🍷",
  contact: "✉️",
};

interface LinkCardProps {
  title: string;
  description: string;
  href: string;
  icon: "ticket" | "instagram" | "wine" | "contact";
  external?: boolean;
  delay: number;
}

declare global {
  interface Window {
    umami?: { track: (event: string, data?: Record<string, string>) => void };
  }
}

export function LinkCard({
  title,
  description,
  href,
  icon,
  external,
  delay,
}: LinkCardProps) {
  function handleClick() {
    window.umami?.track("link_click", { title, href });
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className="group flex items-center gap-3.5 bg-dark-card/80 border border-cream/8 rounded-2xl p-4 text-cream no-underline transition-all duration-300 hover:border-gold/40 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(0,0,0,0.3)] animate-fade-in-up backdrop-blur-sm"
      style={{ animationDelay: `${delay}ms` }}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 ${iconStyles[icon]}`}
      >
        {icons[icon]}
      </div>
      <div className="min-w-0">
        <h3 className="text-[15px] font-semibold font-(family-name:--font-inter) text-cream/90">
          {title}
        </h3>
        <p className="text-xs text-cream/35">{description}</p>
      </div>
      <span className="ml-auto text-cream/15 text-lg transition-all duration-300 group-hover:text-gold group-hover:translate-x-0.5">
        ›
      </span>
    </a>
  );
}
