import Link from 'next/link';
import { db } from '@card-villa/schema';
import { CanvasRenderer } from '@/components/builder/CanvasRenderer';
import styles from './home.module.css';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const publishedTemplates = await db.templates.findMany({ status: 'published' });
  const sampleTemplates = publishedTemplates.slice(0, 3);

  return (
    <div className={styles.container}>
      {/* Top Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.navLogo}>Card Villa</div>
        <div className={styles.navLinks}>
          <Link href="/gallery" className={styles.navLink}>
            Design Gallery
          </Link>
          <Link href="/login" className={styles.loginBtn}>
            Client Login
          </Link>
          <Link href="/register" className={styles.registerBtn}>
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className={styles.hero}>
        <span className={styles.badge}>Next-Gen Digital Networking</span>
        <h1 className={styles.heroTitle}>
          Living Digital Business Cards That Update in Real-Time
        </h1>
        <p className={styles.heroSubtitle}>
          Replace outdated paper cards with dynamic, motion-capable digital cards. One scan lets your clients tap to call, chat on WhatsApp, navigate via Google Maps, and save your contact instantly.
        </p>

        <div className={styles.heroCtas}>
          <Link href="/gallery" className={styles.primaryCta}>
            🎨 Explore Design Gallery
          </Link>
          <Link href="/login" className={styles.secondaryCta}>
            🔐 Client / Admin Login
          </Link>
        </div>
      </header>

      {/* Feature Showcase Grid */}
      <section className={styles.featuresSection}>
        <h2 className={styles.sectionTitle}>Why Professionals Choose Card Villa</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>⚡</div>
            <h3>Real-Time Updates</h3>
            <p>Change your phone number, logo, or catalog link anytime. Your printed QR code stays the same while your card updates instantly.</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📇</div>
            <h3>1-Tap vCard Download</h3>
            <p>Clients save your full name, phone number, company, email, and address directly into their phone contacts with a single click.</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>✨</div>
            <h3>Motion & Foil Aesthetics</h3>
            <p>Stand out with signature animations — Salon scissors snip, Clinic heartbeat, Dental glint, Photographer shutter flash, and Gold foil shine.</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📍</div>
            <h3>Tap-to-Call & Maps Navigation</h3>
            <p>Embedded 1-tap phone calls, direct WhatsApp chat links, and instant Google Maps directions to your business location.</p>
          </div>
        </div>
      </section>

      {/* Live Featured Templates */}
      {sampleTemplates.length > 0 && (
        <section className={styles.templatesSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Featured Card Designs</h2>
            <Link href="/gallery" className={styles.viewAllLink}>
              View All Templates →
            </Link>
          </div>

          <div className={styles.templatesGrid}>
            {sampleTemplates.map((tmpl) => (
              <div key={tmpl.id} className={styles.templateBox}>
                <div className={styles.canvasWrapper}>
                  <CanvasRenderer canvasJson={tmpl.canvasJson} scale={0.46} />
                </div>
                <div className={styles.templateMeta}>
                  <h4>{tmpl.name}</h4>
                  <Link href={`/gallery/${tmpl.id}`} className={styles.detailsBtn}>
                    Preview Design →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Bottom CTA Banner */}
      <section className={styles.banner}>
        <h2>Ready to Elevate Your Business Identity?</h2>
        <p>Join top salons, clinics, photographers, jewelers, and professionals using Card Villa.</p>
        <Link href="/gallery" className={styles.bannerBtn}>
          Browse Designs & Get Started
        </Link>
      </section>
    </div>
  );
}
