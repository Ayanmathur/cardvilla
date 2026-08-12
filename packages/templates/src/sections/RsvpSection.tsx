import React from 'react';
import { motion } from 'framer-motion';
import styles from './sections.module.css';

export interface RsvpSectionProps {
  data: any;
  accentColor?: string;
  textColor?: string;
}

const RsvpSection: React.FC<RsvpSectionProps> = ({ data, accentColor, textColor }) => {
  const label = data?.section_rsvp_label || 'RSVP';
  const headline = data?.section_rsvp_headline || 'Will You Join Us?';
  const message = data?.section_rsvp_message || 'Kindly respond by...';

  const handleAccept = () => console.log('RSVP Accepted');
  const handleDecline = () => console.log('RSVP Declined');

  return (
    <section className={styles.rsvpSection} style={{ color: textColor }}>
      <motion.div 
        className={styles.sectionInner}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.rsvpLabel} style={{ color: accentColor }}>{label}</div>
        <h2 className={styles.rsvpHeadline}>{headline}</h2>
        <div className={styles.rsvpBtnGroup}>
          <button 
            className={`${styles.rsvpBtn} ${styles.rsvpBtnAccept}`} 
            style={{ backgroundColor: accentColor, borderColor: accentColor }}
            onClick={handleAccept}
          >
            Accept
          </button>
          <button 
            className={styles.rsvpBtn} 
            style={{ color: accentColor, borderColor: accentColor }}
            onClick={handleDecline}
          >
            Decline
          </button>
        </div>
        <div className={styles.rsvpMessage}>{message}</div>
      </motion.div>
    </section>
  );
};

export { RsvpSection };
export default RsvpSection;
