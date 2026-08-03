import React from 'react';

export default function CardsLoadingPage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0d0f1a',
      color: '#c9a84c',
    }}>
      <div style={{
        width: '36px',
        height: '36px',
        border: '3px solid rgba(201, 168, 76, 0.2)',
        borderTop: '3px solid #c9a84c',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
