"use client";

import React, { useEffect, useState, use } from "react";

// Components
import UserMarkerMap from "@/app/components/user_marker_map";
import ProfileCounters from "@/app/components/profile_counters";

interface ProfileProps {
    params: Promise<{ id: string }>;
}

export default function Profile({ params }: ProfileProps) {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;
    const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID as string;

    const { id } = use(params); // 10 tells it to parse as a decimal number
    const userId = parseInt(id, 10);

    const [name, setName] = useState("");
    const [profilePicture, setProfilePicture] = useState("/icon.png");
    // const [error, setError] = useState<string | null>(null);
    // const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchProfileInfo() {
            try {
                const user = await fetch("/api/profile/get", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ userId: userId }),
                });
                
                if (!user.ok) {
                    throw new Error("Failed to fetch");
                }

                const { name, profilePicture } = await user.json();
                console.log("profilePicture", profilePicture);

                setName(name);
                setProfilePicture(profilePicture);

            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchProfileInfo();
    }, [userId]);

    return (
        <div>
            <div className="profile-header">
                <img src={profilePicture} alt="Profile picture"/>
                <h1>{name}</h1>
            </div>

            <UserMarkerMap
                userId={userId}
                apiKey={apiKey}
                mapId={mapId}
            />

            <ProfileCounters
                userId={userId}
            />
        </div>
    )
}