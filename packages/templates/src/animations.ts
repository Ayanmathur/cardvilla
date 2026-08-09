/**
 * Shared Animation Primitives
 * 
 * Reusable animation mechanisms used across multiple template categories.
 * Per Section 13.2: "Build each animation MECHANISM once, then re-skin it per template."
 * 
 * Animation families:
 * - Flame/Diya flicker → Diwali, Griha Pravesh, Devotional series, Bhai Dooj
 * - Petal/Bloom → Wedding florals, Buddha Purnima, Satsang lotus
 * - Confetti/Burst → New Year, Grand Opening, Retirement
 * - Float/Bob → Baby items, balloons, hearts
 * - Draw-in/Stroke → Kolam, lattice, alpana patterns
 * - Sparkle/Twinkle → Princess, ring ceremony, general accents
 * - Steam/Mist rise → Kitty Party (reuses Phase 1's Coffee Steam)
 * - Sway/Wave → Peacock feather, beach waves, cape flutter
 */

import { Variants, Transition } from 'framer-motion';

// ────────────────────────────────────────────────────────────────────
// 1. FLAME FLICKER — gentle continuous diya/candle flame
// ────────────────────────────────────────────────────────────────────
export const flameFlickerVariants: Variants = {
  idle: {
    scaleY: [1, 1.08, 0.95, 1.05, 1],
    scaleX: [1, 0.97, 1.03, 0.98, 1],
    opacity: [0.9, 1, 0.85, 1, 0.9],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const flameGlowVariants: Variants = {
  idle: {
    opacity: [0.3, 0.55, 0.3],
    scale: [1, 1.15, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// ────────────────────────────────────────────────────────────────────
// 2. PETAL / BLOOM — flowers unfurl once, petals drift down
// ────────────────────────────────────────────────────────────────────
export const bloomVariants: Variants = {
  hidden: { scale: 0.3, opacity: 0, rotate: -15 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.8,
      ease: [0.34, 1.56, 0.64, 1],
    },
  }),
};

export const petalDriftVariants: Variants = {
  animate: (i: number) => ({
    y: [0, 200, 400],
    x: [0, Math.sin(i * 1.5) * 30, Math.sin(i * 2.2) * 50],
    rotate: [0, 45 * (i % 2 === 0 ? 1 : -1), 90],
    opacity: [0.7, 0.5, 0],
    transition: {
      duration: 6 + i * 0.5,
      repeat: Infinity,
      delay: i * 1.2,
      ease: 'linear',
    },
  }),
};

// ────────────────────────────────────────────────────────────────────
// 3. CONFETTI / BURST — fireworks, ribbon confetti, sparkle burst
// ────────────────────────────────────────────────────────────────────
export const confettiPieceVariants: Variants = {
  hidden: { y: -20, opacity: 0, scale: 0.5 },
  visible: (i: number) => ({
    y: [0, 50, 120, 200],
    x: [-20 + Math.random() * 40, -40 + Math.random() * 80],
    opacity: [1, 0.8, 0.5, 0],
    rotate: [0, 180 + Math.random() * 360],
    scale: [1, 0.9, 0.7],
    transition: {
      duration: 3 + Math.random() * 2,
      delay: i * 0.08,
      ease: 'easeOut',
    },
  }),
};

export const fireworkBurstVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i: number) => ({
    scale: [0, 1.2, 0.8],
    opacity: [0, 1, 0],
    transition: {
      duration: 1.5,
      delay: i * 0.3,
      ease: 'easeOut',
    },
  }),
};

// ────────────────────────────────────────────────────────────────────
// 4. FLOAT / BOB — gentle continuous floating (baby items, balloons, hearts)
// ────────────────────────────────────────────────────────────────────
export const floatBobVariants: Variants = {
  animate: (i: number) => ({
    y: [0, -12, 0, -8, 0],
    x: [0, Math.sin(i) * 5, 0],
    rotate: [0, 2 * (i % 2 === 0 ? 1 : -1), 0],
    transition: {
      duration: 3 + i * 0.4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  }),
};

export const floatUpVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: (i: number) => ({
    y: [-200, -400],
    opacity: [0.8, 0],
    transition: {
      duration: 8 + i * 1.5,
      repeat: Infinity,
      delay: i * 2,
      ease: 'linear',
    },
  }),
};

// ────────────────────────────────────────────────────────────────────
// 5. DRAW-IN / STROKE — SVG path drawing (kolam, lattice, alpana)
// ────────────────────────────────────────────────────────────────────
export const strokeDrawVariants: Variants = {
  hidden: {
    pathLength: 0,
    opacity: 0.3,
  },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 2 + i * 0.3, ease: 'easeInOut', delay: i * 0.2 },
      opacity: { duration: 0.5, delay: i * 0.2 },
    },
  }),
};

