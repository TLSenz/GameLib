'use client';

import Navbar from '@/components/Navbar/Navbar';
import GameRow from '@/components/GameRow/GameRow';
import styles from './games.module.css';
import { useEffect, useState, useRef, useCallback } from 'react';
import { Game } from '@/types';
import { gamesAPI } from '@/lib/api/games';
import { achievementsAPI } from '@/lib/api/achievements';

const GAMES_PER_PAGE = 20;

export default function GamesPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [achievementCounts, setAchievementCounts] = useState<{ [key: string]: number }>({});
  const observerTarget = useRef<HTMLDivElement>(null);

  const fetchAchievementCounts = useCallback(async (gamesToFetch: Game[]) => {
    const counts: { [key: string]: number } = {};
    for (const game of gamesToFetch) {
      if (game.id) {
        try {
          const achievements = await achievementsAPI.getByGameId(game.id);
          counts[String(game.steamAppId)] = Array.isArray(achievements) ? achievements.length : 0;
        } catch {
          counts[String(game.steamAppId)] = 0;
        }
      }
    }
    setAchievementCounts(prev => ({ ...prev, ...counts }));
  }, []);

  const fetchGames = useCallback(async (pageNum: number) => {
    if (loading) return;
    try {
      setLoading(true);
      const data = await gamesAPI.getAll(pageNum, GAMES_PER_PAGE);
      
      if (pageNum === 0) {
        setGames(data.content);
      } else {
        setGames(prev => [...prev, ...data.content]);
      }
      
      await fetchAchievementCounts(data.content);
      setHasMore(!data.last);
      setPage(pageNum + 1);
    } catch (err) {
      console.error('Failed to load games:', err);
      if (pageNum === 0) {
        setError('Fehler beim Laden der Spiele');
      }
    } finally {
      setLoading(false);
    }
  }, [loading, fetchAchievementCounts]);

  useEffect(() => {
    fetchGames(0);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchGames(page);
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [page, hasMore, loading, fetchGames]);

  if (error && games.length === 0) {
    return (
      <div className={styles.container}>
        <Navbar />
        <h1 className={styles.title}>Meine Spiele</h1>
        <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Navbar />
      <h1 className={styles.title}>Meine Spiele ({games.length})</h1>
      
      <div className={styles.gamesList}>
        {games.map(game => (
          <GameRow
            key={game.steamAppId}
            game={game}
            achievementsCount={achievementCounts[String(game.steamAppId)] || 0}
            percentage={0}
          />
        ))}
      </div>

      {hasMore && (
        <div ref={observerTarget} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
          {loading ? 'Lade weitere Spiele...' : 'Scrolle für mehr'}
        </div>
      )}
    </div>
  );
}
