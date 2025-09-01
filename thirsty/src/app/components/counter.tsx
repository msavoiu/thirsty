"use client";

import React, { useEffect, useState } from "react";

function Counter() {
    const [count, setCount] = useState<number | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchCount() {
            try {
                const res = await fetch("api/bottle-count/get");
                
                if (!res.ok) {
                    throw new Error("Failed to fetch");
                }

                const data = await res.json();
                setCount(data.count);

            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchCount();
    }, []);


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
            <div className="counter">
                    <span className="counter-text">
                            <p>{count}</p>
                    </span>
                    <p>single-use plastic bottles saved with the help of Thirsty!</p>
            </div>
    );
};

export default Counter;