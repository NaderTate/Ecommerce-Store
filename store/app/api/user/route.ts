import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
export const runtime = "nodejs";
export async function GET(request: NextRequest) {
  const id = request.nextUrl?.searchParams?.get("id");
  if (id) {
    const res = await prisma.user.findUnique({
      where: { UserId: id },
    });
    return NextResponse.json(res);
  }
}
export async function POST(request: NextRequest) {
  const data = await request.json();
  await prisma.user.create(data);
  return NextResponse.json({ success: true });
}
