import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@card-villa/schema';
import { TemplateDetailPreview } from './TemplateDetailPreview';
import styles from './detail.module.css';

export default async function TemplateDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const template = await db.templates.findUnique({ id });

  if (!template || template.status !== 'published') {
    notFound();
  }

  const businessPhone = '919999999999';
  const whatsappMessage = encodeURIComponent(
    `Hello Card Villa, I would like to get a digital card created using the "${template.name}" design!`
  );
  const whatsappUrl = `https://wa.me/${businessPhone}?text=${whatsappMessage}`;
  const mailtoUrl = `mailto:contact@cardvilla.com?subject=${encodeURIComponent(
    `Inquiry: ${template.name} Business Card Design`
  )}`;

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <Link href="/gallery" className={styles.backLink}>
          ← Back to Design Gallery
        </Link>

        <div className={styles.grid}>
          {/* Large Preview */}
          <div className={styles.previewCard}>
            <TemplateDetailPreview componentKey={template.componentKey || null} />
          </div>

          {/* Details & CTA */}
          <div className={styles.infoBox}>
            <span className={styles.badge}>
              {template.category?.name || 'Business Card'}
            </span>
            <h1 className={styles.title}>{template.name}</h1>
            <p className={styles.description}>
              This is an editable, living digital business card template. When you acquire this design, your card will update instantly in real-time, generate a custom QR code, and include tap-to-call, WhatsApp, Google Maps, and contact download features.
            </p>

            <div className={styles.ctaBox}>
              <h3 className={styles.ctaHeading}>Want this design for your business?</h3>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsappBtn}
              >
                💬 Contact Us on WhatsApp
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
