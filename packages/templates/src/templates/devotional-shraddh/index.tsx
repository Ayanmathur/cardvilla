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
import { devotionalShraddhSchema, devotionalShraddhSectionedSchema } from './schema';
import styles from './devotional-shraddh.module.css';

const DevotionalShraddh: React.FC<TemplateProps> = ({ data }) => {
  const motif = (
    <div className={styles.motif}>
      <motion.div custom={1} variants={slideUpVariants} initial="hidden" animate="visible">
        <svg viewBox="0 0 100 80" width="80" height="64" stroke="var(--color-accent)" fill="none" strokeWidth="1">
        <path d="M50 20 L50 60 M30 40 L70 40" />
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
  name: "Prayer Meet & Shraddh",
  componentKey: "devotional_shraddh",
  description: "Prayer Meet & Shraddh template for devotional",
  category: "devotional",
  motionTier: 0,
  styleTone: "Solemn/Restrained",
  sections: ['hero', 'schedule', 'venue', 'closing']
};

registerTemplate({
  component: DevotionalShraddh,
  schema: devotionalShraddhSchema,
  sectionedSchema: devotionalShraddhSectionedSchema,
  meta,
});

export default DevotionalShraddh;
