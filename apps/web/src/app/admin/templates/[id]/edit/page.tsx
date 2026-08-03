'use client';

import React, { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { TemplateCanvasBuilder } from '@/components/builder/TemplateCanvasBuilder';

export default function EditTemplatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const [template, setTemplate] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [tmplRes, catRes] = await Promise.all([
          fetch(`/api/admin/templates/${id}`),
          fetch('/api/admin/categories'),
        ]);

        if (!tmplRes.ok) {
          throw new Error('Template not found');
        }

        const tmplData = await tmplRes.json();
        setTemplate(tmplData.template);

        if (catRes.ok) {
          const catData = await catRes.json();
          setCategories(catData.categories || []);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  const handleSave = async (data: any) => {
    try {
      setSaving(true);
      const res = await fetch(`/api/admin/templates/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to update template');
      }

      router.push('/admin/templates');
      router.refresh();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center', color: '#c9a84c' }}>
        Loading Template Data...
      </div>
    );
  }

  if (error || !template) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center', color: '#ef4444' }}>
        Error: {error || 'Template not found'}
      </div>
    );
  }

  return (
    <TemplateCanvasBuilder
      initialName={template.name}
      initialCategoryId={template.categoryId}
      initialStatus={template.status}
      initialCanvasJson={template.canvasJson}
      categories={categories.length ? categories : [{ id: 'cat_business_card', name: 'Business Card', slug: 'business-card' }]}
      onSave={handleSave}
      isSaving={saving}
    />
  );
}
