import { Game } from "@/types";
import { gamesAPI } from "@/lib/api/games";
import EditGameForm from "./EditGameForm";
import Link from "next/link";

const fetchGame = async (steamAppId: string): Promise<Game | null> => {
    return await gamesAPI.getByStreamAppId(steamAppId);
};

export default async function ModifyGame({ params }: { params: Promise<{ steamAppId: string }> }) {
    const { steamAppId } = await params;
    const game = await fetchGame(steamAppId);

    if (!game) {
        return (
            <div>
                <h1>Game not found</h1>
                <p>No game found with Steam App ID: {steamAppId}</p>
                <Link href="/games">Back to games</Link>
            </div>
        );
    }

    return <EditGameForm initialGame={game} />;
}
