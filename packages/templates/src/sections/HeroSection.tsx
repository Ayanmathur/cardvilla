import React from 'react';
import { motion } from 'framer-motion';
import styles from './sections.module.css';
import { formatEventDate } from '../invitation-layout';
import { slideUpVariants } from '../animations';

interface HeroSectionProps {
  data: any;
  accentColor?: string;
  textColor?: string;
  motifSlot?: React.ReactNode;
}

const HeroSection: React.FC<HeroSectionProps> = ({ data, accentColor, textColor, motifSlot }) => {
  const eyebrow = data.section_hero_eyebrow || 'You Are Invited';
  let headline = '';
  
  if (data.partner1_name && data.partner2_name) {
    headline = `${data.partner1_name} & ${data.partner2_name}`;
  } else if (data.child_name) {
    headline = data.child_name;
  } else if (data.event_title) {
    headline = data.event_title;
  } else if (data.ceremony_title) {
    headline = data.ceremony_title;
  } else if (data.greeting_line) {
    headline = data.greeting_line;
  } else {
    headline = 'Celebration';
  }

  const tagline = data.section_hero_tagline;

  const renderDate = () => {
    if (!data.event_date) return null;
    return formatEventDate(data.event_date);
  };

  return (
    <section className={styles.heroSection} style={{ color: textColor }}>
      {motifSlot && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={slideUpVariants}
          custom={0}
        >
          {motifSlot}
        </motion.div>
      )}

      <motion.p
        className={styles.heroEyebrow}
        initial="hidden"
        animate="visible"
        variants={slideUpVariants}
        custom={1}
      >
        {eyebrow}
      </motion.p>

      <motion.h1
        className={styles.heroHeadline}
        style={{ color: accentColor }}
        initial="hidden"
        animate="visible"
        variants={slideUpVariants}
        custom={2}
      >
        {headline}
      </motion.h1>

      {tagline && (
        <motion.p
          className={styles.heroTagline}
          initial="hidden"
          animate="visible"
          variants={slideUpVariants}
          custom={3}
        >
          {tagline}
        </motion.p>
      )}

      {data.event_date && (
        <motion.p
          className={styles.heroDate}
          initial="hidden"
          animate="visible"
          variants={slideUpVariants}
          custom={4}
        >
          {renderDate()}
          {data.event_time && ` • ${data.event_time}`}
        </motion.p>
      )}

      {data.venue_name && (
        <motion.p
          className={styles.heroVenue}
          initial="hidden"
          animate="visible"
          variants={slideUpVariants}
          custom={5}
        >
          {data.venue_name}
        </motion.p>
      )}

      <motion.div
        className={styles.heroDivider}
        style={{ backgroundColor: accentColor }}
        initial="hidden"
        animate="visible"
        variants={slideUpVariants}
        custom={6}
      />

      <motion.div
        className={styles.scrollHint}
        initial="hidden"
        animate="visible"
        variants={slideUpVariants}
        custom={7}
      >
        ↓
      </motion.div>
    </section>
  );
};

export { HeroSection };
export default HeroSection;
