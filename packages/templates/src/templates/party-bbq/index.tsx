import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { flameFlickerVariants, slideUpVariants } from '../../animations';
import { InvitationLayout, formatEventDate } from '../../invitation-layout';
import { partyBbqSchema } from './schema';
import styles from './party-bbq.module.css';

const PartyBbq: React.FC<TemplateProps> = ({ data }) => {
  return (
    <InvitationLayout data={data} className={styles.container}>
      <div className={styles.content}>
        <motion.div className={styles.iconBox} custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
          <svg viewBox="0 0 100 80" width="80" height="64" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M20 30 Q50 60 80 30 M30 30 L30 70 M70 30 L70 70 M50 30 L50 70" />
      </svg>
        </motion.div>
        
        <h1 className={styles.headline}>{data.event_title || "BBQ & Grill Party"}</h1>
        <p className={styles.subline}>Good Food & Great Friends</p>
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
  name: "BBQ & Outdoor Grill Party",
  componentKey: "party_bbq",
  description: "BBQ & Outdoor Grill Party template for party",
  category: "party",
  motionTier: 1,
  styleTone: "Rustic/Fun",
};

registerTemplate({
  component: PartyBbq,
  schema: partyBbqSchema,
  meta,
});

export default PartyBbq;
