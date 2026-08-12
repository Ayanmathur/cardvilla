import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { ScrollLayout } from '../../components/ScrollLayout';
import { HeroSection } from '../../sections/HeroSection';
import { ClosingSection } from '../../sections/ClosingSection';
import { floatUpVariants, slideUpVariants } from '../../animations';
import { festivalChildrensDaySchema, festivalChildrensDaySectionedSchema } from './schema';
import styles from './festival-childrens-day.module.css';

const FestivalChildrensDay: React.FC<TemplateProps> = ({ data }) => {
  const motif = (
    <div className={styles.motif}>
      <svg viewBox="0 0 100 80" width="80" height="64" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <circle cx="50" cy="30" r="18" />
        <path d="M50 48 L50 80 M50 80 L35 65 M50 80 L65 65" />
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
  name: "Happy Children's Day",
  componentKey: "festival_childrens_day",
  description: "Happy Children's Day template for festival",
  category: "festival",
  motionTier: 1,
  styleTone: "Playful/Pastel",
  sections: ["hero", "closing"],
};

registerTemplate({
  component: FestivalChildrensDay,
  schema: festivalChildrensDaySchema,
  sectionedSchema: festivalChildrensDaySectionedSchema,
  meta,
});

export default FestivalChildrensDay;
