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
import { flameGlowVariants, slideUpVariants } from '../../animations';
import { partyDinnerElegantSchema, partyDinnerElegantSectionedSchema } from './schema';
import styles from './party-dinner-elegant.module.css';

const PartyDinnerElegant: React.FC<TemplateProps> = ({ data }) => {
  const motif = (<div className={styles.motif}><svg viewBox="0 0 100 60" width="80" height="48" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <circle cx="50" cy="30" r="22" />
        <line x1="20" y1="10" x2="20" y2="50" />
        <line x1="80" y1="10" x2="80" y2="50" />
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
  name: "Elegant Dinner Party",
  componentKey: "party_dinner_elegant",
  description: "Elegant Dinner Party template for party",
  category: "party",
  motionTier: 0,
  styleTone: "Minimal/Classy",
  sections: ['hero', 'schedule', 'venue', 'rsvp', 'closing']
};

registerTemplate({
  component: PartyDinnerElegant,
  schema: partyDinnerElegantSchema,
  sectionedSchema: partyDinnerElegantSectionedSchema,
  meta,
});

export default PartyDinnerElegant;
