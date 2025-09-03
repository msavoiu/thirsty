import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
    try {
        // Retrieve token from HTTP cookies
        const token = req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ ok: true }, { status: 200 });
        }

        // Decode the user ID
        let decoded: any;

        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        } catch (err) {
            return NextResponse.json({ ok: false, error: "Unauthorized: Invalid token" }, { status: 401 });
        }

        const userId = decoded.userId;
        if (!userId) {
            return NextResponse.json({ ok: false, error: "Unauthorized: No user ID in token" }, { status: 401 });
        }

        return NextResponse.json({ ok: true, userId: userId }, { status: 200 });
        
    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({ ok: false, isLoggedIn: false, error: error.message }, { status: 500 });
    }
}