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
import { floatBobVariants, slideUpVariants } from '../../animations';
import { babyShowerSchema, babyShowerSectionedSchema } from './schema';
import styles from './baby-shower.module.css';

const BabyShower: React.FC<TemplateProps> = ({ data }) => {
  const motif = (
    <div className={styles.motif}>
      <svg viewBox="0 0 100 100" width="70" height="70" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <circle cx="50" cy="50" r="30" />
        <path d="M40 30 Q50 20 60 30" />
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
  name: "Baby Shower",
  componentKey: "baby_shower",
  description: "Baby Shower template for baby-kids",
  category: "baby-kids",
  motionTier: 1,
  styleTone: "Soft/Playful",
  sections: ['hero', 'story', 'schedule', 'venue', 'gallery', 'closing'],
};


registerTemplate({
  component: BabyShower,
  schema: babyShowerSchema,
  sectionedSchema: babyShowerSectionedSchema,
  meta,
});

export default BabyShower;
