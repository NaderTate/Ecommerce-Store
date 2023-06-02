import Category from "@/app/modules/Category";
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
  var query = {};
  // if (request.nextUrl?.searchParams?.get("id")){

  // }
  const sk = request.nextUrl?.searchParams?.get("page") || 1;
  if (request.nextUrl?.searchParams?.get("id")) {
    return NextResponse.json(
      await Category.findOne({
        _id: request.nextUrl?.searchParams?.get("id"),
      })
    );
  }
  await Category.countDocuments({});
  return NextResponse.json({
    data: await Category.find({})
      .populate("Parent")
      .sort({ _id: -1 })
      .skip((sk - 1) * 20)
      .limit(20),
    count: await Category.countDocuments({}),
  });
}
export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "You are not authorized" });
  }
  await mongooseConnect();
  const data = await request.json();
  await Category.create({
    ...data,
    value: (await Category.countDocuments({})) + 1,
  });
  return NextResponse.json({ success: true });
}
export async function PUT(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "You are not authorized" });
  }
  await mongooseConnect();
  const data = await request.json();
  await Category.updateOne({ _id: data._id }, data);
  if (!data.Parent) {
    await Category.updateOne({ _id: data._id }, { $unset: { Parent: "" } });
  }
  return NextResponse.json({ success: true });
}
export async function DELETE(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "You are not authorized" });
  }
  await mongooseConnect();
  if (request.nextUrl?.searchParams?.get("id")) {
    await Category.deleteOne({ _id: request.nextUrl?.searchParams?.get("id") });
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false });
}
