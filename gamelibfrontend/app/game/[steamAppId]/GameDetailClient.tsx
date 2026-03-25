"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Game, Comment } from "@/types";
import { gamesAPI } from "@/lib/api/games";
import CommentSection from "@/components/CommentSection/CommentSection";

interface GameDetailClientProps {
    game: Game;
    gameComments: Comment[];
}

export default function GameDetailClient({ game, gameComments }: GameDetailClientProps) {
    const router = useRouter();

    const handleDelete = async () => {
        if (game?.id != null) {
            try {
                await gamesAPI.delete(game.id);
                router.push("/");
            } catch (error) {
                console.error("Failed to delete game:", error);
            }
        }
    };

    return (
        <div className="container" style={{ padding: "0 2rem", maxWidth: "900px", margin: "0 auto", minHeight: "100vh" }}>
            {/* Game Header */}
            <div style={{ background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))", borderRadius: "12px", padding: "2rem", marginBottom: "2rem", marginTop: "1rem" }}>
                <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
                    <img src={game.storeSnapshot} alt={game.title} style={{ width: "150px", height: "100px", borderRadius: "8px", objectFit: "cover" }} />
                    <div style={{ flex: 1 }}>
                        <h1 style={{ margin: "0 0 0.5rem 0" }}>{game.title}</h1>
                        <p style={{ color: "var(--text-muted)", margin: "0.5rem 0" }}>{game.shortDescription}</p>
                        <div style={{ display: "flex", gap: "1rem", margin: "1rem 0", flexWrap: "wrap" }}>
                            <span>⭐ {game.rating}</span>
                            <span>Price: {game.price != null ? "$" + game.price : "$0 (Free)"}</span>
                            {game.releaseDate ? <span>📅 {new Date(game.releaseDate).toLocaleDateString("de-DE")}</span> : null}
                        </div>
                        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
                            {game.genres && game.genres.map((genre: string) => (
                                <span key={genre} style={{ background: "rgba(102, 126, 234, 0.3)", padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.85rem" }}>{genre}</span>
                            ))}
                        </div>
                        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                            <Link href={`/game/${game.steamAppId}/modify`}>
                                Modifier
                            </Link>
                            <button onClick={handleDelete} style={{ background: "var(--accent-red, #e74c3c)", color: "white", border: "none", padding: "0.5rem 1rem", borderRadius: "8px", cursor: "pointer" }}>
                                Delete Game
                            </button>
                            <Link href={`/game/${game.steamAppId}/achievements`}
                                style={{ display: "inline-block", background: "var(--accent-blue)", padding: "10px 20px", borderRadius: "8px", fontWeight: "bold", color: "white", textDecoration: "none" }}>
                                Alle Achievements ansehen →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Comments Section */}
            <CommentSection initialComments={gameComments} gameId={game.id} />
        </div>
    );
}
