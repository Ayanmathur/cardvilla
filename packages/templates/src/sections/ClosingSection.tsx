import React from 'react';
import { motion } from 'framer-motion';
import styles from './sections.module.css';

export interface ClosingSectionProps {
  data: any;
  accentColor?: string;
  textColor?: string;
}

const ClosingSection: React.FC<ClosingSectionProps> = ({ data, accentColor, textColor }) => {
  const message = data?.closing_message || data?.message;
  const familyNames = data?.closing_family_names || data?.host_names;
  const signoff = data?.closing_signoff || 'With Love & Blessings';

  return (
    <section className={styles.closingSection} style={{ color: textColor }}>
      <motion.div 
        className={styles.sectionInner}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
      >
        <div 
          className={styles.closingDivider} 
          style={{ backgroundColor: accentColor }}
        />
        
        {message && (
          <div className={styles.closingMessage}>
            {message}
          </div>
        )}
        
        {familyNames && (
          <div className={styles.closingFamilyNames}>
            {familyNames}
          </div>
        )}
        
        <div className={styles.closingSignoff} style={{ color: accentColor }}>
          {signoff}
        </div>
      </motion.div>
    </section>
  );
};

export { ClosingSection };
export default ClosingSection;
