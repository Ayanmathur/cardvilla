import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { sparkleVariants, slideUpVariants } from '../../animations';
import { InvitationLayout, formatEventDate } from '../../invitation-layout';
import { weddingRajasthaniRoyalSchema } from './schema';
import styles from './wedding-rajasthani-royal.module.css';

const WeddingRajasthaniRoyal: React.FC<TemplateProps> = ({ data }) => {
  return (
    <InvitationLayout data={data} className={styles.container}>
      <div className={styles.content}>
        <motion.div className={styles.iconBox} custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
          <svg viewBox="0 0 100 100" width="70" height="70" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M20 100 L20 50 Q50 10 80 50 L80 100" />
      </svg>
        </motion.div>
        
        <h1 className={styles.headline}>{data.partner1_name || "Groom"} & {data.partner2_name || "Bride"}</h1>
        <p className={styles.subline}>Royal Wedding Celebration</p>
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
  name: "Rajasthani Royal Wedding",
  componentKey: "wedding_rajasthani_royal",
  description: "Rajasthani Royal Wedding template for wedding",
  category: "wedding",
  motionTier: 1,
  styleTone: "Royal/Ornate",
};

registerTemplate({
  component: WeddingRajasthaniRoyal,
  schema: weddingRajasthaniRoyalSchema,
  meta,
});

export default WeddingRajasthaniRoyal;
