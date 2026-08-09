import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { strokeDrawVariants, slideUpVariants } from '../../animations';
import { InvitationLayout, formatEventDate } from '../../invitation-layout';
import { weddingBengaliSchema } from './schema';
import styles from './wedding-bengali.module.css';

const WeddingBengali: React.FC<TemplateProps> = ({ data }) => {
  return (
    <InvitationLayout data={data} className={styles.container}>
      <div className={styles.content}>
        <motion.div className={styles.iconBox} custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
          <motion.svg viewBox="0 0 100 100" width="70" height="70" custom={1} variants={strokeDrawVariants} initial="hidden" animate="visible" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <circle cx="50" cy="50" r="30" />
        <path d="M50 20 L50 10 M50 80 L50 90 M20 50 L10 50 M80 50 L90 50" />
      </motion.svg>
        </motion.div>
        
        <h1 className={styles.headline}>{data.partner1_name || "Groom"} & {data.partner2_name || "Bride"}</h1>
        <p className={styles.subline}>Biye Celebration</p>
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
  name: "Bengali Wedding",
  componentKey: "wedding_bengali",
  description: "Bengali Wedding template for wedding",
  category: "wedding",
  motionTier: 1,
  styleTone: "Traditional/Elegant",
};

registerTemplate({
  component: WeddingBengali,
  schema: weddingBengaliSchema,
  meta,
});

export default WeddingBengali;
