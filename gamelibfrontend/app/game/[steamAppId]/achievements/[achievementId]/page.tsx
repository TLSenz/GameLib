'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar/Navbar';
import CommentSection from '@/components/CommentSection/CommentSection';
import { gamesAPI } from '@/lib/api/games';
import { achievementsAPI } from '@/lib/api/achievements';
import { commentsAPI } from '@/lib/api/comments';

export default function AchievementDetailPage() {
  const params = useParams();
  const steamAppId = params?.steamAppId as string;
  const achievementId = params?.achievementId as string;

  const [achievement, setAchievement] = useState<any>(null);
  const [game, setGame] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // fetch game by steamAppId
        const gameData = await gamesAPI.getByStreamAppId(parseInt(steamAppId));
        if (!gameData) {
          setError('Spiel nicht gefunden');
          setLoading(false);
          return;
        }
        setGame(gameData);

        // Fetch all achievements for this game with the mongodb gameId from the fetch above and find the one for the detail page
        const achievementsData = await achievementsAPI.getByGameId(gameData.id);
        const ach = Array.isArray(achievementsData)
          ? achievementsData.find((a) => a.id === achievementId)
          : null;

        if (!ach) {
          setError('Achievement nicht gefunden');
          setLoading(false);
          return;
        }
        setAchievement(ach);

        // Fetch comments for this achievement
        try {
          const commentsData = await commentsAPI.getByAchievementId(achievementId);
          setComments(Array.isArray(commentsData) ? commentsData : []);
        } catch (err) {
          console.error('Failed to load comments:', err);
          setComments([]);
        }
      } catch (err) {
        console.error('Failed to load achievement data:', err);
        setError('Fehler beim Laden der Achievement-Details');
      } finally {
        setLoading(false);
      }
    };

    if (steamAppId && achievementId) {
      fetchData();
    }
  }, [steamAppId, achievementId]);

  if (loading) {
    return (
      <div style={{ padding: '0 2rem', maxWidth: '800px', margin: '0 auto' }}>
        <Navbar />
        <h1>Wird geladen...</h1>
      </div>
    );
  }

  if (error || !achievement || !game) {
    return (
      <div style={{ padding: '0 2rem', maxWidth: '800px', margin: '0 auto' }}>
        <Navbar />
        <h1 style={{ color: 'red' }}>{error || 'Fehler beim Laden'}</h1>
        <Link href={`/game/${steamAppId}/achievements`} style={{ color: 'var(--accent-blue)', textDecoration: 'none' }}>
          ← Zurück zu Achievements
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '0 2rem', maxWidth: '900px', margin: '0 auto', minHeight: '100vh' }}>
      <Navbar />

      {/* Achievement Header */}
      <div style={{ background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))', borderRadius: '12px', padding: '2rem', marginBottom: '2rem', marginTop: '1rem' }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
          <img src={achievement.storeSnapshot} alt={achievement.title} style={{ width: '150px', height: '150px', borderRadius: '8px', objectFit: 'cover' }} />
          <div style={{ flex: 1 }}>
            <Link href={`/game/${steamAppId}`} style={{ color: 'var(--accent-blue)', textDecoration: 'none', fontSize: '0.9rem' }}>
              ← {game.title}
            </Link>
            <h1 style={{ margin: '0.5rem 0', fontSize: '2rem' }}>{achievement.title}</h1>
            {achievement.description && (
              <p style={{ color: 'var(--text-muted)', margin: '1rem 0', lineHeight: '1.6', fontSize: '1.1rem' }}>
                {achievement.description}
              </p>
            )}
            <div style={{ display: 'flex', gap: '2rem', margin: '1.5rem 0', flexWrap: 'wrap' }}>
              {achievement.rarity !== undefined && (
                <div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Seltenheit</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'var(--accent-blue)' }}>
                    {(achievement.rarity * 100).toFixed(1)}%
                  </div>
                </div>
              )}
              {achievement.unlockedCount !== undefined && (
                <div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Freigeschaltet</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>
                    {achievement.unlockedCount || 0} Spieler
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <CommentSection initialComments={comments} gameId={game.id} achievementId={achievementId} isAchievementTutorial={true} />
    </div>
  );
}
