import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { fadeInVariants, slideUpVariants } from '../../animations';
import { InvitationLayout, formatEventDate } from '../../invitation-layout';
import { devotionalShraddhSchema } from './schema';
import styles from './devotional-shraddh.module.css';

const DevotionalShraddh: React.FC<TemplateProps> = ({ data }) => {
  return (
    <InvitationLayout data={data} className={styles.container}>
      <div className={styles.content}>
        <motion.div className={styles.iconBox} custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
          <svg viewBox="0 0 100 80" width="80" height="64" stroke="var(--color-accent)" fill="none" strokeWidth="1">
        <path d="M50 20 L50 60 M30 40 L70 40" />
      </svg>
        </motion.div>
        
        <h1 className={styles.headline}>{data.ceremony_title || "Prayer Meeting & Tribute"}</h1>
        <p className={styles.subline}>In Loving Memory & Homage</p>
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
  name: "Prayer Meet & Shraddh",
  componentKey: "devotional_shraddh",
  description: "Prayer Meet & Shraddh template for devotional",
  category: "devotional",
  motionTier: 0,
  styleTone: "Solemn/Restrained",
};

registerTemplate({
  component: DevotionalShraddh,
  schema: devotionalShraddhSchema,
  meta,
});

export default DevotionalShraddh;
