import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { userId } = body;

        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                name: true,
                profilePicture: true
            }
        });

        return NextResponse.json({ ok: true, name: user.name, profilePicture: user.profilePicture }, { status: 200 });

    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }
}