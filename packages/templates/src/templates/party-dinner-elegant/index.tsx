import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { flameGlowVariants, slideUpVariants } from '../../animations';
import { InvitationLayout, formatEventDate } from '../../invitation-layout';
import { partyDinnerElegantSchema } from './schema';
import styles from './party-dinner-elegant.module.css';

const PartyDinnerElegant: React.FC<TemplateProps> = ({ data }) => {
  return (
    <InvitationLayout data={data} className={styles.container}>
      <div className={styles.content}>
        <motion.div className={styles.iconBox} custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
          <svg viewBox="0 0 100 60" width="80" height="48" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <circle cx="50" cy="30" r="22" />
        <line x1="20" y1="10" x2="20" y2="50" />
        <line x1="80" y1="10" x2="80" y2="50" />
      </svg>
        </motion.div>
        
        <h1 className={styles.headline}>{data.event_title || "An Evening of Fine Dining"}</h1>
        <p className={styles.subline}>Dinner & Conversation</p>
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
  name: "Elegant Dinner Party",
  componentKey: "party_dinner_elegant",
  description: "Elegant Dinner Party template for party",
  category: "party",
  motionTier: 0,
  styleTone: "Minimal/Classy",
};

registerTemplate({
  component: PartyDinnerElegant,
  schema: partyDinnerElegantSchema,
  meta,
});

export default PartyDinnerElegant;
