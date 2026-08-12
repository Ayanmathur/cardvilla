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
import { devotionalBhagwatKathaSchema, devotionalBhagwatKathaSectionedSchema } from './schema';
import styles from './devotional-bhagwat-katha.module.css';

const DevotionalBhagwatKatha: React.FC<TemplateProps> = ({ data }) => {
  const motif = (
    <div className={styles.motif}>
      <motion.div custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
        <svg viewBox="0 0 100 80" width="80" height="64" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M20 40 Q50 10 80 40 M40 50 Q50 60 60 50" />
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
  name: "Bhagwat Katha Saptah",
  componentKey: "devotional_bhagwat_katha",
  description: "Bhagwat Katha Saptah template for devotional",
  category: "devotional",
  motionTier: 1,
  styleTone: "Sacred/Peacock",
  sections: ['hero', 'schedule', 'venue', 'closing']
};

registerTemplate({
  component: DevotionalBhagwatKatha,
  schema: devotionalBhagwatKathaSchema,
  sectionedSchema: devotionalBhagwatKathaSectionedSchema,
  meta,
});

export default DevotionalBhagwatKatha;
