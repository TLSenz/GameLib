'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';
import Image from 'next/image';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className={styles.navbar}>
      <Image src="/logo.svg" alt="GameLib Logo" width={100} height={50} />
      <div className={styles.navLinks}>
        <Link href="/" className={`${styles.link} ${isActive('/') ? styles.activeLink : ''}`}>
          Home
        </Link>
        <Link href="/games" className={`${styles.link} ${isActive('/games') || isActive('/game/') ? styles.activeLink : ''}`}>
          Games
        </Link>
        <Link href="/achievements" className={`${styles.link} ${isActive('/achievements') ? styles.activeLink : ''}`}>
          Achievements
        </Link>
      </div>
    </nav>
  );
}