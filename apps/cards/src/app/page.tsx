import React from 'react';

export default function CardsHome() {
  const mainAppUrl = process.env.NEXT_PUBLIC_WEB_URL || 'http://localhost:3000';

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
      background: 'radial-gradient(circle at center, #171b30 0%, #090a12 100%)',
      color: '#f8fafc',
    }}>
      <div style={{
        fontSize: '2.8rem',
        fontFamily: 'Outfit, sans-serif',
        fontWeight: 800,
        background: 'linear-gradient(135deg, #c9a84c 0%, #e5c158 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>
        Card Villa
      </div>

      <p style={{ color: '#8b8fa3', fontSize: '1.05rem', maxWidth: '460px', lineHeight: 1.6 }}>
        Card Serving Engine — scanning a QR code loads your card here directly.
      </p>

      <a
        href={mainAppUrl}
        style={{
          padding: '0.85rem 1.75rem',
          background: 'linear-gradient(135deg, #c9a84c 0%, #b3923d 100%)',
          color: '#0d0f1a',
          borderRadius: '8px',
          fontWeight: 700,
          textDecoration: 'none',
          fontSize: '0.95rem',
        }}
      >
        Go to Card Villa Main Site →
      </a>
    </main>
  );
}
