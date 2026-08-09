import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { slideUpVariants, fadeInVariants } from '../../animations';
import { InvitationLayout, formatEventDate } from '../../invitation-layout';
import { weddingModernMinimalSchema } from './schema';
import styles from './wedding-modern-minimal.module.css';

const WeddingModernMinimal: React.FC<TemplateProps> = ({ data }) => {
  return (
    <InvitationLayout data={data} className={styles.container}>
      <div className={styles.content}>
        <motion.div className={styles.iconBox} custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
          <svg viewBox="0 0 100 100" width="60" height="60" stroke="var(--color-accent)" fill="none" strokeWidth="1">
        <path d="M10 10 L40 10 L40 40" />
        <path d="M90 90 L60 90 L60 60" />
      </svg>
        </motion.div>
        
        <h1 className={styles.headline}>{data.partner1_name || "Bride"} & {data.partner2_name || "Groom"}</h1>
        <p className={styles.subline}>Wedding Ceremony & Reception</p>
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
  name: "Modern Minimalist Wedding",
  componentKey: "wedding_modern_minimal",
  description: "Modern Minimalist Wedding template for wedding",
  category: "wedding",
  motionTier: 0,
  styleTone: "Modern/Clean",
};

registerTemplate({
  component: WeddingModernMinimal,
  schema: weddingModernMinimalSchema,
  meta,
});

export default WeddingModernMinimal;
