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
import { bloomVariants } from '../../animations';
import { weddingFloralRomanticSchema, weddingFloralRomanticSectionedSchema } from './schema';
import styles from './wedding-floral-romantic.module.css';

const WeddingFloralRomantic: React.FC<TemplateProps> = ({ data }) => {
  const motif = (
    <div className={styles.motif}>
      <motion.svg custom={1} variants={bloomVariants} initial="hidden" animate="visible" viewBox="0 0 100 100" width="70" height="70" fill="var(--color-accent)">
        <circle cx="50" cy="50" r="18" />
        <circle cx="50" cy="22" r="12" />
        <circle cx="50" cy="78" r="12" />
        <circle cx="22" cy="50" r="12" />
        <circle cx="78" cy="50" r="12" />
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
  name: "Floral Romantic Wedding",
  componentKey: "wedding_floral_romantic",
  description: "Floral Romantic Wedding template for wedding",
  category: "wedding",
  motionTier: 1,
  styleTone: "Soft/Romantic",
  sections: ['hero', 'story', 'schedule', 'venue', 'gallery', 'rsvp', 'countdown', 'closing'],
};

registerTemplate({
  component: WeddingFloralRomantic,
  schema: weddingFloralRomanticSchema,
  sectionedSchema: weddingFloralRomanticSectionedSchema,
  meta,
});

export default WeddingFloralRomantic;
