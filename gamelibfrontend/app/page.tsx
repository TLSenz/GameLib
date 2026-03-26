'use client';

import Navbar from '@/components/Navbar/Navbar';
import Link from 'next/link';
import styles from './page.module.css';
import { useEffect, useState, useRef, useCallback } from 'react';
import { Game } from '@/types';
import { gamesAPI } from '@/lib/api/games';

const GAMES_PER_PAGE = 20;

export default function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [stats, setStats] = useState<{ numberOfGames: number; numberOfAchievements: number; numberOfComments: number } | null>(null);
  const observerTarget = useRef<HTMLDivElement>(null);

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
  }, [loading]);

  useEffect(() => {
    fetchGames(0);
    
    // Fetch stats nur einmal beim Laden
    const fetchStats = async () => {
      try {
        const statsData = await gamesAPI.getStats();
        setStats(statsData);
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      }
    };
    
    fetchStats();
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
        <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>
      </div>
    );
  }

  const numberOfGames = stats?.numberOfGames ?? 0;
  const numberOfAchievements = stats?.numberOfAchievements ?? 0;
  const numberOfComments = stats?.numberOfComments ?? 0;

  return (
    <div className={styles.container}>
      <Navbar />
      <header className={styles.hero}>
        <h1 className={styles.heroTitle}>Steam Game Library</h1>
      </header>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}><div className={styles.statNumber}>{numberOfGames}</div><div className={styles.statLabel}>Games</div></div>
        <div className={styles.statCard}><div className={styles.statNumber}>{numberOfAchievements}</div><div className={styles.statLabel}>Achievements</div></div>
        <div className={styles.statCard}><div className={styles.statNumber}>{numberOfComments}</div><div className={styles.statLabel}>Comments</div></div>
      </div>

      <h2 style={{ marginBottom: '1.5rem' }}>Spiele ({games.length})</h2>
      <div className={styles.gamesGrid}>
        {games.map(game => (
          <Link href={`/game/${game.steamAppId}`} key={game.id} className={styles.gameCard}>
            <div className={styles.gameImage} style={{ backgroundImage: `url(${game.storeSnapshot || 'https://via.placeholder.com/300x150'})` }} />
            <div className={styles.gameInfo}>
              <div className={styles.gameTitle}>{game.title}</div>
              <div className={styles.gameMeta}>
                <span>⭐ {game.rating}</span>
                <span>{game.price != null ? "$" + game.price : "$0 (Free)"}</span>
              </div>
            </div>
          </Link>
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