import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { strokeDrawVariants, slideUpVariants } from '../../animations';
import { InvitationLayout, formatEventDate } from '../../invitation-layout';
import { partyReunionSchema } from './schema';
import styles from './party-reunion.module.css';

const PartyReunion: React.FC<TemplateProps> = ({ data }) => {
  return (
    <InvitationLayout data={data} className={styles.container}>
      <div className={styles.content}>
        <motion.div className={styles.iconBox} custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
          <svg viewBox="0 0 100 60" width="80" height="48" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <circle cx="30" cy="30" r="12" />
        <circle cx="70" cy="30" r="12" />
        <circle cx="50" cy="45" r="12" />
      </svg>
        </motion.div>
        
        <h1 className={styles.headline}>{data.event_title || "Batch & Family Reunion"}</h1>
        <p className={styles.subline}>Reconnecting Old Memories</p>
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
  name: "Reunion / Get-Together",
  componentKey: "party_reunion",
  description: "Reunion / Get-Together template for party",
  category: "party",
  motionTier: 1,
  styleTone: "Nostalgic/Social",
};

registerTemplate({
  component: PartyReunion,
  schema: partyReunionSchema,
  meta,
});

export default PartyReunion;
