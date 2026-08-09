import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { strokeDrawVariants, slideUpVariants } from '../../animations';
import { InvitationLayout, formatEventDate } from '../../invitation-layout';
import { weddingSouthIndianSchema } from './schema';
import styles from './wedding-south-indian.module.css';

const WeddingSouthIndian: React.FC<TemplateProps> = ({ data }) => {
  return (
    <InvitationLayout data={data} className={styles.container}>
      <div className={styles.content}>
        <motion.div className={styles.iconBox} custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
          <motion.svg viewBox="0 0 100 100" width="70" height="70" custom={1} variants={strokeDrawVariants} initial="hidden" animate="visible" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <rect x="25" y="25" width="50" height="50" transform="rotate(45 50 50)" />
      </motion.svg>
        </motion.div>
        
        <h1 className={styles.headline}>{data.partner1_name || "Groom"} & {data.partner2_name || "Bride"}</h1>
        <p className={styles.subline}>Kalyanam Celebration</p>
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
  name: "South Indian Wedding",
  componentKey: "wedding_south_indian",
  description: "South Indian Wedding template for wedding",
  category: "wedding",
  motionTier: 1,
  styleTone: "Traditional/Vibrant",
};

registerTemplate({
  component: WeddingSouthIndian,
  schema: weddingSouthIndianSchema,
  meta,
});

export default WeddingSouthIndian;
