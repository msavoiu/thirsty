import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Get total bottlesSaved across all users
    const totalBottlesSaved = await prisma.user.aggregate({
      _sum: {
        bottlesSaved: true,
      },
    });

    // Get total count of all markers
    const totalMarkers = await prisma.marker.count();

    return NextResponse.json(
        {
            bottlesSaved: totalBottlesSaved._sum.bottlesSaved || 0,
            stationsLogged: totalMarkers,
        }
    );
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
