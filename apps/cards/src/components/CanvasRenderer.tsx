'use client';

import React from 'react';
import styles from './CanvasRenderer.module.css';

export interface CanvasElement {
  id: string;
  type: 'text' | 'image' | 'logo' | 'shape' | 'motif' | 'button';
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  content?: string;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: string;
  fontStyle?: string;
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  textAlign?: 'left' | 'center' | 'right';
  opacity?: number;
  shadow?: string;
  animationType?: 'none' | 'snip' | 'pulse' | 'sparkle' | 'shutter' | 'shine_sweep' | 'steam_rise' | 'slide_in';
  animationTier?: number;
  motifType?: 'scissors' | 'heartbeat' | 'tooth' | 'camera' | 'gold_gem' | 'silver_gem' | 'coffee_cup' | 'none';
  actionType?: 'none' | 'phone' | 'whatsapp' | 'maps' | 'url' | 'vcard';
  actionUrl?: string;
  fieldBinding?: {
    fieldKey: string;
    fieldType: string;
    label?: string;
  };
}

export interface CanvasJson {
  version: string;
  width: number;
  height: number;
  background: {
    type: 'solid' | 'gradient' | 'wood_dark' | 'wood_light' | 'paper_diorama' | 'rope_border' | 'gold_foil' | 'silver_foil' | 'receipt';
    color?: string;
    gradient?: string;
  };
  elements: CanvasElement[];
}

