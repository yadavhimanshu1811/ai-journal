import { NextResponse } from "next/server";
import { summarizeText } from "@/lib/ai";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    const summary = await summarizeText(text);
    return NextResponse.json({ summary });
  } catch (error) {
    console.error("SUMMARY API ERROR:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}