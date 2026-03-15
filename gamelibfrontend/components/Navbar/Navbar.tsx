import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <img src={'../../public/logo.svg'}/>
      <div className={styles.navLinks}>
        <Link href="/" className={`${styles.link} ${styles.activeLink}`}>
          Home
        </Link>
        <Link href="/games" className={styles.link}>
          Games
        </Link>
        <Link href="/achievements" className={styles.link}>
          Achievements
        </Link>
      </div>
    </nav>
  );
}