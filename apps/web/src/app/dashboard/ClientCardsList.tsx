'use client';

import React from 'react';
import Link from 'next/link';
import { CanvasRenderer } from '@/components/builder/CanvasRenderer';
import styles from './dashboard.module.css';

interface ClientCardsListProps {
  initialCards: any[];
}

export const ClientCardsList: React.FC<ClientCardsListProps> = ({ initialCards }) => {
  if (initialCards.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>🎴</div>
        <h3>No Business Cards Assigned Yet</h3>
        <p>
          You don't have an active digital business card assigned to your account yet. Contact your admin or support to get a card issued.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.cardsGrid}>
      {initialCards.map((card) => {
        const cardsDomain = process.env.NEXT_PUBLIC_CARDS_URL || 'http://localhost:3001';
        const publicCardUrl = `${cardsDomain}/${card.slug}`;
        const componentKey = card.template?.componentKey || card.template?.component_key;
        const encodedData = encodeURIComponent(JSON.stringify(card.data || {}));
        const previewUrl = componentKey ? `${cardsDomain}/preview/${componentKey}?data=${encodedData}` : null;
        const qrCodeApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
          publicCardUrl
        )}`;

        return (
          <div key={card.id} className={styles.cardItem}>
            {/* Real-time Component / Canvas Preview */}
            <div className={styles.canvasPreviewBox} style={{ overflow: 'hidden', position: 'relative' }}>
              {previewUrl ? (
                <iframe
                  src={previewUrl}
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    pointerEvents: 'none',
                    transform: 'scale(0.85)',
                    transformOrigin: 'top center',
                  }}
                  title="Card Preview"
                />
              ) : (
                <CanvasRenderer
                  canvasJson={card.template?.canvasJson}
                  data={card.data || {}}
                  scale={0.48}
                />
              )}
            </div>

            {/* Details & Actions */}
            <div className={styles.cardInfo}>
              <div className={styles.cardHeaderInfo}>
                <h3 className={styles.cardTitle}>
                  {card.data?.full_name || card.data?.company_name || card.template?.name || 'Digital Business Card'}
                </h3>
                <span className={styles.statusActive}>● Active</span>
              </div>

              <div className={styles.slugRow}>
                <span className={styles.slugLabel}>Share Link:</span>
                <a
                  href={publicCardUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.slugLink}
                >
                  {publicCardUrl}
                </a>
              </div>

              {/* QR Code Section */}
              <div className={styles.qrSection}>
                <div className={styles.qrBox}>
                  <img src={qrCodeApiUrl} alt="QR Code" className={styles.qrImage} />
                </div>
                <div className={styles.qrText}>
                  <span className={styles.qrTitle}>Print QR Code</span>
                  <p className={styles.qrDesc}>Scan to view live card</p>
                  <a
                    href={qrCodeApiUrl}
                    download={`${card.slug}_qrcode.png`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.downloadQrBtn}
                  >
                    ⬇️ Download QR Image
                  </a>
                </div>
              </div>

              {/* Primary Actions */}
              <div className={styles.cardActions}>
                <Link href={`/dashboard/cards/${card.id}/edit`} className={styles.editBtn}>
                  ✏️ Edit Card Content
                </Link>
                <a
                  href={publicCardUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.viewLiveBtn}
                >
                  🌐 View Live Card
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
