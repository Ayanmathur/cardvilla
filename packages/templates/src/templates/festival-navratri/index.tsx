import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { sparkleVariants, slideUpVariants } from '../../animations';
import { InvitationLayout, formatEventDate } from '../../invitation-layout';
import { festivalNavratriSchema } from './schema';
import styles from './festival-navratri.module.css';

const FestivalNavratri: React.FC<TemplateProps> = ({ data }) => {
  return (
    <InvitationLayout data={data} className={styles.container}>
      <div className={styles.content}>
        <motion.div className={styles.iconBox} custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
          <svg viewBox="0 0 100 80" width="80" height="64" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <line x1="20" y1="10" x2="80" y2="70" />
        <line x1="80" y1="10" x2="20" y2="70" />
      </svg>
        </motion.div>
        
        <h1 className={styles.headline}>{data.greeting_line || "Shubh Navratri!"}</h1>
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
  name: "Navratri & Garba Wishes",
  componentKey: "festival_navratri",
  description: "Navratri & Garba Wishes template for festival",
  category: "festival",
  motionTier: 2,
  styleTone: "Vibrant/Garba",
};

registerTemplate({
  component: FestivalNavratri,
  schema: festivalNavratriSchema,
  meta,
});

export default FestivalNavratri;
