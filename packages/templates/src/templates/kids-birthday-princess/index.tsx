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
import { ClosingSection } from '../../sections/ClosingSection';
import { sparkleVariants, slideUpVariants } from '../../animations';
import { kidsBirthdayPrincessSchema, kidsBirthdayPrincessSectionedSchema } from './schema';
import styles from './kids-birthday-princess.module.css';

const KidsBirthdayPrincess: React.FC<TemplateProps> = ({ data }) => {
  const motif = (
    <div className={styles.motif}>
      <svg viewBox="0 0 100 60" width="80" height="48" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M20 45 L30 20 L50 35 L70 20 L80 45 Z" />
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
      <ClosingSection data={data} accentColor="var(--color-accent)" />
    </ScrollLayout>
  );
};

export const meta: TemplateMeta = {
  name: "Kids Birthday — Princess",
  componentKey: "kids_birthday_princess",
  description: "Kids Birthday — Princess template for baby-kids",
  category: "baby-kids",
  motionTier: 1,
  styleTone: "Magical/Pink",
  sections: ['hero', 'story', 'schedule', 'venue', 'gallery', 'closing'],
};


registerTemplate({
  component: KidsBirthdayPrincess,
  schema: kidsBirthdayPrincessSchema,
  sectionedSchema: kidsBirthdayPrincessSectionedSchema,
  meta,
});

export default KidsBirthdayPrincess;
