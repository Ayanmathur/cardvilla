import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { ScrollLayout } from '../../components/ScrollLayout';
import { HeroSection } from '../../sections/HeroSection';
import { ClosingSection } from '../../sections/ClosingSection';
import { flameFlickerVariants, fireworkBurstVariants, slideUpVariants } from '../../animations';
import { festivalDiwaliSchema, festivalDiwaliSectionedSchema } from './schema';
import styles from './festival-diwali.module.css';

const FestivalDiwali: React.FC<TemplateProps> = ({ data }) => {
  const motif = (
    <div className={styles.motif}>
      <svg viewBox="0 0 100 50" width="80" height="40">
        <path d="M10 25 Q50 50 90 25" stroke="var(--color-accent)" fill="none" strokeWidth="2" />
        <motion.path d="M45 20 Q50 5 55 20 Q50 25 45 20" fill="var(--color-accent)" variants={flameFlickerVariants} initial="idle" animate="idle" />
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
  name: "Diwali Wishes",
  componentKey: "festival_diwali",
  description: "Diwali Wishes template for festival",
  category: "festival",
  motionTier: 2,
  styleTone: "Festive/Golden",
  sections: ["hero", "closing"],
};

registerTemplate({
  component: FestivalDiwali,
  schema: festivalDiwaliSchema,
  sectionedSchema: festivalDiwaliSectionedSchema,
  meta,
});

export default FestivalDiwali;
