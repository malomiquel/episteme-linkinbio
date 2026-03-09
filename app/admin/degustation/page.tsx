"use client";

import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { STANDS } from "../../../config/degustation";

interface GuestData {
  guests: string[];
  visits: Record<string, string[]>;
}

export default function DegustationAdmin() {
  const [data, setData] = useState<GuestData>({ guests: [], visits: {} });
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [count, setCount] = useState(10);
  const [showQR, setShowQR] = useState<string | null>(null);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
    fetch("/api/degustation/guests")
      .then((r) => r.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  async function generate() {
    setGenerating(true);
    const res = await fetch("/api/degustation/guests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ count }),
    });
    const result = await res.json();
    if (result.ok) {
      setData((prev) => ({
        guests: [...prev.guests, ...result.tokens],
        visits: {
          ...prev.visits,
          ...Object.fromEntries(result.tokens.map((t: string) => [t, []])),
        },
      }));
    }
    setGenerating(false);
  }

  async function deleteGuest(token: string) {
    await fetch("/api/degustation/guests", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    setData((prev) => {
      const visits = { ...prev.visits };
      delete visits[token];
      return { guests: prev.guests.filter((t) => t !== token), visits };
    });
  }

  async function resetAll() {
    if (!confirm("Supprimer tous les invités et les visites ?")) return;
    for (const token of data.guests) {
      await fetch("/api/degustation/guests", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
    }
    setData({ guests: [], visits: {} });
  }

  const totalVisits = Object.values(data.visits).reduce((sum, v) => sum + v.length, 0);

  return (
    <>
      <div className="fixed inset-0 bg-dark z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(201,168,76,0.12)_0%,transparent_50%),radial-gradient(ellipse_at_80%_100%,rgba(140,58,68,0.2)_0%,transparent_50%)]" />
      </div>

      <div className="relative z-10 min-h-dvh flex flex-col items-center px-5 py-10 font-(family-name:--font-inter)">
        <div className="w-full max-w-md">
          <a
            href="/admin"
            className="flex items-center gap-2 text-sm text-cream/50 hover:text-cream transition-colors w-fit mb-6"
          >
            <span className="text-base leading-none">&larr;</span>
            Admin
          </a>

          <div className="text-center mb-8">
            <h1 className="font-(family-name:--font-playfair) text-2xl font-bold text-cream">
              🍷 Dégustation
            </h1>
            <p className="text-sm text-cream/30 mt-1">
              Gestion des badges QR code
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-dark-card/80 border border-cream/8 rounded-xl p-3 text-center backdrop-blur-sm">
              <p className="text-2xl font-bold text-cream">{data.guests.length}</p>
              <p className="text-xs text-cream/35 mt-0.5">Invités</p>
            </div>
            <div className="bg-dark-card/80 border border-cream/8 rounded-xl p-3 text-center backdrop-blur-sm">
              <p className="text-2xl font-bold text-cream">{STANDS.length}</p>
              <p className="text-xs text-cream/35 mt-0.5">Stands</p>
            </div>
            <div className="bg-dark-card/80 border border-cream/8 rounded-xl p-3 text-center backdrop-blur-sm">
              <p className="text-2xl font-bold text-gold">{totalVisits}</p>
              <p className="text-xs text-cream/35 mt-0.5">Visites</p>
            </div>
          </div>

          {/* Stands — scanner links */}
          <p className="text-xs text-cream/25 uppercase tracking-widest font-semibold mb-3 px-1">
            Liens stands (animateurs)
          </p>
          <div className="flex flex-col gap-2 mb-8">
            {STANDS.map((stand) => (
              <a
                key={stand.id}
                href={`/degustation/stand/${stand.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-dark-card/80 border border-cream/8 rounded-xl px-4 py-3 backdrop-blur-sm hover:border-gold/30 transition-all"
              >
                <span className="text-xl">{stand.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-cream/90">{stand.name}</p>
                  <p className="text-xs text-cream/30 font-mono truncate">
                    /degustation/stand/{stand.id}
                  </p>
                </div>
                <span className="text-cream/15 text-lg group-hover:text-gold/60 transition-colors">↗</span>
              </a>
            ))}
          </div>

          {/* Generate guests */}
          <p className="text-xs text-cream/25 uppercase tracking-widest font-semibold mb-3 px-1">
            Générer des invités
          </p>
          <div className="bg-dark-card/80 border border-cream/8 rounded-2xl p-4 backdrop-blur-sm mb-8">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="text-xs text-cream/40 mb-1 block">Nombre de badges</label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={count}
                  onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-dark/60 border border-cream/15 rounded-lg px-3 py-2 text-cream text-sm focus:outline-none focus:border-gold/40"
                />
              </div>
              <button
                onClick={generate}
                disabled={generating}
                className="mt-5 px-5 py-2 rounded-xl bg-gold/20 border border-gold/30 text-gold text-sm font-semibold hover:bg-gold/30 transition-colors disabled:opacity-40"
              >
                {generating ? "..." : "Générer"}
              </button>
            </div>
          </div>

          {/* Guest list */}
          {data.guests.length > 0 && (
            <>
              <div className="flex items-center justify-between mb-3 px-1">
                <p className="text-xs text-cream/25 uppercase tracking-widest font-semibold">
                  Invités ({data.guests.length})
                </p>
                <button
                  onClick={resetAll}
                  className="text-xs text-red-400/60 hover:text-red-400 transition-colors"
                >
                  Tout supprimer
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {data.guests.map((token) => {
                  const visitedStands = data.visits[token] ?? [];
                  return (
                    <div
                      key={token}
                      className="bg-dark-card/80 border border-cream/8 rounded-xl px-4 py-3 backdrop-blur-sm"
                    >
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setShowQR(showQR === token ? null : token)}
                          className="text-sm text-gold/60 hover:text-gold transition-colors font-mono"
                          title="Voir le QR code"
                        >
                          QR
                        </button>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-cream/50 font-mono truncate">{token}</p>
                          <p className="text-xs text-cream/30 mt-0.5">
                            {visitedStands.length}/{STANDS.length} stands
                            {visitedStands.length > 0 && (
                              <span className="ml-2">
                                {visitedStands.map((sid) => {
                                  const s = STANDS.find((x) => x.id === sid);
                                  return s?.emoji ?? "";
                                }).join(" ")}
                              </span>
                            )}
                          </p>
                        </div>
                        <a
                          href={`/degustation/invite/${token}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cream/15 text-sm hover:text-gold/60 transition-colors"
                          title="Ouvrir le badge"
                        >
                          ↗
                        </a>
                        <button
                          onClick={() => deleteGuest(token)}
                          className="text-red-400/30 text-sm hover:text-red-400 transition-colors"
                          title="Supprimer"
                        >
                          ✕
                        </button>
                      </div>

                      {/* QR expanded */}
                      {showQR === token && (
                        <div className="mt-4 flex flex-col items-center gap-3">
                          <div className="bg-white rounded-xl p-4">
                            <QRCode value={token} size={160} />
                          </div>
                          <p className="text-xs text-cream/30 font-mono">{token}</p>
                          <p className="text-xs text-cream/20 text-center">
                            Badge : {origin}/degustation/invite/{token}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {loading && (
            <div className="flex justify-center py-10">
              <div className="w-6 h-6 border-2 border-gold/40 border-t-gold rounded-full animate-spin" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
