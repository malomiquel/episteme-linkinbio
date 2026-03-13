"use client";

import { use, useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    umami?: { track: (event: string, data?: Record<string, string | number>) => void };
  }
}
import QRCode from "react-qr-code";
import { STANDS } from "../../../../config/degustation";

type Params = Promise<{ token: string }>;

function WineGlass({ filled, total }: { filled: number; total: number }) {
  const rawPct = total === 0 ? 0 : filled / total;
  const pct = rawPct * 0.8; // max visual fill = 80%
  const complete = filled === total;
  const wineColor = "#7B2235";
  const wineLight = "#A63348";

  // viewBox 0 0 100 160
  // Realistic wine glass: curved bowl via bezier, thin stem, wide base
  // Bowl: top opening at y=8 (x: 18..82), curves inward to stem join at y=100 (x: 44..56)
  // The bowl path uses cubic beziers for a realistic curved shape

  const bowlPath = "M18,8 C18,8 10,55 16,80 C22,100 44,108 44,108 L56,108 C56,108 78,100 84,80 C90,55 82,8 82,8 Z";

  // Fill clip: we clip the wine rectangle to the bowl shape
  // Fill level from bottom (y=108) up by pct of bowl height (108-8=100)
  const bowlH = 100;
  const fillTop = 108 - pct * bowlH;

  return (
    <svg viewBox="0 0 100 160" width="110" height="176" style={{ filter: "drop-shadow(0 8px 24px rgba(140,58,68,0.35))" }}>
      <defs>
        <clipPath id="bowl-clip">
          <path d={bowlPath} />
        </clipPath>
        <linearGradient id="wine-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={wineColor} stopOpacity="0.95" />
          <stop offset="50%" stopColor={wineLight} stopOpacity="0.85" />
          <stop offset="100%" stopColor={wineColor} stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="glass-shine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(245,240,232,0.18)" />
          <stop offset="40%" stopColor="rgba(245,240,232,0.06)" />
          <stop offset="100%" stopColor="rgba(245,240,232,0.02)" />
        </linearGradient>
      </defs>

      {/* Bowl fill (wine) */}
      {pct > 0 && (
        <rect
          x="0" y={fillTop} width="100" height={108 - fillTop + 2}
          fill="url(#wine-grad)"
          clipPath="url(#bowl-clip)"
          style={{ transition: "y 0.9s cubic-bezier(0.34,1.56,0.64,1), height 0.9s cubic-bezier(0.34,1.56,0.64,1)" }}
        />
      )}

      {/* Wave on top of wine */}
      {pct > 0 && pct < 1 && (
        <g clipPath="url(#bowl-clip)" style={{ transition: "transform 0.9s cubic-bezier(0.34,1.56,0.64,1)" }}>
          <path
            d={`M0,${fillTop} Q25,${fillTop - 4} 50,${fillTop} Q75,${fillTop + 4} 100,${fillTop} L100,${fillTop + 6} Q75,${fillTop + 10} 50,${fillTop + 6} Q25,${fillTop + 2} 0,${fillTop + 6} Z`}
            fill={wineLight}
            opacity="0.5"
          >
            <animateTransform attributeName="transform" type="translate" values="0,0;-50,0;0,0" dur="3s" repeatCount="indefinite" />
          </path>
        </g>
      )}

      {/* Bowl glass outline */}
      <path
        d={bowlPath}
        fill="rgba(245,240,232,0.03)"
        stroke="rgba(245,240,232,0.3)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Left shine streak */}
      <path
        d="M26,16 C24,30 22,55 24,75"
        fill="none"
        stroke="rgba(245,240,232,0.18)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Secondary shine */}
      <path
        d="M34,12 C33,22 32,38 33,52"
        fill="none"
        stroke="rgba(245,240,232,0.08)"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Stem — connects flush to bowl bottom (y=108, x=44..56) */}
      <path
        d="M46,108 L47,142 L53,142 L54,108 Z"
        fill="rgba(245,240,232,0.12)"
        stroke="rgba(245,240,232,0.22)"
        strokeWidth="1"
        strokeLinejoin="round"
      />

      {/* Base */}
      <ellipse cx="50" cy="145" rx="22" ry="5" fill="rgba(245,240,232,0.14)" stroke="rgba(245,240,232,0.28)" strokeWidth="1" />

      {/* Bubbles always visible in the wine */}
      {pct > 0 && (
        <>
          <circle cx="40" cy={fillTop + 10} r="2" fill="rgba(200,100,120,0.5)">
            <animate attributeName="cy" values={`${fillTop + 10};${fillTop - 5}`} dur="2.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0" dur="2.2s" repeatCount="indefinite" />
          </circle>
          <circle cx="54" cy={fillTop + 18} r="1.4" fill="rgba(200,100,120,0.35)">
            <animate attributeName="cy" values={`${fillTop + 18};${fillTop}`} dur="2.8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0" dur="2.8s" repeatCount="indefinite" />
          </circle>
          <circle cx="47" cy={fillTop + 28} r="1" fill="rgba(200,100,120,0.3)">
            <animate attributeName="cy" values={`${fillTop + 28};${fillTop + 8}`} dur="1.9s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.35;0" dur="1.9s" repeatCount="indefinite" />
          </circle>
        </>
      )}

      {/* Completion: sparkles around the glass */}
      {complete && (
        <>
          {/* Top-left sparkle */}
          <g>
            <line x1="6" y1="20" x2="6" y2="28" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round">
              <animate attributeName="opacity" values="0;1;0" dur="1.4s" repeatCount="indefinite" />
            </line>
            <line x1="2" y1="24" x2="10" y2="24" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round">
              <animate attributeName="opacity" values="0;1;0" dur="1.4s" repeatCount="indefinite" />
            </line>
          </g>
          {/* Top-right sparkle */}
          <g>
            <line x1="94" y1="14" x2="94" y2="22" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round">
              <animate attributeName="opacity" values="0;1;0" dur="1.8s" begin="0.4s" repeatCount="indefinite" />
            </line>
            <line x1="90" y1="18" x2="98" y2="18" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round">
              <animate attributeName="opacity" values="0;1;0" dur="1.8s" begin="0.4s" repeatCount="indefinite" />
            </line>
          </g>
          {/* Right mid sparkle (small) */}
          <g>
            <line x1="90" y1="50" x2="90" y2="56" stroke="#C9A84C" strokeWidth="1" strokeLinecap="round">
              <animate attributeName="opacity" values="0;1;0" dur="1.2s" begin="0.8s" repeatCount="indefinite" />
            </line>
            <line x1="87" y1="53" x2="93" y2="53" stroke="#C9A84C" strokeWidth="1" strokeLinecap="round">
              <animate attributeName="opacity" values="0;1;0" dur="1.2s" begin="0.8s" repeatCount="indefinite" />
            </line>
          </g>
          {/* Checkmark overlay on the bowl */}
          <circle cx="50" cy="58" r="12" fill="rgba(201,168,76,0.15)" stroke="rgba(201,168,76,0.5)" strokeWidth="1.5" />
          <path d="M44,58 L48,63 L57,52" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
    </svg>
  );
}

export default function InvitePage({ params }: { params: Params }) {
  const { token } = use(params);
  const [visits, setVisits] = useState<string[]>([]);
  const [guestName, setGuestName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [invalid, setInvalid] = useState(false);
  const [newlyUnlocked, setNewlyUnlocked] = useState<string | null>(null);
  const hasTrackedRef = useRef(false);
  const prevVisitsRef = useRef<string[] | null>(null);

  async function fetchVisits() {
    const r = await fetch(`/api/degustation/visit?token=${token}`);
    if (r.status === 404) { setInvalid(true); return; }
    const data = await r.json();
    const newVisits: string[] = data.visits ?? [];

    // Detect newly unlocked stand — skip on initial load
    if (prevVisitsRef.current !== null) {
      const added = newVisits.find((id) => !prevVisitsRef.current!.includes(id));
      if (added) setNewlyUnlocked(added);
    }
    prevVisitsRef.current = newVisits;

    setVisits(newVisits);
    setGuestName(data.name ?? null);
  }

  useEffect(() => {
    fetchVisits().finally(() => setLoading(false));

    // Poll every 4s for real-time updates
    const interval = setInterval(fetchVisits, 4000);
    return () => clearInterval(interval);
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  // Track invite page open once, after guest data is loaded
  useEffect(() => {
    if (loading || hasTrackedRef.current) return;
    hasTrackedRef.current = true;
    window.umami?.track("invite_opened", { token, name: guestName ?? "(inconnu)" });
  }, [loading, guestName, token]);

  // Clear "newly unlocked" highlight after 3s
  useEffect(() => {
    if (!newlyUnlocked) return;
    const t = setTimeout(() => setNewlyUnlocked(null), 3000);
    return () => clearTimeout(t);
  }, [newlyUnlocked]);

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

  const allDone = visits.length === STANDS.length;

  return (
    <>
      <div className="fixed inset-0 bg-dark z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(201,168,76,0.12)_0%,transparent_50%),radial-gradient(ellipse_at_80%_100%,rgba(140,58,68,0.2)_0%,transparent_50%)]" />
      </div>

      <div className="relative z-10 min-h-dvh flex flex-col items-center px-4 py-8 font-(family-name:--font-inter)">
        <div className="w-full max-w-sm flex flex-col items-center gap-6">

          {/* Header */}
          <div className="text-center">
            <p className="text-xs text-gold/50 uppercase tracking-widest font-semibold mb-1">
              Episteme · Dégustation
            </p>
            <h1 className="font-(family-name:--font-playfair) text-3xl font-bold text-cream">
              Transmission II
            </h1>
            {guestName && (
              <p className="text-sm text-cream/50 mt-1">{guestName}</p>
            )}
          </div>

          {/* QR Code */}
          <div className="bg-white rounded-2xl p-4 shadow-lg">
            <QRCode value={token} size={200} />
          </div>

          {/* Progress — wine glass + stands */}
          <div className="w-full bg-dark-card/60 border border-cream/8 rounded-2xl p-5 backdrop-blur-sm">

            {/* Glass + counter */}
            <div className="flex items-center gap-5 mb-5">
              <WineGlass filled={visits.length} total={STANDS.length} />
              <div className="flex flex-col gap-1">
                <p className="font-(family-name:--font-playfair) text-5xl font-bold text-cream leading-none">
                  {visits.length}<span className="text-2xl text-cream/30">/{STANDS.length}</span>
                </p>
                <p className="text-xs text-cream/40 uppercase tracking-widest">
                  {allDone ? "Complété 🎉" : "stands visités"}
                </p>
                {/* Progress bar */}
                <div className="w-full h-1.5 bg-cream/10 rounded-full mt-2 overflow-hidden" style={{ width: 140 }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(visits.length / STANDS.length) * 100}%`,
                      background: allDone ? "#C9A84C" : "#8C3A44",
                      transition: "width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Stands list */}
            <div className="flex flex-col divide-y divide-cream/5">
              {STANDS.map((stand) => {
                const done = visits.includes(stand.id);
                const isNew = newlyUnlocked === stand.id;
                return (
                  <div
                    key={stand.id}
                    className={`flex items-center gap-3 py-2.5 text-sm transition-all duration-500 ${
                      done ? "text-cream/90" : "text-cream/25"
                    } ${isNew ? "scale-[1.02]" : ""}`}
                  >
                    <span className={`text-lg leading-none transition-all duration-500 ${done ? "opacity-100" : "opacity-30 grayscale"}`}>
                      {stand.emoji}
                    </span>
                    <span className="flex-1 font-medium">{stand.name}</span>
                    {done && (
                      <span className={`text-xs font-semibold transition-all duration-300 ${isNew ? "text-gold scale-110" : "text-green-400/80"}`}>
                        {isNew ? "✨" : "✓"}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <p className="text-xs text-cream/15 font-mono">{token}</p>
        </div>
      </div>
    </>
  );
}
