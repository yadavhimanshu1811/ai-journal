// app/api/auth/signup/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";          // <- ensure models/User.ts exists
import { connectToDatabase } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body || {};

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    // connect and ensure errors are visible
    await connectToDatabase();
    console.log("SIGNUP: Connected to DB");

    // check existing user
    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const created = await User.create({ email, password: hashedPassword });
    console.log("SIGNUP: Created user:", created._id?.toString());

    return NextResponse.json({ message: "User created" }, { status: 201 });
  } catch (err: any) {
    // log full error for debugging
    console.error("SIGNUP ERROR:", err);
    // return helpful error to client (but not full stack in prod)
    return NextResponse.json({ error: String(err?.message || err) }, { status: 500 });
  }
}