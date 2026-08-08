import { Variants, Transition } from 'framer-motion';

// Shared animation mechanisms reused across template families

// Flame flicker - continuous gentle glow (used by: Diwali, Griha Pravesh, Devotional, Bhai Dooj)
export const flameFlicker: Variants = {
  animate: {
    opacity: [0.7, 1, 0.8, 1, 0.7],
    scale: [1, 1.05, 0.98, 1.03, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Shine sweep - diagonal gradient sweep (used by: Gold Radiance, Silver Elegance)
export const shineSweep: Variants = {
  initial: { x: '-100%' },
  animate: {
    x: '200%',
    transition: { duration: 1, ease: 'easeInOut' },
  },
};

// Steam rise - continuous upward drift with fade (used by: Coffee Steam, Kitty Party)
export const steamRise = (index: number): Variants => ({
  animate: {
    y: [0, -30, -60],
    opacity: [0, 0.6, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      delay: index * 0.8,
      ease: 'easeOut',
    },
  },
});

// Petal drift - gentle falling motion (used by: Wedding florals, Marigold, Buddha Purnima)
export const petalDrift = (index: number): Variants => ({
  animate: {
    y: [0, 100],
    x: [0, Math.sin(index) * 20],
    rotate: [0, 360 * (index % 2 === 0 ? 1 : -1)],
    opacity: [0, 0.8, 0],
    transition: {
      duration: 4 + index * 0.5,
      repeat: Infinity,
      delay: index * 0.7,
      ease: 'easeInOut',
    },
  },
});

// Sparkle/glint - brief twinkle (used by: Dental Bright, Ring Ceremony, Jeweler)
export const sparkle = (index: number): Variants => ({
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: [0, 1.2, 0],
    opacity: [0, 1, 0],
    transition: {
      duration: 0.6,
      delay: 0.2 + index * 0.15,
      ease: 'easeOut',
    },
  },
});

// Confetti burst - radiating particles (used by: New Year, Grand Opening, Retirement)
export const confettiBurst = (index: number): Variants => ({
  initial: { scale: 0, opacity: 0, x: 0, y: 0 },
  animate: {
    scale: [0, 1],
    opacity: [0, 1, 0],
    x: Math.cos((index * Math.PI * 2) / 8) * 80,
    y: Math.sin((index * Math.PI * 2) / 8) * 80 + 20,
    transition: {
      duration: 1.2,
      delay: index * 0.05,
      ease: 'easeOut',
    },
  },
});

// Pattern draw - stroke animation (used by: Kolam, Alpana, Islamic lattice)
export const patternDraw: Variants = {
  initial: { pathLength: 0, opacity: 0 },
  animate: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 2, ease: 'easeInOut' },
      opacity: { duration: 0.5 },
    },
  },
};

// Heartbeat pulse - gentle scale loop (used by: Clinic Care)
export const heartbeatPulse: Variants = {
  animate: {
    scale: [1, 1.05, 1, 1.03, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Stagger children container
export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Fade in up (general purpose entrance)
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

// Standard spring transition
export const springTransition: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 20,
};
