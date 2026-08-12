import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { ScrollLayout } from '../../components/ScrollLayout';
import { HeroSection } from '../../sections/HeroSection';
import { ScheduleSection } from '../../sections/ScheduleSection';
import { VenueSection } from '../../sections/VenueSection';
import { ClosingSection } from '../../sections/ClosingSection';
import { swayVariants, slideUpVariants  } from '../../animations';
import { devotionalKhatuShyamSchema, devotionalKhatuShyamSectionedSchema } from './schema';
import styles from './devotional-khatu-shyam.module.css';

const DevotionalKhatuShyam: React.FC<TemplateProps> = ({ data }) => {
  const motif = (
    <div className={styles.motif}>
      <motion.div custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
        <svg viewBox="0 0 100 80" width="80" height="64" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M50 10 C30 30 70 50 50 80" />
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
  name: "Khatu Shyam Sandhya",
  componentKey: "devotional_khatu_shyam",
  description: "Khatu Shyam Sandhya template for devotional",
  category: "devotional",
  motionTier: 1,
  styleTone: "Royal Devotional",
  sections: ['hero', 'schedule', 'venue', 'closing']
};

registerTemplate({
  component: DevotionalKhatuShyam,
  schema: devotionalKhatuShyamSchema,
  sectionedSchema: devotionalKhatuShyamSectionedSchema,
  meta,
});

export default DevotionalKhatuShyam;
