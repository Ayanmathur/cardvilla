import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { fadeInVariants, slideUpVariants } from '../../animations';
import { InvitationLayout, formatEventDate } from '../../invitation-layout';
import { partyAnniversarySchema } from './schema';
import styles from './party-anniversary.module.css';

const PartyAnniversary: React.FC<TemplateProps> = ({ data }) => {
  return (
    <InvitationLayout data={data} className={styles.container}>
      <div className={styles.content}>
        <motion.div className={styles.iconBox} custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
          <svg viewBox="0 0 100 60" width="80" height="48" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M30 40 C10 20 40 10 50 30 C60 10 90 20 70 40 L50 60 Z" fill="var(--color-accent)" opacity="0.3"/>
      </svg>
        </motion.div>
        
        <h1 className={styles.headline}>{data.event_title || "Anniversary Celebration"}</h1>
        <p className={styles.subline}>{data.celebrant_name || "Together in Love"}</p>
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
  name: "Anniversary Celebration",
  componentKey: "party_anniversary",
  description: "Anniversary Celebration template for party",
  category: "party",
  motionTier: 1,
  styleTone: "Warm/Romantic",
};

registerTemplate({
  component: PartyAnniversary,
  schema: partyAnniversarySchema,
  meta,
});

export default PartyAnniversary;
