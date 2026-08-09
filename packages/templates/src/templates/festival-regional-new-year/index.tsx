import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { fireworkBurstVariants, slideUpVariants } from '../../animations';
import { InvitationLayout, formatEventDate } from '../../invitation-layout';
import { festivalRegionalNewYearSchema } from './schema';
import styles from './festival-regional-new-year.module.css';

const FestivalRegionalNewYear: React.FC<TemplateProps> = ({ data }) => {
  return (
    <InvitationLayout data={data} className={styles.container}>
      <div className={styles.content}>
        <motion.div className={styles.iconBox} custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
          <svg viewBox="0 0 100 80" width="80" height="64" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M50 10 L50 70 M50 10 L70 30 L50 50 Z" />
      </svg>
        </motion.div>
        
        <h1 className={styles.headline}>{data.greeting_line || "Happy Ugadi & Gudi Padwa!"}</h1>
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
  name: "Regional New Year (Gudi Padwa / Ugadi)",
  componentKey: "festival_regional_new_year",
  description: "Regional New Year (Gudi Padwa / Ugadi) template for festival",
  category: "festival",
  motionTier: 2,
  styleTone: "Traditional/Vibrant",
};

registerTemplate({
  component: FestivalRegionalNewYear,
  schema: festivalRegionalNewYearSchema,
  meta,
});

export default FestivalRegionalNewYear;
