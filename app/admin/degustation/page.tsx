"use client";

import { useEffect, useRef, useState } from "react";
import { STANDS } from "../../../config/degustation";
import type { Guest } from "../../api/degustation/guests/route";

interface DegustationData {
  guests: Guest[];
  visits: Record<string, string[]>;
}

export default function DegustationAdmin() {
  const [data, setData] = useState<DegustationData>({ guests: [], visits: {} });
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/degustation/guests")
      .then((r) => r.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  async function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setImporting(true);
    setImportResult(null);

    const formData = new FormData();
    formData.append("csv", file);

    try {
      const res = await fetch("/api/degustation/import", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();

      if (!res.ok) {
        setImportResult(`Erreur : ${result.error}`);
      } else {
        setImportResult(
          `✅ ${result.added} ajouté${result.added > 1 ? "s" : ""}, ${result.updated} mis à jour — ${result.total} invités au total`
        );
        // Reload data
        const fresh = await fetch("/api/degustation/guests").then((r) => r.json());
        setData(fresh);
      }
    } catch {
      setImportResult("Erreur : impossible de contacter le serveur");
    } finally {
      setImporting(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  function exportCSV() {
    const origin = window.location.origin;
    const rows = [
      ["Numéro", "Prénom Nom", "Email", "Tarif", "Token", "URL Badge"],
      ...data.guests.map((g, i) => [
        String(i + 1).padStart(3, "0"),
        g.name || "(sans nom)",
        g.email,
        g.ticketType,
        g.token,
        `${origin}/degustation/invite/${g.token}`,
      ]),
    ];
    const csv = rows.map((r) => r.map((v) => `"${v}"`).join(";")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" }); // BOM for Excel
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "degustation-badges.csv";
    a.click();
    URL.revokeObjectURL(url);
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
      return { guests: prev.guests.filter((g) => g.token !== token), visits };
    });
  }

  async function resetAll() {
    if (!confirm("Supprimer tous les invités et les visites ?")) return;
    for (const guest of data.guests) {
      await fetch("/api/degustation/guests", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: guest.token }),
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
            <p className="text-sm text-cream/30 mt-1">Gestion des badges QR code</p>
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

          {/* Import HelloAsso CSV */}
          <p className="text-xs text-cream/25 uppercase tracking-widest font-semibold mb-3 px-1">
            Importer les inscrits HelloAsso
          </p>
          <div className="bg-dark-card/80 border border-cream/8 rounded-2xl p-4 backdrop-blur-sm mb-2">
            <p className="text-xs text-cream/40 mb-3">
              Exporte la liste des participants depuis HelloAsso (format CSV) et importe-la ici.
              Les imports répétés préservent les tokens existants — seuls les nouveaux inscrits reçoivent un nouveau badge.
            </p>
            <label className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-dashed border-gold/30 text-gold text-sm font-semibold cursor-pointer hover:bg-gold/5 transition-colors">
              {importing ? (
                <>
                  <div className="w-4 h-4 border-2 border-gold/40 border-t-gold rounded-full animate-spin" />
                  Importation...
                </>
              ) : (
                <>
                  <span>📂</span>
                  Choisir le fichier CSV
                </>
              )}
              <input
                ref={fileRef}
                type="file"
                accept=".csv,text/csv"
                className="hidden"
                onChange={handleImport}
                disabled={importing}
              />
            </label>

            {importResult && (
              <p
                className={`text-xs mt-3 text-center ${
                  importResult.startsWith("✅") ? "text-green-400" : "text-red-400"
                }`}
              >
                {importResult}
              </p>
            )}
          </div>

          {/* Actions */}
          {data.guests.length > 0 && (
            <div className="flex gap-2 mb-8 mt-4">
              <a
                href="/admin/degustation/print"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-2.5 rounded-xl bg-gold/20 border border-gold/30 text-gold text-sm font-semibold hover:bg-gold/30 transition-colors"
              >
                🖨️ Imprimer les badges
              </a>
              <button
                onClick={exportCSV}
                className="flex-1 py-2.5 rounded-xl bg-cream/5 border border-cream/15 text-cream/70 text-sm font-semibold hover:bg-cream/10 transition-colors"
              >
                📥 Exporter CSV
              </button>
            </div>
          )}

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
                <span className="text-cream/15 text-lg group-hover:text-gold/60 transition-colors">
                  ↗
                </span>
              </a>
            ))}
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
                {data.guests.map((guest, i) => {
                  const visitedStands = data.visits[guest.token] ?? [];
                  return (
                    <div
                      key={guest.token}
                      className="bg-dark-card/80 border border-cream/8 rounded-xl px-4 py-3 backdrop-blur-sm"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-cream/25 font-mono w-8 shrink-0">
                          #{String(i + 1).padStart(3, "0")}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-cream/80 truncate">
                            {guest.name || <span className="text-cream/30 italic">Sans nom</span>}
                          </p>
                          {guest.ticketType && (
                            <p className="text-xs text-cream/30 truncate">{guest.ticketType}</p>
                          )}
                          <div className="flex items-center gap-2 mt-0.5">
                            <p className="text-xs text-cream/20">
                              {visitedStands.length}/{STANDS.length} stands
                            </p>
                            {visitedStands.length > 0 && (
                              <p className="text-xs">
                                {visitedStands.map((sid) => STANDS.find((x) => x.id === sid)?.emoji ?? "").join("")}
                              </p>
                            )}
                          </div>
                        </div>
                        <a
                          href={`/degustation/invite/${guest.token}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cream/15 text-sm hover:text-gold/60 transition-colors"
                          title="Ouvrir le badge"
                        >
                          ↗
                        </a>
                        <button
                          onClick={() => deleteGuest(guest.token)}
                          className="text-red-400/30 text-sm hover:text-red-400 transition-colors"
                          title="Supprimer"
                        >
                          ✕
                        </button>
                      </div>
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
