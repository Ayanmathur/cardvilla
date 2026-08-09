import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { steamWispVariants, slideUpVariants } from '../../animations';
import { InvitationLayout, formatEventDate } from '../../invitation-layout';
import { partyKittySchema } from './schema';
import styles from './party-kitty.module.css';

const PartyKitty: React.FC<TemplateProps> = ({ data }) => {
  return (
    <InvitationLayout data={data} className={styles.container}>
      <div className={styles.content}>
        <motion.div className={styles.iconBox} custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
          <svg viewBox="0 0 100 80" width="80" height="64" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M20 20 L80 20 L75 50 Q50 65 25 50 Z M80 25 Q95 25 95 35 Q95 45 75 45" />
      </svg>
        </motion.div>
        
        <h1 className={styles.headline}>{data.event_title || "Ladies Kitty Party"}</h1>
        <p className={styles.subline}>Laughter, Tea & Good Times</p>
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
  name: "Kitty Party / Ladies' Gathering",
  componentKey: "party_kitty",
  description: "Kitty Party / Ladies' Gathering template for party",
  category: "party",
  motionTier: 1,
  styleTone: "Playful/Social",
};

registerTemplate({
  component: PartyKitty,
  schema: partyKittySchema,
  meta,
});

export default PartyKitty;
