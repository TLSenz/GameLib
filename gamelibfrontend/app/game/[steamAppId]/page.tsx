import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import CommentSection from '@/components/CommentSection/CommentSection';
import { gamesAPI } from '@/lib/api/games';
import { commentsAPI, type Comment } from '@/lib/api/comments';

async function fetchGameData(steamAppId: number) {
    try {
        // Fetch all games and find by steamAppId
        const allGames = await gamesAPI.getAll();
        const game = Array.isArray(allGames)
            ? allGames.find(g => g.steamAppId === steamAppId)
            : null;

        // Fetch comments for this game
        let gameComments: Comment[] = [];
        try {
            const allComments = await commentsAPI.getAll();
            gameComments = Array.isArray(allComments)
                ? allComments.filter(c => c.steamAppId === steamAppId)
                : [];
        } catch (error) {
            console.error('Failed to load comments:', error);
        }

        return { game, gameComments };
    } catch (error) {
        console.error('Failed to load game data:', error);
        return { game: null, gameComments: [] };
    }
}

export default async function GameDetailPage({ params }: { params: Promise<{ steamAppId: string }> }) {
    const { steamAppId: steamAppIdStr } = await params;
    const steamAppId = parseInt(steamAppIdStr);
    const { game, gameComments } = await fetchGameData(steamAppId);

    if (!game) {
        return (
            <div className="container" style={{ padding: '0 2rem', maxWidth: '800px', margin: '0 auto' }}>
                <Navbar />
                <p>Spiel nicht gefunden.</p>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '0 2rem', maxWidth: '900px', margin: '0 auto', minHeight: '100vh' }}>
            <Navbar />

            {/* Game Header */}
            <div style={{ background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))', borderRadius: '12px', padding: '2rem', marginBottom: '2rem', marginTop: '1rem' }}>
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                    <img src={game.storeSnapshot} alt={game.title} style={{ width: '150px', height: '100px', borderRadius: '8px', objectFit: 'cover' }} />
                    <div style={{ flex: 1 }}>
                        <h1 style={{ margin: '0 0 0.5rem 0' }}>{game.title}</h1>
                        <p style={{ color: 'var(--text-muted)', margin: '0.5rem 0' }}>{game.description}</p>
                        <div style={{ display: 'flex', gap: '1rem', margin: '1rem 0', flexWrap: 'wrap' }}>
                            <span>⭐ {game.rating}</span>
                            <span>Price: ${game.price}</span>
                            {game.releaseDate ? <span>📅 {new Date(game.releaseDate).toLocaleDateString()}</span> : null}
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                            {game.genres?.map(genre => (
                                <span key={genre} style={{ background: 'rgba(102, 126, 234, 0.3)', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.85rem' }}>{genre}</span>
                            ))}
                        </div>
                        <Link href={`/game/${game.steamAppId}/achievements`}
                            style={{ display: 'inline-block', background: 'var(--accent-blue)', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', color: 'white', textDecoration: 'none' }}>
                            Alle Achievements ansehen →
                        </Link>
                    </div>
                </div>
            </div>

            {/* Comments Section */}
            <CommentSection initialComments={gameComments} steamAppId={game.steamAppId} />
        </div>
    );
}