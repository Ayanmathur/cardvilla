import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { slideUpVariants, fadeInVariants } from '../../animations';
import { InvitationLayout, formatEventDate } from '../../invitation-layout';
import { weddingChristianSchema } from './schema';
import styles from './wedding-christian.module.css';

const WeddingChristian: React.FC<TemplateProps> = ({ data }) => {
  return (
    <InvitationLayout data={data} className={styles.container}>
      <div className={styles.content}>
        <motion.div className={styles.iconBox} custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
          <svg viewBox="0 0 100 60" width="80" height="48" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <circle cx="35" cy="30" r="20" />
        <circle cx="65" cy="30" r="20" />
      </svg>
        </motion.div>
        
        <h1 className={styles.headline}>{data.partner1_name || "Bride"} & {data.partner2_name || "Groom"}</h1>
        <p className={styles.subline}>Holy Matrimony</p>
        <div className={styles.details}>
          <p className={styles.date}>{formatEventDate(data.event_date || '2027-12-31')}</p>
          {data.event_time && <p className={styles.time}>{data.event_time}</p>}
          <p className={styles.venue}>{data.venue_name || 'Grand Event Venue'}</p>
          {data.message && <p className={styles.message} dangerouslySetInnerHTML={{ __html: data.message }}></p>}
        </div>
      </div>
    </InvitationLayout>
  );
};

export const meta: TemplateMeta = {
  name: "Christian Wedding",
  componentKey: "wedding_christian",
  description: "Christian Wedding template for wedding",
  category: "wedding",
  motionTier: 1,
  styleTone: "Classic/Minimal",
};

registerTemplate({
  component: WeddingChristian,
  schema: weddingChristianSchema,
  meta,
});

export default WeddingChristian;
