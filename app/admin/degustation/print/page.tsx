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
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 text-sm">Chargement des badges...</p>
      </div>
    );
  }

  if (guests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-gray-500 text-sm">Aucun invité. Importe d&apos;abord un CSV HelloAsso.</p>
        <a href="/admin/degustation" className="text-sm text-blue-600 underline">
          ← Retour admin
        </a>
      </div>
    );
  }

  return (
    <>
      {/* Print controls — hidden when printing */}
      <div className="print:hidden flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <a href="/admin/degustation" className="text-sm text-gray-500 hover:text-gray-900">
            ← Retour
          </a>
          <span className="text-sm font-medium text-gray-700">
            {guests.length} badges — {Math.ceil(guests.length / 9)} feuilles A4
          </span>
        </div>
        <button
          onClick={() => window.print()}
          className="px-5 py-2 bg-black text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors"
        >
          🖨️ Imprimer
        </button>
      </div>

      {/* Badge grid */}
      <div className="bg-white p-4 print:p-0">
        <div className="badge-grid">
          {guests.map((guest, i) => (
            <div key={guest.token} className="badge">
              <div className="badge-number">#{String(i + 1).padStart(3, "0")}</div>
              <div className="badge-qr">
                <QRCode value={guest.token} size={130} />
              </div>
              <div className="badge-name">
                {guest.name || <span style={{ color: "#999" }}>Invité #{i + 1}</span>}
              </div>
              <div className="badge-event">Dégustation Episteme</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 8mm;
          }
          body {
            background: white;
          }
        }

        .badge-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 4mm;
        }

        .badge {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          padding: 6mm 4mm 4mm;
          border: 1px solid #ddd;
          border-radius: 6px;
          background: white;
          break-inside: avoid;
          page-break-inside: avoid;
        }

        .badge-number {
          font-size: 10px;
          color: #aaa;
          font-family: monospace;
          align-self: flex-start;
          line-height: 1;
        }

        .badge-qr {
          padding: 4px;
          background: white;
        }

        .badge-name {
          font-size: 11px;
          font-weight: 600;
          color: #111;
          text-align: center;
          font-family: sans-serif;
          line-height: 1.3;
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 100%;
          padding: 0 4px;
        }

        .badge-event {
          font-size: 8px;
          color: #888;
          font-family: sans-serif;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        @media screen {
          .badge-grid {
            max-width: 780px;
            margin: 0 auto;
          }
          .badge {
            min-height: 180px;
          }
        }
      `}</style>
    </>
  );
}
