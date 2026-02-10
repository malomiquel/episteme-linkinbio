const tools = [
  {
    title: "Quiz en avant",
    description: "Choisis le quiz affiché sur la page d\u2019accueil",
    href: "/admin/featured",
    emoji: "🎯",
  },
  {
    title: "Couvertures highlights",
    description: "Génère les icônes pour tes stories à la une",
    href: "/admin/highlights",
    emoji: "⭕",
  },
  {
    title: "Carrousel",
    description: "Crée des slides pour un post carrousel éducatif",
    href: "/admin/carousel",
    emoji: "📚",
  },
];

const storyTemplates = [
  { title: "Annonce", href: "/admin/story/annonce", emoji: "📱" },
  { title: "Teaser", href: "/admin/story/teaser", emoji: "👀" },
  { title: "Questions", href: "/admin/story/question", emoji: "❓" },
  { title: "Sondage", href: "/admin/story/poll", emoji: "📊" },
  { title: "Le saviez-vous", href: "/admin/story/fact", emoji: "💡" },
  { title: "Save the date", href: "/admin/story/event", emoji: "📅" },
  { title: "Citation", href: "/admin/story/quote", emoji: "✍️" },
  { title: "This or That", href: "/admin/story/thisorthat", emoji: "⚔️" },
  { title: "Nouveau post", href: "/admin/story/newpost", emoji: "🖼️" },
  { title: "Publication", href: "/admin/story/publication", emoji: "📰" },
];

export default function AdminHub() {
  return (
    <>
      <div className="fixed inset-0 bg-dark z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(201,168,76,0.12)_0%,transparent_50%),radial-gradient(ellipse_at_80%_100%,rgba(140,58,68,0.2)_0%,transparent_50%)]" />
      </div>

      <div className="relative z-10 min-h-dvh flex flex-col items-center justify-center px-5 py-10 font-(family-name:--font-inter)">
        <div className="w-full max-w-md">
          <a
            href="/"
            className="flex items-center gap-2 text-sm text-cream/50 hover:text-cream transition-colors w-fit mb-6"
          >
            <span className="text-base leading-none">&larr;</span>
            Accueil
          </a>
          <div className="text-center mb-10">
            <div className="w-20 h-20 rounded-full border-2 border-gold/40 mx-auto mb-4 overflow-hidden">
              <img
                src="/logo.svg"
                alt="Episteme"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="font-(family-name:--font-playfair) text-2xl font-bold text-cream">
              Espace Admin
            </h1>
            <p className="text-sm text-cream/30 mt-1">
              Outils de gestion Episteme
            </p>
          </div>

          {/* Outils */}
          <p className="text-xs text-cream/25 uppercase tracking-widest font-semibold mb-3 px-1">
            Outils
          </p>
          <div className="flex flex-col gap-3">
            {tools.map((tool) => (
              <a
                key={tool.href}
                href={tool.href}
                className="group flex items-center gap-4 bg-dark-card/80 border border-cream/8 rounded-2xl p-5 backdrop-blur-sm transition-all hover:border-gold/30 hover:-translate-y-0.5"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-2xl shrink-0">
                  {tool.emoji}
                </div>
                <div className="min-w-0">
                  <h3 className="text-[15px] font-semibold text-cream/90">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-cream/35">{tool.description}</p>
                </div>
                <span className="ml-auto text-cream/15 text-lg transition-all group-hover:text-gold/60 group-hover:translate-x-0.5">
                  ›
                </span>
              </a>
            ))}
          </div>

          {/* Stories section — compact grid */}
          <p className="text-xs text-cream/25 uppercase tracking-widest font-semibold mb-3 px-1 mt-8">
            Templates stories
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            {storyTemplates.map((t) => (
              <a
                key={t.href}
                href={t.href}
                className="group flex flex-col items-center gap-2 bg-dark-card/80 border border-cream/8 rounded-xl py-4 px-3 backdrop-blur-sm transition-all hover:border-gold/30 hover:-translate-y-0.5"
              >
                <span className="text-2xl">{t.emoji}</span>
                <span className="text-[13px] font-medium text-cream/80 group-hover:text-cream transition-colors text-center leading-tight">
                  {t.title}
                </span>
              </a>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
