export default function HomePage() {
  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      gap: '1.5rem',
      textAlign: 'center',
      padding: '2rem',
    }}>
      <div style={{
        fontSize: '3rem',
        fontFamily: 'var(--font-primary)',
        fontWeight: 800,
        background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-light))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>
        Card Villa
      </div>
      <p style={{ color: 'var(--color-text-muted)', fontSize: '1.125rem', maxWidth: '480px' }}>
        Premium digital business cards — coming soon.
      </p>
      <div style={{
        padding: '0.75rem 1.5rem',
        background: 'var(--color-bg-elevated)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-border)',
        fontSize: '0.875rem',
        color: 'var(--color-success)',
      }}>
        ✓ Main site running on port 3000
      </div>
    </main>
  );
}
