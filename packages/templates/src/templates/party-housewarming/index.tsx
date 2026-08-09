import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { flameFlickerVariants, slideUpVariants } from '../../animations';
import { InvitationLayout, formatEventDate } from '../../invitation-layout';
import { partyHousewarmingSchema } from './schema';
import styles from './party-housewarming.module.css';

const PartyHousewarming: React.FC<TemplateProps> = ({ data }) => {
  return (
    <InvitationLayout data={data} className={styles.container}>
      <div className={styles.content}>
        <motion.div className={styles.iconBox} custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
          <svg viewBox="0 0 100 100" width="70" height="70" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M10 50 L50 15 L90 50 L80 50 L80 85 L20 85 L20 50 Z" />
        <rect x="40" y="60" width="20" height="25" fill="var(--color-accent)" opacity="0.4"/>
      </svg>
        </motion.div>
        
        <h1 className={styles.headline}>{data.event_title || "Griha Pravesh & Housewarming"}</h1>
        <p className={styles.subline}>Welcome to Our New Home</p>
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
  name: "Housewarming (Griha Pravesh)",
  componentKey: "party_housewarming",
  description: "Housewarming (Griha Pravesh) template for party",
  category: "party",
  motionTier: 1,
  styleTone: "Warm/Inviting",
};

registerTemplate({
  component: PartyHousewarming,
  schema: partyHousewarmingSchema,
  meta,
});

export default PartyHousewarming;
