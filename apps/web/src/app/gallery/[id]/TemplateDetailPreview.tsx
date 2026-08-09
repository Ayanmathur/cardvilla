'use client';

import React from 'react';
import { TemplatePreview } from '@/components/template-preview/TemplatePreview';

interface TemplateDetailPreviewProps {
  componentKey: string | null;
}

export const TemplateDetailPreview: React.FC<TemplateDetailPreviewProps> = ({ componentKey }) => {
  if (!componentKey) {
    return (
      <div style={{
        width: 375,
        height: 667,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--cv-grey-500)',
        fontSize: 'var(--cv-text-sm)',
      }}>
        Legacy canvas template
      </div>
    );
  }

  return (
    <TemplatePreview
      componentKey={componentKey}
      scale={1}
      interactive={false}
    />
  );
};
