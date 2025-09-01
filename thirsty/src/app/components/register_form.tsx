"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
 
export default function RegisterForm() {
    const router = useRouter();

    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profilePicture, setProfilePicture] = useState<File | null>(null);
    const [registrationSuccess, setRegistrationSuccess] = useState<Boolean | null>(null);
    const [responseMessage, setResponseMessage] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);

        if (profilePicture) {
            formData.append("profilePicture", profilePicture);
        }

        const res = await fetch("/api/auth/register", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();

        if (data.ok) {
            alert(data.message);
            // Redirect to profile
            router.push("/dashboard");
        } else {
            setRegistrationSuccess(false);
            setResponseMessage(data.message);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>

                <label htmlFor="profilePicture">
                    Profile Picture (Optional, you can always add one later.)
                </label>
                <input
                    id="profilePicture"
                    type="file"
                    accept="image/*"
                    onChange={event => setProfilePicture(event.target.files?.[0] || null)}
                />

                <input
                    id="name"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={event => setName(event.target.value)}
                    required
                />

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

                {(registrationSuccess === false) && <p>{responseMessage}</p>}

                <button type="submit">Register</button>

            </form>
        </div>
    );
}