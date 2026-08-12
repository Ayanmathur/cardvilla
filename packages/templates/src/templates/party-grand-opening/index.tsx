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
import { confettiPieceVariants, slideUpVariants } from '../../animations';
import { partyGrandOpeningSchema, partyGrandOpeningSectionedSchema } from './schema';
import styles from './party-grand-opening.module.css';

const PartyGrandOpening: React.FC<TemplateProps> = ({ data }) => {
  const motif = (<div className={styles.motif}><svg viewBox="0 0 100 60" width="80" height="48" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M10 30 L90 30" strokeDasharray="4 4" />
        <circle cx="50" cy="30" r="10" />
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
  name: "Grand Opening",
  componentKey: "party_grand_opening",
  description: "Grand Opening template for party",
  category: "party",
  motionTier: 2,
  styleTone: "Bold/Commercial",
  sections: ['hero', 'schedule', 'venue', 'rsvp', 'closing']
};

registerTemplate({
  component: PartyGrandOpening,
  schema: partyGrandOpeningSchema,
  sectionedSchema: partyGrandOpeningSectionedSchema,
  meta,
});

export default PartyGrandOpening;
