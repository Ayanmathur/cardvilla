import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { ScrollLayout } from '../../components/ScrollLayout';
import { HeroSection } from '../../sections/HeroSection';
import { ScheduleSection } from '../../sections/ScheduleSection';
import { VenueSection } from '../../sections/VenueSection';
import { ClosingSection } from '../../sections/ClosingSection';
import { flameFlickerVariants, flameGlowVariants, slideUpVariants  } from '../../animations';
import { devotionalGrihaPraveshSchema, devotionalGrihaPraveshSectionedSchema } from './schema';
import styles from './devotional-griha-pravesh.module.css';

const DevotionalGrihaPravesh: React.FC<TemplateProps> = ({ data }) => {
  const motif = (
    <div className={styles.motif}>
      <motion.div custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
        <svg viewBox="0 0 100 60" width="80" height="48" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M20 45 L50 20 L80 45 M35 45 L35 55 L65 55 L65 45" />
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
  name: "Griha Pravesh & Vastu Puja",
  componentKey: "devotional_griha_pravesh",
  description: "Griha Pravesh & Vastu Puja template for devotional",
  category: "devotional",
  motionTier: 1,
  styleTone: "Sacred/Traditional",
  sections: ['hero', 'schedule', 'venue', 'closing']
};

registerTemplate({
  component: DevotionalGrihaPravesh,
  schema: devotionalGrihaPraveshSchema,
  sectionedSchema: devotionalGrihaPraveshSectionedSchema,
  meta,
});

export default DevotionalGrihaPravesh;
