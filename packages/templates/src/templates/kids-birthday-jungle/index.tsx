import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { slideUpVariants, fadeInVariants } from '../../animations';
import { InvitationLayout, formatEventDate } from '../../invitation-layout';
import { kidsBirthdayJungleSchema } from './schema';
import styles from './kids-birthday-jungle.module.css';

const KidsBirthdayJungle: React.FC<TemplateProps> = ({ data }) => {
  return (
    <InvitationLayout data={data} className={styles.container}>
      <div className={styles.content}>
        <motion.div className={styles.iconBox} custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
          <svg viewBox="0 0 100 80" width="80" height="64" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M20 70 C20 40 50 20 80 70" />
      </svg>
        </motion.div>
        
        <h1 className={styles.headline}>{data.child_name || "Jungle Safari Party"}</h1>
        <p className={styles.subline}>Get Ready for a Wild Adventure!</p>
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
  name: "Kids Birthday — Jungle Safari",
  componentKey: "kids_birthday_jungle",
  description: "Kids Birthday — Jungle Safari template for baby-kids",
  category: "baby-kids",
  motionTier: 2,
  styleTone: "Wild/Fun",
};

registerTemplate({
  component: KidsBirthdayJungle,
  schema: kidsBirthdayJungleSchema,
  meta,
});

export default KidsBirthdayJungle;
