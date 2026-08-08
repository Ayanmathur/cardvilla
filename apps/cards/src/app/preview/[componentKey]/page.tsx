'use client';

import React, { useMemo } from 'react';
import { getTemplate } from '@card-villa/templates';
import { useSearchParams } from 'next/navigation';
import { use } from 'react';

export default function PreviewPage({ params }: { params: Promise<{ componentKey: string }> }) {
  const { componentKey } = use(params);
  const searchParams = useSearchParams();
  
  const data = useMemo(() => {
    try {
      const dataParam = searchParams.get('data');
      if (dataParam) {
        return JSON.parse(decodeURIComponent(dataParam));
      }
    } catch (e) {
      console.error('Failed to parse preview data', e);
    }
    return {};
  }, [searchParams]);

  const TemplateEntry = getTemplate(componentKey);
  const TemplateComponent = TemplateEntry?.component;

  if (!TemplateComponent) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: '#ff4444' }}>
        Template not found for key: {componentKey}
      </div>
    );
  }

  return (
    <main style={{ minHeight: '100vh', margin: 0, padding: 0 }}>
      <TemplateComponent data={data} isPreview={true} />
    </main>
  );
}
