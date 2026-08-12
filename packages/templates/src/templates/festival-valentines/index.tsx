import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { ScrollLayout } from '../../components/ScrollLayout';
import { HeroSection } from '../../sections/HeroSection';
import { ClosingSection } from '../../sections/ClosingSection';
import { floatUpVariants, slideUpVariants } from '../../animations';
import { festivalValentinesSchema, festivalValentinesSectionedSchema } from './schema';
import styles from './festival-valentines.module.css';

const FestivalValentines: React.FC<TemplateProps> = ({ data }) => {
  const motif = (
    <div className={styles.motif}>
      <svg viewBox="0 0 100 80" width="80" height="64" fill="var(--color-accent)">
        <path d="M50 30 C30 10 10 30 30 50 L50 70 L70 50 C90 30 70 10 50 30 Z" />
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
  name: "Happy Valentine's Day",
  componentKey: "festival_valentines",
  description: "Happy Valentine's Day template for festival",
  category: "festival",
  motionTier: 1,
  styleTone: "Romantic/Pink",
  sections: ["hero", "closing"],
};

registerTemplate({
  component: FestivalValentines,
  schema: festivalValentinesSchema,
  sectionedSchema: festivalValentinesSectionedSchema,
  meta,
});

export default FestivalValentines;
