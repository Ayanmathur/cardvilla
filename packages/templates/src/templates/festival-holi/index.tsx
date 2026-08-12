import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { ScrollLayout } from '../../components/ScrollLayout';
import { HeroSection } from '../../sections/HeroSection';
import { ClosingSection } from '../../sections/ClosingSection';
import { confettiPieceVariants, slideUpVariants } from '../../animations';
import { festivalHoliSchema, festivalHoliSectionedSchema } from './schema';
import styles from './festival-holi.module.css';

const FestivalHoli: React.FC<TemplateProps> = ({ data }) => {
  const motif = (
    <div className={styles.motif}>
      <svg viewBox="0 0 100 80" width="80" height="64" fill="var(--color-accent)">
        <circle cx="30" cy="40" r="20" fill="#00BCD4" opacity="0.8"/>
        <circle cx="70" cy="40" r="20" fill="#FFEB3B" opacity="0.8"/>
        <circle cx="50" cy="30" r="20" fill="#E91E63" opacity="0.8"/>
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
  name: "Holi Festival Wishes",
  componentKey: "festival_holi",
  description: "Holi Festival Wishes template for festival",
  category: "festival",
  motionTier: 2,
  styleTone: "Vibrant/Rainbow",
  sections: ["hero", "closing"],
};

registerTemplate({
  component: FestivalHoli,
  schema: festivalHoliSchema,
  sectionedSchema: festivalHoliSectionedSchema,
  meta,
});

export default FestivalHoli;
