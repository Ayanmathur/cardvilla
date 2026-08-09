import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { fadeInVariants, slideUpVariants } from '../../animations';
import { InvitationLayout, formatEventDate } from '../../invitation-layout';
import { babyPregnancyAnnouncementSchema } from './schema';
import styles from './baby-pregnancy-announcement.module.css';

const BabyPregnancyAnnouncement: React.FC<TemplateProps> = ({ data }) => {
  return (
    <InvitationLayout data={data} className={styles.container}>
      <div className={styles.content}>
        <motion.div className={styles.iconBox} custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
          <svg viewBox="0 0 100 60" width="80" height="48" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M30 40 Q40 20 50 40 Q60 20 70 40" />
      </svg>
        </motion.div>
        
        <h1 className={styles.headline}>{data.child_name || "We Are Expecting!"}</h1>
        <p className={styles.subline}>Our Family is Growing by Two Feet</p>
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
  name: "Pregnancy Announcement",
  componentKey: "baby_pregnancy_announcement",
  description: "Pregnancy Announcement template for baby-kids",
  category: "baby-kids",
  motionTier: 1,
  styleTone: "Soft/GenderNeutral",
};

registerTemplate({
  component: BabyPregnancyAnnouncement,
  schema: babyPregnancyAnnouncementSchema,
  meta,
});

export default BabyPregnancyAnnouncement;
