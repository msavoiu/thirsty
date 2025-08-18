"use client";

import React, { useState, useCallback } from "react";
import {
    APIProvider,
    Map,
    MapCameraChangedEvent,
    AdvancedMarker,
    Pin,
    useMap
} from "@vis.gl/react-google-maps";

// Components
import MarkerPopup from "./marker_popup";

// Type declarations for TS
type MarkerMapProps = {
    apiKey: string;
    mapId: string;
};
type Poi ={ key: string, location: google.maps.LatLngLiteral }

// Test marker for development purposes
const locations: Poi[] = [
    {key: 'CSUF HRE', location: { lat: 33.88413084573613, lng: -117.88127569981039  }},
];

const PoiMarkers = (props: {pois: Poi[]}) => {
    const map = useMap();

    const handleClick = useCallback((ev: google.maps.MapMouseEvent) => {
        if(!map) return;
        if(!ev.latLng) return;

        console.log("Marker clicked:", ev.latLng.toString());

        // Pan so the selected marker is centered on the map
        map.panTo(ev.latLng);
        // Render popup component
    
    }, [map]);

    return (
        <>
            {props.pois.map( (poi: Poi) => (
                <AdvancedMarker
                    key={poi.key}
                    position={poi.location}
                    onClick={handleClick}
                >
                    <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
                </AdvancedMarker>
            ))}
        </>
    );
};

function MarkerMap({ apiKey, mapId }: MarkerMapProps) {
    return (
        <APIProvider apiKey={apiKey} onLoad={() => console.log("Maps API has loaded.")}>
            <div style={{ width: "100%", height: "500px"}}>
                <Map
                    mapId={mapId}
                    defaultZoom={13}
                    defaultCenter={{ lat: 33.8823, lng: -117.8851 }}
                    onCameraChanged={(ev: MapCameraChangedEvent) =>
                        console.log("camera changed:", ev.detail.center, "zoom:", ev.detail.zoom)
                    }
                >
                    <PoiMarkers pois={locations}/>
                </Map>
            </div>
        </APIProvider>
    );
}

export default MarkerMap;