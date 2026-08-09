import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { flameGlowVariants, slideUpVariants } from '../../animations';
import { InvitationLayout, formatEventDate } from '../../invitation-layout';
import { festivalGurpurabSchema } from './schema';
import styles from './festival-gurpurab.module.css';

const FestivalGurpurab: React.FC<TemplateProps> = ({ data }) => {
  return (
    <InvitationLayout data={data} className={styles.container}>
      <div className={styles.content}>
        <motion.div className={styles.iconBox} custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
          <svg viewBox="0 0 100 100" width="70" height="70" fill="var(--color-accent)">
        <text x="50" y="65" fontSize="45" textAnchor="middle" fontFamily="serif" fontWeight="bold">ੴ</text>
      </svg>
        </motion.div>
        
        <h1 className={styles.headline}>{data.greeting_line || "Happy Gurpurab!"}</h1>
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
  name: "Guru Nanak Gurpurab",
  componentKey: "festival_gurpurab",
  description: "Guru Nanak Gurpurab template for festival",
  category: "festival",
  motionTier: 1,
  styleTone: "Sacred/Golden",
};

registerTemplate({
  component: FestivalGurpurab,
  schema: festivalGurpurabSchema,
  meta,
});

export default FestivalGurpurab;
