import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { floatBobVariants, slideUpVariants } from '../../animations';
import { InvitationLayout, formatEventDate } from '../../invitation-layout';
import { babyShowerSchema } from './schema';
import styles from './baby-shower.module.css';

const BabyShower: React.FC<TemplateProps> = ({ data }) => {
  return (
    <InvitationLayout data={data} className={styles.container}>
      <div className={styles.content}>
        <motion.div className={styles.iconBox} custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
          <svg viewBox="0 0 100 100" width="70" height="70" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <circle cx="50" cy="50" r="30" />
        <path d="M40 30 Q50 20 60 30" />
      </svg>
        </motion.div>
        
        <h1 className={styles.headline}>{data.child_name || "Baby Shower"}</h1>
        <p className={styles.subline}>Celebrating New Life & Joy</p>
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
  name: "Baby Shower",
  componentKey: "baby_shower",
  description: "Baby Shower template for baby-kids",
  category: "baby-kids",
  motionTier: 1,
  styleTone: "Soft/Playful",
};

registerTemplate({
  component: BabyShower,
  schema: babyShowerSchema,
  meta,
});

export default BabyShower;
