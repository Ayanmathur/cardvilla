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
import { sparkleVariants } from '../../animations';
import { weddingRajasthaniRoyalSchema, weddingRajasthaniRoyalSectionedSchema } from './schema';
import styles from './wedding-rajasthani-royal.module.css';

const WeddingRajasthaniRoyal: React.FC<TemplateProps> = ({ data }) => {
  const motif = (
    <div className={styles.motif}>
      <svg viewBox="0 0 100 100" width="70" height="70" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M20 100 L20 50 Q50 10 80 50 L80 100" />
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
  name: "Rajasthani Royal Wedding",
  componentKey: "wedding_rajasthani_royal",
  description: "Rajasthani Royal Wedding template for wedding",
  category: "wedding",
  motionTier: 1,
  styleTone: "Royal/Ornate",
  sections: ['hero', 'story', 'schedule', 'venue', 'gallery', 'rsvp', 'countdown', 'closing'],
};

registerTemplate({
  component: WeddingRajasthaniRoyal,
  schema: weddingRajasthaniRoyalSchema,
  sectionedSchema: weddingRajasthaniRoyalSectionedSchema,
  meta,
});

export default WeddingRajasthaniRoyal;
