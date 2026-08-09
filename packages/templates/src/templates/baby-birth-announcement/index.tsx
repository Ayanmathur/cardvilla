import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { floatUpVariants, slideUpVariants } from '../../animations';
import { InvitationLayout, formatEventDate } from '../../invitation-layout';
import { babyBirthAnnouncementSchema } from './schema';
import styles from './baby-birth-announcement.module.css';

const BabyBirthAnnouncement: React.FC<TemplateProps> = ({ data }) => {
  return (
    <InvitationLayout data={data} className={styles.container}>
      <div className={styles.content}>
        <motion.div className={styles.iconBox} custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
          <svg viewBox="0 0 100 80" width="80" height="64" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <circle cx="50" cy="30" r="18" />
        <path d="M30 60 Q50 40 70 60" />
      </svg>
        </motion.div>
        
        <h1 className={styles.headline}>{data.child_name || "Welcome Little One"}</h1>
        <p className={styles.subline}>Our Precious Miracle Has Arrived</p>
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
  name: "Birth Announcement",
  componentKey: "baby_birth_announcement",
  description: "Birth Announcement template for baby-kids",
  category: "baby-kids",
  motionTier: 1,
  styleTone: "Joyful/Pastel",
};

registerTemplate({
  component: BabyBirthAnnouncement,
  schema: babyBirthAnnouncementSchema,
  meta,
});

export default BabyBirthAnnouncement;
