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
import { flameGlowVariants } from '../../animations';
import { weddingSikhAnandKarajSchema, weddingSikhAnandKarajSectionedSchema } from './schema';
import styles from './wedding-sikh-anand-karaj.module.css';

const WeddingSikhAnandKaraj: React.FC<TemplateProps> = ({ data }) => {
  const motif = (
    <div className={styles.motif}>
      <svg viewBox="0 0 100 100" width="70" height="70">
        <circle cx="50" cy="50" r="30" stroke="var(--color-accent)" fill="none" strokeWidth="2" />
        <path d="M50 10 L50 90 M20 50 L80 50" stroke="var(--color-accent)" strokeWidth="2" />
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
  name: "Sikh Wedding — Anand Karaj",
  componentKey: "wedding_sikh_anand_karaj",
  description: "Sikh Wedding — Anand Karaj template for wedding",
  category: "wedding",
  motionTier: 1,
  styleTone: "Sacred/Elegant",
  sections: ['hero', 'story', 'schedule', 'venue', 'gallery', 'rsvp', 'countdown', 'closing'],
};

registerTemplate({
  component: WeddingSikhAnandKaraj,
  schema: weddingSikhAnandKarajSchema,
  sectionedSchema: weddingSikhAnandKarajSectionedSchema,
  meta,
});

export default WeddingSikhAnandKaraj;
