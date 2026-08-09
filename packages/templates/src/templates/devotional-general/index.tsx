import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { flameFlickerVariants, slideUpVariants } from '../../animations';
import { InvitationLayout, formatEventDate } from '../../invitation-layout';
import { devotionalGeneralSchema } from './schema';
import styles from './devotional-general.module.css';

const DevotionalGeneral: React.FC<TemplateProps> = ({ data }) => {
  return (
    <InvitationLayout data={data} className={styles.container}>
      <div className={styles.content}>
        <motion.div className={styles.iconBox} custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
          <svg viewBox="0 0 100 60" width="80" height="48" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <circle cx="50" cy="30" r="20" />
      </svg>
        </motion.div>
        
        <h1 className={styles.headline}>{data.ceremony_title || "Auspicious Devotional Ceremony"}</h1>
        <p className={styles.subline}>Blessings & Warm Welcome</p>
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
  name: "Universal Devotional Invitation",
  componentKey: "devotional_general",
  description: "Universal Devotional Invitation template for devotional",
  category: "devotional",
  motionTier: 1,
  styleTone: "Universal/Cream",
};

registerTemplate({
  component: DevotionalGeneral,
  schema: devotionalGeneralSchema,
  meta,
});

export default DevotionalGeneral;
