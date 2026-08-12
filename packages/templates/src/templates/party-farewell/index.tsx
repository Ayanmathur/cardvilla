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
import { slideUpVariants, fadeInVariants } from '../../animations';
import { partyFarewellSchema, partyFarewellSectionedSchema } from './schema';
import styles from './party-farewell.module.css';

const PartyFarewell: React.FC<TemplateProps> = ({ data }) => {
  const motif = (<div className={styles.motif}><svg viewBox="0 0 100 80" width="80" height="64" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M10 70 L90 10 L50 50 Z" />
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
  name: "Farewell Party",
  componentKey: "party_farewell",
  description: "Farewell Party template for party",
  category: "party",
  motionTier: 1,
  styleTone: "Warm/Thoughtful",
  sections: ['hero', 'schedule', 'venue', 'rsvp', 'closing']
};

registerTemplate({
  component: PartyFarewell,
  schema: partyFarewellSchema,
  sectionedSchema: partyFarewellSectionedSchema,
  meta,
});

export default PartyFarewell;
