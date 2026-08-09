'use client';

import React, { useMemo, Suspense } from 'react';
import { getTemplate } from '@card-villa/templates';
import { useSearchParams } from 'next/navigation';
import { use } from 'react';

function PreviewContent({ componentKey }: { componentKey: string }) {
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

export default function PreviewPage({ params }: { params: Promise<{ componentKey: string }> }) {
  const { componentKey } = use(params);

  return (
    <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>Loading Preview...</div>}>
      <PreviewContent componentKey={componentKey} />
    </Suspense>
  );
}
