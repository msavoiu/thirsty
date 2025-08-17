"use client";

import React from "react";
import { APIProvider, Map, MapCameraChangedEvent } from "@vis.gl/react-google-maps";

type MarkerMapProps = {
    apiKey: string;
    mapId: string;
};

function MarkerMap({ apiKey, mapId }: MarkerMapProps) {
    return (
        <APIProvider apiKey={apiKey} onLoad={() => console.log("Maps API has loaded.")}>
            <div style={{ width: "100%", height: "500px" }}>
                <Map
                    // mapId={mapId}
                    defaultZoom={13}
                    defaultCenter={{ lat: 33.8823, lng: -117.8851 }}
                    onCameraChanged={(ev: MapCameraChangedEvent) =>
                        console.log("camera changed:", ev.detail.center, "zoom:", ev.detail.zoom)
                    }
                />
            </div>
        </APIProvider>
    );
}

export default MarkerMap;