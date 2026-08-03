'use client';

import React, { useRef } from 'react';
import { CanvasRenderer } from '../../components/CanvasRenderer';
import { downloadVCard } from '../../lib/vcard';
import styles from './PublicCardView.module.css';

interface PublicCardViewProps {
  card: {
    id: string;
    slug: string;
    data: Record<string, any>;
    template: {
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

  const handleDownloadImage = () => {
    const cardEl = cardRef.current;
    if (!cardEl) return;

    // Use SVG & HTML canvas rendering for quick image snapshot
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

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.cardContainer}>
        {/* Main Canvas Card Renderer */}
        <div ref={cardRef} className={styles.cardBox}>
          <CanvasRenderer canvasJson={card.template.canvasJson} data={data} scale={1} />
        </div>

        {/* Action Toolbar */}
        <div className={styles.actionBar}>
          <button onClick={handleSaveContact} className={styles.vcardBtn}>
            📇 Save Contact (.vcf)
          </button>
          <button onClick={handleDownloadImage} className={styles.downloadImgBtn}>
            🖼️ Download as Image
          </button>
        </div>

        {/* Powered By Footer */}
        <footer className={styles.cardFooter}>
          <a
            href="http://localhost:3000"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.brandLink}
          >
            Powered by <strong>Card Villa</strong>
          </a>
        </footer>
      </div>
    </div>
  );
};
