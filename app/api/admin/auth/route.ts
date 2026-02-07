import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const adminPin = process.env.ADMIN_PIN;

  if (!adminPin) {
    return NextResponse.json({ ok: true });
  }

  const { pin } = await request.json();

  if (pin === adminPin) {
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: false }, { status: 401 });
}
