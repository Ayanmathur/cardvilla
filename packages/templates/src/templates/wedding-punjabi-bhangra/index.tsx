import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { confettiPieceVariants, slideUpVariants } from '../../animations';
import { InvitationLayout, formatEventDate } from '../../invitation-layout';
import { weddingPunjabiBhangraSchema } from './schema';
import styles from './wedding-punjabi-bhangra.module.css';

const WeddingPunjabiBhangra: React.FC<TemplateProps> = ({ data }) => {
  return (
    <InvitationLayout data={data} className={styles.container}>
      <div className={styles.content}>
        <motion.div className={styles.iconBox} custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
          <svg viewBox="0 0 100 60" width="80" height="48" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <ellipse cx="50" cy="30" rx="40" ry="20" />
        <path d="M20 30 Q50 50 80 30" />
      </svg>
        </motion.div>
        
        <h1 className={styles.headline}>{data.partner1_name || "Groom"} & {data.partner2_name || "Bride"}</h1>
        <p className={styles.subline}>Grand Punjabi Wedding & Sangeet</p>
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
  name: "Punjabi / Bhangra Wedding",
  componentKey: "wedding_punjabi_bhangra",
  description: "Punjabi / Bhangra Wedding template for wedding",
  category: "wedding",
  motionTier: 2,
  styleTone: "Vibrant/Festive",
};

registerTemplate({
  component: WeddingPunjabiBhangra,
  schema: weddingPunjabiBhangraSchema,
  meta,
});

export default WeddingPunjabiBhangra;
