import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { ScrollLayout } from '../../components/ScrollLayout';
import { HeroSection } from '../../sections/HeroSection';
import { ScheduleSection } from '../../sections/ScheduleSection';
import { VenueSection } from '../../sections/VenueSection';
import { ClosingSection } from '../../sections/ClosingSection';
import { bloomVariants, slideUpVariants  } from '../../animations';
import { devotionalSatsangSchema, devotionalSatsangSectionedSchema } from './schema';
import styles from './devotional-satsang.module.css';

const DevotionalSatsang: React.FC<TemplateProps> = ({ data }) => {
  const motif = (
    <div className={styles.motif}>
      <motion.div custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
        <motion.svg custom={1} variants={bloomVariants} initial="hidden" animate="visible" viewBox="0 0 100 80" width="80" height="64" fill="var(--color-accent)">
        <ellipse cx="50" cy="50" rx="30" ry="15" />
        <ellipse cx="50" cy="50" rx="15" ry="30" />
      </motion.svg>
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
  name: "Satsang / Bhagwat Katha",
  componentKey: "devotional_satsang",
  description: "Satsang / Bhagwat Katha template for devotional",
  category: "devotional",
  motionTier: 1,
  styleTone: "Serene/Devotional",
  sections: ['hero', 'schedule', 'venue', 'closing']
};

registerTemplate({
  component: DevotionalSatsang,
  schema: devotionalSatsangSchema,
  sectionedSchema: devotionalSatsangSectionedSchema,
  meta,
});

export default DevotionalSatsang;
