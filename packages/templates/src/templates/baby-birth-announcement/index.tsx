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
import { floatUpVariants, slideUpVariants } from '../../animations';
import { babyBirthAnnouncementSchema, babyBirthAnnouncementSectionedSchema } from './schema';
import styles from './baby-birth-announcement.module.css';

const BabyBirthAnnouncement: React.FC<TemplateProps> = ({ data }) => {
  const motif = (
    <div className={styles.motif}>
      <svg viewBox="0 0 100 80" width="80" height="64" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <circle cx="50" cy="30" r="18" />
        <path d="M30 60 Q50 40 70 60" />
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
  name: "Birth Announcement",
  componentKey: "baby_birth_announcement",
  description: "Birth Announcement template for baby-kids",
  category: "baby-kids",
  motionTier: 1,
  styleTone: "Joyful/Pastel",
  sections: ['hero', 'story', 'schedule', 'venue', 'gallery', 'closing'],
};


registerTemplate({
  component: BabyBirthAnnouncement,
  schema: babyBirthAnnouncementSchema,
  sectionedSchema: babyBirthAnnouncementSectionedSchema,
  meta,
});

export default BabyBirthAnnouncement;
