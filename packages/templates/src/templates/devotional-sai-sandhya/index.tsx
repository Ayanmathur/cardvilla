import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { ScrollLayout } from '../../components/ScrollLayout';
import { HeroSection } from '../../sections/HeroSection';
import { ScheduleSection } from '../../sections/ScheduleSection';
import { VenueSection } from '../../sections/VenueSection';
import { ClosingSection } from '../../sections/ClosingSection';
import { flameGlowVariants, slideUpVariants  } from '../../animations';
import { devotionalSaiSandhyaSchema, devotionalSaiSandhyaSectionedSchema } from './schema';
import styles from './devotional-sai-sandhya.module.css';

const DevotionalSaiSandhya: React.FC<TemplateProps> = ({ data }) => {
  const motif = (
    <div className={styles.motif}>
      <motion.div custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
        <svg viewBox="0 0 100 70" width="80" height="56" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <ellipse cx="50" cy="45" rx="35" ry="15" />
        <path d="M40 30 Q50 10 60 30" />
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
  name: "Sai Sandhya",
  componentKey: "devotional_sai_sandhya",
  description: "Sai Sandhya template for devotional",
  category: "devotional",
  motionTier: 1,
  styleTone: "Peaceful/Orange",
  sections: ['hero', 'schedule', 'venue', 'closing']
};

registerTemplate({
  component: DevotionalSaiSandhya,
  schema: devotionalSaiSandhyaSchema,
  sectionedSchema: devotionalSaiSandhyaSectionedSchema,
  meta,
});

export default DevotionalSaiSandhya;
