import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { userId } = body;

        const count = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                bottlesSaved: true
            }
        });

        return NextResponse.json({ ok: true, count: count?.bottlesSaved }, { status: 200 });

    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }
}