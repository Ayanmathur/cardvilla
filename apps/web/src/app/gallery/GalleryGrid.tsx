'use client';

import React from 'react';
import Link from 'next/link';
import { TemplatePreview } from '@/components/template-preview/TemplatePreview';
import styles from './gallery.module.css';

interface GalleryTemplate {
  id: string;
  name: string;
  componentKey: string | null;
  categoryName: string;
  canvasJson: any;
}

interface GalleryGridProps {
  templates: GalleryTemplate[];
}

export const GalleryGrid: React.FC<GalleryGridProps> = ({ templates }) => {
  return (
    <div className={styles.grid}>
      {templates.map((template) => (
        <Link key={template.id} href={`/gallery/${template.id}`} className={styles.cardLink}>
          <div className={styles.card}>
            <div className={styles.previewContainer}>
              {template.componentKey ? (
                <TemplatePreview
                  componentKey={template.componentKey}
                  scale={0.48}
                />
              ) : (
                <div style={{ color: 'var(--cv-grey-500)', fontSize: 'var(--cv-text-sm)' }}>
                  Legacy template
                </div>
              )}
            </div>
            <div className={styles.cardMeta}>
              <h3 className={styles.templateName}>{template.name}</h3>
              <span className={styles.badge}>{template.categoryName}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
