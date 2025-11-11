'use client';

import React, { useState, useEffect } from 'react';
import MarkerMap from "./components/map";
// import { MapComponent, Marker } from './MapComponent';
// import { useAuth } from './AuthContext';

const HomePage: React.FC = () => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID as string;

  // const { isAuthenticated, user } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [stationCount, setStationCount] = useState(0);
  const [bottleCount, setBottleCount] = useState(0);

  useEffect(() => {
    // Check authentication
    const fetchAuthentication = async () => {
      const res = await fetch("/api/auth/whoami", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      });

      const data = await res.json();

      if (data.ok) {
        setIsAuthenticated(true);
      }
    };

    const fetchBottleAndStationCount = async () => {
      const res = await fetch("/api/counts/get");

      const data = await res.json();
      setStationCount(data.stationsLogged);
      setBottleCount(data.bottlesSaved);
    };

    fetchAuthentication();
    fetchBottleAndStationCount();
  }, []);

  return (
    <div className="w-full">
      {/* Bottle Counter Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-2 text-white">Together, we've saved</h2>
          <div className="text-5xl md:text-6xl mb-2">
            {bottleCount.toLocaleString()}
          </div>
          <p className="text-blue-100">plastic bottles with your help!</p>
        </div>
      </div>

      {/* Map Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-4">
          <h2 className="mb-2">Water Stations</h2>
          <p className="text-muted-foreground">
            {isAuthenticated 
              ? 'Click on the map to add a new water station!' 
              : 'Sign up to start adding water stations and saving plastic bottles!'}
          </p>
        </div>
        
        <MarkerMap
            fetchAPI={"/api/markers/get"}
            apiKey={apiKey}
            mapId={mapId}
        />

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white border border-border rounded-lg p-6 text-center">
            <div className="text-3xl text-blue-600 mb-2">{stationCount}</div>
            <p className="text-muted-foreground">Water Stations</p>
          </div>
          <div className="bg-white border border-border rounded-lg p-6 text-center">
            <div className="text-3xl text-green-600 mb-2">{bottleCount.toLocaleString()}</div>
            <p className="text-muted-foreground">Bottles Saved</p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default HomePage;