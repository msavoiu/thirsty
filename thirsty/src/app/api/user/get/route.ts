import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
    try {
        // Retrieve token from HTTP cookies
        const token = req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ ok: false }, { status: 401 });
        }

        // Decode the user ID
        let decoded: any;

        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        } catch (err) {
            return NextResponse.json({ ok: false, error: "Unauthorized: Invalid token" }, { status: 401 });
        }

        const userId = Number(decoded.userId);
        if (!userId) {
            return NextResponse.json({ ok: false, error: "Unauthorized: No user ID in token" }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                name: true,
                profilePicture: true
            }
        });

        if (!user) {
            return NextResponse.json({ok: false, message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ ok: true, name: user.name, profilePicture: user.profilePicture }, { status: 200 });

    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
    }
}