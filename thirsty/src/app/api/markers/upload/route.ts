import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        // Get data uploaded to the frontend form
        // Not exactly sure if this should be done using formData or a regular JSON body
        const file = formData.get("file") as File;
        const name = formData.get("name");
        const hasHotWater = formData.get("hasHotWater");    
        const hasColdWater = formData.get("hasColdWater");    
        const description = formData.get("hasHotWater");

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        // Upload to Vercel Blob
        const { url } = await put(file.name, file, {
            access: "public",
            token: process.env.BLOB_READ_WRITE_TOKEN,
        });

        // Create new database entry
        const markerUpload = await prisma.marker.create({
            data: {
                name: name,
                hasHotWater: hasHotWater,
                hasColdWater: hasColdWater,
                image_url: url,
                description: description
            }
        });

        return NextResponse.json({ ok: true, markerUpload }, { status: 201 });

    } catch (error: any) {
        console.error(error.message)
        return NextResponse.json({ ok: false, message: "Failed to log to database." }, { status: 500 });
    }
}
