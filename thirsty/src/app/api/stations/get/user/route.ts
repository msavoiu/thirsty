import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { userId } = body;

        const count = await prisma.marker.count({
            where: {
                userId: userId,
            },
        });

        return NextResponse.json({ ok: true, count: count }, { status: 200 });

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error('Unknown error', error);
        }
        return NextResponse.json({ ok: false }, { status: 500 });
    }
}