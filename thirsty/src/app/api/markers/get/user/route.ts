import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { userId } = body;

        const markers = await prisma.marker.findMany({
        where: {
            userId: userId, // filter by userId
        },
        select: {
            lat: true,
            lng: true,
            name: true,
            hasHotWater: true,
            hasColdWater: true,
            image: true,
            description: true,
            userId: true,
            user: {
            select: {
                id: true,
                name: true,
                profilePicture: true,
            },
            },
        },
        });

        return NextResponse.json({ ok: true, markers: markers }, { status: 200 });

    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }
}