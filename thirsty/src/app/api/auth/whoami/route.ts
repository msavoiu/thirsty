import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
}

export async function POST(req: NextRequest) {
    try {
        // Retrieve token from HTTP cookies
        const token = req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ ok: false }, { status: 401 });
        }

        // Decode the user ID
        let decoded: JwtPayload;

        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
            
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
            } else {
                console.error('Unknown error', error);
            }
            return NextResponse.json({ ok: false, error: "Unauthorized: Invalid token" }, { status: 401 });
        }

        const userId = decoded.userId;
        if (!userId) {
            return NextResponse.json({ ok: false, error: "Unauthorized: No user ID in token" }, { status: 401 });
        }

        return NextResponse.json({ ok: true, userId: userId }, { status: 200 });
        
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error('Unknown error', error);
        }
        return NextResponse.json({ ok: false, isLoggedIn: false }, { status: 500 });
    }
}