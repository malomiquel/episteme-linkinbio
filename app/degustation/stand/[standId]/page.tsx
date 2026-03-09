"use client";

import { use, useEffect, useRef, useState, useCallback } from "react";
import { STANDS, getStand } from "../../../../config/degustation";

type Params = Promise<{ standId: string }>;

type ScanState =
  | { status: "scanning" }
  | { status: "loading" }
  | { status: "ok"; standName: string; totalVisits: number }
  | { status: "already"; standName: string }
  | { status: "error"; message: string };

export default function StandPage({ params }: { params: Params }) {
  const { standId } = use(params);
  const stand = getStand(standId);

  const [scanState, setScanState] = useState<ScanState>({ status: "scanning" });
  const scannerRef = useRef<{ pause: () => void; resume: () => void; stop: () => Promise<void> } | null>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleScan = useCallback(
    async (token: string) => {
      if (scanState.status === "loading") return;

      scannerRef.current?.pause();
      setScanState({ status: "loading" });

      try {
        const res = await fetch("/api/degustation/visit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: token.trim(), standId }),
        });

        if (res.status === 404) {
          setScanState({ status: "error", message: "Badge inconnu" });
        } else if (!res.ok) {
          setScanState({ status: "error", message: "Erreur serveur" });
        } else {
          const data = await res.json();
          if (data.alreadyVisited) {
            setScanState({ status: "already", standName: data.stand.name });
          } else {
            setScanState({ status: "ok", standName: data.stand.name, totalVisits: data.totalVisits });
          }
        }
      } catch {
        setScanState({ status: "error", message: "Pas de connexion" });
      }

      resumeTimerRef.current = setTimeout(() => {
        setScanState({ status: "scanning" });
        scannerRef.current?.resume();
      }, 3500);
    },
    [standId, scanState.status]
  );

  useEffect(() => {
    let stopped = false;

    import("html5-qrcode").then(({ Html5Qrcode }) => {
      if (stopped) return;

      const scanner = new Html5Qrcode("qr-reader");
      scannerRef.current = scanner;

      scanner
        .start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 220, height: 220 } },
          (decoded) => handleScan(decoded),
          () => {}
        )
        .catch(() => {
          setScanState({ status: "error", message: "Caméra inaccessible" });
        });
    });

    return () => {
      stopped = true;
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      scannerRef.current?.stop().catch(() => {});
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!stand) {
    return (
      <div className="fixed inset-0 bg-dark flex flex-col items-center justify-center gap-4 px-6 text-center">
        <span className="text-4xl">❌</span>
        <p className="text-cream/60 text-sm">Stand inconnu : {standId}</p>
        <a href="/admin/degustation" className="text-gold/60 text-sm underline">
          Retour admin
        </a>
      </div>
    );
  }

  const isResult = scanState.status === "ok" || scanState.status === "already" || scanState.status === "error";

  return (
    <>
      <div className="fixed inset-0 bg-dark z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(201,168,76,0.12)_0%,transparent_50%),radial-gradient(ellipse_at_80%_100%,rgba(140,58,68,0.2)_0%,transparent_50%)]" />
      </div>

      <div className="relative z-10 min-h-dvh flex flex-col items-center px-5 py-8 font-(family-name:--font-inter)">
        {/* Stand header */}
        <div className="w-full max-w-sm mb-6 text-center">
          <p className="text-xs text-gold/60 uppercase tracking-widest font-semibold mb-1">
            Scanner — Stand
          </p>
          <h1 className="font-(family-name:--font-playfair) text-2xl font-bold text-cream flex items-center justify-center gap-2">
            <span>{stand.emoji}</span>
            <span>{stand.name}</span>
          </h1>
          {stand.description && (
            <p className="text-sm text-cream/40 mt-1">{stand.description}</p>
          )}
        </div>

        {/* QR Reader — always rendered in DOM */}
        <div
          className="w-full max-w-sm rounded-2xl overflow-hidden border border-cream/10"
          style={{ display: isResult ? "none" : "block" }}
        >
          <div id="qr-reader" className="w-full" />
        </div>

        {/* Loading */}
        {scanState.status === "loading" && (
          <div className="w-full max-w-sm flex flex-col items-center justify-center gap-4 py-16">
            <div className="w-10 h-10 border-2 border-gold/40 border-t-gold rounded-full animate-spin" />
            <p className="text-cream/50 text-sm">Vérification...</p>
          </div>
        )}

        {/* Result: first visit */}
        {scanState.status === "ok" && (
          <div className="w-full max-w-sm flex flex-col items-center gap-5 py-10">
            <div className="w-24 h-24 rounded-full bg-green-500/20 border-2 border-green-400/40 flex items-center justify-center">
              <span className="text-5xl">✅</span>
            </div>
            <div className="text-center">
              <p className="text-green-400 text-xl font-bold">Bienvenue !</p>
              <p className="text-cream/60 text-sm mt-1">
                Première visite au stand <strong className="text-cream/90">{scanState.standName}</strong>
              </p>
              <p className="text-cream/30 text-xs mt-3">
                {scanState.totalVisits} stand{scanState.totalVisits > 1 ? "s" : ""} visité{scanState.totalVisits > 1 ? "s" : ""} au total
              </p>
            </div>
            <p className="text-cream/20 text-xs">Reprise dans 3 secondes...</p>
          </div>
        )}

        {/* Result: already visited */}
        {scanState.status === "already" && (
          <div className="w-full max-w-sm flex flex-col items-center gap-5 py-10">
            <div className="w-24 h-24 rounded-full bg-red-500/20 border-2 border-red-400/40 flex items-center justify-center">
              <span className="text-5xl">🚫</span>
            </div>
            <div className="text-center">
              <p className="text-red-400 text-xl font-bold">Déjà dégusté !</p>
              <p className="text-cream/60 text-sm mt-1">
                Cet invité a déjà visité{" "}
                <strong className="text-cream/90">{scanState.standName}</strong>
              </p>
            </div>
            <p className="text-cream/20 text-xs">Reprise dans 3 secondes...</p>
          </div>
        )}

        {/* Error */}
        {scanState.status === "error" && (
          <div className="w-full max-w-sm flex flex-col items-center gap-5 py-10">
            <div className="w-24 h-24 rounded-full bg-yellow-500/20 border-2 border-yellow-400/40 flex items-center justify-center">
              <span className="text-5xl">⚠️</span>
            </div>
            <div className="text-center">
              <p className="text-yellow-400 text-xl font-bold">Erreur</p>
              <p className="text-cream/60 text-sm mt-1">{scanState.message}</p>
            </div>
            <button
              onClick={() => {
                setScanState({ status: "scanning" });
                scannerRef.current?.resume();
              }}
              className="px-6 py-2 rounded-xl bg-gold/20 border border-gold/30 text-gold text-sm font-semibold hover:bg-gold/30 transition-colors"
            >
              Réessayer
            </button>
          </div>
        )}

        {/* Scanning hint */}
        {scanState.status === "scanning" && (
          <p className="mt-4 text-cream/30 text-xs text-center">
            Pointez la caméra sur le QR code du badge invité
          </p>
        )}
      </div>
    </>
  );
}
