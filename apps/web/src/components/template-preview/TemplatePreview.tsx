'use client';

import React, { useMemo } from 'react';
import { getTemplate } from '@card-villa/templates';

interface TemplatePreviewProps {
  componentKey: string;
  data?: Record<string, any>;
  width?: number;
  height?: number;
  scale?: number;
  interactive?: boolean;
}

/**
 * Renders a template component directly (no iframe needed).
 * Works in both development and production without cross-origin issues.
 */
export const TemplatePreview: React.FC<TemplatePreviewProps> = ({
  componentKey,
  data = {},
  width = 375,
  height = 667,
  scale = 1,
  interactive = false,
}) => {
  const TemplateEntry = useMemo(() => getTemplate(componentKey), [componentKey]);
  const TemplateComponent = TemplateEntry?.component;

  if (!TemplateComponent) {
    return (
      <div
        style={{
          width: width * scale,
          height: height * scale,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--cv-grey-900)',
          borderRadius: 'var(--cv-radius-md)',
          color: 'var(--cv-grey-500)',
          fontSize: 'var(--cv-text-xs)',
          textAlign: 'center',
          padding: '1rem',
        }}
      >
        Template not found: {componentKey}
      </div>
    );
  }

  return (
    <div
      style={{
        width: width * scale,
        height: height * scale,
        overflow: 'hidden',
        borderRadius: 'var(--cv-radius-md)',
        position: 'relative',
      }}
    >
      <div
        style={{
          width,
          height,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          pointerEvents: interactive ? 'auto' : 'none',
          overflow: 'hidden',
        }}
      >
        <TemplateComponent data={data} isPreview={true} />
      </div>
    </div>
  );
};

export default TemplatePreview;
