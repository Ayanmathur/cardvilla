import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { ScrollLayout } from '../../components/ScrollLayout';
import { HeroSection } from '../../sections/HeroSection';
import { ClosingSection } from '../../sections/ClosingSection';
import { ribbonTieVariants, slideUpVariants } from '../../animations';
import { festivalRakhiSchema, festivalRakhiSectionedSchema } from './schema';
import styles from './festival-rakhi.module.css';

const FestivalRakhi: React.FC<TemplateProps> = ({ data }) => {
  const motif = (
    <div className={styles.motif}>
      <svg viewBox="0 0 100 60" width="80" height="48" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <circle cx="50" cy="30" r="15" />
        <line x1="0" y1="30" x2="35" y2="30" />
        <line x1="65" y1="30" x2="100" y2="30" />
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
  name: "Raksha Bandhan Wishes",
  componentKey: "festival_rakhi",
  description: "Raksha Bandhan Wishes template for festival",
  category: "festival",
  motionTier: 1,
  styleTone: "Warm/Traditional",
  sections: ["hero", "closing"],
};

registerTemplate({
  component: FestivalRakhi,
  schema: festivalRakhiSchema,
  sectionedSchema: festivalRakhiSectionedSchema,
  meta,
});

export default FestivalRakhi;
