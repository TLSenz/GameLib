"use client";

import { Game } from "@/types";
import { useState } from "react";
import { gamesAPI, UpdateGameDTO } from "@/lib/api/games";

type GameProperty = {
    label: string;
    value: string | number | undefined;
    key: keyof Game;
};

interface GamePropertyInterface {
    property: GameProperty;
    onValueChange: (key: keyof Game, newValue: string | number) => void;
}

function GamePropertyModifier({ property, onValueChange }: GamePropertyInterface) {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editValue, setEditValue] = useState<string>(String(property.value ?? ""));

    const handleSave = () => {
        const newValue = typeof property.value === "number" ? Number(editValue) : editValue;
        onValueChange(property.key, newValue);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditValue(String(property.value ?? ""));
        setIsEditing(false);
    };

    return (
        <li>
            <strong>{property.label}</strong>{" "}
            {isEditing ? (
                <>
                    <input
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                    />
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </>
            ) : (
                <>
                    {property.value ?? "-"}
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                </>
            )}
        </li>
    );
}

export default function EditGameForm({ initialGame }: { initialGame: Game }) {
    const [editableGame, setEditableGame] = useState<Game>(initialGame);
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const parseArrayField = (value: string | number | undefined): string[] | undefined => {
        if (typeof value !== "string") return undefined;
        return value.split(",").map((s) => s.trim()).filter((s) => s.length > 0);
    };

    const parsePrice = (value: string | number | undefined): number | undefined => {
        if (typeof value === "number") return value;
        if (typeof value !== "string") return undefined;
        const cleaned = value.replace(/[^0-9.]/g, "");
        const parsed = parseFloat(cleaned);
        return isNaN(parsed) ? undefined : parsed;
    };

    const buildUpdateDTO = (): UpdateGameDTO => {
        return {
            id: editableGame.id,
            steamAppId: editableGame.steamAppId,
            title: editableGame.title,
            description: editableGame.description,
            shortDescription: editableGame.shortDescription,
            platforms: parseArrayField(editableGame.platforms?.join(", ")),
            genres: parseArrayField(editableGame.genres?.join(", ")),
            developers: parseArrayField(editableGame.developers?.join(", ")),
            price: parsePrice(editableGame.price),
            rating: editableGame.rating,
            releaseDate: editableGame.releaseDate,
            storeSnapshot: editableGame.storeSnapshot,
        };
    };

    const handleSaveAll = async () => {
        setIsSaving(true);
        setSaveMessage(null);

        try {
            const dto = buildUpdateDTO();
            await gamesAPI.update(dto);
            setSaveMessage({ type: "success", text: "Game updated successfully!" });
        } catch (error) {
            console.error("Failed to update game:", error);
            setSaveMessage({ type: "error", text: "Failed to update game. Please try again." });
        } finally {
            setIsSaving(false);
        }
    };

    const handlePropertyChange = (key: keyof Game, newValue: string | number) => {
        setEditableGame((prevState) => ({
            ...prevState,
            [key]: newValue,
        }));
        setSaveMessage(null);
    };

    const gameProperties: GameProperty[] = [
        { label: "Steam App ID", value: editableGame.steamAppId, key: "steamAppId" },
        { label: "Platforms", value: editableGame.platforms?.join(", "), key: "platforms" },
        { label: "Store Snapshot", value: editableGame.storeSnapshot, key: "storeSnapshot" },
        { label: "Description", value: editableGame.description, key: "description" },
        { label: "Short Description", value: editableGame.shortDescription, key: "shortDescription" },
        { label: "Genres", value: editableGame.genres?.join(", "), key: "genres" },
        {
            label: "Price",
            value: editableGame.price !== undefined ? `$${editableGame.price.toFixed(2)}` : undefined,
            key: "price",
        },
        { label: "Developers", value: editableGame.developers?.join(", "), key: "developers" },
        { label: "Rating", value: editableGame.rating, key: "rating" },
        { label: "Release Date", value: editableGame.releaseDate, key: "releaseDate" },
        { label: "Last Updated", value: editableGame.lastUpdateAt, key: "lastUpdateAt" },
    ];

    return (
        <div>
            <h1>{editableGame.title}</h1>
            <ul>
                {gameProperties.map((property) => (
                    <GamePropertyModifier
                        key={property.key}
                        property={property}
                        onValueChange={handlePropertyChange}
                    />
                ))}
            </ul>

            {saveMessage && (
                <p style={{ color: saveMessage.type === "success" ? "green" : "red", marginTop: "1rem" }}>
                    {saveMessage.text}
                </p>
            )}

            <button
                onClick={handleSaveAll}
                disabled={isSaving}
                style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
            >
                {isSaving ? "Saving..." : "Save Changes"}
            </button>
        </div>
    );
}
