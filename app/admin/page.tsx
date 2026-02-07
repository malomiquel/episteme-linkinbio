const tools = [
  {
    title: "Quiz en avant",
    description: "Choisis le quiz affich\u00e9 sur la page d\u2019accueil",
    href: "/admin/featured",
    emoji: "🎯",
  },
  {
    title: "G\u00e9n\u00e9rateur de story",
    description: "Cr\u00e9e une image story Instagram",
    href: "/admin/story",
    emoji: "📱",
  },
];

export default function AdminHub() {
  return (
    <>
      <div className="fixed inset-0 bg-dark z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(201,168,76,0.12)_0%,transparent_50%),radial-gradient(ellipse_at_80%_100%,rgba(140,58,68,0.2)_0%,transparent_50%)]" />
      </div>

      <div className="relative z-10 min-h-dvh flex flex-col items-center justify-center px-5 py-10 font-(family-name:--font-inter)">
        <div className="w-full max-w-md">
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

          <div className="text-center mt-8">
            <a
              href="/"
              className="text-sm text-cream/25 hover:text-cream/50 transition-colors"
            >
              &larr; Retour &agrave; l&apos;accueil
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
