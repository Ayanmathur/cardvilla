import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { strokeDrawVariants, slideUpVariants } from '../../animations';
import { InvitationLayout, formatEventDate } from '../../invitation-layout';
import { weddingMuslimNikahSchema } from './schema';
import styles from './wedding-muslim-nikah.module.css';

const WeddingMuslimNikah: React.FC<TemplateProps> = ({ data }) => {
  return (
    <InvitationLayout data={data} className={styles.container}>
      <div className={styles.content}>
        <motion.div className={styles.iconBox} custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
          <motion.svg viewBox="0 0 100 100" width="70" height="70" custom={1} variants={strokeDrawVariants} initial="hidden" animate="visible" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M60 20 A40 40 0 1 0 60 80 A30 30 0 1 1 60 20" />
      </motion.svg>
        </motion.div>
        
        <h1 className={styles.headline}>{data.partner1_name || "Groom"} & {data.partner2_name || "Bride"}</h1>
        <p className={styles.subline}>Nikah Ceremony</p>
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
  name: "Muslim Wedding — Nikah",
  componentKey: "wedding_muslim_nikah",
  description: "Muslim Wedding — Nikah template for wedding",
  category: "wedding",
  motionTier: 1,
  styleTone: "Geometric/Royal",
};

registerTemplate({
  component: WeddingMuslimNikah,
  schema: weddingMuslimNikahSchema,
  meta,
});

export default WeddingMuslimNikah;
