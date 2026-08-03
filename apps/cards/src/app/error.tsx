'use client';

import { useEffect } from 'react';

export default function CardsErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Cards app error:', error);
  }, [error]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      background: '#0d0f1a',
      color: '#f8fafc',
      textAlign: 'center',
    }}>
      <div style={{
        background: 'rgba(20, 23, 42, 0.8)',
        padding: '2.5rem',
        borderRadius: '16px',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        maxWidth: '400px',
      }}>
        <h2 style={{ color: '#ef4444', marginTop: 0 }}>Card Unavailable</h2>
        <p style={{ color: '#8b8fa3', fontSize: '0.9rem' }}>
          This card URL may be inactive or does not exist.
        </p>
        <button
          onClick={() => reset()}
          style={{
            marginTop: '1rem',
            padding: '0.65rem 1.25rem',
            background: '#c9a84c',
            color: '#0d0f1a',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Retry Loading
        </button>
      </div>
    </div>
  );
}
