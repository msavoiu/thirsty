import { NextResponse } from "next/server";

export async function POST() {
    const response = NextResponse.json({ ok: true }, { status: 400 });

    // Clear the JWT cookie
    response.cookies.set({
        name: "token",
        value: "",
        path: "/",            // important: must match the path used when setting
        httpOnly: true, // prevents client-side JS from reading it
        secure: process.env.NODE_ENV === "production",
        maxAge: 0,            // immediately expire
    });

    return response;
}