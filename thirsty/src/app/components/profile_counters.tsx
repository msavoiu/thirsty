"use client";

import React, { useEffect, useState } from "react";

interface ProfileCountersProps {
    userId: number
}

function ProfileCounters({ userId }: ProfileCountersProps) {
    const [bottleCount, setBottleCount] = useState<number>(0);
    const [stationCount, setStationCount] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchCounts() {
            try {
                const data = { userId: userId }

                const bottleRes = await fetch("/api/bottle-count/get/user", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });

                const stationRes = await fetch("/api/stations/get/user", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });
                
                if (!bottleRes.ok || !stationRes.ok) {
                    throw new Error("Failed to fetch");
                }

                const bottleData = await bottleRes.json();
                const stationData = await stationRes.json();

                setBottleCount(bottleData.count);
                setStationCount(stationData.count);

            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchCounts();
    }, []);


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
            <div className="profile-counters">

                <div className="counter">
                    <span className="counter-text">
                        <p>{stationCount}</p>
                    </span>
                    <p>stations logged</p>
                </div>

                <div className="counter">
                    <span className="counter-text">
                        <p>{bottleCount}</p>
                    </span>
                    <p>single-use plastic bottles saved</p>
                </div>

            </div>
    );
};

export default ProfileCounters;