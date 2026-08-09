'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { TemplatePreview } from '@/components/template-preview/TemplatePreview';
import styles from './templates.module.css';

interface RegistryTemplate {
  componentKey: string;
  name: string;
  description: string;
  motionTier: string;
  schema: any[];
}

interface Template {
  id: string;
  name: string;
  categoryId: string;
  componentKey?: string;
  status: 'draft' | 'published';
  createdAt: string;
  category?: { id: string; name: string };
  fieldSchemas?: any[];
}

export default function AdminTemplatesPage() {
  const router = useRouter();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [registryTemplates, setRegistryTemplates] = useState<RegistryTemplate[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    categoryId: '',
    componentKey: '',
    status: 'draft' as 'draft' | 'published'
  });

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

      const regRes = await fetch('/api/admin/templates/registry');
      if (regRes.ok) {
        const regData = await regRes.json();
        setRegistryTemplates(regData.templates || []);
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

  const handleRegisterTemplate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const selectedReg = registryTemplates.find(rt => rt.componentKey === newTemplate.componentKey);
      if (!selectedReg) return;

      const res = await fetch('/api/admin/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newTemplate.name,
          categoryId: newTemplate.categoryId,
          componentKey: newTemplate.componentKey,
          status: newTemplate.status,
          fieldSchemas: selectedReg.schema
        }),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchTemplates(); // refresh
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to register template');
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  const filteredTemplates = templates.filter((t) =>
    selectedCategory === 'all' ? true : t.categoryId === selectedCategory
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Template Registry Management</h1>
          <p className={styles.subtitle}>
            Register and manage code-based templates for clients.
          </p>
        </div>

        <div className={styles.headerActions}>
          <button onClick={() => setIsModalOpen(true)} className={styles.createBtn}>
            ✨ Register New Template
          </button>
          <Link href="/dashboard" className={styles.backBtn}>
            ← Dashboard
          </Link>
        </div>
      </header>

      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', 
          justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'var(--cv-dark-blue-card)', padding: 'var(--cv-space-6)',
            borderRadius: 'var(--cv-radius-xl)', width: '100%', maxWidth: '500px',
            border: '1px solid var(--cv-grey-800)'
          }}>
            <h2 style={{ color: 'var(--cv-gold)', marginBottom: 'var(--cv-space-4)' }}>Register Template</h2>
            <form onSubmit={handleRegisterTemplate} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--cv-space-4)' }}>
              <div>
                <label style={{ display: 'block', marginBottom: 'var(--cv-space-2)', color: 'var(--cv-grey-300)' }}>Component</label>
                <select 
                  required
                  value={newTemplate.componentKey} 
                  onChange={e => setNewTemplate({...newTemplate, componentKey: e.target.value})}
                  style={{ width: '100%', padding: 'var(--cv-space-2)', backgroundColor: 'var(--cv-dark-blue)', color: 'var(--cv-white)', border: '1px solid var(--cv-grey-700)', borderRadius: 'var(--cv-radius-md)' }}
                >
                  <option value="">Select a component...</option>
                  {registryTemplates.map(rt => (
                    <option key={rt.componentKey} value={rt.componentKey}>
                      {rt.name} ({rt.componentKey})
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: 'var(--cv-space-2)', color: 'var(--cv-grey-300)' }}>Template Name</label>
                <input 
                  type="text" 
                  required
                  value={newTemplate.name}
                  onChange={e => setNewTemplate({...newTemplate, name: e.target.value})}
                  style={{ width: '100%', padding: 'var(--cv-space-2)', backgroundColor: 'var(--cv-dark-blue)', color: 'var(--cv-white)', border: '1px solid var(--cv-grey-700)', borderRadius: 'var(--cv-radius-md)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: 'var(--cv-space-2)', color: 'var(--cv-grey-300)' }}>Category</label>
                <select 
                  required
                  value={newTemplate.categoryId} 
                  onChange={e => setNewTemplate({...newTemplate, categoryId: e.target.value})}
                  style={{ width: '100%', padding: 'var(--cv-space-2)', backgroundColor: 'var(--cv-dark-blue)', color: 'var(--cv-white)', border: '1px solid var(--cv-grey-700)', borderRadius: 'var(--cv-radius-md)' }}
                >
                  <option value="">Select a category...</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: 'var(--cv-space-2)', color: 'var(--cv-grey-300)' }}>Status</label>
                <select 
                  value={newTemplate.status} 
                  onChange={e => setNewTemplate({...newTemplate, status: e.target.value as any})}
                  style={{ width: '100%', padding: 'var(--cv-space-2)', backgroundColor: 'var(--cv-dark-blue)', color: 'var(--cv-white)', border: '1px solid var(--cv-grey-700)', borderRadius: 'var(--cv-radius-md)' }}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--cv-space-4)', marginTop: 'var(--cv-space-4)' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '8px 16px', background: 'transparent', color: 'var(--cv-grey-300)', border: '1px solid var(--cv-grey-700)', borderRadius: 'var(--cv-radius-md)' }}>Cancel</button>
                <button type="submit" style={{ padding: '8px 16px', backgroundColor: 'var(--cv-magenta-pink)', color: 'white', border: 'none', borderRadius: 'var(--cv-radius-md)', fontWeight: 'bold' }}>Register Template</button>
              </div>
            </form>
          </div>
        </div>
      )}

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
          <p>Click "Register New Template" to add a component template.</p>
          <button onClick={() => setIsModalOpen(true)} className={styles.createBtn}>
            ✨ Register Template
          </button>
        </div>
      ) : (
        <div className={styles.templateGrid}>
          {filteredTemplates.map((template) => (
            <div key={template.id} className={styles.templateCard}>
              <div className={styles.previewBox}>
                {template.componentKey ? (
                  <TemplatePreview
                    componentKey={template.componentKey}
                    scale={0.48}
                  />
                ) : (
                  <span style={{ color: 'var(--cv-grey-400)' }}>Legacy Canvas</span>
                )}
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
                {template.componentKey && (
                  <p className={styles.categoryName} style={{ marginTop: '4px' }}>
                    Component: <span style={{ fontFamily: 'var(--cv-font-mono)' }}>{template.componentKey}</span>
                  </p>
                )}

                <div className={styles.cardFooter}>
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
