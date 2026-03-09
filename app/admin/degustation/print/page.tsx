"use client";

import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import type { Guest } from "../../../api/degustation/guests/route";

interface DegustationData {
  guests: Guest[];
}

export default function PrintPage() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/degustation/guests")
      .then((r) => r.json())
      .then((data: DegustationData) => setGuests(data.guests ?? []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div
        style={{ background: "#1a0810", minHeight: "100vh" }}
        className="flex items-center justify-center"
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "#C9A84C", borderTopColor: "transparent" }} />
          <p style={{ color: "rgba(245,240,232,0.4)", fontSize: 13 }}>Chargement des badges...</p>
        </div>
      </div>
    );
  }

  if (guests.length === 0) {
    return (
      <div
        style={{ background: "#1a0810", minHeight: "100vh" }}
        className="flex flex-col items-center justify-center gap-4"
      >
        <p style={{ color: "rgba(245,240,232,0.4)", fontSize: 13 }}>
          Aucun invité. Importe d&apos;abord un CSV HelloAsso.
        </p>
        <a href="/admin/degustation" style={{ color: "#C9A84C", fontSize: 13 }}>
          ← Retour admin
        </a>
      </div>
    );
  }

  const sheetCount = Math.ceil(guests.length / 9);

  return (
    <>
      {/* Controls — screen only */}
      <div className="print:hidden" style={{ background: "#3B1520", borderBottom: "1px solid rgba(201,168,76,0.2)", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <a
              href="/admin/degustation"
              style={{ color: "rgba(245,240,232,0.5)", fontSize: 13, textDecoration: "none" }}
            >
              ← Retour
            </a>
            <span style={{ color: "rgba(245,240,232,0.3)", fontSize: 13 }}>
              {guests.length} badges · {sheetCount} feuille{sheetCount > 1 ? "s" : ""} A4
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ color: "rgba(201,168,76,0.5)", fontSize: 11 }}>
              Activer &laquo;&nbsp;Graphismes d&apos;arrière-plan&nbsp;&raquo; dans le dialogue d&apos;impression
            </span>
            <button
              onClick={() => window.print()}
              style={{
                background: "#C9A84C",
                color: "#3B1520",
                border: "none",
                borderRadius: 8,
                padding: "8px 18px",
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "var(--font-inter), system-ui",
              }}
            >
              Imprimer
            </button>
          </div>
        </div>
      </div>

      {/* Page background — screen only */}
      <div className="print:hidden" style={{ background: "#1a0810", padding: "24px 16px", minHeight: "calc(100vh - 53px)" }}>
        <div className="badge-grid">
          {guests.map((guest, i) => (
            <Badge key={guest.token} guest={guest} index={i} />
          ))}
        </div>
      </div>

      {/* Print-only grid */}
      <div className="hidden print:block">
        <div className="badge-grid">
          {guests.map((guest, i) => (
            <Badge key={guest.token} guest={guest} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 10mm;
          }
          body {
            background: white !important;
          }
        }

        .badge-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 5mm;
          max-width: 860px;
          margin: 0 auto;
        }
      `}</style>
    </>
  );
}

function Badge({ guest, index }: { guest: Guest; index: number }) {
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
            <QRCode value={guest.token} size={120} />
          </div>
        </div>

        {/* Footer */}
        <div className="badge-footer">
          <div className="badge-divider" />
          <p className="badge-name">
            {guest.name || `Invité #${String(index + 1).padStart(3, "0")}`}
          </p>
          <div className="badge-meta">
            <span className="badge-number">#{String(index + 1).padStart(3, "0")}</span>
            <span className="badge-wine">🍷</span>
          </div>
        </div>
      </div>

      <style>{`
        .badge-card {
          background: #3B1520;
          border: 1.5px solid #C9A84C;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          break-inside: avoid;
          page-break-inside: avoid;
          overflow: hidden;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        .badge-header {
          width: 100%;
          padding: 5mm 4mm 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2.5mm;
        }

        .badge-title {
          font-family: var(--font-playfair), Georgia, serif;
          font-size: 7.5px;
          font-weight: 700;
          color: #C9A84C;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          text-align: center;
          line-height: 1;
        }

        .badge-divider {
          width: 100%;
          height: 0.5px;
          background: linear-gradient(to right, transparent, #C9A84C, transparent);
          opacity: 0.6;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        .badge-body {
          padding: 4mm 4mm 3mm;
          display: flex;
          justify-content: center;
        }

        .badge-qr {
          background: #FFFFFF;
          padding: 3mm;
          border-radius: 5px;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        .badge-footer {
          width: 100%;
          padding: 0 4mm 4mm;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2mm;
        }

        .badge-name {
          font-family: var(--font-playfair), Georgia, serif;
          font-size: 11.5px;
          font-weight: 600;
          color: #F5F0E8;
          text-align: center;
          line-height: 1.3;
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding: 0 3mm;
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
          font-size: 7.5px;
          color: rgba(201, 168, 76, 0.5);
          font-variant-numeric: tabular-nums;
          letter-spacing: 0.5px;
        }

        .badge-wine {
          font-size: 9px;
        }

        @media screen {
          .badge-card {
            min-height: 200px;
          }
        }
      `}</style>
    </>
  );
}
