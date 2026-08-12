import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { ScrollLayout } from '../../components/ScrollLayout';
import { HeroSection } from '../../sections/HeroSection';
import { ScheduleSection } from '../../sections/ScheduleSection';
import { VenueSection } from '../../sections/VenueSection';
import { ClosingSection } from '../../sections/ClosingSection';
import { flameFlickerVariants, slideUpVariants  } from '../../animations';
import { devotionalGeneralSchema, devotionalGeneralSectionedSchema } from './schema';
import styles from './devotional-general.module.css';

const DevotionalGeneral: React.FC<TemplateProps> = ({ data }) => {
  const motif = (
    <div className={styles.motif}>
      <motion.div custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
        <svg viewBox="0 0 100 60" width="80" height="48" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <circle cx="50" cy="30" r="20" />
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
  name: "Universal Devotional Invitation",
  componentKey: "devotional_general",
  description: "Universal Devotional Invitation template for devotional",
  category: "devotional",
  motionTier: 1,
  styleTone: "Universal/Cream",
  sections: ['hero', 'schedule', 'venue', 'closing']
};

registerTemplate({
  component: DevotionalGeneral,
  schema: devotionalGeneralSchema,
  sectionedSchema: devotionalGeneralSectionedSchema,
  meta,
});

export default DevotionalGeneral;
