import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps, TemplateMeta } from '../../types';
import { registerTemplate } from '../../registry';
import { ScrollLayout } from '../../components/ScrollLayout';
import { HeroSection } from '../../sections/HeroSection';
import { StorySection } from '../../sections/StorySection';
import { ScheduleSection } from '../../sections/ScheduleSection';
import { VenueSection } from '../../sections/VenueSection';
import { GallerySection } from '../../sections/GallerySection';
import { RsvpSection } from '../../sections/RsvpSection';
import { CountdownSection } from '../../sections/CountdownSection';
import { ClosingSection } from '../../sections/ClosingSection';
import { flameFlickerVariants } from '../../animations';
import { weddingHinduMandapSchema, weddingHinduMandapSectionedSchema } from './schema';
import styles from './wedding-hindu-mandap.module.css';

const WeddingHinduMandap: React.FC<TemplateProps> = ({ data }) => {
  const motif = (
    <div className={styles.motif}>
      <svg viewBox="0 0 100 50" width="80" height="40">
        <path d="M10 25 Q50 50 90 25" stroke="var(--color-accent)" fill="none" strokeWidth="2" />
        <motion.path d="M45 20 Q50 5 55 20 Q50 25 45 20" fill="var(--color-accent)" variants={flameFlickerVariants} initial="idle" animate="idle" />
      </svg>
    </div>
  );

  return (
    <ScrollLayout data={data} className={styles.container} accentColor="var(--color-accent)">
      <HeroSection data={data} accentColor="var(--color-accent)" textColor="var(--color-text)" motifSlot={motif} />
      <div className={styles.altBg}>
        <StorySection data={data} accentColor="var(--color-accent)" />
      </div>
      <ScheduleSection data={data} accentColor="var(--color-accent)" />
      <div className={styles.altBg}>
        <VenueSection data={data} accentColor="var(--color-accent)" />
      </div>
      <GallerySection data={data} accentColor="var(--color-accent)" />
      <div className={styles.altBg}>
        <RsvpSection data={data} accentColor="var(--color-accent)" />
      </div>
      <CountdownSection data={data} accentColor="var(--color-accent)" />
      <ClosingSection data={data} accentColor="var(--color-accent)" />
    </ScrollLayout>
  );
};

export const meta: TemplateMeta = {
  name: "Hindu Wedding — Mandap",
  componentKey: "wedding_hindu_mandap",
  description: "Hindu Wedding — Mandap template for wedding",
  category: "wedding",
  motionTier: 1,
  styleTone: "Traditional/Ornate",
  sections: ['hero', 'story', 'schedule', 'venue', 'gallery', 'rsvp', 'countdown', 'closing'],
};

registerTemplate({
  component: WeddingHinduMandap,
  schema: weddingHinduMandapSchema,
  sectionedSchema: weddingHinduMandapSectionedSchema,
  meta,
});

export default WeddingHinduMandap;
