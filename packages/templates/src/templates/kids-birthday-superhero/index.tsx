import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { swayVariants, slideUpVariants } from '../../animations';
import { InvitationLayout, formatEventDate } from '../../invitation-layout';
import { kidsBirthdaySuperheroSchema } from './schema';
import styles from './kids-birthday-superhero.module.css';

const KidsBirthdaySuperhero: React.FC<TemplateProps> = ({ data }) => {
  return (
    <InvitationLayout data={data} className={styles.container}>
      <div className={styles.content}>
        <motion.div className={styles.iconBox} custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
          <svg viewBox="0 0 100 80" width="80" height="64" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M50 10 L80 30 L70 70 L50 90 L30 70 L20 30 Z" />
      </svg>
        </motion.div>
        
        <h1 className={styles.headline}>{data.child_name || "Superhero Birthday Party"}</h1>
        <p className={styles.subline}>Calling All Heroes to Celebrate!</p>
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
  name: "Kids Birthday — Superhero",
  componentKey: "kids_birthday_superhero",
  description: "Kids Birthday — Superhero template for baby-kids",
  category: "baby-kids",
  motionTier: 1,
  styleTone: "Action/Bold",
};

registerTemplate({
  component: KidsBirthdaySuperhero,
  schema: kidsBirthdaySuperheroSchema,
  meta,
});

export default KidsBirthdaySuperhero;
