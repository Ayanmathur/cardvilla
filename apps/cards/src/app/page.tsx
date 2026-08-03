export default function CardsHome() {
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
        fontSize: '2.5rem',
        fontFamily: 'var(--font-primary)',
        fontWeight: 700,
        background: 'linear-gradient(135deg, var(--color-accent), #e0c56e)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>
        Card Villa
      </div>
      <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem' }}>
        Card serving engine — cards.cardvilla.com
      </p>
      <div style={{
        padding: '0.75rem 1.5rem',
        background: '#14172a',
        borderRadius: '0.5rem',
        border: '1px solid #2a2d45',
        fontSize: '0.875rem',
        color: '#4ade80',
      }}>
        ✓ Cards app running on port 3001
      </div>
    </main>
  );
}
