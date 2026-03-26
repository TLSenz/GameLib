import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import { gamesAPI } from "@/lib/api/games";
import { commentsAPI } from "@/lib/api/comments";
import GameDetailClient from "./GameDetailClient";

async function fetchGameData(steamAppId: number) {
    try {
        const game = await gamesAPI.getByStreamAppId(steamAppId);

        if (!game) {
            return { game: null, gameComments: [] };
        }

        let gameComments = [];
        try {
            gameComments = await commentsAPI.getByGameId(game.id);
        } catch (error) {
            console.error("Failed to load comments:", error);
        }

        return { game, gameComments };
    } catch (error) {
        console.error("Failed to load game data:", error);
        return { game: null, gameComments: [] };
    }
}

export default async function GameDetailPage({ params }: { params: Promise<{ steamAppId: string }> }) {
    const { steamAppId: steamAppIdStr } = await params;
    const steamAppId = parseInt(steamAppIdStr);
    const { game, gameComments } = await fetchGameData(steamAppId);

    if (!game) {
        return (
            <div className="container" style={{ padding: "0 2rem", maxWidth: "800px", margin: "0 auto" }}>
                <Navbar />
                <p>Spiel nicht gefunden.</p>
                <Link href="/games">Back to games</Link>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <GameDetailClient game={game} gameComments={gameComments} />
        </>
    );
}
