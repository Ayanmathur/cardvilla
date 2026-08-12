import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { ScrollLayout } from '../../components/ScrollLayout';
import { HeroSection } from '../../sections/HeroSection';
import { ClosingSection } from '../../sections/ClosingSection';
import { fireworkBurstVariants, confettiPieceVariants, slideUpVariants } from '../../animations';
import { festivalNewYearSchema, festivalNewYearSectionedSchema } from './schema';
import styles from './festival-new-year.module.css';

const FestivalNewYear: React.FC<TemplateProps> = ({ data }) => {
  const motif = (
    <div className={styles.motif}>
      <svg viewBox="0 0 100 80" width="80" height="64" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <circle cx="50" cy="40" r="5" />
        <path d="M50 15 L50 25 M50 55 L50 65 M25 40 L35 40 M65 40 L75 40" />
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
  name: "Happy New Year Wishes",
  componentKey: "festival_new_year",
  description: "Happy New Year Wishes template for festival",
  category: "festival",
  motionTier: 2,
  styleTone: "Celebratory/Sparkling",
  sections: ["hero", "closing"],
};

registerTemplate({
  component: FestivalNewYear,
  schema: festivalNewYearSchema,
  sectionedSchema: festivalNewYearSectionedSchema,
  meta,
});

export default FestivalNewYear;
