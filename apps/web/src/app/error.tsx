'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', padding: '2rem', textAlign: 'center' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-danger, #ef4444)', marginBottom: '1rem' }}>
        Something went wrong!
      </h2>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
        {error.message || 'An unexpected error occurred.'}
      </p>
      <button
        onClick={() => reset()}
        style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--color-primary, #00d2ff)', color: 'white', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
      >
        Try again
      </button>
    </div>
  );
}
