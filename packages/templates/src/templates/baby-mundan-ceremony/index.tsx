import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { petalDriftVariants, slideUpVariants } from '../../animations';
import { InvitationLayout, formatEventDate } from '../../invitation-layout';
import { babyMundanCeremonySchema } from './schema';
import styles from './baby-mundan-ceremony.module.css';

const BabyMundanCeremony: React.FC<TemplateProps> = ({ data }) => {
  return (
    <InvitationLayout data={data} className={styles.container}>
      <div className={styles.content}>
        <motion.div className={styles.iconBox} custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
          <svg viewBox="0 0 100 60" width="80" height="48" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <circle cx="50" cy="30" r="20" />
      </svg>
        </motion.div>
        
        <h1 className={styles.headline}>{data.child_name || "Mundan Sanskar"}</h1>
        <p className={styles.subline}>First Haircut & Divine Blessings</p>
        <div className={styles.details}>
          <p className={styles.date}>{formatEventDate(data.event_date || '2027-12-31')}</p>
          {data.event_time && <p className={styles.time}>{data.event_time}</p>}
          <p className={styles.venue}>{data.venue_name || 'Grand Event Venue'}</p>
          {data.message && <p className={styles.message} dangerouslySetInnerHTML={{ __html: data.message }}></p>}
        </div>
      </div>
    </InvitationLayout>
  );
};

export const meta: TemplateMeta = {
  name: "Mundan Ceremony (Choolakarana)",
  componentKey: "baby_mundan_ceremony",
  description: "Mundan Ceremony (Choolakarana) template for baby-kids",
  category: "baby-kids",
  motionTier: 1,
  styleTone: "Traditional/Blessing",
};

registerTemplate({
  component: BabyMundanCeremony,
  schema: babyMundanCeremonySchema,
  meta,
});

export default BabyMundanCeremony;
