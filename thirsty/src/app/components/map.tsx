"use client";

import ReactDOM from "react-dom/client";
import React, { useState, useCallback } from "react";
import {
    APIProvider,
    Map,
    MapCameraChangedEvent,
    AdvancedMarker,
    Pin,
    useMap,
    InfoWindow,
    MapMouseEvent
} from "@vis.gl/react-google-maps";

// Components
import MarkerPopup from "./marker_window";

// Type declarations for TS
type MarkerMapProps = {
    apiKey: string;
    mapId: string;
};

type Marker = {
    key: string;
    location: google.maps.LatLngLiteral; 

    title: string;
    image: string;
    description: string;
    hasHotWater: boolean;
    hasColdWater: boolean;
}

// Test marker for development purposes
const markers: Marker[] = [
    {
        key: "1",
        location: { lat: 33.88413084573613, lng: -117.88127569981039  },
        title: "CSUF HRE",
        image: "None",
        description: "Water station in the break room.",
        hasHotWater: false,
        hasColdWater: true
    },
];

// Marker components. Contains on-click handling logic for rendering info windows.
const PoiMarkers = (props: {pois: Marker[]}) => {
    const map = useMap();

    const handleClick = useCallback((ev: google.maps.MapMouseEvent) => {

        if(!map) return;
        if(!ev.latLng) return;

        console.log("Marker clicked:", ev.latLng.toString());

        // Pan so the selected marker is centered on the map
        map.panTo(ev.latLng);

        // Render popup component
        // ...
    
    }, [map]);

    return (
        <>
            {props.pois.map( (poi: Marker) => (
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

async function MarkerMap({ apiKey, mapId }: MarkerMapProps) {
    const[newMarker, setNewMarker] = useState<Marker | null>(null);
    const [markers, setMarkers] = useState<Marker[]>([]);

    // User clicks to select a place for a new marker
    const handleClick = async (event: MapMouseEvent) => {
        if (!event.detail.latLng) return;

        // Save the new marker's information for sending to the backend
        const loc = event.detail.latLng;
        setNewMarker({ // All default values to be changed by the form later
            key: "0",
            location: loc,

            title: "",
            image: "None",
            description: "",
            hasHotWater: false,
            hasColdWater: false
        });

        // Add the POI to the currently rendering list
    }

    const { lat, lng, title, image, description, hasHot, hasCold } = await fetch("/api/markers/get");
    const location = { lat: lat, lng: lng } as google.maps.LatLngLiteral;
    setMarkers([...markers, 
        {
            key: "1", // Add logic to increment the key starting at 1?
            location: location,

            title: title,
            image: image,
            description: description,
            hasHotWater: hasHot,
            hasColdWater: hasCold
        }
    ]);

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
                    {/* Null because I don't have any markers on the backend to dynamically render yet */}
                    <PoiMarkers pois={markers}/> 

                    {/* Special marker that only shows up if user clicks to add a new location. */}
                    {newMarker && <AdvancedMarker />}
                </Map>
            </div>
        </APIProvider>
    );
}

export default MarkerMap;