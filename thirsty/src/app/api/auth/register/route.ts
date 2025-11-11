import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        const name = formData.get("name") as string;
        const profilePicture = formData.get("profilePicture") as File;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        // Check if email has already been taken by another user
        const emailCheck = await prisma.user.findUnique({
            where: {
                email: email
            },
            select: {
                email: true
            }
        });
        if (emailCheck) {
            return NextResponse.json({ ok: false, message: "Email already in use."}, { status: 409 });
        }

        // Hash password for storage
        const passwordHash = await bcrypt.hash(password, 10);

        // Store profile picture
        let profilePictureUrl = "";

        if (profilePicture) {
            const { url } = await put(profilePicture.name, profilePicture, {
                access: "public",
                token: process.env.BLOB_READ_WRITE_TOKEN,
                addRandomSuffix: true
            });
            profilePictureUrl = url;
        } else {
            profilePictureUrl = "/icon.png";
        }

        // Store user in the database
        const user = await prisma.user.create({
            data: {
                name: name,
                profilePicture: profilePictureUrl,
                email: email,
                passwordHash: passwordHash,
                bottlesSaved: 0
            }
        });

        // Issue JWT
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET as string, // Set this in your .env
            { expiresIn: "7d" }
        );

        // Set JWT as HTTP-only cookie
        const response = NextResponse.json({ ok: true, message: "Registration successful." }, { status: 201 });
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7 // 7 days
        });

        return response;
        
    } catch (err: unknown) {
        if (err instanceof Error) console.error(err.message);
        return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
    }
}