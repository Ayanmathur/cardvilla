import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { flameGlowVariants, slideUpVariants } from '../../animations';
import { InvitationLayout, formatEventDate } from '../../invitation-layout';
import { devotionalAkhandPathSchema } from './schema';
import styles from './devotional-akhand-path.module.css';

const DevotionalAkhandPath: React.FC<TemplateProps> = ({ data }) => {
  return (
    <InvitationLayout data={data} className={styles.container}>
      <div className={styles.content}>
        <motion.div className={styles.iconBox} custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
          <svg viewBox="0 0 100 100" width="70" height="70" fill="var(--color-accent)">
        <text x="50" y="65" fontSize="45" textAnchor="middle" fontFamily="serif" fontWeight="bold">ੴ</text>
      </svg>
        </motion.div>
        
        <h1 className={styles.headline}>{data.ceremony_title || "Sri Akhand Path Sahib"}</h1>
        <p className={styles.subline}>Waheguru Ji Ka Khalsa, Waheguru Ji Ki Fateh</p>
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
  name: "Akhand Path Sahib",
  componentKey: "devotional_akhand_path",
  description: "Akhand Path Sahib template for devotional",
  category: "devotional",
  motionTier: 1,
  styleTone: "Sacred/Reverent",
};

registerTemplate({
  component: DevotionalAkhandPath,
  schema: devotionalAkhandPathSchema,
  meta,
});

export default DevotionalAkhandPath;
