import { NextResponse } from "next/server";
import { readData, writeData, type Guest } from "../guests/route";

// CSV column names from HelloAsso export
const COL = {
  statut: "Statut de la commande",
  nomParticipant: "Nom participant",
  prenomParticipant: "Prénom participant",
  emailPayeur: "Email payeur",
  numeroBillet: "Numéro de billet",
  tarif: "Tarif",
} as const;

function splitCSVRow(row: string): string[] {
  // Split by ; and strip surrounding quotes + whitespace from each field
  return row.split(";").map((col) => col.replace(/^"(.*)"$/, "$1").trim());
}

interface ParsedTicket {
  statut: string;
  nomParticipant: string;
  prenomParticipant: string;
  emailPayeur: string;
  numeroBillet: string;
  tarif: string;
}

function parseHelloAssoCSV(csv: string): ParsedTicket[] {
  const lines = csv.trim().split(/\r?\n/);
  if (lines.length < 2) return [];

  const headers = splitCSVRow(lines[0]);

  const idx = {
    statut: headers.indexOf(COL.statut),
    nomParticipant: headers.indexOf(COL.nomParticipant),
    prenomParticipant: headers.indexOf(COL.prenomParticipant),
    emailPayeur: headers.indexOf(COL.emailPayeur),
    numeroBillet: headers.indexOf(COL.numeroBillet),
    tarif: headers.indexOf(COL.tarif),
  };

  const missing = Object.entries(idx)
    .filter(([, v]) => v === -1)
    .map(([k]) => k);

  if (missing.length > 0) {
    throw new Error(`Colonnes manquantes dans le CSV : ${missing.join(", ")}`);
  }

  const tickets: ParsedTicket[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const cols = splitCSVRow(line);

    const ticket: ParsedTicket = {
      statut: cols[idx.statut] ?? "",
      nomParticipant: cols[idx.nomParticipant] ?? "",
      prenomParticipant: cols[idx.prenomParticipant] ?? "",
      emailPayeur: cols[idx.emailPayeur] ?? "",
      numeroBillet: cols[idx.numeroBillet] ?? "",
      tarif: cols[idx.tarif] ?? "",
    };

    // Only keep validated orders with a ticket number
    if (ticket.statut === "Validé" && ticket.numeroBillet) {
      tickets.push(ticket);
    }
  }

  return tickets;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("csv");

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "Fichier CSV manquant" }, { status: 400 });
    }

    const csvText = await (file as File).text();
    const tickets = parseHelloAssoCSV(csvText);

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
