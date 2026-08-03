'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CanvasRenderer } from '@/components/builder/CanvasRenderer';
import styles from './templates.module.css';

interface Template {
  id: string;
  name: string;
  categoryId: string;
  thumbnailUrl?: string;
  canvasJson: any;
  status: 'draft' | 'published';
  createdAt: string;
  category?: { id: string; name: string };
  fieldSchemas?: any[];
}

export default function AdminTemplatesPage() {
  const router = useRouter();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/templates');
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          router.push('/login');
          return;
        }
        throw new Error('Failed to load templates');
      }
      const data = await res.json();
      setTemplates(data.templates || []);

      const catRes = await fetch('/api/admin/categories');
      if (catRes.ok) {
        const catData = await catRes.json();
        setCategories(catData.categories || []);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const toggleStatus = async (templateId: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'published' ? 'draft' : 'published';
    try {
      const res = await fetch(`/api/admin/templates/${templateId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (res.ok) {
        setTemplates((prev) =>
          prev.map((t) => (t.id === templateId ? { ...t, status: nextStatus as any } : t))
        );
      }
    } catch (err) {
      console.error('Failed to toggle status:', err);
    }
  };

  const deleteTemplate = async (templateId: string, name: string) => {
    if (!confirm(`Are you sure you want to delete template "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/templates/${templateId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setTemplates((prev) => prev.filter((t) => t.id !== templateId));
      }
    } catch (err) {
      console.error('Failed to delete template:', err);
    }
  };

  const filteredTemplates = templates.filter((t) =>
    selectedCategory === 'all' ? true : t.categoryId === selectedCategory
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Template Builder & Library</h1>
          <p className={styles.subtitle}>
            Manage and construct canvas card templates for clients.
          </p>
        </div>

        <div className={styles.headerActions}>
          <Link href="/admin/templates/builder" className={styles.createBtn}>
            ✨ Create New Template
          </Link>
          <Link href="/dashboard" className={styles.backBtn}>
            ← Dashboard
          </Link>
        </div>
      </header>

      {/* Filter Bar */}
      <div className={styles.filterBar}>
        <div className={styles.filterGroup}>
          <label>Category Filter:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={styles.selectFilter}
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.countBadge}>
          Total Templates: <strong>{filteredTemplates.length}</strong>
        </div>
      </div>

      {error && <div className={styles.errorBox}>{error}</div>}

      {loading ? (
        <div className={styles.loading}>Loading template library...</div>
      ) : filteredTemplates.length === 0 ? (
        <div className={styles.emptyState}>
          <h3>No templates found</h3>
          <p>Click "Create New Template" to build your first business card design.</p>
          <Link href="/admin/templates/builder" className={styles.createBtn}>
            ✨ Create Template Now
          </Link>
        </div>
      ) : (
        <div className={styles.templateGrid}>
          {filteredTemplates.map((template) => (
            <div key={template.id} className={styles.templateCard}>
              {/* Scaled Preview */}
              <div className={styles.previewBox}>
                <CanvasRenderer canvasJson={template.canvasJson} scale={0.48} />
              </div>

              {/* Info & Actions */}
              <div className={styles.cardDetails}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.templateName}>{template.name}</h3>
                  <button
                    onClick={() => toggleStatus(template.id, template.status)}
                    className={`${styles.statusBadge} ${
                      template.status === 'published' ? styles.published : styles.draft
                    }`}
                  >
                    {template.status === 'published' ? '● Published' : '○ Draft'}
                  </button>
                </div>

                <p className={styles.categoryName}>
                  Category: <span>{template.category?.name || 'Business Card'}</span>
                </p>

                <div className={styles.cardFooter}>
                  <Link
                    href={`/admin/templates/${template.id}/edit`}
                    className={styles.editBtn}
                  >
                    ✏️ Edit Canvas
                  </Link>
                  <button
                    onClick={() => deleteTemplate(template.id, template.name)}
                    className={styles.deleteBtn}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
