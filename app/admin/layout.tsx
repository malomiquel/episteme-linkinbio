"use client";

import { useState, useEffect, type FormEvent } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  async function verify(p: string) {
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin: p }),
    });
    return res.ok;
  }

  useEffect(() => {
    const saved = localStorage.getItem("admin_pin");
    verify(saved || "").then((ok) => {
      if (ok) {
        setAuthenticated(true);
      } else if (saved) {
        localStorage.removeItem("admin_pin");
      }
      setLoading(false);
    });
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(false);
    const ok = await verify(pin);
    if (ok) {
      localStorage.setItem("admin_pin", pin);
      setAuthenticated(true);
    } else {
      setError(true);
    }
  }

  if (loading) {
    return (
      <div className="min-h-dvh bg-dark flex items-center justify-center">
        <p className="text-cream/50 text-sm">Chargement...</p>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <>
        <div className="fixed inset-0 bg-dark z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(201,168,76,0.12)_0%,transparent_50%),radial-gradient(ellipse_at_80%_100%,rgba(140,58,68,0.2)_0%,transparent_50%)]" />
        </div>
        <div className="relative z-10 min-h-dvh flex flex-col items-center justify-center px-5 font-(family-name:--font-inter)">
          <div className="w-full max-w-xs text-center">
            <div className="w-16 h-16 rounded-full border-2 border-gold/40 mx-auto mb-6 overflow-hidden">
              <img
                src="/logo.svg"
                alt="Episteme"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="font-(family-name:--font-playfair) text-xl font-bold text-cream mb-1">
              Espace Admin
            </h1>
            <p className="text-sm text-cream/30 mb-8">
              Saisis le code pour continuer
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="password"
                inputMode="numeric"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Code PIN"
                autoFocus
                className="w-full bg-dark border border-cream/10 text-cream rounded-xl px-4 py-3 text-center text-lg tracking-[8px] focus:outline-none focus:border-gold/40 transition-colors"
              />
              {error && (
                <p className="text-red-400 text-sm">Code incorrect</p>
              )}
              <button
                type="submit"
                className="w-full bg-gold text-dark px-6 py-3 rounded-full font-semibold text-sm transition-all hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(201,168,76,0.25)]"
              >
                Acc&eacute;der
              </button>
            </form>
            <a
              href="/"
              className="inline-block text-sm text-cream/20 hover:text-cream/50 transition-colors mt-6"
            >
              &larr; Retour
            </a>
          </div>
        </div>
      </>
    );
  }

  return <>{children}</>;
}
