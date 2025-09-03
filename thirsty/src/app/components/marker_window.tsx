"use client";

import React from "react";

// https://visgl.github.io/react-google-maps/docs/api-reference/components/info-window
function MarkerWindow({
    name,
    hasHotWater,
    hasColdWater,
    image,
    description,
    userName,
    userId,
    profilePicture
    }: {
        name: string,
        hasHotWater: boolean,
        hasColdWater: boolean,
        image: string,
        description: string,
        userName: string,
        userId: string,
        profilePicture: string
    }) {

    let pfp = "";
    if (profilePicture === "None") {
        pfp = "public/icon.png";
    } else {
        pfp = profilePicture;
    }

    return (
        <div>
            <p>Logged by: {userName}</p>
            <img src={pfp} alt="Profile picture" style={{ maxWidth: 75 }}/>

            <h3>{name}</h3>
            <p>{description}</p>
            {image !== "None" && (
                <img src={image} alt={name} style={{ maxWidth: 200 }} />
            )}
            <div>
                {hasHotWater && <span>Hot Water</span>}
                {hasColdWater && <span>Cold Water</span>}
            </div>
        </div>
    )
}

export default MarkerWindow;