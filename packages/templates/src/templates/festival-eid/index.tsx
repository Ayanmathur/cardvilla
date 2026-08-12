import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { ScrollLayout } from '../../components/ScrollLayout';
import { HeroSection } from '../../sections/HeroSection';
import { ClosingSection } from '../../sections/ClosingSection';
import { strokeDrawVariants, flameGlowVariants, slideUpVariants } from '../../animations';
import { festivalEidSchema, festivalEidSectionedSchema } from './schema';
import styles from './festival-eid.module.css';

const FestivalEid: React.FC<TemplateProps> = ({ data }) => {
  const motif = (
    <div className={styles.motif}>
      <svg viewBox="0 0 100 100" width="70" height="70" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M60 20 A40 40 0 1 0 60 80 A30 30 0 1 1 60 20" />
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
  name: "Eid Mubarak",
  componentKey: "festival_eid",
  description: "Eid Mubarak template for festival",
  category: "festival",
  motionTier: 1,
  styleTone: "Emerald/Royal",
  sections: ["hero", "closing"],
};

registerTemplate({
  component: FestivalEid,
  schema: festivalEidSchema,
  sectionedSchema: festivalEidSectionedSchema,
  meta,
});

export default FestivalEid;
