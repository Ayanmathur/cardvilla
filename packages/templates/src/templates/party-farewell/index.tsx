import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { slideUpVariants, fadeInVariants } from '../../animations';
import { InvitationLayout, formatEventDate } from '../../invitation-layout';
import { partyFarewellSchema } from './schema';
import styles from './party-farewell.module.css';

const PartyFarewell: React.FC<TemplateProps> = ({ data }) => {
  return (
    <InvitationLayout data={data} className={styles.container}>
      <div className={styles.content}>
        <motion.div className={styles.iconBox} custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
          <svg viewBox="0 0 100 80" width="80" height="64" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M10 70 L90 10 L50 50 Z" />
      </svg>
        </motion.div>
        
        <h1 className={styles.headline}>{data.event_title || "Farewell & Bon Voyage"}</h1>
        <p className={styles.subline}>Wishing You All the Best</p>
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
  name: "Farewell Party",
  componentKey: "party_farewell",
  description: "Farewell Party template for party",
  category: "party",
  motionTier: 1,
  styleTone: "Warm/Thoughtful",
};

registerTemplate({
  component: PartyFarewell,
  schema: partyFarewellSchema,
  meta,
});

export default PartyFarewell;
