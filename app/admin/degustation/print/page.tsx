"use client";

import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import type { Guest } from "../../../api/degustation/guests/route";

interface DegustationData {
  guests: Guest[];
}

function sortByName(guests: Guest[]): Guest[] {
  return [...guests].sort((a, b) => {
    const lastA = (a.lastName || a.name.split(" ").pop() || "").toUpperCase();
    const lastB = (b.lastName || b.name.split(" ").pop() || "").toUpperCase();
    if (lastA !== lastB) return lastA.localeCompare(lastB, "fr");
    const firstA = (a.firstName || a.name.split(" ")[0] || "").toUpperCase();
    const firstB = (b.firstName || b.name.split(" ")[0] || "").toUpperCase();
    return firstA.localeCompare(firstB, "fr");
  });
}

export default function PrintPage() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/degustation/guests")
      .then((r) => r.json())
      .then((data: DegustationData) => setGuests(sortByName(data.guests ?? [])))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ background: "#1a0810", minHeight: "100vh" }} className="flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "#C9A84C", borderTopColor: "transparent" }} />
          <p style={{ color: "rgba(245,240,232,0.4)", fontSize: 13 }}>Chargement des badges...</p>
        </div>
      </div>
    );
  }

  if (guests.length === 0) {
    return (
      <div style={{ background: "#1a0810", minHeight: "100vh" }} className="flex flex-col items-center justify-center gap-4">
        <p style={{ color: "rgba(245,240,232,0.4)", fontSize: 13 }}>Aucun invité. Importe d&apos;abord un CSV HelloAsso.</p>
        <a href="/admin/degustation" style={{ color: "#C9A84C", fontSize: 13 }}>← Retour admin</a>
      </div>
    );
  }

  const sheetCount = Math.ceil(guests.length / 12);

  return (
    <>
      {/* Controls — screen only */}
      <div className="print:hidden" style={{ background: "#3B1520", borderBottom: "1px solid rgba(201,168,76,0.2)", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <a href="/admin/degustation" style={{ color: "rgba(245,240,232,0.5)", fontSize: 13, textDecoration: "none" }}>← Retour</a>
            <span style={{ color: "rgba(245,240,232,0.3)", fontSize: 13 }}>
              {guests.length} badges · {sheetCount} feuille{sheetCount > 1 ? "s" : ""} A4 · triés par nom
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ color: "rgba(201,168,76,0.45)", fontSize: 11 }}>
              Activer « Graphismes d&apos;arrière-plan » dans l&apos;impression
            </span>
            <button
              onClick={() => window.print()}
              style={{ background: "#C9A84C", color: "#3B1520", border: "none", borderRadius: 8, padding: "8px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "var(--font-inter), system-ui" }}
            >
              Imprimer
            </button>
          </div>
        </div>
      </div>

      {/* Grid — screen preview */}
      <div className="print:hidden" style={{ background: "#1a0810", padding: "32px 24px", minHeight: "calc(100vh - 53px)" }}>
        <div className="badge-grid-screen">
          {guests.map((guest, i) => (
            <Badge key={guest.token} guest={guest} index={i} />
          ))}
        </div>
      </div>

      {/* Grid — print: groupes de 12 (3×4) pour garantir 1 groupe = 1 page A4 */}
      <div className="hidden print:block">
        {Array.from({ length: Math.ceil(guests.length / 12) }, (_, p) => (
          <div key={p} className="badge-grid-print">
            {guests.slice(p * 12, p * 12 + 12).map((guest, j) => (
              <Badge key={guest.token} guest={guest} index={p * 12 + j} />
            ))}
          </div>
        ))}
      </div>

      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 8mm;
          }
          body {
            background: white !important;
          }
        }

        /* Screen: légère gouttière pour visibilité */
        .badge-grid-screen {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 6px;
          max-width: 900px;
          margin: 0 auto;
        }

        /* Print: jointif — une coupe droite par ligne/colonne suffit */
        .badge-grid-print {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0;
          border: 1px solid #C9A84C;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
          break-after: page;
          page-break-after: always;
        }
        .badge-grid-print:last-child {
          break-after: auto;
          page-break-after: auto;
        }
      `}</style>
    </>
  );
}

function Badge({ guest, index }: { guest: Guest; index: number }) {
  const firstName = guest.firstName || guest.name.split(" ")[0] || "";
  const lastName = guest.lastName || guest.name.split(" ").slice(1).join(" ") || "";

  return (
    <>
      <div className="badge-card">
        {/* Header */}
        <div className="badge-header">
          <p className="badge-title">Dégustation · Episteme</p>
          <div className="badge-divider" />
        </div>

        {/* QR */}
        <div className="badge-body">
          <div className="badge-qr">
            <QRCode value={guest.token} size={118} />
          </div>
        </div>

        {/* Name */}
        <div className="badge-footer">
          <div className="badge-divider" />
          {guest.name ? (
            <div className="badge-name-block">
              <span className="badge-firstname">{firstName}</span>
              <span className="badge-lastname">{lastName.toUpperCase()}</span>
            </div>
          ) : (
            <p className="badge-firstname">Invité #{String(index + 1).padStart(3, "0")}</p>
          )}
          <div className="badge-meta">
            <span className="badge-number">#{String(index + 1).padStart(3, "0")}</span>
            <span className="badge-wine">🍷</span>
          </div>
        </div>
      </div>

      <style>{`
        .badge-card {
          background: #3B1520;
          /* Joint border: 1 côté pour éviter le doublement entre badges */
          border-right: 1px solid rgba(201,168,76,0.55);
          border-bottom: 1px solid rgba(201,168,76,0.55);
          border-top: none;
          border-left: none;
          border-radius: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          break-inside: avoid;
          page-break-inside: avoid;
          overflow: hidden;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        /* Screen: bordure complète pour chaque card */
        @media screen {
          .badge-card {
            border: 1px solid rgba(201,168,76,0.4);
            min-height: 195px;
          }
        }

        .badge-header {
          width: 100%;
          padding: 4.5mm 4mm 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2.5mm;
        }

        .badge-title {
          font-family: var(--font-playfair), Georgia, serif;
          font-size: 7px;
          font-weight: 700;
          color: #C9A84C;
          letter-spacing: 2px;
          text-transform: uppercase;
          text-align: center;
          line-height: 1;
        }

        .badge-divider {
          width: 100%;
          height: 0.5px;
          background: linear-gradient(to right, transparent, rgba(201,168,76,0.7), transparent);
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        .badge-body {
          padding: 3.5mm 4mm 3mm;
          display: flex;
          justify-content: center;
        }

        .badge-qr {
          background: #FFFFFF;
          padding: 2.5mm;
          border-radius: 0;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        .badge-footer {
          width: 100%;
          padding: 0 4mm 3.5mm;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2mm;
        }

        .badge-name-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5mm;
          padding: 0 2mm;
          max-width: 100%;
        }

        .badge-firstname {
          font-family: var(--font-inter), system-ui, sans-serif;
          font-size: 9px;
          font-weight: 400;
          color: rgba(245,240,232,0.7);
          text-align: center;
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }

        .badge-lastname {
          font-family: var(--font-playfair), Georgia, serif;
          font-size: 12px;
          font-weight: 700;
          color: #F5F0E8;
          text-align: center;
          line-height: 1.2;
          letter-spacing: 0.5px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }

        .badge-meta {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 1mm;
        }

        .badge-number {
          font-family: var(--font-inter), system-ui, sans-serif;
          font-size: 7px;
          color: rgba(201,168,76,0.45);
          font-variant-numeric: tabular-nums;
          letter-spacing: 0.5px;
        }

        .badge-wine {
          font-size: 9px;
        }
      `}</style>
    </>
  );
}
