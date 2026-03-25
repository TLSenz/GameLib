    "use client";

import { Game } from "@/types";
import { useState } from "react";
import { gamesAPI, UpdateGameDTO } from "@/lib/api/games";
import Link from "next/link";
import { useRouter } from "next/navigation";

type GameProperty = {
    label: string;
    value: string | number | undefined;
    key: keyof Game;
    type?: "text" | "number" | "textarea";
};

interface GamePropertyModifierProps {
    property: GameProperty;
    onValueChange: (key: keyof Game, newValue: string | number) => void;
}

function GamePropertyModifier({ property, onValueChange }: GamePropertyModifierProps) {
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

    const inputStyle: React.CSSProperties = {
        width: "100%",
        padding: "0.5rem",
        borderRadius: "8px",
        border: "1px solid rgba(102, 126, 234, 0.3)",
        backgroundColor: "rgba(102, 126, 234, 0.05)",
        color: "inherit",
        fontFamily: "inherit",
        fontSize: "1rem",
    };

    const buttonStyle: React.CSSProperties = {
        padding: "0.4rem 0.8rem",
        marginLeft: "0.5rem",
        borderRadius: "6px",
        border: "none",
        cursor: "pointer",
        fontSize: "0.9rem",
        fontWeight: "500",
    };

    return (
        <div style={{ marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: "1rem", flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: "250px" }}>
                    <label style={{ display: "block", fontWeight: "600", marginBottom: "0.5rem", color: "var(--text-primary)" }}>
                        {property.label}
                    </label>
                    {isEditing ? (
                        <div>
                            {property.type === "textarea" ? (
                                <textarea
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    style={{ ...inputStyle, minHeight: "100px", fontFamily: "monospace" }}
                                />
                            ) : (
                                <input
                                    type={property.type === "number" ? "number" : "text"}
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    style={inputStyle}
                                />
                            )}
                            <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                                <button onClick={handleSave} style={{ ...buttonStyle, background: "var(--accent-blue)", color: "white" }}>
                                    Speichern
                                </button>
                                <button onClick={handleCancel} style={{ ...buttonStyle, background: "rgba(102, 126, 234, 0.1)", color: "inherit" }}>
                                    Abbrechen
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem", backgroundColor: "rgba(102, 126, 234, 0.05)", borderRadius: "8px", flexWrap: "wrap", gap: "0.5rem" }}>
                            <span style={{ color: "var(--text-muted)", fontFamily: property.type === "textarea" ? "monospace" : "inherit", flex: 1, minWidth: "150px", wordBreak: "break-word" }}>
                                {property.value ?? "-"}
                            </span>
                            <button onClick={() => setIsEditing(true)} style={{ ...buttonStyle, background: "var(--accent-blue)", color: "white", flexShrink: 0 }}>
                                Bearbeiten
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function EditGameForm({ initialGame }: { initialGame: Game }) {
    const [editableGame, setEditableGame] = useState<Game>(initialGame);
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const router = useRouter();

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
            setSaveMessage({ type: "success", text: "Spiel erfolgreich aktualisiert!" });
            setTimeout(() => {
                router.push(`/game/${editableGame.steamAppId}`);
            }, 1500);
        } catch (error) {
            console.error("Failed to update game:", error);
            setSaveMessage({ type: "error", text: "Fehler beim Aktualisieren des Spiels. Bitte versuchen Sie es erneut." });
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
        { label: "Title", value: editableGame.title, key: "title" },
        { label: "Steam App ID", value: editableGame.steamAppId, key: "steamAppId", type: "number" },
        { label: "Kurzbeschreibung", value: editableGame.shortDescription, key: "shortDescription", type: "textarea" },
        { label: "Genres", value: editableGame.genres?.join(", "), key: "genres" },
        { label: "Plattformen", value: editableGame.platforms?.join(", "), key: "platforms" },
        { label: "Entwickler", value: editableGame.developers?.join(", "), key: "developers" },
        {
            label: "Preis",
            value: (typeof editableGame.price === "number" && editableGame.price != null) 
                ? editableGame.price.toFixed(2) 
                : undefined,
            key: "price",
        },
        { label: "Bewertung", value: editableGame.rating, key: "rating", type: "number" },
        { label: "Veröffentlichungsdatum", value: editableGame.releaseDate, key: "releaseDate" },
        { label: "Store Snapshot URL", value: editableGame.storeSnapshot, key: "storeSnapshot" },
    ];

    return (
        <div className="container" style={{ padding: "0 2rem", maxWidth: "900px", margin: "0 auto", minHeight: "100vh" }}>
            {/* Game Header */}
            <div style={{ background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))", borderRadius: "12px", padding: "2rem", marginBottom: "2rem", marginTop: "1rem" }}>
                <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
                    <img src={editableGame.storeSnapshot} alt={editableGame.title} style={{ width: "150px", height: "100px", borderRadius: "8px", objectFit: "cover" }} />
                    <div style={{ flex: 1 }}>
                        <h1 style={{ margin: "0 0 0.5rem 0" }}>{editableGame.title}</h1>
                        <p style={{ color: "var(--text-muted)", margin: "0.5rem 0" }}>{editableGame.shortDescription}</p>
                        <div style={{ display: "flex", gap: "1rem", margin: "1rem 0", flexWrap: "wrap" }}>
                            <span>⭐ {editableGame.rating}</span>
                            <span>Price: {editableGame.price != null ? "$" + editableGame.price : "$0 (Free)"}</span>
                            {editableGame.releaseDate ? <span>📅 {new Date(editableGame.releaseDate).toLocaleDateString("de-DE")}</span> : null}
                        </div>
                        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
                            {editableGame.genres && editableGame.genres.map((genre: string) => (
                                <span key={genre} style={{ background: "rgba(102, 126, 234, 0.3)", padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.85rem" }}>{genre}</span>
                            ))}
                        </div>
                        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                            <Link href={`/game/${editableGame.steamAppId}`}
                                style={{ display: "inline-block", background: "var(--accent-blue)", padding: "10px 20px", borderRadius: "8px", fontWeight: "bold", color: "white", textDecoration: "none" }}>
                                Zurück zur Detailseite →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Form */}
            <div style={{ background: "rgba(102, 126, 234, 0.05)", borderRadius: "12px", padding: "2rem", marginBottom: "2rem" }}>
                <h2 style={{ marginTop: 0, marginBottom: "1.5rem" }}>Spiel-Informationen bearbeiten</h2>
                
                <div>
                    {gameProperties.map((property) => (
                        <GamePropertyModifier
                            key={property.key}
                            property={property}
                            onValueChange={handlePropertyChange}
                        />
                    ))}
                </div>

                {saveMessage && (
                    <div style={{
                        padding: "1rem",
                        borderRadius: "8px",
                        marginTop: "1.5rem",
                        background: saveMessage.type === "success" ? "rgba(46, 213, 115, 0.1)" : "rgba(231, 76, 60, 0.1)",
                        border: `1px solid ${saveMessage.type === "success" ? "var(--accent-green, #2ed573)" : "var(--accent-red, #e74c3c)"}`,
                        color: saveMessage.type === "success" ? "var(--accent-green, #2ed573)" : "var(--accent-red, #e74c3c)",
                    }}>
                        {saveMessage.text}
                    </div>
                )}

                <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
                    <button
                        onClick={handleSaveAll}
                        disabled={isSaving}
                        style={{
                            background: "var(--accent-blue)",
                            color: "white",
                            border: "none",
                            padding: "0.75rem 2rem",
                            borderRadius: "8px",
                            cursor: isSaving ? "not-allowed" : "pointer",
                            fontWeight: "bold",
                            fontSize: "1rem",
                            opacity: isSaving ? 0.7 : 1,
                        }}
                    >
                        {isSaving ? "Speichern..." : "Alle Änderungen speichern"}
                    </button>
                    <Link href={`/game/${editableGame.steamAppId}`}
                        style={{
                            display: "inline-block",
                            background: "rgba(102, 126, 234, 0.1)",
                            color: "inherit",
                            border: "none",
                            padding: "0.75rem 2rem",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: "bold",
                            fontSize: "1rem",
                            textDecoration: "none",
                        }}
                    >
                        Abbrechen
                    </Link>
                </div>
            </div>
        </div>
    );
}
