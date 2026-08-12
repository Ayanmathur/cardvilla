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
import { fadeInVariants, slideUpVariants } from '../../animations';
import { babyPregnancyAnnouncementSchema, babyPregnancyAnnouncementSectionedSchema } from './schema';
import styles from './baby-pregnancy-announcement.module.css';

const BabyPregnancyAnnouncement: React.FC<TemplateProps> = ({ data }) => {
  const motif = (
    <div className={styles.motif}>
      <svg viewBox="0 0 100 60" width="80" height="48" stroke="var(--color-accent)" fill="none" strokeWidth="2">
        <path d="M30 40 Q40 20 50 40 Q60 20 70 40" />
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
  name: "Pregnancy Announcement",
  componentKey: "baby_pregnancy_announcement",
  description: "Pregnancy Announcement template for baby-kids",
  category: "baby-kids",
  motionTier: 1,
  styleTone: "Soft/GenderNeutral",
  sections: ['hero', 'story', 'schedule', 'venue', 'gallery', 'closing'],
};


registerTemplate({
  component: BabyPregnancyAnnouncement,
  schema: babyPregnancyAnnouncementSchema,
  sectionedSchema: babyPregnancyAnnouncementSectionedSchema,
  meta,
});

export default BabyPregnancyAnnouncement;
