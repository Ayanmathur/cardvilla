import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { strokeDrawVariants, flameGlowVariants, slideUpVariants } from '../../animations';
import { InvitationLayout, formatEventDate } from '../../invitation-layout';
import { festivalEidSchema } from './schema';
import styles from './festival-eid.module.css';

const FestivalEid: React.FC<TemplateProps> = ({ data }) => {
  return (
    <InvitationLayout data={data} className={styles.container}>
      <div className={styles.content}>
        <motion.div className={styles.iconBox} custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
          <svg viewBox="0 0 100 100" width="70" height="70" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M60 20 A40 40 0 1 0 60 80 A30 30 0 1 1 60 20" />
      </svg>
        </motion.div>
        
        <h1 className={styles.headline}>{data.greeting_line || "Eid Mubarak!"}</h1>
        <p className={styles.fromName}>{data.from_name || 'With Best Compliments'}</p>
        {data.from_business && <p className={styles.fromBiz}>{data.from_business}</p>}
        <div className={styles.details}>
          {data.message && <p className={styles.message} dangerouslySetInnerHTML={{ __html: data.message }}></p>}
        </div>
      </div>
    </InvitationLayout>
  );
};

export const meta: TemplateMeta = {
  name: "Eid Mubarak",
  componentKey: "festival_eid",
  description: "Eid Mubarak template for festival",
  category: "festival",
  motionTier: 1,
  styleTone: "Emerald/Royal",
};

registerTemplate({
  component: FestivalEid,
  schema: festivalEidSchema,
  meta,
});

export default FestivalEid;
