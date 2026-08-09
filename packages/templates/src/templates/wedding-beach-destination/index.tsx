import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { waveVariants, slideUpVariants } from '../../animations';
import { InvitationLayout, formatEventDate } from '../../invitation-layout';
import { weddingBeachDestinationSchema } from './schema';
import styles from './wedding-beach-destination.module.css';

const WeddingBeachDestination: React.FC<TemplateProps> = ({ data }) => {
  return (
    <InvitationLayout data={data} className={styles.container}>
      <div className={styles.content}>
        <motion.div className={styles.iconBox} custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
          <motion.svg custom={1} variants={waveVariants} initial="hidden" animate="animate" viewBox="0 0 100 40" width="80" height="32" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M0 20 Q12.5 10 25 20 T50 20 T75 20 T100 20" />
      </motion.svg>
        </motion.div>
        
        <h1 className={styles.headline}>{data.partner1_name || "Bride"} & {data.partner2_name || "Groom"}</h1>
        <p className={styles.subline}>Destination Wedding by the Ocean</p>
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
  name: "Destination / Beach Wedding",
  componentKey: "wedding_beach_destination",
  description: "Destination / Beach Wedding template for wedding",
  category: "wedding",
  motionTier: 1,
  styleTone: "Relaxed/Scenic",
};

registerTemplate({
  component: WeddingBeachDestination,
  schema: weddingBeachDestinationSchema,
  meta,
});

export default WeddingBeachDestination;
