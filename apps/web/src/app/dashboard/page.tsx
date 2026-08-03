import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getSession } from '@/lib/auth';
import { db } from '@card-villa/schema';
import LogoutButton from './LogoutButton';
import { ClientCardsList } from './ClientCardsList';
import styles from './dashboard.module.css';

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  // Fetch cards owned by the logged-in client
  const cards = await db.cardInstances.findMany({ ownerUserId: session.userId });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <span className={styles.badge}>{session.role} Portal</span>
          <h1 className={styles.title}>Client Dashboard</h1>
          <p className={styles.userPhone}>
            Logged in as: <strong>{session.phone}</strong>
          </p>
        </div>

        <div className={styles.headerActions}>
          {session.role === 'admin' && (
            <Link href="/admin" className={styles.adminBtn}>
              ⚙️ Admin Control Center
            </Link>
          )}
          <Link href="/dashboard/change-password" className={styles.passwordBtn}>
            🔑 Change Password
          </Link>
          <LogoutButton />
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.sectionHeader}>
          <h2>My Digital Business Cards</h2>
          <p>
            Your living digital cards update in real-time. Scan your QR code or share your link anywhere.
          </p>
        </section>

        <ClientCardsList initialCards={cards} />
      </main>
    </div>
  );
}
