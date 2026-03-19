import Link from 'next/link';
import styles from './Navbar.module.css';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Image src="/logo.svg" alt="GameLib Logo" width={100} height={50} />
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