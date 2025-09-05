"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
    const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
    const [profilePicture, setProfilePicture] = useState<string | null>("/icon.png");

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

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <a href="/" className="logo">
                    Thirsty
                </a>
            </div>
            <div className="navbar-right">

                {loggedIn === true &&
                    <Link href="/">
                        <img src={profilePicture} alt=""/>
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