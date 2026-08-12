import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { ScrollLayout } from '../../components/ScrollLayout';
import { HeroSection } from '../../sections/HeroSection';
import { ScheduleSection } from '../../sections/ScheduleSection';
import { VenueSection } from '../../sections/VenueSection';
import { ClosingSection } from '../../sections/ClosingSection';
import { fadeInVariants, slideUpVariants  } from '../../animations';
import { devotionalGaneshChaturthiSchema, devotionalGaneshChaturthiSectionedSchema } from './schema';
import styles from './devotional-ganesh-chaturthi.module.css';

const DevotionalGaneshChaturthi: React.FC<TemplateProps> = ({ data }) => {
  const motif = (
    <div className={styles.motif}>
      <motion.div custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
        <svg viewBox="0 0 100 80" width="80" height="64" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M30 30 Q50 10 70 30 Q50 70 30 30 Z" />
      </svg>
      </motion.div>
    </div>
  );

  return (
    <ScrollLayout data={data} className={styles.container} accentColor="var(--color-accent)">
      <HeroSection data={data} accentColor="var(--color-accent)" textColor="var(--color-text)" motifSlot={motif} />
      <div className={styles.altBg}>
        <ScheduleSection data={data} accentColor="var(--color-accent)" />
      </div>
      <VenueSection data={data} accentColor="var(--color-accent)" />
      <ClosingSection data={data} accentColor="var(--color-accent)" />
    </ScrollLayout>
  );
};

export const meta: TemplateMeta = {
  name: "Ganesh Sthapana & Puja",
  componentKey: "devotional_ganesh_chaturthi",
  description: "Ganesh Sthapana & Puja template for devotional",
  category: "devotional",
  motionTier: 1,
  styleTone: "Auspicious/Traditional",
  sections: ['hero', 'schedule', 'venue', 'closing']
};

registerTemplate({
  component: DevotionalGaneshChaturthi,
  schema: devotionalGaneshChaturthiSchema,
  sectionedSchema: devotionalGaneshChaturthiSectionedSchema,
  meta,
});

export default DevotionalGaneshChaturthi;
