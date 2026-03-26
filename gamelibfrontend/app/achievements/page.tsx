'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Link from 'next/link';
import styles from './achievements.module.css';
import { Game } from '@/types';
import { gamesAPI } from '@/lib/api/games';
import { achievementsAPI } from '@/lib/api/achievements';
import Image from 'next/image';

interface GameWithAchievements extends Game {
  achievements: any[];
}

const GAMES_PER_PAGE = 20;

export default function GlobalAchievementsPage() {
  const [search, setSearch] = useState('');
  const [games, setGames] = useState<GameWithAchievements[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef<HTMLDivElement>(null);

  const fetchGamesAndAchievements = useCallback(async (pageNum: number) => {
    if (loading) return;
    try {
      setLoading(true);
      const gamesData = await gamesAPI.getAll(pageNum, 1000);

      // load achievements for each game and also catch all errors. if an error occurs, it just returns an empty array
      const gamesWithAchievements: GameWithAchievements[] = await Promise.all(
        gamesData.content.map(async (game) => {
          try {
            const achievements = game.steamAppId
              ? await achievementsAPI.getByGameId(game.id)
              : [];
            return {
              ...game,
              achievements: Array.isArray(achievements) ? achievements : []
            } as GameWithAchievements;
          } catch {
            return {
              ...game,
              achievements: []
            } as GameWithAchievements;
          }
        })
      );

      if (pageNum === 0) {
        setGames(gamesWithAchievements);
      } else {
        setGames(prev => [...prev, ...gamesWithAchievements]);
      }

      setHasMore(!gamesData.last);
      setPage(pageNum + 1);
    } catch (err) {
      console.error('Failed to load games and achievements:', err);
      if (pageNum === 0) {
        setError('Fehler beim Laden der Achievements');
      }
    } finally {
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    fetchGamesAndAchievements(0);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchGamesAndAchievements(page);
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [page, hasMore, loading, fetchGamesAndAchievements]);

  // Filter logic for the search. checks, if the search input matches either the game title or any achievement title. only shows games and achievements, that match the search
  const filteredGames = games.reduce<GameWithAchievements[]>((result, game) => {
    const normalizedSearch = search.toLowerCase().trim();
    const gameMatch = game.title?.toLowerCase().includes(normalizedSearch);

    const matchingAchievements = normalizedSearch
      ? (game.achievements ?? []).filter(ach => ach.title?.toLowerCase().includes(normalizedSearch))
      : game.achievements ?? [];

    if (!normalizedSearch) {
      result.push({ ...game, achievements: game.achievements ?? [] });
    } else if (gameMatch || matchingAchievements.length > 0) {
      result.push({ ...game, achievements: matchingAchievements });
    }

    return result;
  }, []);

  return (
    <div className={styles.container}>
      <Navbar />
      <h1 className={styles.title}>Alle Achievements</h1>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      <input
        type="text"
        placeholder="Nach Spiel oder Achievement suchen..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.searchInput}
      />

      <div className={styles.gamesList}>
        {filteredGames.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>{ !loading ? 'Keine Spiele oder Achievements gefunden' : ''}</p>
        ) : (
          filteredGames.map(game => (
            <div key={game.id} className={styles.gameCard}>
              <h2 className={styles.gameTitle}>
                <Link href={`/game/${game.steamAppId}`}>
                  {game.title}
                </Link>
              </h2>
              <div className={styles.achievementsList}>
                {game.achievements && game.achievements.length > 0 ? (
                  game.achievements.map(ach => (
                    <Link
                      key={ach.id}
                      href={`/game/${game.steamAppId}/achievements/${ach.id}`}
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
                  ))
                ) : (
                  <p style={{ color: 'var(--text-muted)', paddingLeft: '2rem' }}>Keine Achievements verfügbar</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {hasMore && search === '' && (
        <div ref={observerTarget} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
          {loading ? 'Lade Spiele und Achievements... Dies kann mehrere Sekunden dauern' : 'Scrolle für mehr'}
        </div>
      )}
    </div>
  );
}