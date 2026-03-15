'use client';

import Navbar from '@/components/Navbar/Navbar';
import Link from 'next/link';
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import { Game } from '@/types';
import { gamesAPI } from '@/lib/api/games';

export default function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        const data = await gamesAPI.getAll();
        setGames(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to load games:', error);
        setError('Fehler beim Laden der Spiele');
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) {
    return (
      <div className={styles.container}>
        <Navbar />
        <p style={{ textAlign: 'center' }}>Wird geladen...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <Navbar />
        <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Navbar />
      <header className={styles.hero}>
        <h1 className={styles.heroTitle}>Steam Game Library</h1>
      </header>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}><div className={styles.statNumber}>{games.length}</div><div className={styles.statLabel}>Games</div></div>
        <div className={styles.statCard}><div className={styles.statNumber}>{games.length * 30}</div><div className={styles.statLabel}>Achievements</div></div>
        <div className={styles.statCard}><div className={styles.statNumber}>{Math.round(games.length * 3.5)}</div><div className={styles.statLabel}>Tutorials</div></div>
      </div>

      <h2 style={{ marginBottom: '1.5rem' }}>Deine Spiele ({games.length})</h2>
      <div className={styles.gamesGrid}>
        {games.map(game => (
          <Link href={`/game/${game.steamAppId}`} key={game.steamAppId} className={styles.gameCard}>
            <div className={styles.gameImage} style={{ backgroundImage: `url(${game.storeSnapshot || 'https://via.placeholder.com/300x150'})` }} />
            <div className={styles.gameInfo}>
              <div className={styles.gameTitle}>{game.title}</div>
              <div className={styles.gameMeta}>
                <span>⭐ {game.rating}</span>
                <span>${game.price}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}