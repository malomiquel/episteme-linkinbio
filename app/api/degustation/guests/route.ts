import { NextResponse } from "next/server";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

const REDIS_KEY = "degustation";
const FILE = join(process.cwd(), "data", "degustation.json");

interface DegustationData {
  guests: string[];
  visits: Record<string, string[]>;
}

const DEFAULT: DegustationData = { guests: [], visits: {} };

function useRedis() {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

async function getRedis() {
  const { Redis } = await import("@upstash/redis");
  return new Redis({
    url: process.env.KV_REST_API_URL!,
    token: process.env.KV_REST_API_TOKEN!,
  });
}

export async function readData(): Promise<DegustationData> {
  if (useRedis()) {
    const redis = await getRedis();
    const data = await redis.get<DegustationData>(REDIS_KEY);
    return data ?? DEFAULT;
  }
  try {
    return JSON.parse(readFileSync(FILE, "utf-8"));
  } catch {
    return DEFAULT;
  }
}

export async function writeData(data: DegustationData) {
  if (useRedis()) {
    const redis = await getRedis();
    await redis.set(REDIS_KEY, data);
    return;
  }
  const dir = join(process.cwd(), "data");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(FILE, JSON.stringify(data, null, 2) + "\n");
}

export async function GET() {
  const data = await readData();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const { count = 1 } = await request.json();
  const data = await readData();

  const newTokens: string[] = [];
  for (let i = 0; i < count; i++) {
    const token = crypto.randomUUID().replace(/-/g, "").slice(0, 12);
    newTokens.push(token);
    data.guests.push(token);
    data.visits[token] = [];
  }

  await writeData(data);
  return NextResponse.json({ ok: true, tokens: newTokens });
}

export async function DELETE(request: Request) {
  const { token } = await request.json();
  const data = await readData();

  data.guests = data.guests.filter((t) => t !== token);
  delete data.visits[token];

  await writeData(data);
  return NextResponse.json({ ok: true });
}
