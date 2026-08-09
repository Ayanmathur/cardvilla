import React from 'react';
import Link from 'next/link';
import { db } from '@card-villa/schema';
import { CanvasRenderer } from '@/components/builder/CanvasRenderer';
import styles from './gallery.module.css';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Design Gallery — Card Villa',
  description: 'Explore our curated digital business card template gallery.',
};

export default async function PublicGalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category = 'business-card' } = await searchParams;

  // Find category by slug
  let categoryId: string | undefined;
  if (category) {
    const cat = await db.categories.findUnique({ slug: category });
    if (cat) categoryId = cat.id;
  }

  // Fetch only published templates
  const templates = await db.templates.findMany({
    status: 'published',
    categoryId,
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <span className={styles.kicker}>Design Collection</span>
          <h1 className={styles.title}>Digital Business Card Gallery</h1>
          <p className={styles.subtitle}>
            Explore our crafted, motion-capable digital card designs. Select any design to connect with us.
          </p>
        </div>
      </header>

      <main className={styles.main}>
        {templates.length === 0 ? (
          <div className={styles.emptyState}>
            <h3>No designs available yet</h3>
            <p>Check back soon for newly published business card templates.</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {templates.map((template) => (
              <Link key={template.id} href={`/gallery/${template.id}`} className={styles.cardLink}>
                <div className={styles.card}>
                  <div className={styles.previewContainer}>
                    {template.componentKey ? (
                      <iframe
                        src={`${process.env.NEXT_PUBLIC_CARDS_URL || 'http://localhost:3001'}/preview/${template.componentKey}`}
                        className={styles.previewIframe}
                        title={`Preview of ${template.name}`}
                        loading="lazy"
                        scrolling="no"
                      />
                    ) : (
                      <CanvasRenderer canvasJson={template.canvasJson} scale={0.48} />
                    )}
                  </div>
                  <div className={styles.cardMeta}>
                    <h3 className={styles.templateName}>{template.name}</h3>
                    <span className={styles.badge}>
                      {template.category?.name || 'Business Card'}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

