import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { steamWispVariants, slideUpVariants } from '../../animations';
import { InvitationLayout, formatEventDate } from '../../invitation-layout';
import { partyCocktailSchema } from './schema';
import styles from './party-cocktail.module.css';

const PartyCocktail: React.FC<TemplateProps> = ({ data }) => {
  return (
    <InvitationLayout data={data} className={styles.container}>
      <div className={styles.content}>
        <motion.div className={styles.iconBox} custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
          <svg viewBox="0 0 100 100" width="70" height="70" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M20 20 L80 20 L50 60 L50 90 M30 90 L70 90" />
      </svg>
        </motion.div>
        
        <h1 className={styles.headline}>{data.event_title || "Cocktails & Celebration"}</h1>
        <p className={styles.subline}>Join Us for Drinks & Music</p>
        <div className={styles.details}>
          <p className={styles.date}>{formatEventDate(data.event_date || '2027-12-31')}</p>
          {data.event_time && <p className={styles.time}>{data.event_time}</p>}
          <p className={styles.venue}>{data.venue_name || 'Grand Event Hall'}</p>
          {data.message && <p className={styles.message} dangerouslySetInnerHTML={{ __html: data.message }}></p>}
        </div>
      </div>
    </InvitationLayout>
  );
};

export const meta: TemplateMeta = {
  name: "Cocktail & Glam Party",
  componentKey: "party_cocktail",
  description: "Cocktail & Glam Party template for party",
  category: "party",
  motionTier: 1,
  styleTone: "Glamorous/Dark",
};

registerTemplate({
  component: PartyCocktail,
  schema: partyCocktailSchema,
  meta,
});

export default PartyCocktail;
