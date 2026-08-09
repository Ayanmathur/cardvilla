import React from 'react';
import styles from './CenteredTextBlock.module.css';

export interface CenteredTextBlockProps {
  eyebrow?: string;
  headline: string;
  italicAccent?: string;
  subhead?: string;
  details?: Array<{ label?: string; value: string }>;
  className?: string;
}

export const CenteredTextBlock: React.FC<CenteredTextBlockProps> = ({
  eyebrow,
  headline,
  italicAccent,
  subhead,
  details = [],
  className,
}) => {
  return (
    <div className={`${styles.container} ${className || ''}`}>
      {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
      <h1 className={styles.headline}>{headline}</h1>
      {italicAccent && <p className={styles.italicAccent}>{italicAccent}</p>}
      {subhead && <p className={styles.subhead}>{subhead}</p>}

      <div className={styles.divider} />

      {details.length > 0 && (
        <div className={styles.detailsBlock}>
          {details.map((item, idx) => (
            <div key={idx} className={styles.detailRow}>
              {item.label && <span style={{ opacity: 0.75 }}>{item.label}:</span>}
              <span>{item.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CenteredTextBlock;
