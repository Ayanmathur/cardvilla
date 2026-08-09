import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { flameGlowVariants, slideUpVariants } from '../../animations';
import { InvitationLayout, formatEventDate } from '../../invitation-layout';
import { weddingSikhAnandKarajSchema } from './schema';
import styles from './wedding-sikh-anand-karaj.module.css';

const WeddingSikhAnandKaraj: React.FC<TemplateProps> = ({ data }) => {
  return (
    <InvitationLayout data={data} className={styles.container}>
      <div className={styles.content}>
        <motion.div className={styles.iconBox} custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
          <svg viewBox="0 0 100 100" width="70" height="70">
        <circle cx="50" cy="50" r="30" stroke="var(--color-accent)" fill="none" strokeWidth="2" />
        <path d="M50 10 L50 90 M20 50 L80 50" stroke="var(--color-accent)" strokeWidth="2" />
      </svg>
        </motion.div>
        
        <h1 className={styles.headline}>{data.partner1_name || "Groom"} & {data.partner2_name || "Bride"}</h1>
        <p className={styles.subline}>Anand Karaj Ceremony</p>
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
  name: "Sikh Wedding — Anand Karaj",
  componentKey: "wedding_sikh_anand_karaj",
  description: "Sikh Wedding — Anand Karaj template for wedding",
  category: "wedding",
  motionTier: 1,
  styleTone: "Sacred/Elegant",
};

registerTemplate({
  component: WeddingSikhAnandKaraj,
  schema: weddingSikhAnandKarajSchema,
  meta,
});

export default WeddingSikhAnandKaraj;
