import { Game } from "@/types";
import { gamesAPI } from "@/lib/api/games";
import EditGameForm from "./EditGameForm";
import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";

const fetchGame = async (steamAppId: string): Promise<Game | null> => {
    return await gamesAPI.getByStreamAppId(steamAppId);
};

export default async function ModifyGame({ params }: { params: Promise<{ steamAppId: string }> }) {
    const { steamAppId } = await params;
    const game = await fetchGame(steamAppId);

    if (!game) {
        return (
            <div className="container" style={{ padding: "0 2rem", maxWidth: "800px", margin: "0 auto" }}>
                <Navbar />
                <h1>Spiel nicht gefunden</h1>
                <p>Kein Spiel mit Steam App ID: {steamAppId} gefunden</p>
                <Link href="/games">Zurück zu Spielen</Link>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <EditGameForm initialGame={game} />
        </>
    );
}
