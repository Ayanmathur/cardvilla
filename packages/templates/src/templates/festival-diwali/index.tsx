import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { flameFlickerVariants, fireworkBurstVariants, slideUpVariants } from '../../animations';
import { InvitationLayout, formatEventDate } from '../../invitation-layout';
import { festivalDiwaliSchema } from './schema';
import styles from './festival-diwali.module.css';

const FestivalDiwali: React.FC<TemplateProps> = ({ data }) => {
  return (
    <InvitationLayout data={data} className={styles.container}>
      <div className={styles.content}>
        <motion.div className={styles.iconBox} custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
          <svg viewBox="0 0 100 50" width="80" height="40">
        <path d="M10 25 Q50 50 90 25" stroke="var(--color-accent)" fill="none" strokeWidth="2" />
        <motion.path d="M45 20 Q50 5 55 20 Q50 25 45 20" fill="var(--color-accent)" variants={flameFlickerVariants} initial="idle" animate="idle" />
      </svg>
        </motion.div>
        
        <h1 className={styles.headline}>{data.greeting_line || "Happy & Prosperous Diwali!"}</h1>
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
  name: "Diwali Wishes",
  componentKey: "festival_diwali",
  description: "Diwali Wishes template for festival",
  category: "festival",
  motionTier: 2,
  styleTone: "Festive/Golden",
};

registerTemplate({
  component: FestivalDiwali,
  schema: festivalDiwaliSchema,
  meta,
});

export default FestivalDiwali;
