import React from 'react';
import { motion } from 'framer-motion';
import styles from './sections.module.css';

export interface GallerySectionProps {
  data: any;
  accentColor?: string;
  textColor?: string;
}

const GallerySection: React.FC<GallerySectionProps> = ({ data, accentColor, textColor }) => {
  const photos = data?.gallery_photos;

  if (!photos || !Array.isArray(photos) || photos.length === 0) {
    return null;
  }

  const label = data?.section_gallery_label || 'Gallery';

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className={styles.gallerySection} style={{ color: textColor }}>
      <motion.div
        className={styles.galleryLabel}
        style={{ color: accentColor }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
      >
        {label}
      </motion.div>
      <div className={styles.galleryGrid}>
        {photos.map((photoUrl, index) => {
          const isFullWidth = (index + 1) % 3 === 0;
          return (
            <motion.div
              key={index}
              className={`${styles.galleryItem} ${isFullWidth ? styles.galleryItemFull : ''}`}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <img src={photoUrl} alt={`Gallery item ${index + 1}`} loading="lazy" />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export { GallerySection };
export default GallerySection;
