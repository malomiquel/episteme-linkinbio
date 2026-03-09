import { NextResponse } from "next/server";
import { readData, writeData } from "../guests/route";
import { getStand } from "../../../../config/degustation";

export async function POST(request: Request) {
  const { token, standId } = await request.json();

  if (!token || !standId) {
    return NextResponse.json({ error: "token et standId requis" }, { status: 400 });
  }

  const stand = getStand(standId);
  if (!stand) {
    return NextResponse.json({ error: "stand inconnu" }, { status: 404 });
  }

  const data = await readData();

  if (!data.guests.includes(token)) {
    return NextResponse.json({ error: "invité inconnu" }, { status: 404 });
  }

  const visited = data.visits[token] ?? [];
  const alreadyVisited = visited.includes(standId);

  if (!alreadyVisited) {
    data.visits[token] = [...visited, standId];
    await writeData(data);
  }

  return NextResponse.json({
    ok: true,
    alreadyVisited,
    stand: { id: stand.id, name: stand.name, emoji: stand.emoji },
    totalVisits: data.visits[token].length,
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "token requis" }, { status: 400 });
  }

  const data = await readData();

  if (!data.guests.includes(token)) {
    return NextResponse.json({ error: "invité inconnu" }, { status: 404 });
  }

  return NextResponse.json({ visits: data.visits[token] ?? [] });
}
