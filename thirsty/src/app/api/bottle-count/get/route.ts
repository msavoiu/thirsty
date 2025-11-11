import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const bottleCount = await prisma.bottleCounter.findUnique({
            where: {
                id: 1,
            },
        });

        if (!bottleCount) {
            return Response.json({ ok: false, message: "Unable to fetch bottle count" }, { status: 500 });
        }

        return Response.json({ count: bottleCount.count, ok: true }, { status: 200 });

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error('Unknown error', error);
        }
        return Response.json({ ok: false }, { status: 500 });
    }
}