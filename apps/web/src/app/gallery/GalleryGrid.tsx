'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { TemplatePreview } from '@/components/template-preview/TemplatePreview';
import styles from './gallery.module.css';

export interface GalleryTemplate {
  id: string;
  name: string;
  componentKey: string | null;
  categorySlug?: string;
  categoryName: string;
  collectionName?: string | null;
  isTrending?: boolean;
  isScrollable?: boolean;
  sectionsCount?: number;
  motionTier?: number;
  styleTone?: string;
  description?: string;
  canvasJson?: any;
}

interface GalleryGridProps {
  templates: GalleryTemplate[];
  initialCategory?: string;
}

const CATEGORY_TABS = [
  { slug: 'all', label: '🌟 All Designs' },
  { slug: 'business-card', label: '💼 Business Cards' },
  { slug: 'wedding', label: '🎊 Wedding Suites' },
  { slug: 'baby-kids', label: '👶 Baby & Kids' },
  { slug: 'party', label: '🎉 Party & Events' },
  { slug: 'devotional', label: '🙏 Devotional Puja' },
  { slug: 'festival', label: '🪔 Festival Wishes' },
];

export const GalleryGrid: React.FC<GalleryGridProps> = ({
  templates,
  initialCategory = 'all',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewedIds, setViewedIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('cv_viewed_templates');
      if (stored) {
        setViewedIds(JSON.parse(stored));
      }
    } catch (e) {
      // Ignore
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

  // Filter templates by category and search query
  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      // Category Match
      const matchesCategory =
        selectedCategory === 'all' ||
        template.categorySlug === selectedCategory ||
        (selectedCategory === 'business-card' &&
          (template.categorySlug === 'business-card' || !template.categorySlug));

      // Search Query Match
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        template.name.toLowerCase().includes(query) ||
        (template.description && template.description.toLowerCase().includes(query)) ||
        (template.categoryName && template.categoryName.toLowerCase().includes(query)) ||
        (template.styleTone && template.styleTone.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [templates, selectedCategory, searchQuery]);

  // Compute counts per category tab
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: templates.length };
    templates.forEach((t) => {
      const slug = t.categorySlug || 'business-card';
      counts[slug] = (counts[slug] || 0) + 1;
    });
    return counts;
  }, [templates]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Category Tabs & Search Bar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'center' }}>
        {/* Search Input */}
        <div style={{ width: '100%', maxWidth: '480px', position: 'relative' }}>
          <input
            type="text"
            placeholder="🔍 Search 76+ templates (e.g. Mandap, Diwali, Shutter, Doctor, Cocktail)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 18px',
              backgroundColor: 'rgba(20, 23, 42, 0.8)',
              border: '1px solid rgba(201, 168, 76, 0.3)',
              borderRadius: '24px',
              color: '#ffffff',
              fontSize: '0.95rem',
              outline: 'none',
              boxSizing: 'border-box',
              backdropFilter: 'blur(10px)',
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: '#888',
                cursor: 'pointer',
                fontSize: '1rem',
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Filter Tabs */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          justifyContent: 'center',
          maxWidth: '1000px',
        }}>
          {CATEGORY_TABS.map((tab) => {
            const isActive = selectedCategory === tab.slug;
            const count = categoryCounts[tab.slug] || 0;

            return (
              <button
                key={tab.slug}
                onClick={() => setSelectedCategory(tab.slug)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: isActive ? '1px solid var(--cv-gold, #c9a84c)' : '1px solid rgba(255, 255, 255, 0.1)',
                  backgroundColor: isActive ? 'rgba(201, 168, 76, 0.2)' : 'rgba(13, 15, 26, 0.6)',
                  color: isActive ? 'var(--cv-gold, #c9a84c)' : '#cbd5e1',
                  fontSize: '0.85rem',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>{tab.label}</span>
                <span style={{
                  fontSize: '0.75rem',
                  padding: '2px 6px',
                  borderRadius: '10px',
                  backgroundColor: isActive ? 'var(--cv-gold, #c9a84c)' : 'rgba(255, 255, 255, 0.08)',
                  color: isActive ? '#0b0c14' : '#94a3b8',
                  fontWeight: 700,
                }}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 8px' }}>
        <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
          Showing <strong>{filteredTemplates.length}</strong> of {templates.length} templates
        </span>
        {selectedCategory !== 'all' && (
          <button
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
            style={{ background: 'none', border: 'none', color: 'var(--cv-gold, #c9a84c)', cursor: 'pointer', fontSize: '0.85rem' }}
          >
            Reset Filters ↺
          </button>
        )}
      </div>

      {/* Grid of Templates */}
      {filteredTemplates.length === 0 ? (
        <div className={styles.emptyState}>
          <h3>No templates matched your filter</h3>
          <p>Try clearing your search or selecting a different category.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredTemplates.map((template) => {
            const isViewed = viewedIds.includes(template.id);

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
                        backgroundColor: 'var(--cv-magenta-pink, #e91e63)',
                        color: 'white',
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '4px 10px',
                        borderRadius: '16px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
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
                        color: 'var(--cv-aqua, #3fd8d0)',
                        border: '1px solid var(--cv-aqua, #3fd8d0)',
                        fontSize: '11px',
                        fontWeight: 600,
                        padding: '3px 8px',
                        borderRadius: '12px',
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
                        <div style={{ color: '#64748b', fontSize: '0.85rem' }}>
                          Preview Unavailable
                        </div>
                      )}
                    </div>

                    {/* Meta details */}
                    <div className={styles.cardMeta}>
                      <div>
                        <h3 className={styles.templateName}>{template.name}</h3>
                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginTop: '4px' }}>
                          {template.isScrollable ? (
                            <span style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 600 }}>
                              🌐 Scrollable Site ({template.sectionsCount} sections)
                            </span>
                          ) : (
                            <span style={{ fontSize: '11px', color: '#a3e635', fontWeight: 600 }}>
                              💳 Single-View Card
                            </span>
                          )}
                        </div>
                      </div>
                      <span className={styles.badge}>{template.categoryName}</span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