// ────────────────────────────────────────────────────────────────────
// 6. SPARKLE / TWINKLE — staggered opacity pulse (princess, rings, accents)
// ────────────────────────────────────────────────────────────────────
export const sparkleVariants: Variants = {
  animate: (i: number) => ({
    opacity: [0.2, 1, 0.2],
    scale: [0.8, 1.2, 0.8],
    transition: {
      duration: 1.5 + i * 0.3,
      repeat: Infinity,
      delay: i * 0.4,
      ease: 'easeInOut',
    },
  }),
};

export const glintVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (i: number) => ({
    opacity: [0, 1, 0],
    scale: [0, 1.5, 0],
    transition: {
      duration: 0.8,
      delay: 0.5 + i * 0.2,
      ease: 'easeOut',
    },
  }),
};

// ────────────────────────────────────────────────────────────────────
// 7. SWAY / WAVE — gentle lateral motion (feathers, waves, cape)
// ────────────────────────────────────────────────────────────────────
export const swayVariants: Variants = {
  animate: {
    rotate: [-3, 3, -2, 2, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const waveVariants: Variants = {
  animate: (i: number) => ({
    x: [0, 15, 0, -15, 0],
    transition: {
      duration: 5 + i * 0.5,
      repeat: Infinity,
      ease: 'easeInOut',
      delay: i * 0.3,
    },
  }),
};

// ────────────────────────────────────────────────────────────────────
// 8. STEAM / MIST — wisps rising (reuses Coffee Steam family)
// ────────────────────────────────────────────────────────────────────
export const steamWispVariants: Variants = {
  animate: (i: number) => ({
    y: [0, -60, -120],
    x: [0, Math.sin(i * 2) * 15, Math.sin(i * 3) * 10],
    opacity: [0.4, 0.25, 0],
    scale: [0.8, 1.2, 1.5],
    transition: {
      duration: 4 + i * 0.8,
      repeat: Infinity,
      delay: i * 1.5,
      ease: 'easeOut',
    },
  }),
};

// ────────────────────────────────────────────────────────────────────
// 9. SLIDE IN / REVEAL — entrance animations (standard for content)
// ────────────────────────────────────────────────────────────────────
export const slideUpVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.3 + i * 0.1,
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      delay: 0.2 + i * 0.1,
      duration: 0.5,
    },
  }),
};

// ────────────────────────────────────────────────────────────────────
// 10. RIBBON TIE — path draws into a bow (Rakhi, gift wrapping)
// ────────────────────────────────────────────────────────────────────
export const ribbonTieVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.5, ease: 'easeInOut' },
      opacity: { duration: 0.3 },
    },
  },
};

// ────────────────────────────────────────────────────────────────────
// SHARED TRANSITIONS
// ────────────────────────────────────────────────────────────────────
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

export const gentleSpring: Transition = {
  type: 'spring',
  stiffness: 120,
  damping: 14,
};

export const smoothEase: Transition = {
  duration: 0.6,
  ease: [0.25, 0.1, 0.25, 1],
};
