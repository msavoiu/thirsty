import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        await prisma.bottleCounter.update({
            where: { id: 1 },
            data: {
                bottles: {
                increment: 1,
                },
            },
        });

        return Response.json({ ok: true }, { status: 200 });

    } catch (error: any) {
        return Response.json({ message: error.message, ok: false }, { status: 500 });
    }
}