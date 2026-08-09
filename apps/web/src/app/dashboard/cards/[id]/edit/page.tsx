'use client';

import React, { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { ConfigEditor } from '@/components/config-editor/ConfigEditor';

export default function ClientEditCardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const [card, setCard] = useState<any>(null);
  const [data, setData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    async function loadCard() {
      try {
        setLoading(true);
        const res = await fetch(`/api/client/cards/${id}`);
        if (!res.ok) {
          if (res.status === 401) {
            router.push('/login');
            return;
          }
          throw new Error('Card instance not found or access denied');
        }
        const responseData = await res.json();
        setCard(responseData.card);
        setData(responseData.card.data || {});
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadCard();
  }, [id]);

  const handleSave = async () => {
    try {
      setSaving(true);
      const res = await fetch(`/api/client/cards/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to update card content');
      }

      alert('✅ Card content saved successfully!');
      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--cv-gold)' }}>
        Loading Card Content...
      </div>
    );
  }

  if (error || !card) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--cv-error)' }}>
        Error: {error || 'Card instance not found'}
      </div>
    );
  }

  const componentKey = card.template?.componentKey || card.template?.component_key || 'modern_minimal';
  const schema = card.template?.configSchema || card.template?.config_schema || card.template?.fieldSchemas || [];
  const cardsDomain = process.env.NEXT_PUBLIC_CARDS_URL || 'http://localhost:3001';

  const encodedData = encodeURIComponent(JSON.stringify(data));
  const previewUrl = `${cardsDomain}/preview/${componentKey}?data=${encodedData}`;

  const previewIframe = (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: 'var(--cv-dark-blue)' }}>
      <div style={{ padding: 'var(--cv-space-4)', borderBottom: '1px solid var(--cv-grey-800)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: 'var(--cv-grey-400)', fontSize: 'var(--cv-text-sm)' }}>
          Preview: <span style={{ fontFamily: 'var(--cv-font-mono)', color: 'var(--cv-gold)' }}>{componentKey}</span>
        </span>
        <button 
          onClick={handleSave} 
          disabled={saving}
          style={{ 
            padding: '8px 16px', 
            backgroundColor: 'var(--cv-magenta-pink)', 
            color: 'white', 
            border: 'none', 
            borderRadius: 'var(--cv-radius-md)',
            opacity: saving ? 0.7 : 1,
            cursor: saving ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
            boxShadow: 'var(--cv-shadow-glow-pink)'
          }}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
      <iframe
        src={previewUrl}
        style={{ flex: 1, width: '100%', border: 'none' }}
        title="Live Preview"
      />
    </div>
  );

  return (
    <div style={{ height: 'calc(100vh - 40px)', padding: 'var(--cv-space-4)' }}>
      <ConfigEditor
        configSchema={schema}
        data={data}
        onChange={setData}
        role="client"
        previewComponent={previewIframe}
      />
    </div>
  );
}
