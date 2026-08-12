import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { ScrollLayout } from '../../components/ScrollLayout';
import { HeroSection } from '../../sections/HeroSection';
import { ScheduleSection } from '../../sections/ScheduleSection';
import { VenueSection } from '../../sections/VenueSection';
import { RsvpSection } from '../../sections/RsvpSection';
import { ClosingSection } from '../../sections/ClosingSection';
import { steamWispVariants, slideUpVariants } from '../../animations';
import { partyCocktailSchema, partyCocktailSectionedSchema } from './schema';
import styles from './party-cocktail.module.css';

const PartyCocktail: React.FC<TemplateProps> = ({ data }) => {
  const motif = (<div className={styles.motif}><svg viewBox="0 0 100 100" width="70" height="70" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M20 20 L80 20 L50 60 L50 90 M30 90 L70 90" />
      </svg></div>);

  return (
    <ScrollLayout data={data} className={styles.container} accentColor="var(--color-accent)">
      <HeroSection data={data} accentColor="var(--color-accent)" textColor="var(--color-text)" motifSlot={motif} />
      <div className={styles.altBg}>
        <ScheduleSection data={data} accentColor="var(--color-accent)" />
      </div>
      <VenueSection data={data} accentColor="var(--color-accent)" />
      <div className={styles.altBg}>
        <RsvpSection data={data} accentColor="var(--color-accent)" />
      </div>
      <ClosingSection data={data} accentColor="var(--color-accent)" />
    </ScrollLayout>
  );
};

export const meta: TemplateMeta = {
  name: "Cocktail & Glam Party",
  componentKey: "party_cocktail",
  description: "Cocktail & Glam Party template for party",
  category: "party",
  motionTier: 1,
  styleTone: "Glamorous/Dark",
  sections: ['hero', 'schedule', 'venue', 'rsvp', 'closing']
};

registerTemplate({
  component: PartyCocktail,
  schema: partyCocktailSchema,
  sectionedSchema: partyCocktailSectionedSchema,
  meta,
});

export default PartyCocktail;
