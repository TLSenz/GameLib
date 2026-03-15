"use client";
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';

const mockAch = [
  { id: 'a1', title: 'First Blood', desc: 'Get your first kill' },
  { id: 'a2', title: 'Ace!', desc: 'Kill the entire enemy team' },
];

export default function GameAchievementsPage({ params }: { params: { steamAppId: string } }) {
  const [search, setSearch] = useState('');

  // Suchfilter-Logik
  const filteredAchievements = mockAch.filter(ach => 
    ach.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '0 2rem', maxWidth: '800px', margin: '0 auto' }}>
      <Navbar />
      <h1 style={{ marginBottom: '1rem' }}>Achievements für Spiel {params.steamAppId}</h1>
      
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
          <Link key={ach.id} href={`/game/${params.steamAppId}/achievements/${ach.id}`} 
                style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <h3>{ach.title}</h3>
              <p style={{ color: 'var(--text-muted)' }}>{ach.desc}</p>
            </div>
            <span style={{ color: 'var(--accent-blue)' }}>Tutorials ansehen</span>
          </Link>
        ))}
        {filteredAchievements.length === 0 && <p>Keine Achievements gefunden.</p>}
      </div>
    </div>
  );
}