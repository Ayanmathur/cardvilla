import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { fireworkBurstVariants, confettiPieceVariants, slideUpVariants } from '../../animations';
import { InvitationLayout, formatEventDate } from '../../invitation-layout';
import { festivalNewYearSchema } from './schema';
import styles from './festival-new-year.module.css';

const FestivalNewYear: React.FC<TemplateProps> = ({ data }) => {
  return (
    <InvitationLayout data={data} className={styles.container}>
      <div className={styles.content}>
        <motion.div className={styles.iconBox} custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
          <svg viewBox="0 0 100 80" width="80" height="64" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <circle cx="50" cy="40" r="5" />
        <path d="M50 15 L50 25 M50 55 L50 65 M25 40 L35 40 M65 40 L75 40" />
      </svg>
        </motion.div>
        
        <h1 className={styles.headline}>{data.greeting_line || "Happy New Year!"}</h1>
        <p className={styles.fromName}>{data.from_name || 'With Best Compliments'}</p>
        {data.from_business && <p className={styles.fromBiz}>{data.from_business}</p>}
        <div className={styles.details}>
          {data.message && <p className={styles.message} dangerouslySetInnerHTML={{ __html: data.message }}></p>}
        </div>
      </div>
    </InvitationLayout>
  );
};

export const meta: TemplateMeta = {
  name: "Happy New Year Wishes",
  componentKey: "festival_new_year",
  description: "Happy New Year Wishes template for festival",
  category: "festival",
  motionTier: 2,
  styleTone: "Celebratory/Sparkling",
};

registerTemplate({
  component: FestivalNewYear,
  schema: festivalNewYearSchema,
  meta,
});

export default FestivalNewYear;
