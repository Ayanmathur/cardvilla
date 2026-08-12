import React from 'react';
import { motion } from 'framer-motion';
import styles from './sections.module.css';
import { slideUpVariants } from '../animations'; 

interface StorySectionProps {
  data: any;
  accentColor?: string;
  textColor?: string;
}

const StorySection: React.FC<StorySectionProps> = ({ data, accentColor, textColor }) => {
  if (!data.story_text) return null;

  const label = data.section_story_label || 'Our Story';

  return (
    <motion.section 
      className={styles.storySection} 
      style={{ color: textColor }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={slideUpVariants}
    >
      <div className={styles.sectionInner}>
        <h2 className={styles.storyLabel} style={{ color: accentColor }}>
          {label}
        </h2>
        <p className={styles.storyText}>{data.story_text}</p>
        {data.story_photo && (
          <img src={data.story_photo} alt={label} className={styles.storyPhoto} />
        )}
      </div>
    </motion.section>
  );
};

export { StorySection };
export default StorySection;
