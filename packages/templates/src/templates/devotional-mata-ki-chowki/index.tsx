import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { flameGlowVariants, slideUpVariants } from '../../animations';
import { InvitationLayout, formatEventDate } from '../../invitation-layout';
import { devotionalMataKiChowkiSchema } from './schema';
import styles from './devotional-mata-ki-chowki.module.css';

const DevotionalMataKiChowki: React.FC<TemplateProps> = ({ data }) => {
  return (
    <InvitationLayout data={data} className={styles.container}>
      <div className={styles.content}>
        <motion.div className={styles.iconBox} custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
          <svg viewBox="0 0 100 80" width="80" height="64" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M50 10 L50 70 M35 25 L65 25 M30 15 L50 25 L70 15" />
      </svg>
        </motion.div>
        
        <h1 className={styles.headline}>{data.ceremony_title || "Mata Ki Chowki & Jagran"}</h1>
        <p className={styles.subline}>Jai Mata Di — Devotional Prayers</p>
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
  name: "Mata Ki Chowki",
  componentKey: "devotional_mata_ki_chowki",
  description: "Mata Ki Chowki template for devotional",
  category: "devotional",
  motionTier: 1,
  styleTone: "Devotional/Vibrant",
};

registerTemplate({
  component: DevotionalMataKiChowki,
  schema: devotionalMataKiChowkiSchema,
  meta,
});

export default DevotionalMataKiChowki;
