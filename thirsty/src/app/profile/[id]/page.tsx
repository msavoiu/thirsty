'use client';

import React, { useState, useEffect, use } from 'react';
import Image from 'next/image'; // <-- Import Image
import { useRouter } from 'next/navigation';
import UserMarkerMap from "@/app/components/user_marker_map";
import { User } from 'lucide-react';

interface ProfilePageProps {
  params: Promise<{ id: string }>;
}

interface UserProfile {
  name: string;
  profilePicture: string | null;
  bottleCount: number;
  markerCount: number;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ params }: ProfilePageProps) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID as string;
  
  const router = useRouter();
  
  const [user, setUser] = useState<UserProfile | null>(null);

  const { id } = use(params);
  const userId = parseInt(id, 10);

  useEffect(() => {
    async function fetchProfileInfo() {
      try {
        const res = await fetch("/api/profile/get", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });

        const userData = await res.json();
        if (!userData.ok) throw new Error("Failed to fetch");
        setUser(userData);
      } catch (error: unknown) {
        if (error instanceof Error) console.error(error.message);
        else console.error('Unknown error', error);
        return null;
      }
    }

    fetchProfileInfo();
  }, [userId]);

  if (!user) return null;

  return (
    <div className="min-h-[calc(100vh-8rem)] px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white border border-border rounded-lg p-6 md:p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            {user.profilePicture ? (
              <div className="relative h-20 w-20 rounded-full border-2 border-border overflow-hidden">
                <Image
                  src={user.profilePicture}
                  alt={user.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            ) : (
              <div className="h-20 w-20 rounded-full bg-accent flex items-center justify-center border-2 border-border">
                <User className="h-10 w-10 text-muted-foreground" />
              </div>
            )}
            <div>
              <h2 className="mb-1">{user.name}</h2>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-6 text-center">
              <div className="text-3xl text-blue-600 mb-2">{user.markerCount}</div>
              <p className="text-blue-900">water stations logged</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl p-6 text-center">
              <div className="text-3xl text-green-600 mb-2">{user.bottleCount}</div>
              <p className="text-green-900">plastic bottles saved</p>
            </div>
          </div>
        </div>

        {/* User's Markers Map */}
        <div className="bg-white border border-border rounded-lg p-6 md:p-8">
          <h3 className="mb-4">My Water Stations</h3>
          <p className="text-muted-foreground mb-6">
            {user.markerCount > 0 
              ? "Here are all the water stations you've added to the map." 
              : "You haven't added any water stations yet. Visit the home page to get started!"}
          </p>

          <UserMarkerMap
            userId={userId}
            apiKey={apiKey}
            mapId={mapId}
          />
          
          {user.markerCount === 0 && (
            <div className="mt-6 text-center">
              <button
                onClick={() => router.push('/')}
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

export default ProfilePage;
