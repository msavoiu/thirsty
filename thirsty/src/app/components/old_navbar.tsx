"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";

export default function Navbar() {
    const { user, setUser } = useUser();

    const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
    const [profilePicture, setProfilePicture] = useState<string>("/icon.png");

    useEffect(() => {
        async function checkLogin() {
            try {
                const authResponse = await fetch("/api/auth/whoami", {
                    method: "POST",
                    credentials: "include"
                });

                const userAuth = await authResponse.json();

                if (userAuth.ok) {
                    const userRes = await fetch("/api/user/get", {
                        method: "POST",
                        credentials: "include"
                    });

                    if (!userRes.ok) {
                        setLoggedIn(false);
                    } else {
                        const user = await userRes.json();
                        const { profilePicture } = user;
                        setProfilePicture(profilePicture);
                    }
                    setLoggedIn(true);
                } else {
                    setLoggedIn(false);
                }

            } catch (error: any) {
                console.log(error.message);
            } finally {
                
            }
        }

        checkLogin();
    }, []);

    const handleLogout = async () => {
        try {
            const res = await fetch("/api/auth/logout", { method: "POST" });
            // Update context
            setUser(null);

            // // Reload homepage
            window.location.reload();

        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <a href="/" className="logo">
                    <h1>
                        Thirsty
                    </h1>
                </a>
            </div>
            <div className="navbar-right">
                {loggedIn === true &&
                    <Link href="/">
                        <img src={profilePicture} alt=""/>
                        <button
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </Link>
                }

                {loggedIn === false &&
                    <Link href="/auth/login">
                        Login
                    </Link>
                }
            </div>
        </nav>
    );
};