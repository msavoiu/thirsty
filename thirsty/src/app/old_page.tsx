import React from "react";
import Image from "next/image";
import Counter from "./components/counter";
import MarkerMap from "./components/map";


export default function Home() {

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;
    const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID as string;

    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                
                <MarkerMap
                    userId={null}
                    fetchAPI={"/api/markers/get"}
                    apiKey={apiKey}
                    mapId={mapId}
                />

                <Counter/>

                <a href="/log">
                    <button className="button">Log fountain usage</button>
                </a>

                <a href="/map">
                    <button className="button">Find a refill station</button>
                </a>

            </main>
        </div>
    );
}
