import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { swayVariants, slideUpVariants } from '../../animations';
import { InvitationLayout, formatEventDate } from '../../invitation-layout';
import { babyCradleCeremonySchema } from './schema';
import styles from './baby-cradle-ceremony.module.css';

const BabyCradleCeremony: React.FC<TemplateProps> = ({ data }) => {
  return (
    <InvitationLayout data={data} className={styles.container}>
      <div className={styles.content}>
        <motion.div className={styles.iconBox} custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
          <svg viewBox="0 0 100 80" width="80" height="64" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M20 30 Q50 60 80 30 M30 30 L30 10 M70 30 L70 10" />
      </svg>
        </motion.div>
        
        <h1 className={styles.headline}>{data.child_name || "Cradle Ceremony"}</h1>
        <p className={styles.subline}>Welcome Little Prince / Princess</p>
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
  name: "Cradle Ceremony (Jhula)",
  componentKey: "baby_cradle_ceremony",
  description: "Cradle Ceremony (Jhula) template for baby-kids",
  category: "baby-kids",
  motionTier: 1,
  styleTone: "Pastel/Sweet",
};

registerTemplate({
  component: BabyCradleCeremony,
  schema: babyCradleCeremonySchema,
  meta,
});

export default BabyCradleCeremony;
