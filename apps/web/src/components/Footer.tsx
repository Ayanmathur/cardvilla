import Link from 'next/link';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.branding}>
          <span className={styles.logo}>Card Villa</span>
          <p className={styles.copy}>
            © {new Date().getFullYear()} Card Villa. Premium Digital Cards Platform.
          </p>
        </div>

        <div className={styles.links}>
          {/* Secondary, low-emphasis entry point to gallery per Prompt 5 specs */}
          <Link href="/gallery" className={styles.footerLink}>
            View Templates Gallery
          </Link>
        </div>
      </div>
    </footer>
  );
}
