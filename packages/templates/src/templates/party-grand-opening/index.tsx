import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { confettiPieceVariants, slideUpVariants } from '../../animations';
import { InvitationLayout, formatEventDate } from '../../invitation-layout';
import { partyGrandOpeningSchema } from './schema';
import styles from './party-grand-opening.module.css';

const PartyGrandOpening: React.FC<TemplateProps> = ({ data }) => {
  return (
    <InvitationLayout data={data} className={styles.container}>
      <div className={styles.content}>
        <motion.div className={styles.iconBox} custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
          <svg viewBox="0 0 100 60" width="80" height="48" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M10 30 L90 30" strokeDasharray="4 4" />
        <circle cx="50" cy="30" r="10" />
      </svg>
        </motion.div>
        
        <h1 className={styles.headline}>{data.event_title || "Grand Opening Ceremony"}</h1>
        <p className={styles.subline}>You Are Cordially Invited</p>
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
  name: "Grand Opening",
  componentKey: "party_grand_opening",
  description: "Grand Opening template for party",
  category: "party",
  motionTier: 2,
  styleTone: "Bold/Commercial",
};

registerTemplate({
  component: PartyGrandOpening,
  schema: partyGrandOpeningSchema,
  meta,
});

export default PartyGrandOpening;
