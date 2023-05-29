import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
export async function GET() {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session) {
    return NextResponse.json({ message: "You are not logged in." });
  }

  return NextResponse.json({ name: session.user.name });
}
