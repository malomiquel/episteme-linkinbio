"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useQueryState } from "nuqs";
import { STANDS } from "../../../config/degustation";
import type { Guest } from "../../api/degustation/guests/route";

interface DegustationData {
  guests: Guest[];
  visits: Record<string, string[]>;
}

export default function DegustationPage() {
  return (
    <Suspense>
      <DegustationAdmin />
    </Suspense>
  );
}

function DegustationAdmin() {
  const [data, setData] = useState<DegustationData>({ guests: [], visits: {} });
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const dragCounterRef = useRef(0);
  const [search, setSearch] = useQueryState("q", { defaultValue: "", shallow: true });

  useEffect(() => {
    fetch("/api/degustation/guests")
      .then((r) => r.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    function onDragEnter(e: DragEvent) {
      e.preventDefault();
      dragCounterRef.current++;
      if (e.dataTransfer?.types.includes("Files")) setIsDragging(true);
    }
    function onDragOver(e: DragEvent) {
      e.preventDefault();
    }
    function onDragLeave() {
      dragCounterRef.current--;
      if (dragCounterRef.current === 0) setIsDragging(false);
    }
    function onDrop(e: DragEvent) {
      e.preventDefault();
      dragCounterRef.current = 0;
      setIsDragging(false);
      const file = e.dataTransfer?.files?.[0];
      if (file) importFile(file);
    }

    window.addEventListener("dragenter", onDragEnter);
    window.addEventListener("dragover", onDragOver);
    window.addEventListener("dragleave", onDragLeave);
    window.addEventListener("drop", onDrop);
    return () => {
      window.removeEventListener("dragenter", onDragEnter);
      window.removeEventListener("dragover", onDragOver);
      window.removeEventListener("dragleave", onDragLeave);
      window.removeEventListener("drop", onDrop);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function importFile(file: File) {
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

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) importFile(file);
  }

  function exportCSV() {
    const origin = window.location.origin;

    // Group guests by email — preserve insertion order within each group
    const byEmail = new Map<string, typeof data.guests>();
    for (const g of data.guests) {
      const key = g.email.toLowerCase();
      if (!byEmail.has(key)) byEmail.set(key, []);
      byEmail.get(key)!.push(g);
    }

    const groups = [...byEmail.values()];
    const maxBadges = Math.max(...groups.map((g) => g.length), 1);

    // Headers: Email, Destinataire, Nom N / URL N per badge slot, Statut envoi
    const headers = ["Email", "Destinataire"];
    for (let n = 1; n <= maxBadges; n++) {
      headers.push(`Nom ${n}`, `URL ${n}`);
    }
    headers.push("Statut envoi");

    const rows = [
      headers,
      ...groups.map((group) => {
        const row = [
          group[0].email,
          group[0].firstName || group[0].name.split(" ")[0] || group[0].name,
        ];
        for (let n = 0; n < maxBadges; n++) {
          const g = group[n];
          row.push(
            g ? (g.name || "(sans nom)") : "",
            g ? `${origin}/degustation/invite/${g.token}` : ""
          );
        }
        row.push(""); // Statut envoi — rempli par l'Apps Script
        return row;
      }),
    ];
    const csv = rows.map((r) => r.map((v) => `"${v}"`).join(";")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
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
    await fetch("/api/degustation/guests", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resetAll: true }),
    });
    setData({ guests: [], visits: {} });
  }

  const totalVisits = Object.values(data.visits ?? {}).reduce((sum, v) => sum + v.length, 0);
  const q = search.trim().toLowerCase();

  const sortedGuests = [...(data.guests ?? [])]
    .sort((a, b) => {
      const lastA = (a.lastName || a.name.split(" ").pop() || "").toUpperCase();
      const lastB = (b.lastName || b.name.split(" ").pop() || "").toUpperCase();
      if (lastA !== lastB) return lastA.localeCompare(lastB, "fr");
      const firstA = (a.firstName || a.name.split(" ")[0] || "").toUpperCase();
      const firstB = (b.firstName || b.name.split(" ")[0] || "").toUpperCase();
      return firstA.localeCompare(firstB, "fr");
    })
    .filter((g) => !q || g.name.toLowerCase().includes(q) || g.email.toLowerCase().includes(q));

  return (
    <>
      {isDragging && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="absolute inset-0 bg-dark/80 backdrop-blur-sm" />
          <div className="relative flex flex-col items-center gap-3 border-2 border-dashed border-gold/60 rounded-3xl px-16 py-12 bg-dark-card/60">
            <span className="text-5xl">📂</span>
            <p className="text-gold font-semibold text-lg">Déposer le fichier CSV</p>
            <p className="text-cream/40 text-sm">HelloAsso ou Shotgun</p>
          </div>
        </div>
      )}

      <div className="fixed inset-0 bg-dark z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(201,168,76,0.12)_0%,transparent_50%),radial-gradient(ellipse_at_80%_100%,rgba(140,58,68,0.2)_0%,transparent_50%)]" />
      </div>

      <div className="relative z-10 min-h-dvh flex flex-col items-center px-4 py-8 font-(family-name:--font-inter)">
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
          <div className="grid grid-cols-3 gap-2 mb-6">
            <div className="bg-dark-card/80 border border-cream/8 rounded-xl p-3 text-center backdrop-blur-sm">
              <p className="text-2xl font-bold text-cream">{(data.guests ?? []).length}</p>
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

          {/* Import CSV */}
          <p className="text-xs text-cream/25 uppercase tracking-widest font-semibold mb-3 px-1">
            Importer les inscrits
          </p>
          <div className="bg-dark-card/80 border border-cream/8 rounded-2xl p-4 backdrop-blur-sm mb-2">
            <p className="text-xs text-cream/40 mb-3">
              Importe un CSV HelloAsso ou Shotgun. Glisse le fichier n&apos;importe où sur la page
              ou clique pour le choisir. Les imports répétés préservent les tokens existants.
            </p>
            <label className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl border border-dashed border-gold/30 text-gold text-sm font-semibold cursor-pointer active:bg-gold/10 transition-colors">
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
            <div className="flex flex-col gap-2 mb-8 mt-4">
              <a
                href="/admin/degustation/print"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-3 rounded-xl bg-gold/20 border border-gold/30 text-gold text-sm font-semibold active:bg-gold/30 transition-colors"
              >
                🖨️ Imprimer les badges
              </a>
              <button
                onClick={exportCSV}
                className="w-full py-3 rounded-xl bg-cream/5 border border-cream/15 text-cream/70 text-sm font-semibold active:bg-cream/10 transition-colors"
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
                className="group flex items-center gap-3 bg-dark-card/80 border border-cream/8 rounded-xl px-4 py-3.5 backdrop-blur-sm active:border-gold/30 transition-all"
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
              <div className="relative mb-3">
                <input
                  type="search"
                  placeholder="Rechercher un invité…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-dark-card/80 border border-cream/10 rounded-xl px-4 py-3 text-sm text-cream/80 placeholder:text-cream/25 focus:outline-none focus:border-gold/40 backdrop-blur-sm"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-0 top-0 h-full px-4 text-cream/25 hover:text-cream/60 transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between mb-3 px-1">
                <p className="text-xs text-cream/25 uppercase tracking-widest font-semibold">
                  Invités ({q ? `${sortedGuests.length}/` : ""}{data.guests.length})
                </p>
                <button
                  onClick={resetAll}
                  className="text-xs text-red-400/60 hover:text-red-400 transition-colors py-1 px-2"
                >
                  Tout supprimer
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {sortedGuests.map((guest, i) => {
                  const visitedStands = (data.visits ?? {})[guest.token] ?? [];
                  return (
                    <div
                      key={guest.token}
                      className="relative bg-dark-card/80 border border-cream/8 rounded-xl backdrop-blur-sm"
                    >
                      <a
                        href={`/degustation/invite/${guest.token}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-3 pr-12"
                      >
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
                        <span className="text-cream/15 text-sm">↗</span>
                      </a>
                      <button
                        onClick={() => deleteGuest(guest.token)}
                        className="absolute right-0 top-0 h-full w-12 flex items-center justify-center text-red-400/20 hover:text-red-400 active:text-red-400 transition-colors"
                        title="Supprimer"
                      >
                        ✕
                      </button>
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
