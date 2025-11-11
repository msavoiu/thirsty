import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId } = body;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        profilePicture: true,
        bottlesSaved: true,
        _count: {
          select: { markers: true },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ ok: false, message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      ok: true,
      name: user.name,
      profilePicture: user.profilePicture,
      bottleCount: user.bottlesSaved,
      markerCount: user._count.markers,
    }, { status: 200 });

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error('Unknown error', error);
        }
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
