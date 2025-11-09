'use client';

import React, { useState, useEffect } from 'react';
// import { useAuth } from './AuthContext';
import { MapComponent, Marker } from './MapComponent';
import { User } from 'lucide-react';
import { api } from '../utils/api';

interface ProfilePageProps {
  onNavigate: (page: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
  const { user, isAuthenticated } = useAuth();
  const [userMarkers, setUserMarkers] = useState<Marker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      onNavigate('login');
      return;
    }

    const fetchUserMarkers = async () => {
      setLoading(true);
      try {
        // Fetch user's markers from API
        const markers = await api.getUserMarkers(user!.id);
        setUserMarkers(markers);
      } catch (error) {
        console.error('Error fetching user markers:', error);
        // Fallback to mock data
        setUserMarkers([
        { 
          id: 'user-1', 
          lat: 40.7128, 
          lng: -74.0060, 
          name: 'My Local Park Fountain', 
          userId: user?.id || '',
          hasHotWater: false,
          hasColdWater: true,
          image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400',
          description: 'Near the playground, perfect for refilling after a run',
          userName: user?.displayName || '',
          profilePicture: user?.profilePicture || ''
        },
        { 
          id: 'user-2', 
          lat: 40.7489, 
          lng: -73.9680, 
          name: 'Office Building Station', 
          userId: user?.id || '',
          hasHotWater: true,
          hasColdWater: true,
          image: 'https://images.unsplash.com/photo-1541672065485-dd7452a810b9?w=400',
          description: 'First floor lobby, accessible during business hours',
          userName: user?.displayName || '',
          profilePicture: user?.profilePicture || ''
        },
        ]);
      }
      setLoading(false);
    };

    fetchUserMarkers();
  }, [isAuthenticated, onNavigate, user]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white border border-border rounded-lg p-6 md:p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            {user.profilePicture ? (
              <img
                src={user.profilePicture}
                alt={user.displayName}
                className="h-20 w-20 rounded-full object-cover border-2 border-border"
              />
            ) : (
              <div className="h-20 w-20 rounded-full bg-accent flex items-center justify-center border-2 border-border">
                <User className="h-10 w-10 text-muted-foreground" />
              </div>
            )}
            <div>
              <h2 className="mb-1">{user.displayName}</h2>
              <p className="text-muted-foreground text-sm">@{user.username}</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-6 text-center">
              <div className="text-3xl text-blue-600 mb-2">
                {user.waterStationsLogged}
              </div>
              <p className="text-blue-900">water stations logged</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl p-6 text-center">
              <div className="text-3xl text-green-600 mb-2">
                {user.bottlesSaved}
              </div>
              <p className="text-green-900">plastic bottles saved</p>
            </div>
          </div>
        </div>

        {/* User's Markers Map */}
        <div className="bg-white border border-border rounded-lg p-6 md:p-8">
          <h3 className="mb-4">My Water Stations</h3>
          <p className="text-muted-foreground mb-6">
            {userMarkers.length > 0 
              ? 'Here are all the water stations you\'ve added to the map.' 
              : 'You haven\'t added any water stations yet. Visit the home page to get started!'}
          </p>
          <MapComponent markers={userMarkers} />
          
          {userMarkers.length === 0 && (
            <div className="mt-6 text-center">
              <button
                onClick={() => onNavigate('home')}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                Add Your First Station
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
