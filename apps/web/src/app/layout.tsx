import type { Metadata } from 'next';
import './globals.css';
import { Footer } from '@/components/Footer';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export const metadata: Metadata = {
  title: 'Card Villa — Premium Digital Business Cards',
  description: 'Create stunning, living digital business cards that update in real-time. Scan once, stay connected forever.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <ErrorBoundary>
          <div style={{ flex: 1 }}>{children}</div>
          <Footer />
        </ErrorBoundary>
      </body>
    </html>
  );
}
