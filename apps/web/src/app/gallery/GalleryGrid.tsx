'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { TemplatePreview } from '@/components/template-preview/TemplatePreview';
import styles from './gallery.module.css';

interface GalleryTemplate {
  id: string;
  name: string;
  componentKey: string | null;
  categoryName: string;
  collectionName?: string | null;
  isTrending?: boolean;
  canvasJson?: any;
}

interface GalleryGridProps {
  templates: GalleryTemplate[];
}

export const GalleryGrid: React.FC<GalleryGridProps> = ({ templates }) => {
  const [viewedIds, setViewedIds] = useState<string[]>([]);
  const [selectedSwatches, setSelectedSwatches] = useState<Record<string, number>>({});

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('cv_viewed_templates');
      if (stored) {
        setViewedIds(JSON.parse(stored));
      }
    } catch (e) {
      // Ignore sessionStorage error
    }
  }, []);

  const handleCardClick = (id: string) => {
    try {
      const next = Array.from(new Set([...viewedIds, id]));
      setViewedIds(next);
      sessionStorage.setItem('cv_viewed_templates', JSON.stringify(next));
    } catch (e) {
      // Ignore
    }
  };

  // Sample swatches mapping for templates
  const sampleSwatches: Record<string, Array<{ primary: string; secondary?: string }>> = {
    default: [
      { primary: '#0B1F3A', secondary: '#C9A84C' },
      { primary: '#E63474', secondary: '#FCE1EC' },
      { primary: '#3FD8D0', secondary: '#0B1F3A' },
    ],
  };

  return (
    <div className={styles.grid}>
      {templates.map((template) => {
        const isViewed = viewedIds.includes(template.id);
        const swatches = sampleSwatches[template.componentKey || 'default'] || sampleSwatches.default;
        const activeSwatchIdx = selectedSwatches[template.id] || 0;

        return (
          <div key={template.id} className={styles.cardWrapper}>
            <Link
              href={`/gallery/${template.id}`}
              className={styles.cardLink}
              onClick={() => handleCardClick(template.id)}
            >
              <div className={styles.card}>
                {/* Trending Badge */}
                {template.isTrending && (
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    zIndex: 10,
                    backgroundColor: 'var(--cv-magenta-pink)',
                    color: 'white',
                    fontSize: 'var(--cv-text-xs)',
                    fontWeight: 'var(--cv-font-bold)',
                    padding: '4px 10px',
                    borderRadius: 'var(--cv-radius-full)',
                    boxShadow: 'var(--cv-shadow-sm)',
                  }}>
                    🔥 Trending
                  </div>
                )}

                {/* Viewed Badge */}
                {isViewed && (
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    zIndex: 10,
                    backgroundColor: 'rgba(11, 31, 58, 0.85)',
                    color: 'var(--cv-aqua)',
                    border: '1px solid var(--cv-aqua)',
                    fontSize: 'var(--cv-text-xs)',
                    fontWeight: 'var(--cv-font-semibold)',
                    padding: '3px 8px',
                    borderRadius: 'var(--cv-radius-full)',
                  }}>
                    ✓ Viewed
                  </div>
                )}

                {/* Card Preview Container */}
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

                {/* Meta details */}
                <div className={styles.cardMeta}>
                  <div>
                    <h3 className={styles.templateName}>{template.name}</h3>
                    {template.collectionName && (
                      <span style={{
                        display: 'block',
                        fontSize: 'var(--cv-text-xs)',
                        color: 'var(--cv-gold)',
                        marginTop: '2px',
                      }}>
                        ✨ {template.collectionName}
                      </span>
                    )}
                  </div>
                  <span className={styles.badge}>{template.categoryName}</span>
                </div>

                {/* Color Swatch Row */}
                <div
                  style={{
                    padding: '0 1.25rem 1rem 1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: 'rgba(13, 15, 26, 0.9)',
                  }}
                  onClick={(e) => e.preventDefault()}
                >
                  <span style={{ fontSize: '11px', color: 'var(--cv-grey-400)', marginRight: '4px' }}>Colors:</span>
                  {swatches.map((swatch, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedSwatches((prev) => ({ ...prev, [template.id]: idx }));
                      }}
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        border: activeSwatchIdx === idx ? '2px solid var(--cv-magenta-pink)' : '1px solid var(--cv-grey-600)',
                        background: swatch.secondary
                          ? `linear-gradient(135deg, ${swatch.primary} 50%, ${swatch.secondary} 50%)`
                          : swatch.primary,
                        cursor: 'pointer',
                        padding: 0,
                        outline: 'none',
                      }}
                      title="Preview Variant Swatch"
                    />
                  ))}
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
