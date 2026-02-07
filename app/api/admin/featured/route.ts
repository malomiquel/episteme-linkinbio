import { NextResponse } from "next/server";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";
import { quizzes } from "../../../../config/quizzes";

const FILE = join(process.cwd(), "data", "featured.json");

interface FeaturedData {
  quizId: string | null;
  from: string | null;
  until: string | null;
}

function read(): FeaturedData {
  try {
    return JSON.parse(readFileSync(FILE, "utf-8"));
  } catch {
    return { quizId: null, from: null, until: null };
  }
}

export async function GET() {
  const featured = read();
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

  const dir = join(process.cwd(), "data");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  writeFileSync(FILE, JSON.stringify(body, null, 2) + "\n");
  return NextResponse.json({ ok: true });
}
