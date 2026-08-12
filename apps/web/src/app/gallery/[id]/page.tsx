import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@card-villa/schema';
import { registryMeta } from '@card-villa/templates/src/registry-meta';
import { TemplateDetailPreview } from './TemplateDetailPreview';
import styles from './detail.module.css';

export default async function TemplateDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // 1. Check DB first
  let templateName = '';
  let componentKey: string | null = null;
  let categoryName = 'Digital Card';
  let description = '';
  let isScrollable = false;

  try {
    const dbTemplate = await db.templates.findUnique({ id });
    if (dbTemplate && dbTemplate.status === 'published') {
      templateName = dbTemplate.name;
      componentKey = dbTemplate.componentKey || null;
      categoryName = dbTemplate.category?.name || 'Digital Card';
    }
  } catch (e) {
    // Fallback to registry
  }

  // 2. Check code registry if not found in DB
  if (!templateName) {
    const regEntry = registryMeta[id] || registryMeta[id.replace(/-/g, '_')] || registryMeta[id.replace(/_/g, '-')];
    if (regEntry) {
      templateName = regEntry.meta.name;
      componentKey = regEntry.meta.componentKey;
      categoryName = regEntry.meta.category;
      description = regEntry.meta.description;
      isScrollable = !!regEntry.meta.sections && regEntry.meta.sections.length > 0;
    }
  }

  if (!templateName) {
    notFound();
  }

  const businessPhone = '919999999999';
  const whatsappMessage = encodeURIComponent(
    `Hello Card Villa, I would like to get a digital ${isScrollable ? 'invitation website' : 'card'} created using the "${templateName}" design!`
  );
  const whatsappUrl = `https://wa.me/${businessPhone}?text=${whatsappMessage}`;
  const mailtoUrl = `mailto:contact@cardvilla.com?subject=${encodeURIComponent(
    `Inquiry: ${templateName} Design`
  )}`;

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <Link href="/gallery" className={styles.backLink}>
          ← Back to Template Gallery
        </Link>

        <div className={styles.grid}>
          {/* Large Interactive / Live Preview */}
          <div className={styles.previewCard}>
            <TemplateDetailPreview componentKey={componentKey} />
          </div>

          {/* Details & CTA */}
          <div className={styles.infoBox}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span className={styles.badge}>
                {categoryName}
              </span>
              {isScrollable ? (
                <span style={{
                  fontSize: '0.75rem',
                  backgroundColor: 'rgba(56, 189, 248, 0.15)',
                  color: '#38bdf8',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '999px',
                  fontWeight: 600
                }}>
                  🌐 Scrollable Website
                </span>
              ) : (
                <span style={{
                  fontSize: '0.75rem',
                  backgroundColor: 'rgba(163, 230, 53, 0.15)',
                  color: '#a3e635',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '999px',
                  fontWeight: 600
                }}>
                  💳 Single-View Card
                </span>
              )}
            </div>

            <h1 className={styles.title}>{templateName}</h1>
            <p className={styles.description}>
              {description || (isScrollable
                ? 'This is a premium, scrollable multi-section invitation website featuring envelope reveal, live countdown timer, event schedule, maps directions, and interactive RSVP.'
                : 'This is a living digital business card template that updates in real-time, features 1-tap vCard saving, tap-to-call, WhatsApp chat, and Google Maps navigation.'
              )}
            </p>

            <div className={styles.ctaBox}>
              <h3 className={styles.ctaHeading}>Want this design for your event or business?</h3>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsappBtn}
              >
                💬 Order / Inquire on WhatsApp
              </a>

              <a href={mailtoUrl} className={styles.emailBtn}>
                ✉️ Email Us to Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
