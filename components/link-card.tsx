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

export function LinkCard({ title, description, href, icon, external, delay }: LinkCardProps) {
  return (
    <a
      href={href}
      className="group flex items-center gap-3.5 bg-dark-card border border-cream/[0.06] rounded-2xl p-4 text-cream no-underline transition-all duration-300 hover:border-gold hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(0,0,0,0.3)] animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 ${iconStyles[icon]}`}
      >
        {icons[icon]}
      </div>
      <div className="min-w-0">
        <h3 className="text-[15px] font-semibold font-[family-name:var(--font-inter)]">
          {title}
        </h3>
        <p className="text-xs text-cream/40">{description}</p>
      </div>
      <span className="ml-auto text-cream/20 text-lg transition-all duration-300 group-hover:text-gold group-hover:translate-x-0.5">
        ›
      </span>
    </a>
  );
}
