import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
import Entry from "@/models/Entry";
import { connectToDatabase } from "@/lib/db";

export async function DELETE(request: Request){
    try {
        const {id} = await request.json()
        await connectToDatabase();
        await Entry.deleteOne({_id: id});
        return NextResponse.json({message: "Entry deleted successfully"})
    } catch (error) {
        console.log("error", error)
        return NextResponse.json({message: "Entry deletion failed"})
    }
    

}