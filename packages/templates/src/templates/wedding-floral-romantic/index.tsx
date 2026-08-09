import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { bloomVariants, slideUpVariants } from '../../animations';
import { InvitationLayout, formatEventDate } from '../../invitation-layout';
import { weddingFloralRomanticSchema } from './schema';
import styles from './wedding-floral-romantic.module.css';

const WeddingFloralRomantic: React.FC<TemplateProps> = ({ data }) => {
  return (
    <InvitationLayout data={data} className={styles.container}>
      <div className={styles.content}>
        <motion.div className={styles.iconBox} custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
          <motion.svg custom={1} variants={bloomVariants} initial="hidden" animate="visible" viewBox="0 0 100 100" width="70" height="70" fill="var(--color-accent)">
        <circle cx="50" cy="50" r="18" />
        <circle cx="50" cy="22" r="12" />
        <circle cx="50" cy="78" r="12" />
        <circle cx="22" cy="50" r="12" />
        <circle cx="78" cy="50" r="12" />
      </motion.svg>
        </motion.div>
        
        <h1 className={styles.headline}>{data.partner1_name || "Bride"} & {data.partner2_name || "Groom"}</h1>
        <p className={styles.subline}>Together Forever</p>
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
  name: "Floral Romantic Wedding",
  componentKey: "wedding_floral_romantic",
  description: "Floral Romantic Wedding template for wedding",
  category: "wedding",
  motionTier: 1,
  styleTone: "Soft/Romantic",
};

registerTemplate({
  component: WeddingFloralRomantic,
  schema: weddingFloralRomanticSchema,
  meta,
});

export default WeddingFloralRomantic;
