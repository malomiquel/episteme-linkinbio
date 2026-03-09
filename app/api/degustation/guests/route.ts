import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const REDIS_KEY = "degustation";

export interface Guest {
  token: string;
  ticketId: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  ticketType: string;
}

export interface DegustationData {
  guests: Guest[];
  visits: Record<string, string[]>;
}

const DEFAULT: DegustationData = { guests: [], visits: {} };

function getRedis() {
  return new Redis({
    url: process.env.KV_REST_API_URL!,
    token: process.env.KV_REST_API_TOKEN!,
  });
}

export async function readData(): Promise<DegustationData> {
  const redis = getRedis();
  const data = await redis.get<DegustationData>(REDIS_KEY);
  return data ?? DEFAULT;
}

export async function writeData(data: DegustationData) {
  const redis = getRedis();
  await redis.set(REDIS_KEY, data);
}

export async function GET() {
  const data = await readData();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const { count = 1 } = await request.json();
  const data = await readData();

  const newGuests: Guest[] = [];
  for (let i = 0; i < count; i++) {
    const token = crypto.randomUUID().replace(/-/g, "").slice(0, 12);
    const guest: Guest = { token, ticketId: token, name: "", firstName: "", lastName: "", email: "", ticketType: "" };
    newGuests.push(guest);
    data.guests.push(guest);
    data.visits[token] = [];
  }

  await writeData(data);
  return NextResponse.json({ ok: true, tokens: newGuests.map((g) => g.token) });
}

export async function DELETE(request: Request) {
  const body = await request.json().catch(() => ({}));

  // Reset all
  if (body.resetAll) {
    await writeData(DEFAULT);
    return NextResponse.json({ ok: true });
  }

  // Delete single guest
  const { token } = body;
  const data = await readData();
  data.guests = data.guests.filter((g) => g.token !== token);
  delete data.visits[token];
  await writeData(data);
  return NextResponse.json({ ok: true });
}
