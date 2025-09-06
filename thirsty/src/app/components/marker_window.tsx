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
        <div className="marker-window">
            <span className="marker-owner">
                <img src={pfp} alt="Profile picture"/>
                <p>Logged by {userName}</p>
            </span>

            <h1>{name}</h1>

            <div className="temperatures">
                {hasHotWater && <span className="hot-water">Hot Water</span>}
                {hasColdWater && <span className="cold-water">Cold Water</span>}
            </div>

            {image !== "None" && (
                <img src={image} alt={name} style={{ maxWidth: 200 }} />
            )}
            
            <p>{description}</p>
        </div>
    )
}

export default MarkerWindow;