import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { ScrollLayout } from '../../components/ScrollLayout';
import { HeroSection } from '../../sections/HeroSection';
import { ClosingSection } from '../../sections/ClosingSection';
import { sparkleVariants, petalDriftVariants, slideUpVariants } from '../../animations';
import { festivalChristmasSchema, festivalChristmasSectionedSchema } from './schema';
import styles from './festival-christmas.module.css';

const FestivalChristmas: React.FC<TemplateProps> = ({ data }) => {
  const motif = (
    <div className={styles.motif}>
      <svg viewBox="0 0 100 80" width="80" height="64" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M50 10 L25 40 L35 40 L15 65 L85 65 L65 40 L75 40 Z" fill="var(--color-accent)" opacity="0.3"/>
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
  name: "Merry Christmas",
  componentKey: "festival_christmas",
  description: "Merry Christmas template for festival",
  category: "festival",
  motionTier: 1,
  styleTone: "Winter/Classic",
  sections: ["hero", "closing"],
};

registerTemplate({
  component: FestivalChristmas,
  schema: festivalChristmasSchema,
  sectionedSchema: festivalChristmasSectionedSchema,
  meta,
});

export default FestivalChristmas;
