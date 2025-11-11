import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        // Find user by email
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return NextResponse.json({ ok: false, message: "Invalid email or password." }, { status: 401 });
        }

        // Compare password
        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) {
            return NextResponse.json({ ok: false, message: "Invalid email or password." }, { status: 401 });
        }

        // Issue JWT
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET as string,
            { expiresIn: "7d" }
        );

        // Set JWT as HTTP-only cookie
        const response = NextResponse.json({ ok: true, message: "Login successful." }, { status: 200 });
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7 // 7 days
        });

        return response;

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error('Unknown error', error);
        }
        return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
    }
}