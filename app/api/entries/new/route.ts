import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Entry from "@/models/Entry";
import { connectToDatabase } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { content } = await request.json();
    if (!content) {
      return NextResponse.json({ error: "Content required" }, { status: 400 });
    }

    await connectToDatabase();

    const entry = await Entry.create({
      userId: session.user?.email,
      content,
    });

    return NextResponse.json({ entry }, { status: 201 });
  } catch (err) {
    console.error("ENTRY ERROR:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}