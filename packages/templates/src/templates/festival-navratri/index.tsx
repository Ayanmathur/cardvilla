import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { ScrollLayout } from '../../components/ScrollLayout';
import { HeroSection } from '../../sections/HeroSection';
import { ClosingSection } from '../../sections/ClosingSection';
import { sparkleVariants, slideUpVariants } from '../../animations';
import { festivalNavratriSchema, festivalNavratriSectionedSchema } from './schema';
import styles from './festival-navratri.module.css';

const FestivalNavratri: React.FC<TemplateProps> = ({ data }) => {
  const motif = (
    <div className={styles.motif}>
      <svg viewBox="0 0 100 80" width="80" height="64" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <line x1="20" y1="10" x2="80" y2="70" />
        <line x1="80" y1="10" x2="20" y2="70" />
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
  name: "Navratri & Garba Wishes",
  componentKey: "festival_navratri",
  description: "Navratri & Garba Wishes template for festival",
  category: "festival",
  motionTier: 2,
  styleTone: "Vibrant/Garba",
  sections: ["hero", "closing"],
};

registerTemplate({
  component: FestivalNavratri,
  schema: festivalNavratriSchema,
  sectionedSchema: festivalNavratriSectionedSchema,
  meta,
});

export default FestivalNavratri;
