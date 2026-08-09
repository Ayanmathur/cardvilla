import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { bloomVariants, slideUpVariants } from '../../animations';
import { InvitationLayout, formatEventDate } from '../../invitation-layout';
import { festivalBuddhaPurnimaSchema } from './schema';
import styles from './festival-buddha-purnima.module.css';

const FestivalBuddhaPurnima: React.FC<TemplateProps> = ({ data }) => {
  return (
    <InvitationLayout data={data} className={styles.container}>
      <div className={styles.content}>
        <motion.div className={styles.iconBox} custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
          <motion.svg custom={1} variants={bloomVariants} initial="hidden" animate="visible" viewBox="0 0 100 80" width="80" height="64" fill="var(--color-accent)">
        <circle cx="50" cy="40" r="15" />
        <circle cx="35" cy="40" r="10" />
        <circle cx="65" cy="40" r="10" />
      </motion.svg>
        </motion.div>
        
        <h1 className={styles.headline}>{data.greeting_line || "Happy Buddha Purnima!"}</h1>
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
  name: "Buddha Purnima Wishes",
  componentKey: "festival_buddha_purnima",
  description: "Buddha Purnima Wishes template for festival",
  category: "festival",
  motionTier: 1,
  styleTone: "Serene/Peaceful",
};

registerTemplate({
  component: FestivalBuddhaPurnima,
  schema: festivalBuddhaPurnimaSchema,
  meta,
});

export default FestivalBuddhaPurnima;
