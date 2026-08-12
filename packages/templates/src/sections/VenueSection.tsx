import React from 'react';
import { motion } from 'framer-motion';
import styles from './sections.module.css';
import { slideUpVariants } from '../animations';

interface VenueSectionProps {
  data: any;
  accentColor?: string;
}

const VenueSection: React.FC<VenueSectionProps> = ({ data, accentColor }) => {
  if (!data.venue_name && !data.venue_address) return null;

  const label = data.section_venue_label || 'Venue';

  return (
    <motion.section 
      className={styles.venueSection}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={slideUpVariants}
    >
      <div className={styles.sectionInner}>
        <h2 className={styles.venueLabel} style={{ color: accentColor }}>
          {label}
        </h2>
        
        {data.venue_name && <p className={styles.venueName}>{data.venue_name}</p>}
        {data.venue_address && <p className={styles.venueAddress}>{data.venue_address}</p>}
        
        {data.venue_address && (
          <a 
            className={styles.venueMapLink}
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.venue_address)}`}
            target="_blank"
            rel="noreferrer"
            style={{ backgroundColor: accentColor }}
          >
            View on Maps
          </a>
        )}
      </div>
    </motion.section>
  );
};

export { VenueSection };
export default VenueSection;
