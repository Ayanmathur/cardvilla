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
import { babyKrishnaBirthdaySchema, babyKrishnaBirthdaySectionedSchema } from './schema';
import styles from './baby-krishna-birthday.module.css';

const BabyKrishnaBirthday: React.FC<TemplateProps> = ({ data }) => {
  const motif = (
    <div className={styles.motif}>
      <svg viewBox="0 0 100 80" width="80" height="64" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M20 40 Q50 10 80 40 M40 50 Q50 60 60 50" />
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
  name: "1st Birthday — Krishna Theme",
  componentKey: "baby_krishna_birthday",
  description: "1st Birthday — Krishna Theme template for baby-kids",
  category: "baby-kids",
  motionTier: 1,
  styleTone: "Devotional/Cute",
  sections: ['hero', 'story', 'schedule', 'venue', 'gallery', 'closing'],
};


registerTemplate({
  component: BabyKrishnaBirthday,
  schema: babyKrishnaBirthdaySchema,
  sectionedSchema: babyKrishnaBirthdaySectionedSchema,
  meta,
});

export default BabyKrishnaBirthday;
