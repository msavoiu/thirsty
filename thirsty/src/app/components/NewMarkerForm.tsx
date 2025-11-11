"use client";

import React, { useState, useEffect } from "react";
import { Droplet, Flame, Upload } from 'lucide-react';
import Image from 'next/image';

interface NewMarkerFormProps {
    latitude: number;
    longitude: number;
}

const NewMarkerForm: React.FC<NewMarkerFormProps> = ({ latitude, longitude }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [hasHot, setHasHot] = useState(false);
    const [hasCold, setHasCold] = useState(false);
    const [image, setImage] = useState<File | null>(null);
    const [previewURL, setPreviewURL] = useState<string | null>(null);

    useEffect(() => {
        if (!image) {
            setPreviewURL(null);
            return;
        }
        const url = URL.createObjectURL(image);
        setPreviewURL(url);
        return () => URL.revokeObjectURL(url);
    }, [image]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("hasHotWater", String(hasHot));
        formData.append("hasColdWater", String(hasCold));
        formData.append("latitude", String(latitude));
        formData.append("longitude", String(longitude));

        if (image) formData.append("image", image);

        const authResponse = await fetch("/api/auth/whoami", {
            method: "POST",
            credentials: "include"
        });
        const userAuth = await authResponse.json();

        if (!userAuth.ok) {
            alert("You are not logged in! Please log in or create an account to add stations.");
        } else {
            formData.append("userId", userAuth.userId);
            const res = await fetch("/api/markers/new", {
                method: "POST",
                body: formData
            });
        }
    }

    return (
        <div className="mt-6 bg-white border border-border rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="mb-6">New Station</h3>

            <div className="space-y-5">
                <div>
                    <label htmlFor="stationName" className="block mb-2 text-sm">
                        Name this water station:
                    </label>
                    <input
                        id="stationName"
                        type="text"
                        placeholder="e.g., City Hall Fountain"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-input-background"
                        autoFocus
                    />
                </div>

                <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={hasHot}
                            onChange={(e) => setHasHot(e.target.checked)}
                            className="rounded border-border w-4 h-4"
                        />
                        <Flame className="h-4 w-4 text-red-600" />
                        <span className="text-sm">Hot water</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={hasCold}
                            onChange={(e) => setHasCold(e.target.checked)}
                            className="rounded border-border w-4 h-4"
                        />
                        <Droplet className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">Cold water</span>
                    </label>
                </div>

                <div>
                    <label htmlFor="description" className="block mb-2 text-sm">
                        Description:
                    </label>
                    <textarea
                        id="description"
                        placeholder="Where is it? How do we get there? What floor of the building is it on? etc."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-input-background min-h-[100px] resize-y"
                    />
                </div>

                <div>
                    <label htmlFor="stationImage" className="block mb-2 text-sm">
                        Image:
                    </label>
                    <div className="flex items-start gap-3">
                        <label
                            htmlFor="stationImage"
                            className="px-4 py-2 border border-border rounded-lg bg-input-background cursor-pointer hover:bg-accent transition-colors flex items-center gap-2"
                        >
                            <Upload className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                                {image ? 'Change Image' : 'Upload Image'}
                            </span>
                        </label>
                        <input
                            id="stationImage"
                            type="file"
                            accept="image/*"
                            onChange={(event) => setImage(event.target.files?.[0] || null)}
                            className="hidden"
                        />
                        {image && (
                            <button
                                onClick={() => setImage(null)}
                                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Remove
                            </button>
                        )}
                    </div>
                    {previewURL && (
                        <div className="mt-3 relative w-full h-48 max-w-md">
                            <Image
                                src={previewURL}
                                alt="Station preview"
                                fill
                                className="object-cover rounded-lg border border-border"
                                unoptimized
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className="flex gap-3 mt-6">
                <button
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default NewMarkerForm;
