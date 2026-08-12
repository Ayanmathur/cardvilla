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
import { devotionalMataKiChowkiSchema, devotionalMataKiChowkiSectionedSchema } from './schema';
import styles from './devotional-mata-ki-chowki.module.css';

const DevotionalMataKiChowki: React.FC<TemplateProps> = ({ data }) => {
  const motif = (
    <div className={styles.motif}>
      <motion.div custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
        <svg viewBox="0 0 100 80" width="80" height="64" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M50 10 L50 70 M35 25 L65 25 M30 15 L50 25 L70 15" />
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
  name: "Mata Ki Chowki",
  componentKey: "devotional_mata_ki_chowki",
  description: "Mata Ki Chowki template for devotional",
  category: "devotional",
  motionTier: 1,
  styleTone: "Devotional/Vibrant",
  sections: ['hero', 'schedule', 'venue', 'closing']
};

registerTemplate({
  component: DevotionalMataKiChowki,
  schema: devotionalMataKiChowkiSchema,
  sectionedSchema: devotionalMataKiChowkiSectionedSchema,
  meta,
});

export default DevotionalMataKiChowki;
