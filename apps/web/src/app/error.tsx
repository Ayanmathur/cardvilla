'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App error boundary caught error:', error);
  }, [error]);

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      background: 'var(--color-bg, #0d0f1a)',
      color: 'var(--color-text, #f8fafc)',
      textAlign: 'center',
    }}>
      <div style={{
        background: 'rgba(20, 23, 42, 0.7)',
        padding: '3rem',
        borderRadius: '16px',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        maxWidth: '500px',
      }}>
        <h2 style={{ color: '#ef4444', marginTop: 0 }}>Something went wrong!</h2>
        <p style={{ color: '#8b8fa3', fontSize: '0.95rem' }}>
          An unexpected error occurred. Please try again or navigate back to safety.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem' }}>
          <button
            onClick={() => reset()}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'var(--color-accent, #c9a84c)',
              color: '#0d0f1a',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Try Again
          </button>
          <Link
            href="/dashboard"
            style={{
              padding: '0.75rem 1.5rem',
              background: 'rgba(255,255,255,0.08)',
              color: '#f8fafc',
              borderRadius: '8px',
              textDecoration: 'none',
            }}
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
