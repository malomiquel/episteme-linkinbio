import { NextResponse } from "next/server";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";
import { quizzes } from "../../../../config/quizzes";

const REDIS_KEY = "featured";
const FILE = join(process.cwd(), "data", "featured.json");

interface FeaturedData {
  quizId: string | null;
  from: string | null;
  until: string | null;
}

const DEFAULT: FeaturedData = { quizId: null, from: null, until: null };

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

async function read(): Promise<FeaturedData> {
  if (useRedis()) {
    const redis = await getRedis();
    const data = await redis.get<FeaturedData>(REDIS_KEY);
    return data ?? DEFAULT;
  }

  try {
    return JSON.parse(readFileSync(FILE, "utf-8"));
  } catch {
    return DEFAULT;
  }
}

async function write(data: FeaturedData) {
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
  const featured = await read();
  const quizList = Object.values(quizzes).map((q) => ({
    id: q.id,
    title: q.title,
    emoji: q.emoji,
    label: q.label,
    description: q.description,
  }));
  return NextResponse.json({ featured, quizzes: quizList });
}

export async function PUT(request: Request) {
  const body: FeaturedData = await request.json();
  await write(body);
  return NextResponse.json({ ok: true });
}
