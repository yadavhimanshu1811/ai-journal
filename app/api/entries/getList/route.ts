import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Entry from "@/models/Entry";
import { connectToDatabase } from "@/lib/db";

export async function GET(request: Request){
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        await connectToDatabase();

        const list = await Entry.find();
        return NextResponse.json({list});

    } catch (error) {
        console.log("error in getting the list", error)
        return NextResponse.json({error: "Something went wrong"}, {status: 500})
    }

}