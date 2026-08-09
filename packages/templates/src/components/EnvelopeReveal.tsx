import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './EnvelopeReveal.module.css';

export interface EnvelopeRevealProps {
  children: React.ReactNode;
  variant?: 'sage' | 'gold' | 'kraft' | 'red';
  promptText?: string;
  initialOpened?: boolean;
}

export const EnvelopeReveal: React.FC<EnvelopeRevealProps> = ({
  children,
  variant = 'sage',
  promptText = 'Tap to open invitation',
  initialOpened = false,
}) => {
  const [isOpen, setIsOpen] = useState(initialOpened);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const getVariantClass = () => {
    switch (variant) {
      case 'gold': return styles.variantGold;
      case 'kraft': return styles.variantKraft;
      case 'red': return styles.variantRed;
      default: return styles.variantSage;
    }
  };

  if (isOpen) {
    return (
      <div className={styles.compositeContainer}>
        <motion.div 
          className={styles.tiltedEnvelopeBackdrop}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ duration: 0.6 }}
        />
        <motion.div 
          className={styles.cardForeground}
          initial={{ y: 60, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button 
        className={styles.skipLink}
        onClick={() => setIsOpen(true)}
        aria-label="Skip envelope animation"
      >
        Skip to Card →
      </button>

      <div className={styles.sceneWrapper} onClick={handleOpen}>
        <motion.div 
          className={`${styles.envelopeBox} ${getVariantClass()}`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Metallic Gold Foil Lining */}
          <div className={styles.goldFoilLining} />

          {/* Opening Top Flap */}
          <motion.div 
            className={styles.envelopeFlap}
            initial={{ rotateX: 0 }}
            animate={{ rotateX: isOpen ? -180 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <svg className={styles.flapSvg} viewBox="0 0 320 110" fill="none">
              <path d="M0 0 L160 90 L320 0 Z" fill="currentColor" fillOpacity="0.9" />
              <path d="M160 90 L160 110" stroke="#d4af37" strokeWidth="2" strokeDasharray="3 3" />
            </svg>
          </motion.div>
        </motion.div>

        <motion.div 
          className={styles.tapPrompt}
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <span className={styles.tapIcon}>✉️</span>
          <span>{promptText}</span>
        </motion.div>
      </div>
    </div>
  );
};

export default EnvelopeReveal;
