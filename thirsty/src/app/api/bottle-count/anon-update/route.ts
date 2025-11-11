import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        await prisma.bottleCounter.update({
            where: { id: 1 },
            data: {
                count: {
                    increment: 1,
                },
            },
        });

        return Response.json({ ok: true }, { status: 200 });

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error('Unknown error', error);
        }
        return Response.json({ ok: false }, { status: 500 });
    }
}