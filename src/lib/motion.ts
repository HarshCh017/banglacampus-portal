/**
 * BengalCampus Global Motion System
 * Adheres to Awwwards-grade motion principles:
 * - Ease-out-expo [0.16, 1, 0.3, 1] for cinematic entrances
 * - Spring physics { stiffness: 260, damping: 28 } for reactive UI
 * - Strictly honors prefers-reduced-motion
 */

import { Variants, Transition } from 'framer-motion';

export const EASINGS = {
  easeOutExpo: [0.16, 1, 0.3, 1] as const,
  easeInOutExpo: [0.87, 0, 0.13, 1] as const,
  springUI: {
    type: 'spring',
    stiffness: 260,
    damping: 28,
  } as const,
  springSnappy: {
    type: 'spring',
    stiffness: 380,
    damping: 30,
  } as const,
  springBouncy: {
    type: 'spring',
    stiffness: 200,
    damping: 18,
  } as const,
};

export const DURATIONS = {
  micro: 0.15,
  component: 0.4,
  section: 0.8,
  hero: 1.1,
};

export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: 'blur(8px)',
  },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: DURATIONS.section,
      ease: EASINGS.easeOutExpo,
      delay: custom * 0.08,
    },
  }),
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const lineMaskReveal: Variants = {
  hidden: {
    y: '100%',
    opacity: 0,
  },
  visible: (custom: number = 0) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: DURATIONS.section,
      ease: EASINGS.easeOutExpo,
      delay: custom * 0.1,
    },
  }),
};

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATIONS.component,
      ease: EASINGS.easeOutExpo,
    },
  },
};

export const cardHoverSpring: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 20,
};
