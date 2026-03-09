"use client";

import { use, useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { STANDS } from "../../../../config/degustation";

type Params = Promise<{ token: string }>;

export default function InvitePage({ params }: { params: Params }) {
  const { token } = use(params);
  const [visits, setVisits] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    fetch(`/api/degustation/visit?token=${token}`)
      .then((r) => {
        if (r.status === 404) {
          setInvalid(true);
          return null;
        }
        return r.json();
      })
      .then((data) => {
        if (data) setVisits(data.visits ?? []);
      })
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-dark flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold/40 border-t-gold rounded-full animate-spin" />
      </div>
    );
  }

  if (invalid) {
    return (
      <div className="fixed inset-0 bg-dark flex flex-col items-center justify-center gap-4 px-6 text-center">
        <span className="text-4xl">❌</span>
        <p className="text-cream/60 text-sm">Badge invalide. Contacte un organisateur.</p>
      </div>
    );
  }

  const remaining = STANDS.filter((s) => !visits.includes(s.id));
  const visited = STANDS.filter((s) => visits.includes(s.id));

  return (
    <>
      <div className="fixed inset-0 bg-dark z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(201,168,76,0.12)_0%,transparent_50%),radial-gradient(ellipse_at_80%_100%,rgba(140,58,68,0.2)_0%,transparent_50%)]" />
      </div>

      <div className="relative z-10 min-h-dvh flex flex-col items-center justify-center px-5 py-10 font-(family-name:--font-inter)">
        <div className="w-full max-w-xs flex flex-col items-center gap-6">
          {/* Header */}
          <div className="text-center">
            <p className="text-xs text-gold/60 uppercase tracking-widest font-semibold mb-1">
              Dégustation Episteme
            </p>
            <h1 className="font-(family-name:--font-playfair) text-2xl font-bold text-cream">
              Mon badge
            </h1>
          </div>

          {/* QR Code */}
          <div className="bg-white rounded-2xl p-5 shadow-lg">
            <QRCode value={token} size={200} />
          </div>
          <p className="text-xs text-cream/30 font-mono">{token}</p>

          {/* Progress */}
          <div className="w-full bg-dark-card/80 border border-cream/8 rounded-2xl p-4 backdrop-blur-sm">
            <p className="text-xs text-cream/40 uppercase tracking-widest font-semibold mb-3">
              Avancement — {visits.length}/{STANDS.length} stands
            </p>
            <div className="flex flex-col gap-2">
              {STANDS.map((stand) => {
                const done = visits.includes(stand.id);
                return (
                  <div
                    key={stand.id}
                    className={`flex items-center gap-3 text-sm ${done ? "text-cream/90" : "text-cream/30"}`}
                  >
                    <span className="text-base leading-none">{stand.emoji}</span>
                    <span className="flex-1">{stand.name}</span>
                    {done && <span className="text-green-400 text-xs">✓</span>}
                  </div>
                );
              })}
            </div>
          </div>

          {remaining.length === 0 && (
            <div className="text-center bg-gold/10 border border-gold/30 rounded-2xl p-4 w-full">
              <p className="text-gold text-sm font-semibold">
                🎉 Tous les stands visités !
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
