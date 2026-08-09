import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { bloomVariants, slideUpVariants } from '../../animations';
import { InvitationLayout, formatEventDate } from '../../invitation-layout';
import { devotionalSatsangSchema } from './schema';
import styles from './devotional-satsang.module.css';

const DevotionalSatsang: React.FC<TemplateProps> = ({ data }) => {
  return (
    <InvitationLayout data={data} className={styles.container}>
      <div className={styles.content}>
        <motion.div className={styles.iconBox} custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
          <motion.svg custom={1} variants={bloomVariants} initial="hidden" animate="visible" viewBox="0 0 100 80" width="80" height="64" fill="var(--color-accent)">
        <ellipse cx="50" cy="50" rx="30" ry="15" />
        <ellipse cx="50" cy="50" rx="15" ry="30" />
      </motion.svg>
        </motion.div>
        
        <h1 className={styles.headline}>{data.ceremony_title || "Shrimad Bhagwat Katha & Satsang"}</h1>
        <p className={styles.subline}>Divine Discourse & Bhajan Sandhya</p>
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
  name: "Satsang / Bhagwat Katha",
  componentKey: "devotional_satsang",
  description: "Satsang / Bhagwat Katha template for devotional",
  category: "devotional",
  motionTier: 1,
  styleTone: "Serene/Devotional",
};

registerTemplate({
  component: DevotionalSatsang,
  schema: devotionalSatsangSchema,
  meta,
});

export default DevotionalSatsang;
