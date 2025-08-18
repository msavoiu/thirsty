"use client";

import React from "react";
import { APIProvider, Map, MapCameraChangedEvent, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";

type MarkerMapProps = {
    apiKey: string;
    mapId: string;
};

type Poi ={ key: string, location: google.maps.LatLngLiteral }

const locations: Poi[] = [
    {key: 'CSUF HRE', location: { lat: 33.88413084573613, lng: -117.88127569981039  }},
];

const PoiMarkers = (props: {pois: Poi[]}) => {
  return (
    <>
      {props.pois.map( (poi: Poi) => (
        <AdvancedMarker
          key={poi.key}
          position={poi.location}>
        <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
        </AdvancedMarker>
      ))}
    </>
  );
};

function MarkerMap({ apiKey, mapId }: MarkerMapProps) {
    return (
        <APIProvider apiKey={apiKey} onLoad={() => console.log("Maps API has loaded.")}>
            <div style={{ width: "100%", height: "500px" }}>
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