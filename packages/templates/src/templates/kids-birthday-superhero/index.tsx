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
import { swayVariants, slideUpVariants } from '../../animations';
import { kidsBirthdaySuperheroSchema, kidsBirthdaySuperheroSectionedSchema } from './schema';
import styles from './kids-birthday-superhero.module.css';

const KidsBirthdaySuperhero: React.FC<TemplateProps> = ({ data }) => {
  const motif = (
    <div className={styles.motif}>
      <svg viewBox="0 0 100 80" width="80" height="64" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M50 10 L80 30 L70 70 L50 90 L30 70 L20 30 Z" />
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
  name: "Kids Birthday — Superhero",
  componentKey: "kids_birthday_superhero",
  description: "Kids Birthday — Superhero template for baby-kids",
  category: "baby-kids",
  motionTier: 1,
  styleTone: "Action/Bold",
  sections: ['hero', 'story', 'schedule', 'venue', 'gallery', 'closing'],
};


registerTemplate({
  component: KidsBirthdaySuperhero,
  schema: kidsBirthdaySuperheroSchema,
  sectionedSchema: kidsBirthdaySuperheroSectionedSchema,
  meta,
});

export default KidsBirthdaySuperhero;
