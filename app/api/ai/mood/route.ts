import { NextResponse } from "next/server";
import { detectMood } from "@/lib/ai";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    const mood = await detectMood(text);
    return NextResponse.json({ mood });
  } catch (error) {
    console.error("MOOD API ERROR:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}