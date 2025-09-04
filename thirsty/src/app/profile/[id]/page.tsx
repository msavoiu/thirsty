import React from "react";

// Components
import UserMarkerMap from "@/app/components/user_marker_map";
import ProfileCounters from "@/app/components/profile_counters";

interface ProfileProps {
    params: { id: string };
}

export default function Profile({ params }: ProfileProps) {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;
    const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID as string;

    const userId = parseInt(params.id, 10); // 10 tells it to parse as a decimal number

    return (
        <div>
            <UserMarkerMap
                userId={userId}
                apiKey={apiKey}
                mapId={mapId}
            />

            <ProfileCounters
                userId={userId}
            />
        </div>
    )
}