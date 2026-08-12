import React from 'react';
import Link from 'next/link';
import { db } from '@card-villa/schema';
import { registryMeta } from '@card-villa/templates/src/registry-meta';
import { GalleryGrid } from './GalleryGrid';
import styles from './gallery.module.css';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Template & Design Gallery — Card Villa',
  description: 'Explore our complete catalog of 76+ digital business cards and scrollable invitation websites.',
};

export default async function PublicGalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category = 'all' } = await searchParams;

  // 1. Fetch any database-created custom templates
  let dbTemplates: any[] = [];
  try {
    let categoryId: string | undefined;
    if (category && category !== 'all') {
      const cat = await db.categories.findUnique({ slug: category });
      if (cat) categoryId = cat.id;
    }
    dbTemplates = await db.templates.findMany({
      status: 'published',
      ...(categoryId ? { categoryId } : {}),
    });
  } catch (e) {
    // Graceful fallback
  }

  // 2. Fetch all 76 registered code templates
  const codeTemplates = Object.values(registryMeta).map((entry) => {
    const rawCat = entry.meta.category || 'business-card';
    let catSlug = 'business-card';
    let categoryDisplayName = 'Business Card';

    if (rawCat.toLowerCase().includes('wedding')) {
      catSlug = 'wedding';
      categoryDisplayName = 'Wedding';
    } else if (rawCat.toLowerCase().includes('baby') || rawCat.toLowerCase().includes('kids')) {
      catSlug = 'baby-kids';
      categoryDisplayName = 'Baby & Kids';
    } else if (rawCat.toLowerCase().includes('party')) {
      catSlug = 'party';
      categoryDisplayName = 'Party & Events';
    } else if (rawCat.toLowerCase().includes('devotional')) {
      catSlug = 'devotional';
      categoryDisplayName = 'Devotional & Puja';
    } else if (rawCat.toLowerCase().includes('festival')) {
      catSlug = 'festival';
      categoryDisplayName = 'Festival Wishes';
    } else {
      categoryDisplayName = entry.meta.category || 'Business Card';
    }

    return {
      id: entry.meta.componentKey,
      name: entry.meta.name,
      componentKey: entry.meta.componentKey,
      categorySlug: catSlug,
      categoryName: categoryDisplayName,
      motionTier: entry.meta.motionTier,
      styleTone: entry.meta.styleTone,
      description: entry.meta.description,
      isScrollable: !!entry.meta.sections && entry.meta.sections.length > 0,
      sectionsCount: entry.meta.sections ? entry.meta.sections.length : 1,
      isTrending: entry.meta.motionTier === 2,
    };
  });

  // 3. Merge database templates with code templates
  const seenKeys = new Set<string>();
  const allTemplates = [];

  for (const ct of codeTemplates) {
    if (!seenKeys.has(ct.componentKey)) {
      seenKeys.add(ct.componentKey);
      allTemplates.push(ct);
    }
  }

  for (const dt of dbTemplates) {
    const key = dt.componentKey || dt.id;
    if (!seenKeys.has(key)) {
      seenKeys.add(key);
      allTemplates.push({
        id: dt.id,
        name: dt.name,
        componentKey: dt.componentKey || null,
        categorySlug: dt.category?.slug || 'business-card',
        categoryName: dt.category?.name || 'Business Card',
        isTrending: Boolean(dt.isTrending),
        canvasJson: dt.canvasJson,
      });
    }
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <span className={styles.kicker}>Complete Design Catalog</span>
          <h1 className={styles.title}>Digital Cards & Invitation Gallery</h1>
          <p className={styles.subtitle}>
            Browse our full collection of 76 premium, motion-capable digital business cards and scrollable multi-section invitation websites.
          </p>
        </div>
      </header>

      <main className={styles.main}>
        <GalleryGrid templates={allTemplates} initialCategory={category} />
      </main>
    </div>
  );
}
