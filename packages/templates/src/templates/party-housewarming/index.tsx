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
import { flameFlickerVariants, slideUpVariants } from '../../animations';
import { partyHousewarmingSchema, partyHousewarmingSectionedSchema } from './schema';
import styles from './party-housewarming.module.css';

const PartyHousewarming: React.FC<TemplateProps> = ({ data }) => {
  const motif = (<div className={styles.motif}><svg viewBox="0 0 100 100" width="70" height="70" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M10 50 L50 15 L90 50 L80 50 L80 85 L20 85 L20 50 Z" />
        <rect x="40" y="60" width="20" height="25" fill="var(--color-accent)" opacity="0.4"/>
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
  name: "Housewarming (Griha Pravesh)",
  componentKey: "party_housewarming",
  description: "Housewarming (Griha Pravesh) template for party",
  category: "party",
  motionTier: 1,
  styleTone: "Warm/Inviting",
  sections: ['hero', 'schedule', 'venue', 'rsvp', 'closing']
};

registerTemplate({
  component: PartyHousewarming,
  schema: partyHousewarmingSchema,
  sectionedSchema: partyHousewarmingSectionedSchema,
  meta,
});

export default PartyHousewarming;
