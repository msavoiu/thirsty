"use client";

import React, { useState } from "react";
// import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
 
export default function LoginForm() {
    // const router = useRouter();
    const { setUser } = useUser();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginSuccess, setLoginSuccess] = useState<Boolean | null>(null);
    const [responseMessage, setResponseMessage] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        const res = await fetch("/api/auth/login", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>

                <input
                    id="email"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    required
                />

                <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                    required
                />

                {(loginSuccess === false) && <p>{responseMessage}</p>}

                <button type="submit">Log In</button>

            </form>
        </div>
    );
}