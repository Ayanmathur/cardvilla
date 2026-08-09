import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { floatUpVariants, slideUpVariants } from '../../animations';
import { InvitationLayout, formatEventDate } from '../../invitation-layout';
import { festivalChildrensDaySchema } from './schema';
import styles from './festival-childrens-day.module.css';

const FestivalChildrensDay: React.FC<TemplateProps> = ({ data }) => {
  return (
    <InvitationLayout data={data} className={styles.container}>
      <div className={styles.content}>
        <motion.div className={styles.iconBox} custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
          <svg viewBox="0 0 100 80" width="80" height="64" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <circle cx="50" cy="30" r="18" />
        <path d="M50 48 L50 80 M50 80 L35 65 M50 80 L65 65" />
      </svg>
        </motion.div>
        
        <h1 className={styles.headline}>{data.greeting_line || "Happy Children's Day!"}</h1>
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
  name: "Happy Children's Day",
  componentKey: "festival_childrens_day",
  description: "Happy Children's Day template for festival",
  category: "festival",
  motionTier: 1,
  styleTone: "Playful/Pastel",
};

registerTemplate({
  component: FestivalChildrensDay,
  schema: festivalChildrensDaySchema,
  meta,
});

export default FestivalChildrensDay;
