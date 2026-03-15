import Link from 'next/link';
import styles from './GameRow.module.css';
import { Game } from '../../types'; // Importiere deine Types!

interface GameRowProps {
  game: Game;
  achievementsCount: number;
  percentage: number;
}

export default function GameRow({ game, achievementsCount, percentage }: GameRowProps) {
  // Farbe basierend auf Prozentzahl bestimmen
  let percentageColor = 'var(--accent-green)';
  if (percentage < 50) percentageColor = 'var(--accent-red)';
  else if (percentage < 90) percentageColor = 'var(--accent-orange)';

  return (
    <Link href={`/game/${game.steamAppId}`} className={styles.gameRow}>
      <div 
        className={styles.gameBanner} 
        style={{ backgroundImage: game.storeSnapshot ? `url(${game.storeSnapshot})` : 'none' }}
      >
        {!game.storeSnapshot && <span className={styles.bannerText}>No Image</span>}
      </div>
      
      <div className={styles.gameTitle}>{game.title}</div>
      <div className={styles.gameAchievements}>
        {achievementsCount} Achievements
      </div>
      <div className={styles.gamePercentage} style={{ color: percentageColor }}>
        {percentage}%
      </div>
    </Link>
  );
}