'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TemplateCanvasBuilder } from '@/components/builder/TemplateCanvasBuilder';

export default function NewTemplateBuilderPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch('/api/admin/categories');
        if (res.ok) {
          const data = await res.json();
          setCategories(data.categories || []);
        }
      } catch (err) {
        console.error('Failed to load categories:', err);
      } finally {
        setLoading(false);
      }
    }
    loadCategories();
  }, []);

  const handleSave = async (data: any) => {
    try {
      setSaving(true);
      const res = await fetch('/api/admin/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to save template');
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
        Loading Template Builder...
      </div>
    );
  }

  return (
    <TemplateCanvasBuilder
      categories={categories.length ? categories : [{ id: 'cat_business_card', name: 'Business Card', slug: 'business-card' }]}
      onSave={handleSave}
      isSaving={saving}
    />
  );
}
