import React from 'react';
import { motion } from 'framer-motion';
import styles from './sections.module.css';
import { formatEventDate } from '../invitation-layout';
import { slideUpVariants } from '../animations';

interface ScheduleSectionProps {
  data: any;
  accentColor?: string;
}

interface EventItem {
  event_name?: string;
  event_date?: string;
  event_time?: string;
  venue_name?: string;
  venue_address?: string;
}

const ScheduleSection: React.FC<ScheduleSectionProps> = ({ data, accentColor }) => {
  let events: EventItem[] = [];
  
  if (data.events && Array.isArray(data.events) && data.events.length > 0) {
    events = data.events;
  } else if (data.event_date || data.event_time || data.venue_name || data.venue_address) {
    events = [{
      event_name: 'Main Event',
      event_date: data.event_date,
      event_time: data.event_time,
      venue_name: data.venue_name,
      venue_address: data.venue_address,
    }];
  }

  if (events.length === 0) return null;

  const label = data.section_schedule_label || 'Schedule of Events';

  return (
    <section className={styles.scheduleSection}>
      <div className={styles.sectionInner}>
        <motion.h2 
          className={styles.scheduleLabel}
          style={{ color: accentColor }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={slideUpVariants}
        >
          {label}
        </motion.h2>

        <div className={styles.timeline}>
          <div className={styles.timelineLine} />
          {events.map((evt, idx) => (
            <motion.div 
              key={idx}
              className={styles.eventCard}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={slideUpVariants}
              custom={idx * 0.2}
            >
              <div className={styles.eventDot} style={{ backgroundColor: accentColor }} />
              <div className={styles.eventDetails}>
                {evt.event_name && <h3 className={styles.eventName}>{evt.event_name}</h3>}
                {(evt.event_date || evt.event_time) && (
                  <p className={styles.eventDateTime}>
                    {evt.event_date && formatEventDate(evt.event_date)}
                    {evt.event_date && evt.event_time && ' • '}
                    {evt.event_time}
                  </p>
                )}
                {evt.venue_name && <p className={styles.eventVenue}>{evt.venue_name}</p>}
                {evt.venue_address && (
                  <a 
                    className={styles.eventAddress} 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(evt.venue_address)}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {evt.venue_address}
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { ScheduleSection };
export default ScheduleSection;
