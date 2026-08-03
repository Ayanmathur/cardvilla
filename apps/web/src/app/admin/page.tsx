import { redirect } from 'next/navigation';
import Link from 'next/link';
import { requireAdmin } from '@/lib/auth';
import { db } from '@card-villa/schema';

export default async function AdminPage() {
  let session;
  try {
    session = await requireAdmin();
  } catch (error) {
    redirect('/dashboard');
  }

  const [templates, clients, cards] = await Promise.all([
    db.templates.findMany(),
    db.users.findMany(),
    db.cardInstances.findMany(),
  ]);

  const publishedCount = templates.filter((t) => t.status === 'published').length;
  const activeCardsCount = cards.filter((c) => c.status === 'active').length;
  const clientUsersCount = clients.filter((u) => u.role === 'client').length;

  return (
    <div style={{
      minHeight: '100vh',
      padding: '3rem',
      background: 'var(--color-bg)',
      color: 'var(--color-text)',
    }}>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2.5rem',
        borderBottom: '1px solid var(--color-border)',
        paddingBottom: '1.5rem',
      }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-primary)', color: 'var(--color-accent)', margin: 0, fontSize: '2.2rem' }}>
            Admin Control Center
          </h1>
          <p style={{ color: 'var(--color-text-muted)', margin: '0.25rem 0 0 0' }}>
            Logged in as: <strong>{session.phone}</strong> (Administrator)
          </p>
        </div>

        <Link
          href="/dashboard"
          style={{
            padding: '0.65rem 1.25rem',
            background: 'rgba(255,255,255,0.08)',
            color: 'var(--color-text)',
            borderRadius: 'var(--radius-md)',
            textDecoration: 'none',
            fontSize: '0.9rem',
          }}
        >
          ← Client Portal View
        </Link>
      </header>

      {/* Stats Overview Bar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2.5rem',
      }}>
        <div style={{
          background: 'var(--color-bg-card)',
          padding: '1.5rem',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-border)',
        }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Total Templates</span>
          <h2 style={{ fontSize: '2rem', color: 'var(--color-accent)', margin: '0.5rem 0 0 0' }}>{templates.length}</h2>
          <span style={{ fontSize: '0.75rem', color: '#4ade80' }}>{publishedCount} Published</span>
        </div>

        <div style={{
          background: 'var(--color-bg-card)',
          padding: '1.5rem',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-border)',
        }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Registered Clients</span>
          <h2 style={{ fontSize: '2rem', color: '#38bdf8', margin: '0.5rem 0 0 0' }}>{clientUsersCount}</h2>
        </div>

        <div style={{
          background: 'var(--color-bg-card)',
          padding: '1.5rem',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-border)',
        }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Active Card Instances</span>
          <h2 style={{ fontSize: '2rem', color: '#4ade80', margin: '0.5rem 0 0 0' }}>{activeCardsCount}</h2>
        </div>
      </div>

      {/* Navigation Modules */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
      }}>
        {/* Module 1: Templates */}
        <div style={{
          background: 'var(--color-bg-card)',
          padding: '2rem',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-accent)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <div>
            <h3 style={{ color: 'var(--color-accent)', marginTop: 0 }}>🎨 Template Builder & Library</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Design canvas card templates, set up field schemas, configure motion animations, and toggle draft/published status.
            </p>
          </div>
          <Link
            href="/admin/templates"
            style={{
              marginTop: '1.5rem',
              padding: '0.75rem 1.5rem',
              background: 'linear-gradient(135deg, var(--color-accent) 0%, #b3923d 100%)',
              color: '#0d0f1a',
              borderRadius: 'var(--radius-md)',
              fontWeight: '700',
              textDecoration: 'none',
              textAlign: 'center',
            }}
          >
            Manage Templates →
          </Link>
        </div>

        {/* Module 2: Client Accounts */}
        <div style={{
          background: 'var(--color-bg-card)',
          padding: '2rem',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-border)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <div>
            <h3 style={{ color: '#38bdf8', marginTop: 0 }}>👤 Client Management</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Register client accounts (phone + password), issue digital business cards, and assign templates.
            </p>
          </div>
          <Link
            href="/admin/clients"
            style={{
              marginTop: '1.5rem',
              padding: '0.75rem 1.5rem',
              background: 'rgba(56, 189, 248, 0.15)',
              color: '#38bdf8',
              border: '1px solid #0284c7',
              borderRadius: 'var(--radius-md)',
              fontWeight: '700',
              textDecoration: 'none',
              textAlign: 'center',
            }}
          >
            Manage Clients →
          </Link>
        </div>

        {/* Module 3: All Card Instances */}
        <div style={{
          background: 'var(--color-bg-card)',
          padding: '2rem',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-border)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <div>
            <h3 style={{ color: '#4ade80', marginTop: 0 }}>🎴 All Issued Cards Oversight</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              View all client business card instances across the platform and override-edit any client's card content directly.
            </p>
          </div>
          <Link
            href="/admin/cards"
            style={{
              marginTop: '1.5rem',
              padding: '0.75rem 1.5rem',
              background: 'rgba(34, 197, 94, 0.15)',
              color: '#4ade80',
              border: '1px solid #22c55e',
              borderRadius: 'var(--radius-md)',
              fontWeight: '700',
              textDecoration: 'none',
              textAlign: 'center',
            }}
          >
            All Cards Oversight →
          </Link>
        </div>
      </div>
    </div>
  );
}
