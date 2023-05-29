import Product from "@/app/modules/Product";
import { mongooseConnect } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "You are not authorized" });
  }
  await mongooseConnect();
  const data = await request.json();
  await Product.create(data);
  return NextResponse.json({ success: true });
}
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "You are not authorized" });
  }
  await mongooseConnect();
  return NextResponse.json(await Product.find({}));
}
