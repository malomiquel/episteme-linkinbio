import { NextResponse } from "next/server";
import { readData, writeData, type Guest } from "../guests/route";

interface ParsedTicket {
  statut: string;
  nomParticipant: string;
  prenomParticipant: string;
  emailPayeur: string;
  numeroBillet: string;
  tarif: string;
}

// ── HelloAsso ──────────────────────────────────────────────────────────────────

const HA_COL = {
  statut: "Statut de la commande",
  nomParticipant: "Nom participant",
  prenomParticipant: "Prénom participant",
  emailPayeur: "Email payeur",
  numeroBillet: "Numéro de billet",
  tarif: "Tarif",
} as const;

function splitHelloAssoRow(row: string): string[] {
  return row.split(";").map((col) => col.replace(/^"(.*)"$/, "$1").trim());
}

function parseHelloAssoCSV(lines: string[]): ParsedTicket[] {
  const headers = splitHelloAssoRow(lines[0]);

  const idx = {
    statut: headers.indexOf(HA_COL.statut),
    nomParticipant: headers.indexOf(HA_COL.nomParticipant),
    prenomParticipant: headers.indexOf(HA_COL.prenomParticipant),
    emailPayeur: headers.indexOf(HA_COL.emailPayeur),
    numeroBillet: headers.indexOf(HA_COL.numeroBillet),
    tarif: headers.indexOf(HA_COL.tarif),
  };

  const missing = Object.entries(idx)
    .filter(([, v]) => v === -1)
    .map(([k]) => k);

  if (missing.length > 0) {
    throw new Error(`Colonnes HelloAsso manquantes : ${missing.join(", ")}`);
  }

  const tickets: ParsedTicket[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const cols = splitHelloAssoRow(line);

    const ticket: ParsedTicket = {
      statut: cols[idx.statut] ?? "",
      nomParticipant: cols[idx.nomParticipant] ?? "",
      prenomParticipant: cols[idx.prenomParticipant] ?? "",
      emailPayeur: cols[idx.emailPayeur] ?? "",
      numeroBillet: cols[idx.numeroBillet] ?? "",
      tarif: cols[idx.tarif] ?? "",
    };

    if (ticket.statut === "Validé" && ticket.numeroBillet) {
      tickets.push(ticket);
    }
  }

  return tickets;
}

// ── Shotgun ────────────────────────────────────────────────────────────────────

const SG_COL = {
  statut: "STATUT",
  prenom: "PRENOM",
  nom: "NOM",
  email: "EMAIL",
  codeBarres: "CODE-BARRES",
  nomTarif: "NOM DU TARIF",
} as const;

function splitShotgunRow(row: string): string[] {
  // Comma-separated, fields may be quoted
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < row.length; i++) {
    const ch = row[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += ch;
    }
  }
  result.push(current.trim());
  return result;
}

function parseShotgunCSV(lines: string[]): ParsedTicket[] {
  const headers = splitShotgunRow(lines[0]);

  const idx = {
    statut: headers.indexOf(SG_COL.statut),
    prenom: headers.indexOf(SG_COL.prenom),
    nom: headers.indexOf(SG_COL.nom),
    email: headers.indexOf(SG_COL.email),
    codeBarres: headers.indexOf(SG_COL.codeBarres),
    nomTarif: headers.indexOf(SG_COL.nomTarif),
  };

  const missing = Object.entries(idx)
    .filter(([, v]) => v === -1)
    .map(([k]) => k);

  if (missing.length > 0) {
    throw new Error(`Colonnes Shotgun manquantes : ${missing.join(", ")}`);
  }

  const tickets: ParsedTicket[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const cols = splitShotgunRow(line);

    const ticket: ParsedTicket = {
      statut: cols[idx.statut] ?? "",
      nomParticipant: cols[idx.nom] ?? "",
      prenomParticipant: cols[idx.prenom] ?? "",
      emailPayeur: cols[idx.email] ?? "",
      numeroBillet: cols[idx.codeBarres] ?? "",
      tarif: cols[idx.nomTarif] ?? "",
    };

    if (ticket.statut === "valid" && ticket.numeroBillet) {
      tickets.push(ticket);
    }
  }

  return tickets;
}

// ── Auto-detect & dispatch ─────────────────────────────────────────────────────

function parseCSV(csv: string): ParsedTicket[] {
  const lines = csv.trim().split(/\r?\n/);
  if (lines.length < 2) return [];

  // Detect format from the first header line
  const firstLine = lines[0];
  if (firstLine.includes("CODE-BARRES")) {
    return parseShotgunCSV(lines);
  }
  return parseHelloAssoCSV(lines);
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("csv");

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "Fichier CSV manquant" }, { status: 400 });
    }

    const csvText = await (file as File).text();
    const tickets = parseCSV(csvText);

    if (tickets.length === 0) {
      return NextResponse.json(
        { error: "Aucun billet validé trouvé dans le CSV" },
        { status: 400 }
      );
    }

    const data = await readData();

    // Build a map of existing guests by ticketId for fast lookup
    const existingByTicketId = new Map<string, Guest>(
      data.guests.map((g) => [g.ticketId, g])
    );

    let added = 0;
    let updated = 0;

    for (const ticket of tickets) {
      const name = `${ticket.prenomParticipant} ${ticket.nomParticipant}`.trim();
      const existing = existingByTicketId.get(ticket.numeroBillet);

      if (existing) {
        // Update name/email in case it changed, keep token
        existing.name = name;
        existing.firstName = ticket.prenomParticipant;
        existing.lastName = ticket.nomParticipant;
        existing.email = ticket.emailPayeur;
        existing.ticketType = ticket.tarif;
        updated++;
      } else {
        // New ticket → create guest with fresh token
        const token = crypto.randomUUID().replace(/-/g, "").slice(0, 12);
        const guest: Guest = {
          token,
          ticketId: ticket.numeroBillet,
          name,
          firstName: ticket.prenomParticipant,
          lastName: ticket.nomParticipant,
          email: ticket.emailPayeur,
          ticketType: ticket.tarif,
        };
        data.guests.push(guest);
        data.visits[token] = [];
        existingByTicketId.set(ticket.numeroBillet, guest);
        added++;
      }
    }

    await writeData(data);

    return NextResponse.json({
      ok: true,
      added,
      updated,
      total: data.guests.length,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
