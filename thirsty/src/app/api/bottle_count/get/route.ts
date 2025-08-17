import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const bottleCount = await prisma.bottleCounter.findUnique({
            where: {
                id: 1,
            },
        });

        if (!bottleCount) {
            throw new Error("Unable to fetch bottle count")
        }

        return Response.json({ count: bottleCount.bottles, ok: true }, { status: 200 });

    } catch (error: any) {
        return Response.json({ message: error.message, ok: false }, { status: 500 });
    }
}