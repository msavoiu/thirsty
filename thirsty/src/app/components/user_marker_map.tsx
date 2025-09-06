"use client";

import React, { useState, useEffect } from "react";
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
import MarkerWindow from "./marker_window";

// Type declarations for TS
type UserMarkerMapProps = {
    userId: number;
    apiKey: string;
    mapId: string;
};

type Marker = {
    key: string;
    location: google.maps.LatLngLiteral; 

    name: string;
    hasHotWater: boolean;
    hasColdWater: boolean;
    image: string;
    description: string;
    userName: string;
    userId: string;
    profilePicture: string;
}

function MapPanToSelectedMarker({ selectedMarker }: { selectedMarker: Marker | null }) {
    const map = useMap();
    useEffect(() => {
        if (map && selectedMarker) {
            map.panTo(selectedMarker.location);
        }
    }, [map, selectedMarker]);
    return null;
}

// Marker components. Contains on-click handling logic for rendering info windows.
const PoiMarkers = (props: {pois: Marker[], onMarkerClick: (marker: Marker) => void }) => {
    return (
        <>
            {props.pois.map( (poi: Marker) => (
                <AdvancedMarker
                    key={poi.key}
                    position={poi.location}
                    onClick={() => props.onMarkerClick(poi)}
                >
                    <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
                </AdvancedMarker>
            ))}
        </>
    );
};

function UserMarkerMap({ userId, apiKey, mapId }: UserMarkerMapProps) {
    // For the start position of the map
    const [center, setCenter] = useState<{ lat: number; lng: number }>({
        lat: 33.8823,
        lng: -117.8851, // CSUF default location
    });

    // For rendering info windows for specified markers
    const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null);
    const [markers, setMarkers] = useState<Marker[]>([]);

    useEffect(() => {
        if (navigator.geolocation) {
            console.log("Geolocation retrieved.")
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCenter({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => {
                    console.warn("Geolocation error:", error);
                    // Fall back to default center
                }
            );
        }
    }, []);

    // Select marker within PoiMarkers to display an info window for
    const handleMarkerClick = (marker: Marker) => {
        setSelectedMarker(marker);
    }

    useEffect(() => {
        async function fetchMarkers() {
            const payload = {
                userId: userId
            };

            const res = await fetch("/api/markers/get/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            // Transform the data to match Marker type
            const markers: Marker[] = data.markers.map((m: any, idx: number) => ({
                key: idx.toString(), // or use another unique value if available
                location: { lat: m.lat, lng: m.lng },
                name: m.name,
                hasHotWater: m.hasHotWater,
                hasColdWater: m.hasColdWater,
                image: m.image,
                userName: m.user.name,
                userId: m.user.id,
                profilePicture: m.user.profilePicture,
                
            }));

            setMarkers(markers);
            console.log(markers)
        }
        fetchMarkers();
    }, []);

    return (
        <div>
            <APIProvider apiKey={apiKey} onLoad={() => console.log("Maps API has loaded.")}>
                <div style={{ width: "100%", height: "500px"}}>
                    <Map
                        className="marker-map"
                        mapId={mapId}
                        defaultZoom={18}
                        defaultCenter={center} // Dynamic center
                        onCameraChanged={(ev: MapCameraChangedEvent) =>
                            console.log("camera changed:", ev.detail.center, "zoom:", ev.detail.zoom)
                        }
                    >

                        {/* Pan the map to the selected marker when it changes */}
                        <MapPanToSelectedMarker selectedMarker={selectedMarker} />

                        <PoiMarkers pois={markers} onMarkerClick={handleMarkerClick}/>

                        {/* Info window! */}
                        {selectedMarker && (
                            <InfoWindow
                                position={selectedMarker.location}
                                onCloseClick={() => setSelectedMarker(null)}
                            >
                                <MarkerWindow
                                    name={selectedMarker.name}
                                    hasHotWater={selectedMarker.hasHotWater}
                                    hasColdWater={selectedMarker.hasColdWater}
                                    image={selectedMarker.image}
                                    description={selectedMarker.description}
                                    userName={selectedMarker.userName}
                                    userId={selectedMarker.userId}
                                    profilePicture={selectedMarker.profilePicture}
                                />
                            </InfoWindow>
                        )}
                    </Map>
                </div>
            </APIProvider>
        </div>
    );
}

export default UserMarkerMap;