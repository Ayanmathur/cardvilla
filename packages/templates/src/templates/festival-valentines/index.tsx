import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { floatUpVariants, slideUpVariants } from '../../animations';
import { InvitationLayout, formatEventDate } from '../../invitation-layout';
import { festivalValentinesSchema } from './schema';
import styles from './festival-valentines.module.css';

const FestivalValentines: React.FC<TemplateProps> = ({ data }) => {
  return (
    <InvitationLayout data={data} className={styles.container}>
      <div className={styles.content}>
        <motion.div className={styles.iconBox} custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
          <svg viewBox="0 0 100 80" width="80" height="64" fill="var(--color-accent)">
        <path d="M50 30 C30 10 10 30 30 50 L50 70 L70 50 C90 30 70 10 50 30 Z" />
      </svg>
        </motion.div>
        
        <h1 className={styles.headline}>{data.greeting_line || "Happy Valentine's Day!"}</h1>
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
  name: "Happy Valentine's Day",
  componentKey: "festival_valentines",
  description: "Happy Valentine's Day template for festival",
  category: "festival",
  motionTier: 1,
  styleTone: "Romantic/Pink",
};

registerTemplate({
  component: FestivalValentines,
  schema: festivalValentinesSchema,
  meta,
});

export default FestivalValentines;
