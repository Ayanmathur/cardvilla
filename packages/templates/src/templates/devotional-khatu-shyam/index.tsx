import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { swayVariants, slideUpVariants } from '../../animations';
import { InvitationLayout, formatEventDate } from '../../invitation-layout';
import { devotionalKhatuShyamSchema } from './schema';
import styles from './devotional-khatu-shyam.module.css';

const DevotionalKhatuShyam: React.FC<TemplateProps> = ({ data }) => {
  return (
    <InvitationLayout data={data} className={styles.container}>
      <div className={styles.content}>
        <motion.div className={styles.iconBox} custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
          <svg viewBox="0 0 100 80" width="80" height="64" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M50 10 C30 30 70 50 50 80" />
      </svg>
        </motion.div>
        
        <h1 className={styles.headline}>{data.ceremony_title || "Khatu Shyam Bhajan Sandhya"}</h1>
        <p className={styles.subline}>Hare Ka Sahara — Baba Shyam Hamara</p>
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
  name: "Khatu Shyam Sandhya",
  componentKey: "devotional_khatu_shyam",
  description: "Khatu Shyam Sandhya template for devotional",
  category: "devotional",
  motionTier: 1,
  styleTone: "Royal Devotional",
};

registerTemplate({
  component: DevotionalKhatuShyam,
  schema: devotionalKhatuShyamSchema,
  meta,
});

export default DevotionalKhatuShyam;
