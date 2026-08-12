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
import { strokeDrawVariants } from '../../animations';
import { weddingBengaliSchema, weddingBengaliSectionedSchema } from './schema';
import styles from './wedding-bengali.module.css';

const WeddingBengali: React.FC<TemplateProps> = ({ data }) => {
  const motif = (
    <div className={styles.motif}>
      <motion.svg viewBox="0 0 100 100" width="70" height="70" custom={1} variants={strokeDrawVariants} initial="hidden" animate="visible" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <circle cx="50" cy="50" r="30" />
        <path d="M50 20 L50 10 M50 80 L50 90 M20 50 L10 50 M80 50 L90 50" />
      </motion.svg>
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
  name: "Bengali Wedding",
  componentKey: "wedding_bengali",
  description: "Bengali Wedding template for wedding",
  category: "wedding",
  motionTier: 1,
  styleTone: "Traditional/Elegant",
  sections: ['hero', 'story', 'schedule', 'venue', 'gallery', 'rsvp', 'countdown', 'closing'],
};

registerTemplate({
  component: WeddingBengali,
  schema: weddingBengaliSchema,
  sectionedSchema: weddingBengaliSectionedSchema,
  meta,
});

export default WeddingBengali;
