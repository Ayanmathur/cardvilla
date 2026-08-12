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
import { devotionalAkhandPathSchema, devotionalAkhandPathSectionedSchema } from './schema';
import styles from './devotional-akhand-path.module.css';

const DevotionalAkhandPath: React.FC<TemplateProps> = ({ data }) => {
  const motif = (
    <div className={styles.motif}>
      <motion.div custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
        <svg viewBox="0 0 100 100" width="70" height="70" fill="var(--color-accent)">
        <text x="50" y="65" fontSize="45" textAnchor="middle" fontFamily="serif" fontWeight="bold">ੴ</text>
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
  name: "Akhand Path Sahib",
  componentKey: "devotional_akhand_path",
  description: "Akhand Path Sahib template for devotional",
  category: "devotional",
  motionTier: 1,
  styleTone: "Sacred/Reverent",
  sections: ['hero', 'schedule', 'venue', 'closing']
};

registerTemplate({
  component: DevotionalAkhandPath,
  schema: devotionalAkhandPathSchema,
  sectionedSchema: devotionalAkhandPathSectionedSchema,
  meta,
});

export default DevotionalAkhandPath;
