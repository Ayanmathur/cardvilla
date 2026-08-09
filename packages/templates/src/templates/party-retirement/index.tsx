import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { confettiPieceVariants, slideUpVariants } from '../../animations';
import { InvitationLayout, formatEventDate } from '../../invitation-layout';
import { partyRetirementSchema } from './schema';
import styles from './party-retirement.module.css';

const PartyRetirement: React.FC<TemplateProps> = ({ data }) => {
  return (
    <InvitationLayout data={data} className={styles.container}>
      <div className={styles.content}>
        <motion.div className={styles.iconBox} custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
          <svg viewBox="0 0 100 100" width="70" height="70" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <circle cx="50" cy="50" r="35" />
        <path d="M50 20 L50 50 L70 50" />
      </svg>
        </motion.div>
        
        <h1 className={styles.headline}>{data.event_title || "Retirement Celebration"}</h1>
        <p className={styles.subline}>Honoring {data.celebrant_name || "a Remarkable Career"}</p>
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
  name: "Retirement Party",
  componentKey: "party_retirement",
  description: "Retirement Party template for party",
  category: "party",
  motionTier: 1,
  styleTone: "Dignified/Festive",
};

registerTemplate({
  component: PartyRetirement,
  schema: partyRetirementSchema,
  meta,
});

export default PartyRetirement;
