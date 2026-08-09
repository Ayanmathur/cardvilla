import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { flameFlickerVariants, petalDriftVariants, slideUpVariants } from '../../animations';
import { InvitationLayout, formatEventDate } from '../../invitation-layout';
import { weddingHinduMandapSchema } from './schema';
import styles from './wedding-hindu-mandap.module.css';

const WeddingHinduMandap: React.FC<TemplateProps> = ({ data }) => {
  return (
    <InvitationLayout data={data} className={styles.container}>
      <div className={styles.content}>
        <motion.div className={styles.iconBox} custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
          <svg viewBox="0 0 100 50" width="80" height="40">
        <path d="M10 25 Q50 50 90 25" stroke="var(--color-accent)" fill="none" strokeWidth="2" />
        <motion.path d="M45 20 Q50 5 55 20 Q50 25 45 20" fill="var(--color-accent)" variants={flameFlickerVariants} initial="idle" animate="idle" />
      </svg>
        </motion.div>
        
        <h1 className={styles.headline}>{data.partner1_name || "Partner 1"} & {data.partner2_name || "Partner 2"}</h1>
        <p className={styles.subline}>{data.partner1_family} {data.partner1_family && data.partner2_family && "&"} {data.partner2_family}</p>
        <div className={styles.details}>
          <p className={styles.date}>{formatEventDate(data.event_date || '2027-12-31')}</p>
          {data.event_time && <p className={styles.time}>{data.event_time}</p>}
          <p className={styles.venue}>{data.venue_name || 'Grand Event Venue'}</p>
          {data.message && <p className={styles.message} dangerouslySetInnerHTML={{ __html: data.message }}></p>}
        </div>
      </div>
    </InvitationLayout>
  );
};

export const meta: TemplateMeta = {
  name: "Hindu Wedding — Mandap",
  componentKey: "wedding_hindu_mandap",
  description: "Hindu Wedding — Mandap template for wedding",
  category: "wedding",
  motionTier: 1,
  styleTone: "Traditional/Ornate",
};

registerTemplate({
  component: WeddingHinduMandap,
  schema: weddingHinduMandapSchema,
  meta,
});

export default WeddingHinduMandap;
