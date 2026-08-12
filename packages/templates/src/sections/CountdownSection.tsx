import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './sections.module.css';

export interface CountdownSectionProps {
  data: any;
  accentColor?: string;
  textColor?: string;
}

const CountdownSection: React.FC<CountdownSectionProps> = ({ data, accentColor, textColor }) => {
  const label = data?.section_countdown_label || 'Counting Down';
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isValidFutureDate, setIsValidFutureDate] = useState(true);

  useEffect(() => {
    if (!data?.event_date) {
      setIsValidFutureDate(false);
      return;
    }

    const eventDateStr = data.event_time ? `${data.event_date}T${data.event_time}` : data.event_date;
    const targetDate = new Date(eventDateStr).getTime();

    if (isNaN(targetDate) || targetDate <= Date.now()) {
      setIsValidFutureDate(false);
      return;
    }

    setIsValidFutureDate(true);

    const interval = setInterval(() => {
      const now = Date.now();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsValidFutureDate(false);
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [data?.event_date, data?.event_time]);

  if (!isValidFutureDate) return null;

  return (
    <section className={styles.countdownSection} style={{ color: textColor }}>
      <motion.div 
        className={styles.sectionInner}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.countdownLabel} style={{ color: accentColor }}>{label}</div>
        
        <div className={styles.countdownGrid}>
          <div className={styles.countdownUnit}>
            <span className={styles.countdownNumber}>{String(timeLeft.days).padStart(2, '0')}</span>
            <span className={styles.countdownUnitLabel}>Days</span>
          </div>
          <motion.span 
            className={styles.countdownSep}
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >:</motion.span>
          
          <div className={styles.countdownUnit}>
            <span className={styles.countdownNumber}>{String(timeLeft.hours).padStart(2, '0')}</span>
            <span className={styles.countdownUnitLabel}>Hours</span>
          </div>
          <motion.span 
            className={styles.countdownSep}
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >:</motion.span>
          
          <div className={styles.countdownUnit}>
            <span className={styles.countdownNumber}>{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span className={styles.countdownUnitLabel}>Mins</span>
          </div>
          <motion.span 
            className={styles.countdownSep}
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >:</motion.span>
          
          <div className={styles.countdownUnit}>
            <span className={styles.countdownNumber}>{String(timeLeft.seconds).padStart(2, '0')}</span>
            <span className={styles.countdownUnitLabel}>Secs</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export { CountdownSection };
export default CountdownSection;
