import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { flameGlowVariants, slideUpVariants } from '../../animations';
import { InvitationLayout, formatEventDate } from '../../invitation-layout';
import { devotionalSaiSandhyaSchema } from './schema';
import styles from './devotional-sai-sandhya.module.css';

const DevotionalSaiSandhya: React.FC<TemplateProps> = ({ data }) => {
  return (
    <InvitationLayout data={data} className={styles.container}>
      <div className={styles.content}>
        <motion.div className={styles.iconBox} custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
          <svg viewBox="0 0 100 70" width="80" height="56" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <ellipse cx="50" cy="45" rx="35" ry="15" />
        <path d="M40 30 Q50 10 60 30" />
      </svg>
        </motion.div>
        
        <h1 className={styles.headline}>{data.ceremony_title || "Sai Bhajan Sandhya"}</h1>
        <p className={styles.subline}>Om Sai Ram — Sabka Malik Ek</p>
        <div className={styles.details}>
          <p className={styles.date}>{formatEventDate(data.event_date || '2027-12-31')}</p>
          {data.event_time && <p className={styles.time}>{data.event_time}</p>}
          <p className={styles.venue}>{data.venue_name || 'Grand Event Hall'}</p>
          {data.message && <p className={styles.message} dangerouslySetInnerHTML={{ __html: data.message }}></p>}
        </div>
      </div>
    </InvitationLayout>
  );
};

export const meta: TemplateMeta = {
  name: "Sai Sandhya",
  componentKey: "devotional_sai_sandhya",
  description: "Sai Sandhya template for devotional",
  category: "devotional",
  motionTier: 1,
  styleTone: "Peaceful/Orange",
};

registerTemplate({
  component: DevotionalSaiSandhya,
  schema: devotionalSaiSandhyaSchema,
  meta,
});

export default DevotionalSaiSandhya;
