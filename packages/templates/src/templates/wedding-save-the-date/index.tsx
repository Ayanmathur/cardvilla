import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { slideUpVariants } from '../../animations';
import { InvitationLayout, formatEventDate } from '../../invitation-layout';
import { weddingSaveTheDateSchema } from './schema';
import styles from './wedding-save-the-date.module.css';

const WeddingSaveTheDate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <InvitationLayout data={data} className={styles.container}>
      <div className={styles.content}>
        <motion.div className={styles.iconBox} custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
          <svg viewBox="0 0 100 100" width="60" height="60" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <rect x="20" y="25" width="60" height="60" rx="5" />
        <path d="M20 45 L80 45 M35 15 L35 35 M65 15 L65 35" />
      </svg>
        </motion.div>
        
        <h1 className={styles.headline}>{data.partner1_name || "Bride"} & {data.partner2_name || "Groom"}</h1>
        <p className={styles.subline}>Save The Date</p>
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
  name: "Save-the-Date / Countdown",
  componentKey: "wedding_save_the_date",
  description: "Save-the-Date / Countdown template for wedding",
  category: "wedding",
  motionTier: 1,
  styleTone: "Neutral/Elegant",
};

registerTemplate({
  component: WeddingSaveTheDate,
  schema: weddingSaveTheDateSchema,
  meta,
});

export default WeddingSaveTheDate;
