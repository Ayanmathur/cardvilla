import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { confettiPieceVariants, slideUpVariants } from '../../animations';
import { InvitationLayout, formatEventDate } from '../../invitation-layout';
import { festivalHoliSchema } from './schema';
import styles from './festival-holi.module.css';

const FestivalHoli: React.FC<TemplateProps> = ({ data }) => {
  return (
    <InvitationLayout data={data} className={styles.container}>
      <div className={styles.content}>
        <motion.div className={styles.iconBox} custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
          <svg viewBox="0 0 100 80" width="80" height="64" fill="var(--color-accent)">
        <circle cx="30" cy="40" r="20" fill="#00BCD4" opacity="0.8"/>
        <circle cx="70" cy="40" r="20" fill="#FFEB3B" opacity="0.8"/>
        <circle cx="50" cy="30" r="20" fill="#E91E63" opacity="0.8"/>
      </svg>
        </motion.div>
        
        <h1 className={styles.headline}>{data.greeting_line || "Happy Holi!"}</h1>
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
  name: "Holi Festival Wishes",
  componentKey: "festival_holi",
  description: "Holi Festival Wishes template for festival",
  category: "festival",
  motionTier: 2,
  styleTone: "Vibrant/Rainbow",
};

registerTemplate({
  component: FestivalHoli,
  schema: festivalHoliSchema,
  meta,
});

export default FestivalHoli;
