import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { waveVariants, slideUpVariants } from '../../animations';
import { InvitationLayout, formatEventDate } from '../../invitation-layout';
import { partyPoolSchema } from './schema';
import styles from './party-pool.module.css';

const PartyPool: React.FC<TemplateProps> = ({ data }) => {
  return (
    <InvitationLayout data={data} className={styles.container}>
      <div className={styles.content}>
        <motion.div className={styles.iconBox} custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
          <motion.svg custom={1} variants={waveVariants} initial="hidden" animate="animate" viewBox="0 0 100 40" width="80" height="32" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M0 10 Q25 0 50 10 T100 10 M0 25 Q25 15 50 25 T100 25" />
      </motion.svg>
        </motion.div>
        
        <h1 className={styles.headline}>{data.event_title || "Summer Pool Party"}</h1>
        <p className={styles.subline}>Splash, Sun & Fun</p>
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
  name: "Pool Party",
  componentKey: "party_pool",
  description: "Pool Party template for party",
  category: "party",
  motionTier: 1,
  styleTone: "Cool/Vibrant",
};

registerTemplate({
  component: PartyPool,
  schema: partyPoolSchema,
  meta,
});

export default PartyPool;
