'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar/Navbar';
import { gamesAPI } from '@/lib/api/games';
import { achievementsAPI } from '@/lib/api/achievements';
import Image from 'next/image';
import styles from './achievements.module.css'

export default function GameAchievementsPage() {
  const params = useParams();
  const steamAppId = params?.steamAppId as string;

  const [search, setSearch] = useState('');
  const [achievements, setAchievements] = useState<any[]>([]);
  const [gameTitle, setGameTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetches the game with the steamAppId to get the mongodb Id to later fetch the achievements.
        const game = await gamesAPI.getByStreamAppId(parseInt(steamAppId));
        if (!game) {
          setError('Spiel nicht gefunden');
          setLoading(false);
          return;
        }

        setGameTitle(game.title);

        // fetch achievements with the mongodb gameId provided by the request above
        const achievementsData = await achievementsAPI.getByGameId(game.id);
        setAchievements(Array.isArray(achievementsData) ? achievementsData : []);
      } catch (err) {
        console.error('Failed to load achievements:', err);
        setError('Fehler beim Laden der Achievements');
      } finally {
        setLoading(false);
      }
    };

    if (steamAppId) {
      fetchData();
    }
  }, [steamAppId]);

  // search logic 
  const filteredAchievements = achievements.filter(ach =>
    ach.title?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div style={{ padding: '0 2rem', maxWidth: '800px', margin: '0 auto' }}>
        <Navbar />
        <h1>Wird geladen...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '0 2rem', maxWidth: '800px', margin: '0 auto' }}>
        <Navbar />
        <h1 style={{ color: 'red' }}>{error}</h1>
      </div>
    );
  }

  return (
    <div style={{ padding: '0 2rem', maxWidth: '800px', margin: '0 auto' }}>
      <Navbar />
      <h1 style={{ marginBottom: '1rem' }}>Achievements für {gameTitle || 'Spiel'} ({achievements.length})</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Achievement suchen..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: 'none', background: 'var(--bg-darkest)', color: 'white', marginBottom: '2rem' }}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredAchievements.map(ach => (
          <Link
            key={ach.id}
            href={`/game/${steamAppId}/achievements/${ach.id}`}
            className={styles.achievementItem}
          >
            <div className={styles.achievementIcon}> <img className={styles.achievementIcon} src={ach.storeSnapshot} alt='🏆' />
            </div>
            <div className={styles.achievementInfo}>
              <div className={styles.achievementTitle}>{ach.title}</div>
              {ach.description && <div className={styles.achievementDesc}>{ach.description}</div>}
              {ach.rarity && <div className={styles.achievementRarity}>Seltenheit: {(ach.rarity * 100).toFixed(1)}%</div>}
            </div>
          </Link>
        ))}
        {filteredAchievements.length === 0 && <p>Keine Achievements gefunden.</p>}
      </div>
    </div>
  );
}