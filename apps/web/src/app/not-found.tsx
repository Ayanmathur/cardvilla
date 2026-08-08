import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', padding: '2rem', textAlign: 'center' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--color-primary, #00d2ff)' }}>
        404 - Not Found
      </h2>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
        The page you are looking for does not exist.
      </p>
      <Link href="/" style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--color-primary, #00d2ff)', color: 'white', borderRadius: '4px', textDecoration: 'none' }}>
        Return Home
      </Link>
    </div>
  );
}
