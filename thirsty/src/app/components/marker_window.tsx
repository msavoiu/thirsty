"use client";

import React, { useEffect, useState } from "react";

function MarkerWindow({
    closestLocation,
    desc,
    image,
    hasHotCold }:
    {
        closestLocation: String,
        desc: String,
        image: String?,
        hasHotCold: Boolean}
    ) {

    const contentString =
        `<h1>Water refill station</h1>
        <>`


    return (
        <div className="marker-popup">
            <h1>Water refill station</h1>
            <h2>{closestLocation}</h2>

            {hasHotCold && <p>Hot and cold water available</p>}

            {/* Conditionally render image if the user that submitted uploaded one. */}
            {image && <img/>}

            <p>
                <b>Location description:</b>
                {desc}
            </p>
        </div>
    )
}

export default MarkerWindow;