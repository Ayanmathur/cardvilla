import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { ScrollLayout } from '../../components/ScrollLayout';
import { HeroSection } from '../../sections/HeroSection';
import { ClosingSection } from '../../sections/ClosingSection';
import { fireworkBurstVariants, slideUpVariants } from '../../animations';
import { festivalRegionalNewYearSchema, festivalRegionalNewYearSectionedSchema } from './schema';
import styles from './festival-regional-new-year.module.css';

const FestivalRegionalNewYear: React.FC<TemplateProps> = ({ data }) => {
  const motif = (
    <div className={styles.motif}>
      <svg viewBox="0 0 100 80" width="80" height="64" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M50 10 L50 70 M50 10 L70 30 L50 50 Z" />
      </svg>
    </div>
  );

  return (
    <ScrollLayout data={data} className={styles.container} accentColor="var(--color-accent)" showActions={!!data.phone || !!data.whatsapp}>
      <HeroSection data={data} accentColor="var(--color-accent)" textColor="var(--color-text)" motifSlot={motif} />
      <ClosingSection data={data} accentColor="var(--color-accent)" />
    </ScrollLayout>
  );
};

export const meta: TemplateMeta = {
  name: "Regional New Year (Gudi Padwa / Ugadi)",
  componentKey: "festival_regional_new_year",
  description: "Regional New Year (Gudi Padwa / Ugadi) template for festival",
  category: "festival",
  motionTier: 2,
  styleTone: "Traditional/Vibrant",
  sections: ["hero", "closing"],
};

registerTemplate({
  component: FestivalRegionalNewYear,
  schema: festivalRegionalNewYearSchema,
  sectionedSchema: festivalRegionalNewYearSectionedSchema,
  meta,
});

export default FestivalRegionalNewYear;
