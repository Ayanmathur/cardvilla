import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { ScrollLayout } from '../../components/ScrollLayout';
import { HeroSection } from '../../sections/HeroSection';
import { ClosingSection } from '../../sections/ClosingSection';
import { flameFlickerVariants, slideUpVariants } from '../../animations';
import { festivalBhaiDoojSchema, festivalBhaiDoojSectionedSchema } from './schema';
import styles from './festival-bhai-dooj.module.css';

const FestivalBhaiDooj: React.FC<TemplateProps> = ({ data }) => {
  const motif = (
    <div className={styles.motif}>
      <svg viewBox="0 0 100 60" width="80" height="48" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <circle cx="50" cy="30" r="18" />
        <path d="M50 15 L50 45" />
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
  name: "Bhai Dooj Wishes",
  componentKey: "festival_bhai_dooj",
  description: "Bhai Dooj Wishes template for festival",
  category: "festival",
  motionTier: 1,
  styleTone: "Traditional/Family",
  sections: ["hero", "closing"],
};

registerTemplate({
  component: FestivalBhaiDooj,
  schema: festivalBhaiDoojSchema,
  sectionedSchema: festivalBhaiDoojSectionedSchema,
  meta,
});

export default FestivalBhaiDooj;
