"use client";

import React, { useState } from "react";

interface NewMarkerFormProps {
    latitude: Number;
    longitude: Number
}

// Props cpassed on from the map component
function NewMarkerForm({ latitude, longitude }: NewMarkerFormProps) {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("");
    const [hasHot, setHasHot] = useState(false);
    const [hasCold, setHasCold] = useState(false);
    const [image, setImage] = useState<File | null>(null);
    const [uploadSuccess, setUploadSuccess] = useState<Boolean | null>(null);

    // Submit logic
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("hasHotWater", String(hasHot));
        formData.append("hasColdWater", String(hasCold));
        formData.append("latitude", String(latitude));
        formData.append("longitude", String(longitude));

        if (image) {
            formData.append("image", image);
        }

        // Send repquest API route that stores marker to database
        const res = await fetch("/api/markers/new", {
            method: "POST",
            body: formData,
        });

        setUploadSuccess(res.ok);
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    id="name"
                    type="text"
                    placeholder="Name this water station"
                    value={name}
                    onChange={event => setName(event.target.value)}
                    required/>

                <input
                    id="has_hot_water"
                    type="checkbox"
                    checked={hasHot}
                    onChange={event => setHasHot(event.target.checked)}
                />
                <label htmlFor="has_hot_water">Hot water</label>

                <input
                    id="has_cold_water"
                    type="checkbox"
                    checked={hasCold}
                    onChange={event => setHasCold(event.target.checked)}
                />
                <label htmlFor="has_cold_water">Cold water</label>
            
                <input
                    id="description"
                    type="text"
                    placeholder="How do we get to it? Is it indoors or outdoors? What floor of the building is it on?"
                    value={description}
                    onChange={event => setDescription(event.target.value)}
                    required/>
                <label htmlFor="description">Description</label>

                <label htmlFor="image">Image</label>
                <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={event => setImage(event.target.files?.[0] || null)}
                    required
                />

                <button type="submit">Submit</button>
            </form>

            {(uploadSuccess === false) && <p>Failed to log station. Please try again later.</p>}

        </div>
    );

};

export default NewMarkerForm;