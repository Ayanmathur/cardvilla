import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { flameFlickerVariants, slideUpVariants } from '../../animations';
import { InvitationLayout, formatEventDate } from '../../invitation-layout';
import { festivalBhaiDoojSchema } from './schema';
import styles from './festival-bhai-dooj.module.css';

const FestivalBhaiDooj: React.FC<TemplateProps> = ({ data }) => {
  return (
    <InvitationLayout data={data} className={styles.container}>
      <div className={styles.content}>
        <motion.div className={styles.iconBox} custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
          <svg viewBox="0 0 100 60" width="80" height="48" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <circle cx="50" cy="30" r="18" />
        <path d="M50 15 L50 45" />
      </svg>
        </motion.div>
        
        <h1 className={styles.headline}>{data.greeting_line || "Happy Bhai Dooj!"}</h1>
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
  name: "Bhai Dooj Wishes",
  componentKey: "festival_bhai_dooj",
  description: "Bhai Dooj Wishes template for festival",
  category: "festival",
  motionTier: 1,
  styleTone: "Traditional/Family",
};

registerTemplate({
  component: FestivalBhaiDooj,
  schema: festivalBhaiDoojSchema,
  meta,
});

export default FestivalBhaiDooj;
