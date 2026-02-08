"use client";

import { useEffect, useState } from "react";

interface QuizOption {
  id: string;
  title: string;
  emoji: string;
  label: string;
  description: string;
}

interface FeaturedData {
  quizId: string | null;
  from: string | null;
  until: string | null;
}

export default function FeaturedPage() {
  const [quizOptions, setQuizOptions] = useState<QuizOption[]>([]);
  const [data, setData] = useState<FeaturedData>({
    quizId: null,
    from: null,
    until: null,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/featured")
      .then((r) => r.json())
      .then((res) => {
        setQuizOptions(res.quizzes);
        setData(res.featured);
        setLoading(false);
      });
  }, []);

  async function handleSave() {
    setSaving(true);
    await fetch("/api/admin/featured", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  if (loading) {
    return (
      <div className="min-h-dvh bg-dark flex items-center justify-center">
        <p className="text-cream/50 text-sm">Chargement...</p>
      </div>
    );
  }

  const selectedQuiz = quizOptions.find((q) => q.id === data.quizId);

  const now = new Date();
  const isScheduled = data.from && now < new Date(data.from);
  const isExpired = data.until && now > new Date(data.until);
  const isActive = data.quizId && !isScheduled && !isExpired;

  return (
    <>
      <div className="fixed inset-0 bg-dark z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(201,168,76,0.12)_0%,transparent_50%),radial-gradient(ellipse_at_80%_100%,rgba(140,58,68,0.2)_0%,transparent_50%)]" />
      </div>

      <div className="relative z-10 min-h-dvh flex flex-col items-center justify-center px-5 py-10 font-(family-name:--font-inter)">
        <div className="w-full max-w-md">
          <a
            href="/admin"
            className="flex items-center gap-2 text-sm text-cream/50 hover:text-cream transition-colors w-fit mb-6"
          >
            <span className="text-base leading-none">&larr;</span>
            Retour
          </a>
          <div className="text-center mb-8">
            <p className="text-[11px] uppercase tracking-[3px] text-gold/60 mb-2">
              Admin
            </p>
            <h1 className="font-(family-name:--font-playfair) text-2xl font-bold text-cream">
              Quiz en avant
            </h1>
            <p className="text-sm text-cream/30 mt-1">
              Quiz affich&eacute; sur la page d&apos;accueil
            </p>
          </div>

          <div className="flex justify-center mb-6">
            {!data.quizId ? (
              <span className="text-[11px] uppercase tracking-wider px-3 py-1 rounded-full bg-cream/5 text-cream/40">
                Aucun quiz actif
              </span>
            ) : isExpired ? (
              <span className="text-[11px] uppercase tracking-wider px-3 py-1 rounded-full bg-red-500/10 text-red-400">
                Expir&eacute;
              </span>
            ) : isScheduled ? (
              <span className="text-[11px] uppercase tracking-wider px-3 py-1 rounded-full bg-blue-500/10 text-blue-400">
                Programm&eacute;
              </span>
            ) : (
              <span className="text-[11px] uppercase tracking-wider px-3 py-1 rounded-full bg-green-500/10 text-green-400">
                Actif
              </span>
            )}
          </div>

          <div className="bg-dark-card/80 border border-cream/8 rounded-2xl p-6 backdrop-blur-sm">
            <label className="block text-[11px] uppercase tracking-[2px] text-gold/70 mb-2 font-semibold">
              Quiz
            </label>
            <div className="relative mb-6">
              <select
                value={data.quizId || ""}
                onChange={(e) =>
                  setData({ ...data, quizId: e.target.value || null })
                }
                className="w-full bg-dark border border-cream/10 text-cream rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold/40 transition-colors cursor-pointer appearance-none"
              >
                <option value="">Aucun (d&eacute;sactiv&eacute;)</option>
                {quizOptions.map((q) => (
                  <option key={q.id} value={q.id}>
                    {q.emoji} {q.title}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-cream/30">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M3 4.5L6 7.5L9 4.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-[11px] uppercase tracking-[2px] text-gold/70 mb-2 font-semibold">
                  D&eacute;but
                </label>
                <input
                  type="date"
                  value={data.from || ""}
                  onChange={(e) =>
                    setData({ ...data, from: e.target.value || null })
                  }
                  className="w-full bg-dark border border-cream/10 text-cream rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold/40 transition-colors [color-scheme:dark]"
                />
                {data.from && (
                  <button
                    onClick={() => setData({ ...data, from: null })}
                    className="text-[10px] text-cream/30 hover:text-cream/60 mt-1 transition-colors"
                  >
                    Retirer
                  </button>
                )}
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-[2px] text-gold/70 mb-2 font-semibold">
                  Fin
                </label>
                <input
                  type="date"
                  value={data.until || ""}
                  onChange={(e) =>
                    setData({ ...data, until: e.target.value || null })
                  }
                  className="w-full bg-dark border border-cream/10 text-cream rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold/40 transition-colors [color-scheme:dark]"
                />
                {data.until && (
                  <button
                    onClick={() => setData({ ...data, until: null })}
                    className="text-[10px] text-cream/30 hover:text-cream/60 mt-1 transition-colors"
                  >
                    Retirer
                  </button>
                )}
              </div>
            </div>

            <p className="text-[11px] text-cream/20 mb-6">
              Laisse les dates vides pour un affichage permanent.
            </p>

            {selectedQuiz && isActive && (
              <div className="mb-6">
                <p className="text-[10px] uppercase tracking-[2px] text-gold/50 mb-3 font-semibold">
                  Aper&ccedil;u sur la page d&apos;accueil
                </p>
                <div className="flex items-center gap-4 rounded-2xl p-4 border border-gold/25 bg-gradient-to-r from-wine-dark/60 to-wine/40">
                  <div className="w-11 h-11 rounded-xl bg-gold/15 flex items-center justify-center text-xl shrink-0">
                    {selectedQuiz.emoji}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-[15px] font-semibold text-cream/90">
                        {selectedQuiz.title}
                      </h3>
                      <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-gold/20 text-gold">
                        {selectedQuiz.label}
                      </span>
                    </div>
                    <p className="text-xs text-cream/35">
                      {selectedQuiz.description}
                    </p>
                  </div>
                </div>
                {(data.from || data.until) && (
                  <p className="text-[11px] text-cream/25 mt-2 text-center">
                    {data.from
                      ? `Du ${new Date(data.from).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}`
                      : "Pas de date de d\u00e9but"}
                    {" \u2014 "}
                    {data.until
                      ? `au ${new Date(data.until).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}`
                      : "pas de date de fin"}
                  </p>
                )}
              </div>
            )}

            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full bg-gold text-dark px-6 py-3 rounded-full font-semibold text-sm transition-all hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(201,168,76,0.25)] disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {saving ? "Enregistrement..." : "Enregistrer"}
            </button>

            {saved && (
              <p className="text-center text-sm text-green-400 mt-3 animate-fade-in-up">
                Sauvegard&eacute; !
              </p>
            )}
          </div>

        </div>
      </div>
    </>
  );
}
