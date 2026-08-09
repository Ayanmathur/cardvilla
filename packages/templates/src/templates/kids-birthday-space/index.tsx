import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { sparkleVariants, slideUpVariants } from '../../animations';
import { InvitationLayout, formatEventDate } from '../../invitation-layout';
import { kidsBirthdaySpaceSchema } from './schema';
import styles from './kids-birthday-space.module.css';

const KidsBirthdaySpace: React.FC<TemplateProps> = ({ data }) => {
  return (
    <InvitationLayout data={data} className={styles.container}>
      <div className={styles.content}>
        <motion.div className={styles.iconBox} custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
          <svg viewBox="0 0 100 80" width="80" height="64" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M50 10 Q70 40 50 80 Q30 40 50 10 Z" />
      </svg>
        </motion.div>
        
        <h1 className={styles.headline}>{data.child_name || "Blast Off Birthday Party!"}</h1>
        <p className={styles.subline}>Exploring 3.. 2.. 1.. Liftoff!</p>
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
  name: "Kids Birthday — Space Explorer",
  componentKey: "kids_birthday_space",
  description: "Kids Birthday — Space Explorer template for baby-kids",
  category: "baby-kids",
  motionTier: 2,
  styleTone: "Futuristic/Dark",
};

registerTemplate({
  component: KidsBirthdaySpace,
  schema: kidsBirthdaySpaceSchema,
  meta,
});

export default KidsBirthdaySpace;
