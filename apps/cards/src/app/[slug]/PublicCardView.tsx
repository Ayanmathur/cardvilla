'use client';

import React, { useRef } from 'react';
import { CanvasRenderer } from '../../components/CanvasRenderer';
import { downloadVCard } from '../../lib/vcard';
import { getTemplate } from '@card-villa/templates';
import styles from './PublicCardView.module.css';

interface PublicCardViewProps {
  card: {
    id: string;
    slug: string;
    component_key?: string | null;
    data: Record<string, any>;
    template?: {
      name: string;
      canvasJson: any;
    };
  };
}

export const PublicCardView: React.FC<PublicCardViewProps> = ({ card }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const data = card.data || {};

  const handleSaveContact = () => {
    const fileName = (data.full_name || data.company_name || 'contact').replace(/\s+/g, '_');
    downloadVCard(data, `${fileName}.vcf`);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: data.full_name || data.company_name || 'Digital Card',
          text: `Check out ${data.full_name || data.company_name}'s digital card!`,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleDownloadImage = () => {
    const cardEl = cardRef.current;
    if (!cardEl) return;

    try {
      const svgString = new XMLSerializer().serializeToString(cardEl);
      const canvas = document.createElement('canvas');
      canvas.width = 360 * 2;
      canvas.height = 640 * 2;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = new Image();
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        ctx.drawImage(img, 0, 0, 720, 1280);
        const imgUrl = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = imgUrl;
        a.download = `${card.slug}_business_card.png`;
        a.click();
        URL.revokeObjectURL(url);
      };
      img.src = url;
    } catch (err) {
      alert('Downloading PNG snapshot. You can also take a screenshot of your card!');
    }
  };

  const TemplateEntry = card.component_key ? getTemplate(card.component_key) : null;
  const TemplateComponent = TemplateEntry?.component;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.cardContainer}>
        {TemplateComponent ? (
          <div className={styles.templateWrapper}>
            <TemplateComponent data={data} />
          </div>
        ) : (
          <div ref={cardRef} className={styles.cardBox}>
            <CanvasRenderer canvasJson={card.template?.canvasJson} data={data} scale={1} />
          </div>
        )}

        {/* Action Toolbar */}
        <div className={styles.actionBar}>
          <button onClick={handleSaveContact} className={styles.vcardBtn}>
            📇 Save Contact (.vcf)
          </button>
          <button onClick={handleShare} className={styles.shareBtn}>
            🔗 Share Card
          </button>
          {!TemplateComponent && (
            <button onClick={handleDownloadImage} className={styles.downloadImgBtn}>
              🖼️ Download Image
            </button>
          )}
        </div>

        {/* Referral Footer — Section 14.2 */}
        <footer className={styles.cardFooter}>
          <a
            href="https://cardvilla.com/gallery"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.brandLink}
          >
            Want a card like this? <strong>Get yours →</strong>
          </a>
          <span className={styles.poweredBy}>
            Powered by <strong>Card Villa</strong>
          </span>
        </footer>
      </div>
    </div>
  );
};
