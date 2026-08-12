import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { ScrollLayout } from '../../components/ScrollLayout';
import { HeroSection } from '../../sections/HeroSection';
import { ClosingSection } from '../../sections/ClosingSection';
import { flameGlowVariants, slideUpVariants } from '../../animations';
import { festivalGurpurabSchema, festivalGurpurabSectionedSchema } from './schema';
import styles from './festival-gurpurab.module.css';

const FestivalGurpurab: React.FC<TemplateProps> = ({ data }) => {
  const motif = (
    <div className={styles.motif}>
      <svg viewBox="0 0 100 100" width="70" height="70" fill="var(--color-accent)">
        <text x="50" y="65" fontSize="45" textAnchor="middle" fontFamily="serif" fontWeight="bold">ੴ</text>
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
  name: "Guru Nanak Gurpurab",
  componentKey: "festival_gurpurab",
  description: "Guru Nanak Gurpurab template for festival",
  category: "festival",
  motionTier: 1,
  styleTone: "Sacred/Golden",
  sections: ["hero", "closing"],
};

registerTemplate({
  component: FestivalGurpurab,
  schema: festivalGurpurabSchema,
  sectionedSchema: festivalGurpurabSectionedSchema,
  meta,
});

export default FestivalGurpurab;
