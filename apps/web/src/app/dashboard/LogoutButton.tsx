'use client';

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: '0.75rem 1.5rem',
        background: 'transparent',
        color: 'var(--color-error)',
        border: '1px solid var(--color-error)',
        borderRadius: 'var(--radius-md)',
        fontWeight: '600',
        cursor: 'pointer',
        fontFamily: 'var(--font-body)',
        fontSize: '0.9rem',
        transition: 'all 0.2s ease',
      }}
    >
      Sign Out
    </button>
  );
}
