import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { glintVariants, sparkleVariants, slideUpVariants } from '../../animations';
import { InvitationLayout, formatEventDate } from '../../invitation-layout';
import { weddingEngagementRingSchema } from './schema';
import styles from './wedding-engagement-ring.module.css';

const WeddingEngagementRing: React.FC<TemplateProps> = ({ data }) => {
  return (
    <InvitationLayout data={data} className={styles.container}>
      <div className={styles.content}>
        <motion.div className={styles.iconBox} custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
          <svg viewBox="0 0 100 100" width="70" height="70" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <circle cx="50" cy="60" r="28" />
        <path d="M40 32 L60 32 L50 16 Z" />
      </svg>
        </motion.div>
        
        <h1 className={styles.headline}>{data.partner1_name || "Bride"} & {data.partner2_name || "Groom"}</h1>
        <p className={styles.subline}>Ring Ceremony & Engagement</p>
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
  name: "Engagement / Ring Ceremony",
  componentKey: "wedding_engagement_ring",
  description: "Engagement / Ring Ceremony template for wedding",
  category: "wedding",
  motionTier: 1,
  styleTone: "Elegant/Sparkly",
};

registerTemplate({
  component: WeddingEngagementRing,
  schema: weddingEngagementRingSchema,
  meta,
});

export default WeddingEngagementRing;
