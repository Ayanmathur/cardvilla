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
import { waveVariants, slideUpVariants } from '../../animations';
import { partyPoolSchema, partyPoolSectionedSchema } from './schema';
import styles from './party-pool.module.css';

const PartyPool: React.FC<TemplateProps> = ({ data }) => {
  const motif = (<div className={styles.motif}><div /></div>);

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
  name: "Pool Party",
  componentKey: "party_pool",
  description: "Pool Party template for party",
  category: "party",
  motionTier: 1,
  styleTone: "Cool/Vibrant",
  sections: ['hero', 'schedule', 'venue', 'rsvp', 'closing']
};

registerTemplate({
  component: PartyPool,
  schema: partyPoolSchema,
  sectionedSchema: partyPoolSectionedSchema,
  meta,
});

export default PartyPool;
