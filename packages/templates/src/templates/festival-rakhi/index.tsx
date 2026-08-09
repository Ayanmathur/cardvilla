import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { ribbonTieVariants, slideUpVariants } from '../../animations';
import { InvitationLayout, formatEventDate } from '../../invitation-layout';
import { festivalRakhiSchema } from './schema';
import styles from './festival-rakhi.module.css';

const FestivalRakhi: React.FC<TemplateProps> = ({ data }) => {
  return (
    <InvitationLayout data={data} className={styles.container}>
      <div className={styles.content}>
        <motion.div className={styles.iconBox} custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
          <svg viewBox="0 0 100 60" width="80" height="48" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <circle cx="50" cy="30" r="15" />
        <line x1="0" y1="30" x2="35" y2="30" />
        <line x1="65" y1="30" x2="100" y2="30" />
      </svg>
        </motion.div>
        
        <h1 className={styles.headline}>{data.greeting_line || "Happy Raksha Bandhan!"}</h1>
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
  name: "Raksha Bandhan Wishes",
  componentKey: "festival_rakhi",
  description: "Raksha Bandhan Wishes template for festival",
  category: "festival",
  motionTier: 1,
  styleTone: "Warm/Traditional",
};

registerTemplate({
  component: FestivalRakhi,
  schema: festivalRakhiSchema,
  meta,
});

export default FestivalRakhi;
