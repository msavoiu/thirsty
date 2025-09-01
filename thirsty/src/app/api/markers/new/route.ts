import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        // Get data uploaded to the frontend form
        const image = formData.get("image") as File;
        const name = formData.get("name") as string;
        const hasHotWater = formData.get("hasHotWater") === "true";
        const hasColdWater = formData.get("hasColdWater") === "true";
        const description = formData.get("description") as string;
        const latitude = parseFloat(formData.get("latitude") as string);
        const longitude = parseFloat(formData.get("longitude") as string);

        if (!image) {
            return NextResponse.json({ error: "No image uploaded" }, { status: 400 });
        }

        // Upload to Vercel Blob
        const { url } = await put(image.name, image, {
            access: "public",
            token: process.env.BLOB_READ_WRITE_TOKEN,
        });

        // Create new database entry
        const markerUpload = await prisma.marker.create({
            data: {
                lat: latitude,
                lng: longitude,
                name: name,
                hasHotWater: hasHotWater,
                hasColdWater: hasColdWater,
                image: url,
                description: description
            }
        });

        return NextResponse.json({ ok: true, message: "Station logged.", markerUpload }, { status: 201 });

    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }
}
