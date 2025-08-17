import React from "react";
import MarkerMap from "../components/map";

export default function MapPage() {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;
    const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID as string;

    return (
        <div>
            <MarkerMap apiKey={apiKey} mapId={mapId} />
        </div>
    );
}