import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { sparkleVariants, petalDriftVariants, slideUpVariants } from '../../animations';
import { InvitationLayout, formatEventDate } from '../../invitation-layout';
import { festivalChristmasSchema } from './schema';
import styles from './festival-christmas.module.css';

const FestivalChristmas: React.FC<TemplateProps> = ({ data }) => {
  return (
    <InvitationLayout data={data} className={styles.container}>
      <div className={styles.content}>
        <motion.div className={styles.iconBox} custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
          <svg viewBox="0 0 100 80" width="80" height="64" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M50 10 L25 40 L35 40 L15 65 L85 65 L65 40 L75 40 Z" fill="var(--color-accent)" opacity="0.3"/>
      </svg>
        </motion.div>
        
        <h1 className={styles.headline}>{data.greeting_line || "Merry Christmas & Happy New Year!"}</h1>
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
  name: "Merry Christmas",
  componentKey: "festival_christmas",
  description: "Merry Christmas template for festival",
  category: "festival",
  motionTier: 1,
  styleTone: "Winter/Classic",
};

registerTemplate({
  component: FestivalChristmas,
  schema: festivalChristmasSchema,
  meta,
});

export default FestivalChristmas;
