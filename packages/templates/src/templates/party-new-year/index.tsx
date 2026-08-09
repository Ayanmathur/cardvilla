import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { fireworkBurstVariants, confettiPieceVariants, slideUpVariants } from '../../animations';
import { InvitationLayout, formatEventDate } from '../../invitation-layout';
import { partyNewYearSchema } from './schema';
import styles from './party-new-year.module.css';

const PartyNewYear: React.FC<TemplateProps> = ({ data }) => {
  return (
    <InvitationLayout data={data} className={styles.container}>
      <div className={styles.content}>
        <motion.div className={styles.iconBox} custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
          <svg viewBox="0 0 100 100" width="70" height="70" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M50 10 L50 90 M10 50 L90 50 M20 20 L80 80 M20 80 L80 20" />
      </svg>
        </motion.div>
        
        <h1 className={styles.headline}>{data.event_title || "New Year Celebration"}</h1>
        <p className={styles.subline}>Welcome the New Year in Style</p>
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
  name: "New Year Bash",
  componentKey: "party_new_year",
  description: "New Year Bash template for party",
  category: "party",
  motionTier: 2,
  styleTone: "Festive/Sparkling",
};

registerTemplate({
  component: PartyNewYear,
  schema: partyNewYearSchema,
  meta,
});

export default PartyNewYear;
