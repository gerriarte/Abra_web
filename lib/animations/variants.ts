// Personalidad de movimiento unificada de la landing.
// Dos curvas, reusadas en todo el sitio para que se sienta cohesionado:
//  - ENTRANCE: suave, para apariciones (la base del sistema).
//  - EXPRESSIVE: con overshoot sutil, para interacciones y revelados.
export const EASE_ENTRANCE = [0.21, 0.47, 0.32, 0.98] as const;
export const EASE_EXPRESSIVE = [0.16, 1, 0.3, 1] as const;

export const heroContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.35 },
  },
};

export const sectionContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: EASE_ENTRANCE,
    },
  },
};
