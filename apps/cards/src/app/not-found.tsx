import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', padding: '2rem', textAlign: 'center', backgroundColor: 'var(--color-background)', color: 'var(--color-text)' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--color-primary, #00d2ff)' }}>
        404 - Card Not Found
      </h2>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
        The digital business card you are looking for does not exist or is inactive.
      </p>
    </div>
  );
}
