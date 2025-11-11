import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const markers = await prisma.marker.findMany({
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

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error('Unknown error', error);
        }
        return NextResponse.json({ ok: false }, { status: 500 });
    }
}