"use client";

import React, { useState, useEffect, useRef } from "react";
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
// import MarkerWindow from "./marker_window";
import MarkerWindow from "./MarkerWindow";
import NewMarkerForm from "./new_marker_form"; 

// Type declarations for TS
type MarkerMapProps = {
    fetchAPI: string;
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

// // TEST marker for development purposes
// const markers: Marker[] = [
//     {
//         key: "1",
//         location: { lat: 33.88413084573613, lng: -117.88127569981039  },
//         name: "CSUF HRE",
//         image: "None",
//         description: "Water station in the break room.",
//         hasHotWater: false,
//         hasColdWater: true
//     },
// ];

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

function MarkerMap({ apiKey, mapId }: MarkerMapProps) {
    // For the start position of the map
    const [center, setCenter] = useState<{ lat: number; lng: number }>({
        lat: 33.8823,
        lng: -117.8851, // CSUF default location
    });

    // For rendering info windows for specified markers
    const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null);

    const[currentLat, setCurrentLat] = useState<Number>(0);
    const[currentLng, setCurrentLng] = useState<Number>(0);
    const[newMarker, setNewMarker] = useState<Marker | null>(null);
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

    // User clicks to select a place for a new marker
    const handleClick = async (event: MapMouseEvent) => {
        if (!event.detail.latLng) return;

        // Save the new marker's information for sending to the backend
        const loc = event.detail.latLng;

        const { lat, lng } = loc;
        setCurrentLat(lat);
        setCurrentLng(lng);

        // Add the POI to the currently rendering list
        setNewMarker({ // All default values to be changed by the form later
            key: "0",
            location: loc,

            name: "",
            image: "None",
            description: "",
            hasHotWater: false,
            hasColdWater: false,
            userName: "",
            userId: "",
            profilePicture: ""
        });
    }

    // Select marker within PoiMarkers to display an info window for
    const handleMarkerClick = (marker: Marker) => {
        setSelectedMarker(marker);
    }

    useEffect(() => {
        async function fetchMarkers() {
            const res = await fetch("/api/markers/get");
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
        <APIProvider apiKey={apiKey} onLoad={() => console.log("Maps API has loaded.")}>
            <div style={{ width: "100%", height: "500px"}}>
                <Map

                    mapId={mapId}
                    defaultZoom={18}
                    defaultCenter={center} // Dynamic center
                    onCameraChanged={(ev: MapCameraChangedEvent) =>
                        console.log("camera changed:", ev.detail.center, "zoom:", ev.detail.zoom)
                    }
                    onClick={handleClick}
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

                    {/* Special marker that only shows up if user clicks to add a new location. */}
                    {newMarker &&
                        <AdvancedMarker
                            key={newMarker.key}
                            position={newMarker.location}
                            >
                            <Pin background={'#FF0000'} glyphColor={'#000'} borderColor={'#000'} />
                        </AdvancedMarker>
                    
                    }

                    {newMarker &&
                        <NewMarkerForm latitude={currentLat} longitude={currentLng}/>
                    }
                </Map>
            </div>
        </APIProvider>
    );
}

export default MarkerMap;