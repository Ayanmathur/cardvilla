import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { swayVariants, slideUpVariants } from '../../animations';
import { InvitationLayout, formatEventDate } from '../../invitation-layout';
import { babyKrishnaBirthdaySchema } from './schema';
import styles from './baby-krishna-birthday.module.css';

const BabyKrishnaBirthday: React.FC<TemplateProps> = ({ data }) => {
  return (
    <InvitationLayout data={data} className={styles.container}>
      <div className={styles.content}>
        <motion.div className={styles.iconBox} custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
          <svg viewBox="0 0 100 80" width="80" height="64" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M20 40 Q50 10 80 40 M40 50 Q50 60 60 50" />
      </svg>
        </motion.div>
        
        <h1 className={styles.headline}>{data.child_name || "Little Kanha's 1st Birthday"}</h1>
        <p className={styles.subline}>Turning 1 — Blessings & Celebration</p>
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
  name: "1st Birthday — Krishna Theme",
  componentKey: "baby_krishna_birthday",
  description: "1st Birthday — Krishna Theme template for baby-kids",
  category: "baby-kids",
  motionTier: 1,
  styleTone: "Devotional/Cute",
};

registerTemplate({
  component: BabyKrishnaBirthday,
  schema: babyKrishnaBirthdaySchema,
  meta,
});

export default BabyKrishnaBirthday;
