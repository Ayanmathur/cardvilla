'use client';

import React, { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { CardFieldEditor } from '@/components/card-editor/CardFieldEditor';

export default function AdminEditCardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const [card, setCard] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    async function loadCard() {
      try {
        setLoading(true);
        const res = await fetch(`/api/admin/cards/${id}`);
        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
            router.push('/login');
            return;
          }
          throw new Error('Card instance not found');
        }
        const data = await res.json();
        setCard(data.card);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadCard();
  }, [id]);

  const handleSave = async (updatedData: Record<string, any>) => {
    try {
      setSaving(true);
      const res = await fetch(`/api/admin/cards/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: updatedData }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to update card data');
      }

      alert('✅ Card content saved successfully!');
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
        Loading Card Content...
      </div>
    );
  }

  if (error || !card) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center', color: '#ef4444' }}>
        Error: {error || 'Card instance not found'}
      </div>
    );
  }

  return (
    <CardFieldEditor
      cardId={card.id}
      slug={card.slug}
      template={card.template}
      initialData={card.data || {}}
      qrCodeUrl={card.qrCode?.targetUrl}
      userRole="admin"
      onSave={handleSave}
      isSaving={saving}
    />
  );
}