interface CanvasRendererProps {
  canvasJson: CanvasJson;
  data?: Record<string, any>;
  scale?: number;
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export const CanvasRenderer: React.FC<CanvasRendererProps> = ({
  canvasJson,
  data = {},
  scale = 1,
  containerRef,
}) => {
  const { width = 360, height = 640, background, elements = [] } = canvasJson || {};

  const getBackgroundStyle = (): React.CSSProperties => {
    switch (background?.type) {
      case 'solid':
        return { backgroundColor: background.color || '#0d0f1a' };
      case 'gradient':
        return { background: background.gradient || 'linear-gradient(135deg, #14172a 0%, #0d0f1a 100%)' };
      case 'wood_dark':
        return {
          background: 'linear-gradient(180deg, #2c1a0e 0%, #1a0f08 100%)',
          boxShadow: 'inset 0 0 50px rgba(0,0,0,0.8)',
          border: '8px solid #3d2314',
        };
      case 'wood_light':
        return {
          background: 'linear-gradient(180deg, #d4a373 0%, #faedcd 100%)',
          border: '8px solid #bc6c25',
          color: '#2b2d42',
        };
      case 'paper_diorama':
        return {
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
        };
      case 'rope_border':
        return {
          background: '#1e293b',
          border: '10px solid #d97706',
          borderRadius: '16px',
        };
      case 'gold_foil':
        return {
          background: 'radial-gradient(circle at top left, #2a200a, #0b0904)',
          border: '2px solid #d4af37',
        };
      case 'silver_foil':
        return {
          background: 'radial-gradient(circle at top left, #1f2937, #111827)',
          border: '2px solid #9ca3af',
        };
      case 'receipt':
        return {
          background: '#fefae0',
          color: '#111827',
          borderTop: '6px repeating-linear-gradient(-45deg, #ccc 0, #ccc 10px, transparent 10px, transparent 20px)',
          borderBottom: '6px repeating-linear-gradient(45deg, #ccc 0, #ccc 10px, transparent 10px, transparent 20px)',
        };
      default:
        return { background: background?.color || '#0d0f1a' };
    }
  };

  const renderMotif = (element: CanvasElement) => {
    const { motifType, animationType } = element;

    if (motifType === 'scissors' || animationType === 'snip') {
      return (
        <div className={`${styles.motifContainer} ${styles.snipAnim}`}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path className={styles.bladeLeft} d="M6 6l12 12M6 18A3 3 0 1 0 6 12a3 3 0 0 0 0 6z" />
            <path className={styles.bladeRight} d="M18 6L6 18M18 18a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          </svg>
        </div>
      );
    }

    if (motifType === 'heartbeat' || animationType === 'pulse') {
      return (
        <div className={`${styles.motifContainer} ${styles.pulseAnim}`}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            <path className={styles.ecgLine} d="M3 12h4l2-4 3 8 2-4h4" stroke="#ffffff" strokeWidth="1.5" />
          </svg>
        </div>
      );
    }

    if (motifType === 'tooth' || animationType === 'sparkle') {
      return (
        <div className={`${styles.motifContainer} ${styles.sparkleAnim}`}>
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="1.8">
            <path d="M12 2C9 2 7 3.5 7 6.5C7 9.5 8.5 13 9.5 17C10.2 19.8 11.5 22 12 22C12.5 22 13.8 19.8 14.5 17C15.5 13 17 9.5 17 6.5C17 3.5 15 2 12 2Z" />
          </svg>
          <div className={styles.glintStar1}>✦</div>
          <div className={styles.glintStar2}>✦</div>
        </div>
      );
    }

    if (motifType === 'camera' || animationType === 'shutter') {
      return (
        <div className={`${styles.motifContainer} ${styles.shutterAnim}`}>
          <div className={styles.shutterFlash} />
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
          <div className={styles.photoSlide}>
            <span style={{ fontSize: '10px' }}>📷</span>
          </div>
        </div>
      );
    }

    if (motifType === 'coffee_cup' || animationType === 'steam_rise') {
      return (
        <div className={`${styles.motifContainer} ${styles.steamAnim}`}>
          <div className={styles.steamWisp1} />
          <div className={styles.steamWisp2} />
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="1.8">
            <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
          </svg>
        </div>
      );
    }

    return null;
  };

  const renderElement = (element: CanvasElement) => {
    const fieldKey = element.fieldBinding?.fieldKey;
    const liveValue = fieldKey && data[fieldKey] !== undefined ? data[fieldKey] : null;

    switch (element.type) {
      case 'text': {
        const textVal = liveValue !== null ? String(liveValue) : element.content || '';
        return <span style={{ whiteSpace: 'pre-wrap' }}>{textVal}</span>;
      }

      case 'image':
      case 'logo': {
        const imgSrc = liveValue || element.content || '/placeholder-logo.png';
        return (
          <img
            src={imgSrc}
            alt={element.fieldBinding?.label || 'Card Asset'}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              borderRadius: element.borderRadius ? `${element.borderRadius}px` : undefined,
            }}
          />
        );
      }

      case 'button': {
        const btnText = liveValue || element.content || 'Click Action';
        const actionType = element.actionType || element.fieldBinding?.fieldType;
        let href = element.actionUrl || '#';

        if (liveValue) {
          if (actionType === 'phone') href = `tel:${liveValue}`;
          else if (actionType === 'whatsapp') href = `https://wa.me/${String(liveValue).replace(/[^0-9]/g, '')}`;
          else if (actionType === 'maps' || element.fieldBinding?.fieldType === 'address') {
            href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(liveValue)}`;
          } else if (actionType === 'url') href = String(liveValue).startsWith('http') ? String(liveValue) : `https://${liveValue}`;
        }

        const buttonStyle: React.CSSProperties = {
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          backgroundColor: element.backgroundColor || '#c9a84c',
          color: element.color || '#0d0f1a',
          borderRadius: `${element.borderRadius ?? 8}px`,
          fontWeight: element.fontWeight || '600',
          fontSize: `${element.fontSize || 14}px`,
          textDecoration: 'none',
          boxShadow: element.shadow || '0 4px 12px rgba(0,0,0,0.3)',
          cursor: 'pointer',
        };

        return (
          <a href={href} target="_blank" rel="noopener noreferrer" style={buttonStyle}>
            {actionType === 'phone' && '📞 '}
            {actionType === 'whatsapp' && '💬 '}
            {actionType === 'maps' && '📍 '}
            {btnText}
          </a>
        );
      }

      case 'motif':
        return renderMotif(element);

      default:
        return <div>{element.content}</div>;
    }
  };

  return (
    <div
      ref={containerRef}
      className={styles.canvasOuter}
      style={{
        width: `${width * scale}px`,
        height: `${height * scale}px`,
      }}
    >
      <div
        className={styles.canvasInner}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          ...getBackgroundStyle(),
        }}
      >
        {(background?.type === 'gold_foil' || background?.type === 'silver_foil') && (
          <div className={styles.shineSweep} />
        )}

        {elements.map((el) => {
          const style: React.CSSProperties = {
            position: 'absolute',
            left: `${el.x}px`,
            top: `${el.y}px`,
            width: `${el.width}px`,
            height: `${el.height}px`,
            zIndex: el.zIndex,
            fontFamily: el.fontFamily || 'Inter, sans-serif',
            fontSize: el.fontSize ? `${el.fontSize}px` : undefined,
            fontWeight: el.fontWeight || 'normal',
            color: el.color || 'inherit',
            textAlign: el.textAlign || 'left',
            opacity: el.opacity ?? 1,
          };

          return (
            <div key={el.id} style={style}>
              {renderElement(el)}
            </div>
          );
        })}
      </div>
    </div>
  );
};
