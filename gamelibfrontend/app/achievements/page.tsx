"use client";
import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Link from 'next/link';

// Mock Daten-Generator für das Scrollen
const generateMockGames = (offset: number) => Array.from({ length: 5 }).map((_, i) => ({
  steamAppId: offset + i,
  title: `Spiel ${offset + i}`,
  achievements: [
    { id: `a${offset+i}1`, title: 'Erster Schritt' },
    { id: `a${offset+i}2`, title: 'Meister' }
  ]
}));

export default function GlobalAchievementsPage() {
  const [search, setSearch] = useState('');
  const [games, setGames] = useState(generateMockGames(1));
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);

  // Intersection Observer für Infinite Scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && !loading) {
        loadMoreGames();
      }
    });

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [games, loading]);

  const loadMoreGames = () => {
    setLoading(true);
    // Simuliere API Request an Spring Boot
    setTimeout(() => {
      const newGames = generateMockGames(games.length + 1);
      setGames(prev => [...prev, ...newGames]);
      setLoading(false);
    }, 1000); // 1 Sekunde künstliche Ladezeit
  };

  // Filter-Logik (Sucht in Spielen ODER Achievements)
  const filteredGames = games.filter(game => {
    const gameMatch = game.title.toLowerCase().includes(search.toLowerCase());
    const achMatch = game.achievements.some(ach => ach.title.toLowerCase().includes(search.toLowerCase()));
    return gameMatch || achMatch;
  });

  return (
    <div style={{ padding: '0 2rem', maxWidth: '800px', margin: '0 auto', paddingBottom: '4rem' }}>
      <Navbar />
      <h1>Alle Achievements</h1>
      
      <input 
        type="text" 
        placeholder="Nach Spiel oder Achievement suchen..." 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: 'none', background: 'var(--bg-darkest)', color: 'white', margin: '2rem 0' }}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {filteredGames.map(game => (
          <div key={game.steamAppId} style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '8px' }}>
            <h2 style={{ marginBottom: '1rem', borderBottom: '1px solid #666', paddingBottom: '0.5rem' }}>
              {game.title}
            </h2>
            
            {/* Eingerückte Achievements */}
            <div style={{ paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {game.achievements.map(ach => (
                <Link key={ach.id} href={`/game/${game.steamAppId}/achievements/${ach.id}`}
                      style={{ background: 'var(--bg-darkest)', padding: '1rem', borderRadius: '4px' }}>
                  {ach.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Das Element, das das Nachladen triggert (Infinite Scroll Loader) */}
      {search === '' && (
        <div ref={loaderRef} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
          {loading ? 'Lade weitere Spiele...' : 'Scrolle für mehr'}
        </div>
      )}
    </div>
  );
}