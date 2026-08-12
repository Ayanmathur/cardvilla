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
import { fadeInVariants, slideUpVariants } from '../../animations';
import { partyAnniversarySchema, partyAnniversarySectionedSchema } from './schema';
import styles from './party-anniversary.module.css';

const PartyAnniversary: React.FC<TemplateProps> = ({ data }) => {
  const motif = (<div className={styles.motif}><svg viewBox="0 0 100 60" width="80" height="48" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M30 40 C10 20 40 10 50 30 C60 10 90 20 70 40 L50 60 Z" fill="var(--color-accent)" opacity="0.3"/>
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
  name: "Anniversary Celebration",
  componentKey: "party_anniversary",
  description: "Anniversary Celebration template for party",
  category: "party",
  motionTier: 1,
  styleTone: "Warm/Romantic",
  sections: ['hero', 'schedule', 'venue', 'rsvp', 'closing']
};

registerTemplate({
  component: PartyAnniversary,
  schema: partyAnniversarySchema,
  sectionedSchema: partyAnniversarySectionedSchema,
  meta,
});

export default PartyAnniversary;
