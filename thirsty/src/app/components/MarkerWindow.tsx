'use client';

import React from "react";
import Image from "next/image";
import { Droplet, Flame, User, X } from "lucide-react";

interface MarkerWindowProps {
  name: string;
  hasHotWater: boolean;
  hasColdWater: boolean;
  image: string;
  description: string;
  userName: string;
  profilePicture: string;
  onClose?: () => void; // optional, if you use it as a modal
}

const MarkerWindow: React.FC<MarkerWindowProps> = ({
  name,
  hasHotWater,
  hasColdWater,
  image,
  description,
  userName,
  profilePicture,
  onClose,
}) => {
  // Profile picture fallback
  const pfp =
    !profilePicture || profilePicture === "None"
      ? "/icon.png"
      : profilePicture;

  return (
    <div
      className="bg-white rounded-lg max-w-md w-full shadow-xl overflow-hidden relative text-gray-900"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* Image (optional) */}
      {image && image !== "None" && (
        <div className="w-full h-48 bg-gray-100 relative">
          <Image
            src={image}
            alt={name}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      )}

      {/* Close button (optional) */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
        >
          <X className="h-4 w-4 text-gray-600" />
        </button>
      )}

      {/* Info content */}
      <div className="p-5">
        {/* User info */}
        <div className="flex items-center gap-2 mb-4">
          {pfp ? (
            <div className="relative h-6 w-6">
              <Image
                src={pfp}
                alt={userName}
                fill
                className="rounded-full object-cover"
              />
            </div>
          ) : (
            <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="h-3 w-3 text-gray-500" />
            </div>
          )}
          <span className="text-sm text-gray-600">Logged by {userName}</span>
        </div>

        {/* Station name */}
        <h3 className="text-lg font-semibold mb-3">{name}</h3>

        {/* Water type icons */}
        <div className="flex gap-4 mb-4">
          {hasColdWater && (
            <div className="flex items-center gap-1.5 text-blue-600">
              <Droplet className="h-5 w-5 fill-blue-600" />
              <span className="text-sm font-medium">Cold Water</span>
            </div>
          )}
          {hasHotWater && (
            <div className="flex items-center gap-1.5 text-red-600">
              <Flame className="h-5 w-5 fill-red-600" />
              <span className="text-sm font-medium">Hot Water</span>
            </div>
          )}
        </div>

        {/* Description */}
        {description && (
          <p className="text-sm text-gray-700 whitespace-pre-wrap">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default MarkerWindow;
