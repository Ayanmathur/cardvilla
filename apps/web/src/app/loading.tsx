import React from 'react';

export default function GlobalLoadingPage() {
  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--color-bg, #0d0f1a)',
      color: 'var(--color-accent, #c9a84c)',
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '3px solid rgba(201, 168, 76, 0.2)',
        borderTop: '3px solid #c9a84c',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '1rem',
      }} />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <p style={{ fontWeight: 600, fontSize: '0.95rem' }}>Loading Card Villa...</p>
    </div>
  );
}
