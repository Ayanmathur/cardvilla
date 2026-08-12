import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { ScrollLayout } from '../../components/ScrollLayout';
import { HeroSection } from '../../sections/HeroSection';
import { ClosingSection } from '../../sections/ClosingSection';
import { bloomVariants, slideUpVariants } from '../../animations';
import { festivalBuddhaPurnimaSchema, festivalBuddhaPurnimaSectionedSchema } from './schema';
import styles from './festival-buddha-purnima.module.css';

const FestivalBuddhaPurnima: React.FC<TemplateProps> = ({ data }) => {
  const motif = (
    <div className={styles.motif}>
      <motion.svg custom={1} variants={bloomVariants} initial="hidden" animate="visible" viewBox="0 0 100 80" width="80" height="64" fill="var(--color-accent)">
        <circle cx="50" cy="40" r="15" />
        <circle cx="35" cy="40" r="10" />
        <circle cx="65" cy="40" r="10" />
      </motion.svg>
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
  name: "Buddha Purnima Wishes",
  componentKey: "festival_buddha_purnima",
  description: "Buddha Purnima Wishes template for festival",
  category: "festival",
  motionTier: 1,
  styleTone: "Serene/Peaceful",
  sections: ["hero", "closing"],
};

registerTemplate({
  component: FestivalBuddhaPurnima,
  schema: festivalBuddhaPurnimaSchema,
  sectionedSchema: festivalBuddhaPurnimaSectionedSchema,
  meta,
});

export default FestivalBuddhaPurnima;
