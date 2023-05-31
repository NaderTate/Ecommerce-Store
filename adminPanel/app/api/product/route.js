import Product from "@/app/modules/Product";
import { mongooseConnect } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "You are not authorized" });
  }
  await mongooseConnect();
  if (request.nextUrl?.searchParams?.get("id")) {
    return NextResponse.json(
      await Product.findOne({
        _id: request.nextUrl?.searchParams?.get("id"),
      })
    );
  }
  return NextResponse.json(await Product.find({}).sort({ _id: -1 }));
}
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
export async function PUT(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "You are not authorized" });
  }
  await mongooseConnect();
  const data = await request.json();
  await Product.updateOne({ _id: data._id }, data);
  return NextResponse.json({ success: true });
}
export async function DELETE(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "You are not authorized" });
  }
  await mongooseConnect();
  if (request.nextUrl?.searchParams?.get("id")) {
    await Product.deleteOne({ _id: request.nextUrl?.searchParams?.get("id") });
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false });
}
